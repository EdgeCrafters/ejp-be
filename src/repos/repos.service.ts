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
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { exec } = require('child_process')

@Injectable()
export class ReposService {
  constructor(private readonly prismaService: PrismaService) {}

  async createNewRepo(createRepoDto: CreateRepoDto) {
    const repoName = createRepoDto.repoName
    const repoExist = await this.prismaService.repo.findFirst({
      where: {
        name: repoName
      }
    })
    if (repoExist) {
      throw new BadRequestException('이미 존재하는 repo입니다')
    }
    const newRepo = await this.prismaService.$transaction(async (tx) => {
      exec(
        `./scripts/create-new-repo.sh ${repoName}`,
        (error, stdout, stderr) => {
          console.log(error, stdout, stderr)
        }
      )
      return await tx.repo.create({
        data: {
          name: repoName
        }
      })
    })
    return newRepo
  }

  //gitolite-admim의 repo에 학생 등록
  async addUserToRepo(addUserToRepoDto: AddUserToRepoDto) {
    const { repoId, userId } = addUserToRepoDto
    try {
      await this.prismaService.$transaction(async (tx) => {
        const user = await tx.user.findFirst({
          where: {
            id: userId
          }
        })
        const repo = await tx.repo.findFirst({
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
        exec(
          `./scripts/add-user.sh ${user.username} ${repo.name}`,
          (error, stdout, stderr) => {
            console.log(error, stdout, stderr)
          }
        )
      })
    } catch (e) {
      console.log({ e })
      throw new InternalServerErrorException(e)
    }
    return 'success'
  }

  async getAllRepos() {
    return await this.prismaService.repo.findMany()
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

        if (role == Role.Tutor) {
          console.log('add-tutor script running..')
          exec(
            `./scripts/add-tutor.sh ${username} ${ssh}`,
            (error, stdout, stderr) => {
              console.log(error, stdout, stderr)
            }
          )
        } else if (role == Role.Student) {
          console.log('create-user script running..')
          exec(
            `./scripts/create-user.sh ${username} ${ssh}`,
            (error, stdout, stderr) => {
              console.log(error, stdout, stderr)
            }
          )
        } else {
          throw new BadRequestException('올바른 role이 아닙니다.')
        }
      })
    } catch (e) {
      throw new BadRequestException('이미 존재하는 사용자입니다')
    }

    return
  }
}
