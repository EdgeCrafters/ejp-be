import {
  BadRequestException,
  Injectable,
  InternalServerErrorException
} from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { Role } from '@prisma/client'
import type { CreateRepoDto } from './dtos/createRepo.dto'
import type { AddUserToRepoDto } from './dtos/addUserToRepo.dto'
import { MinioClientService } from 'src/minio/minio.service'
@Injectable()
export class ReposService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly minio: MinioClientService
  ) {}

  async getRepoInfos(repoId: number) {
    return await this.prismaService.repo.findUnique({
      where: {
        id: repoId
      },
      include: {
        Problem: {
          include: {
            testCase: true
          }
        }
      }
    })
  }

  async createNewRepo(createRepoDto: CreateRepoDto, userId: number) {
    const repoName = createRepoDto.repoName.toLowerCase()
    const repoExist = await this.prismaService.repo.findFirst({
      where: {
        name: repoName
      }
    })
    if (repoExist) {
      throw new BadRequestException('이미 존재하는 repo입니다')
    }
    try {
      const newRepo = await this.prismaService.repo.create({
        data: {
          name: repoName,
          UserRepo: {
            create: {
              userId: userId
            }
          }
        }
      })
      return newRepo
    } catch (error) {
      throw new BadRequestException('repo creation failed')
    }
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

  async createFile(uploadedFile: Express.Multer.File, problemId: number) {
    try {
      return await this.prismaService.$transaction(
        async (tx) => {
          const { originalname, mimetype, size, buffer } = uploadedFile
          const createdAt = new Date()
          const problem = await this.prismaService.problem.findFirst({
            where: {
              id: problemId
            },
            include: {
              Repo: true
            }
          })
          if (problem.uuid !== null) {
            await this.minio.removeFile(problem.uuid)
          }
          const key = `${problem.Repo.name}-${problem.title}`
          await this.minio.uploadFile(
            key,
            buffer,
            size,
            createdAt,
            Buffer.from(originalname, 'latin1').toString('utf8'),
            mimetype
          )

          return await tx.problem.update({
            where: {
              id: problemId
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

  async deleteFile(problemId: number) {
    try {
      const key = await this.prismaService.problem.findFirst({
        where: {
          id: problemId
        },
        select: {
          uuid: true
        }
      })
      await this.minio.removeFile(key.uuid)
      return
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async getFile(problemId: number) {
    try {
      const [fileName, stream] = await this.prismaService.$transaction(
        async (tx) => {
          const file = await tx.problem.findFirst({
            where: {
              id: problemId
            }
          })
          const stream = await this.minio.getFile(file.uuid)
          return [file.uuid, stream]
        }
      )
      return { fileName, stream }
    } catch (error) {
      throw new InternalServerErrorException('file search failed')
    }
  }
}
