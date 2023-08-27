import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import type { ScoreCSVDTO, ScoreDTO } from './dto/score.dto'
import { unparse } from 'papaparse'
import { Role } from '@prisma/client'

@Injectable()
export class SubmitService {
  constructor(private readonly prismaService: PrismaService) {}

  async getScore(username: string, problemId: number): Promise<ScoreDTO> {
    const user = await this.prismaService.user.findUnique({
      where: {
        username
      }
    })

    if (!user) {
      throw new NotFoundException('존재하지 않는 학생입니다.')
    }

    const problem = await this.prismaService.problem.findUnique({
      where: {
        id: problemId
      },
      include: {
        testCase: true
      }
    })

    if (!problem) {
      throw new NotFoundException('존재하지 않는 문제 id 입니다.')
    }

    const total = problem.testCase

    const pass = await this.prismaService.userTestCase.findMany({
      where: {
        userId: user.id,
        TestCase: {
          problemId: problemId
        },
        isCorrect: true
      }
    })

    return {
      problemId: problem.id,
      problemName: problem.title,
      pass: pass.length,
      total: total.length
    }
  }

  async getRepoScores(username: string, repoId: number): Promise<ScoreDTO[]> {
    const user = await this.prismaService.user.findUnique({
      where: {
        username
      }
    })

    if (!user) {
      throw new NotFoundException('존재하지 않는 학생입니다.')
    }

    const repo = await this.prismaService.repo.findUnique({
      where: {
        id: repoId
      },
      include: {
        Problem: {
          include: {
            testCase: true,
            UserTestCase: {
              where: {
                userId: user.id,
                isCorrect: true
              }
            }
          }
        }
      }
    })

    if (!repo) {
      throw new NotFoundException('존재하지 않는 repository id 입니다.')
    }

    const result: Array<ScoreDTO> = []

    await Promise.all(
      repo.Problem.map(async (problem) => {
        result.push({
          problemId: problem.id,
          problemName: problem.title,
          pass: problem.UserTestCase.length,
          total: problem.testCase.length
        })
      })
    )

    return result
  }

  async getRepoProblemScores(
    problemId: number,
    repoId: number
  ): Promise<ScoreCSVDTO> {
    const problem = await this.prismaService.problem.findUnique({
      where: {
        id: problemId,
        repoId
      },
      include: {
        testCase: true,
        UserTestCase: {
          where: {
            isCorrect: true
          },
          include: {
            User: true
          }
        },
        Repo: {
          include: {
            UserRepo: {
              where: {
                user: {
                  role: Role.Student
                }
              },
              include: { user: true }
            }
          }
        }
      }
    })

    if (!problem) {
      throw new NotFoundException('존재하지 않는 워크북 혹은 문제 id 입니다.')
    }

    const total = problem.testCase.length

    const userpass = {}
    problem.Repo.UserRepo.map((userrepo) => {
      userpass[userrepo.user.username] = 0
    })

    console.log(userpass)

    problem.UserTestCase.map((userTestCase) => {
      const username = userTestCase.User.username
      if (!userpass[username]) {
        userpass[username] = 0
      }
      userpass[username] += 1
    })

    const scores = Object.entries(userpass).map(([username, pass]) => ({
      username,
      pass: pass as number,
      total
    }))

    const result: ScoreCSVDTO = {
      problemId: problem.id,
      problemName: problem.title,
      data: unparse(scores)
    }

    return result
  }
}
