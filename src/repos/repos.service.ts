import { BadRequestException, Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import * as argon2 from 'argon2'
import { Role } from '@prisma/client'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { exec } = require('child_process')

@Injectable()
export class ReposService {
  constructor(private readonly prismaService: PrismaService) {}

  async createNewRepo(repoName: string) {
    const repoExist = await this.prismaService.repo.findFirst({
      where: {
        name: repoName
      }
    })
    if (repoExist) {
      console.log(repoExist)
      return new BadRequestException('이미 존재하는 repo입니다')
    }
    await this.prismaService.$transaction(async (tx) => {
      await tx.repo.create({
        data: {
          name: repoName
        }
      })
      exec(`./scripts/create-new-repo.sh ${repoName}`)
    })
    return repoName
  }

  //gitolite-admin에 학생 등록
  async addUserToRepo(body) {
    const { repoId, userId } = body
    try {
      await this.prismaService.$transaction(async (tx) => {
        const user = await tx.user.findFirst({
          where: {
            id: userId
          }
        })
        const repo = await tx.repo.findFirst({
          where: {
            id: parseInt(repoId)
          }
        })
        await tx.userRepo.create({
          data: {
            userId: userId,
            repoId: repoId
          }
        })
        exec(`./scripts/add-user.sh ${user.username} ${repo.name}`)
      })
    } catch (e) {
      console.log({ e })
      return 'failed'
    }
    return 'success'
  }

  async getAllRepos() {
    const repos = await this.prismaService.repo.findMany({
      select: {
        name: true
      }
    })

    return repos
  }

  async createUserTemp(body) {
    const { role, username, nickname, password, ssh } = body
    await this.prismaService.user.create({
      data: {
        role: role,
        username: username,
        nickname: nickname,
        password: await argon2.hash(password),
        sshKey: ssh
      }
    })

    if (role == Role.Tutor) {
      exec(`./scripts/add-tutor.sh ${username}`, (error, stdout, stderr) => {
        console.log(error, stdout, stderr)
      })
    }
    exec(
      `./scripts/create-user.sh ${username} ${ssh}`,
      (error, stdout, stderr) => {
        console.log(error, stdout, stderr)
      }
    )
    return
  }
}
