import { BadRequestException, Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
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
      const newRepo = await tx.repo.create({
        data: {
          name: repoName
        }
      })
      exec(`./scripts/create-new-repo.sh ${repoName}`)
    })
    return repoName
  }

  //gitolite-admin에 학생 등록
  async addUserToRepo(id: number, body) {
    const { repoId, ssh } = body
    try {
      await this.prismaService.$transaction(async (tx) => {
        const user = await tx.user.findFirst({
          where: {
            id: id
          }
        })
        const repo = await tx.repo.findFirst({
          where: {
            id: parseInt(repoId)
          }
        })
        const createNewUserRepo = await tx.userRepo.create({
          data: {
            userId: id,
            repoId: repo.id
          }
        })
        exec(`./scripts/add-user.sh ${user.username} ${ssh}`)
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
}
