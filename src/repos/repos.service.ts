import {
  BadRequestException,
  Injectable,
  InternalServerErrorException
} from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import * as argon2 from 'argon2'
import { Role } from '@prisma/client'
import type { CreateRepoDto } from './dtos/createRepo.dto'
import type { AddUserToRepoDto } from './dtos/addUserToRepo.dto'
import { MinioClientService } from 'src/minio/minio.service'
import { v1 } from 'uuid'
import type { FileDto } from './dtos/file.dto'
@Injectable()
export class ReposService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly minio: MinioClientService
  ) {}

  async createNewRepo(createRepoDto: CreateRepoDto) {
    const repoName = createRepoDto.repoName.toLowerCase()
    const repoExist = await this.prismaService.repo.findFirst({
      where: {
        name: repoName
      }
    })
    if (repoExist) {
      throw new BadRequestException('이미 존재하는 repo입니다')
    }
    const newRepo = await this.prismaService.$transaction(async (tx) => {
      //minio에서 버킷(레포) 생성
      await this.minio.listBucket()
      await this.minio.makeBucket(repoName)
      return await tx.repo.create({
        data: {
          name: repoName
        }
      })
    })
    return newRepo
  }

  async addUserToRepo(addUserToRepoDto: AddUserToRepoDto) {
    const { repoId, userId } = addUserToRepoDto
    try {
      await this.prismaService.$transaction(async (tx) => {
        await tx.user.findFirst({
          where: {
            id: userId
          }
        })
        await tx.repo.findFirst({
          where: {
            id: repoId
          }
        })
        await tx.userRepo.create({
          data: {
            userId: userId,
            repoId: repoId
          }
        })
      })
    } catch (e) {
      console.log({ e })
      throw new InternalServerErrorException(e)
    }
    return 'success'
  }

  async getAllRepos(userId: number) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: userId
      }
    })
    if (user.role === Role.Tutor) {
      return await this.prismaService.repo.findMany()
    } else {
      return await this.prismaService.repo.findMany({
        where: {
          UserRepo: {
            some: {
              userId
            }
          }
        }
      })
    }
  }

  async createUser(body) {
    const { role, username, nickname, password, ssh } = body
    try {
      await this.prismaService.$transaction(async (tx) => {
        await tx.user.create({
          data: {
            role: role,
            username: username,
            nickname: nickname,
            password: await argon2.hash(password),
            sshKey: ssh
          }
        })
      })
    } catch (e) {
      throw new BadRequestException('이미 존재하는 사용자입니다')
    }

    return
  }

  async createFile(uploadedFile: Express.Multer.File, fileDto: FileDto) {
    try {
      return await this.prismaService.$transaction(
        async (tx) => {
          const { originalname, mimetype, size, buffer } = uploadedFile
          const createdAt = new Date()
          const key = v1()
          const problem = await this.prismaService.problem.findFirst({
            where: {
              id: fileDto.problemId
            },
            include: {
              Repo: true
            }
          })
          if (problem.uuid !== null) {
            await this.minio.removeFile(problem.Repo.name, problem.uuid)
          }

          await this.minio.uploadFile(
            key,
            buffer,
            size,
            createdAt,
            Buffer.from(originalname, 'latin1').toString('utf8'),
            mimetype,
            problem.Repo.name
          )

          return await tx.problem.update({
            where: {
              id: fileDto.problemId
            },
            data: {
              uuid: key
            }
          })
        },
        {
          maxWait: 7000,
          timeout: 7000
        }
      )
    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException(
        '파일 업로드에 문제가 발생하였습니다'
      )
    }
  }
}
