import {
  BadRequestException,
  Injectable,
  NotAcceptableException
} from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { exec } = require('child_process')

@Injectable()
export class ReposService {
  constructor(private readonly prismaService: PrismaService) {}

  async getScoreList(id: number) {
    const scores = await this.prismaService.score.findMany({
      where: { userId: id }
    })
    console.log({ scores })
    return scores
  } //payload 확정되면 수정

  async createNewRepo(repoName: string) {
    // const repoPath = path.resolve(`./resources/${id}`)
    // const mkdir = (dir) => {
    //   if (!fs.existsSync(dir)) {
    //     fs.mkdirSync(dir)
    //     return true
    //   } else {
    //     return false
    //   }
    // }
    // if (!mkdir(repoPath)) return new NotAcceptableException()

    // await nodegit.Repository.init(repoPath, 0)
    try{
    const newRepo = await this.prismaService.repo.create({
      data: {
        name: repoName,
        url: repoName,
      }
    })
  }
  catch(e){
    return new BadRequestException('이미 존재하는 repo입니다')
  }
    // return repoPath
    exec(`./scripts/create-new-repo.sh ${repoName}`, (err, stdout, stderr) => {
      console.log(err)
    })
    return repoName
  }

  //gitolite-admin에 학생 등록 & user table에 학생 추가
  async getRepoUrl(id: string, body) {
    // const requestedUrl = await this.prismaService.repo.findUnique({
    //   where: {
    //     url: body.url
    //   }
    // })
    // if (!requestedUrl) return new BadRequestException('존재하지않는 url입니다')
    // const studentId = await this.prismaService.user.findUnique({
    //   where: {
    //     nickname: id
    //   },
    //   select: {
    //     id: true
    //   }
    // })
    // const createNewUserRepo = await this.prismaService.userRepo.create({
    //   data: {
    //     userId: studentId.id,
    //     repoId: requestedUrl.id
    //   }
    // })
    exec(`./scripts/add-user ${id} ${body.sha}`, (err, stdout, stderr) => {
      console.log(err)
    })
    return 'test'
  }

  async getRepos() {
    const repos = await this.prismaService.repo.findMany({
      select: {
        name: true
      }
    })

    return repos
  }
}
