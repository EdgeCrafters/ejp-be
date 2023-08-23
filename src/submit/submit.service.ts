import { Injectable, NotFoundException } from '@nestjs/common'
import type { Score } from '@prisma/client'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class SubmitService {
  constructor(private readonly prismaService: PrismaService) {}

  async getScore(userId: number, problemId: number): Promise<Score> {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: userId
      }
    })

    if (!user) {
      throw new NotFoundException('존재하지 않는 학생입니다.')
    }

    const problem = await this.prismaService.problem.findUnique({
      where: {
        id: problemId
      }
    })

    if (!problem) {
      throw new NotFoundException('존재하지 않는 문제 id 입니다.')
    }

    const result = await this.prismaService.score.findFirst({
      where: {
        userId,
        problemId
      }
    })

    if (!result) {
      throw new NotFoundException('해당 학생의 제출 정보가 존재하지 않습니다.')
    }

    return result
  }

  async getScores(userId: number): Promise<Score[]> {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: userId
      }
    })

    if (!user) {
      throw new NotFoundException('존재하지 않는 학생입니다.')
    }

    return await this.prismaService.score.findMany({
      where: {
        userId
      }
    })
  }

  async getRepoScores(userId: number, repoId: number): Promise<Score[]> {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: userId
      }
    })

    if (!user) {
      throw new NotFoundException('존재하지 않는 학생입니다.')
    }

    const repo = await this.prismaService.repo.findUnique({
      where: {
        id: repoId
      }
    })

    if (!repo) {
      throw new NotFoundException('존재하지 않는 repository id 입니다.')
    }

    return await this.prismaService.score.findMany({
      where: {
        userId,
        problem: {
          repoId
        }
      }
    })
  }

  async getRepoProblemScores(
    problemId: number,
    repoId: number
  ): Promise<Score[]> {
    const problem = await this.prismaService.problem.findUnique({
      where: {
        id: problemId
      }
    })

    if (!problem) {
      throw new NotFoundException('존재하지 않는 문제 id 입니다.')
    }

    const repo = await this.prismaService.repo.findUnique({
      where: {
        id: repoId
      }
    })

    if (!repo) {
      throw new NotFoundException('존재하지 않는 repository id 입니다.')
    }

    return await this.prismaService.score.findMany({
      where: {
        problemId,
        problem: {
          repoId
        }
      }
    })
  }
}
