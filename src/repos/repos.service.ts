import {
  BadRequestException,
  Injectable,
  NotAcceptableException
} from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import * as nodegit from 'nodegit'
import { Request } from 'express'
import { stderr, stdout } from 'process'
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

  async createNewRepo(id: string) {
    const repoPath = path.resolve(`./resources/${id}`)
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
    const newRepo = await this.prismaService.repo.create({
      data: {
        name: id,
        url: repoPath
      }
    })
    // return repoPath
    exec(`./scripts/create-new-repo.sh ${id}`, (err, stdout, stderr) => {
      console.log(err)
    })
  }

  //학생이 url 요청했을때, userrepo에 학생 등록
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
    return requestedUrl.url
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
