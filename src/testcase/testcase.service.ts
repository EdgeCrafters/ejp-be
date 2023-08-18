import {
  BadRequestException,
  Injectable,
  InternalServerErrorException
} from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import type { CreateTestcaseDto } from './dto/testcase.dto'
import { ProblemService } from 'src/problem/problem.service'
import type { TestCase } from '@prisma/client'

@Injectable()
export class TestcaseService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly problemService: ProblemService
  ) {}

  async deleteTestcase(id: number): Promise<TestCase> {
    return await this.prisma.testCase.delete({
      where: {
        id
      }
    })
  }

  async getTestcase(testcaseId: number): Promise<TestCase> {
    const testcase = await this.prisma.testCase.findUnique({
      where: {
        id: testcaseId
      }
    })
    if (!testcase) {
      throw new BadRequestException('존재하지 않는 testcase입니다.')
    }
    return testcase
  }

  async canAccessTestcase(
    userId: number,
    testcaseId: number
  ): Promise<boolean> {
    const repo = await this.prisma.testCase.findUnique({
      where: {
        id: testcaseId
      },
      select: {
        repoId: true
      }
    })

    if (!repo) {
      return false
    }

    return await this.problemService.isMemberOfRepo(userId, repo.repoId)
  }

  async createTestcase(createTestcaseDto: CreateTestcaseDto) {
    await this.prisma.testCase.create({
      data: {
        ...createTestcaseDto
      }
    })
    return
  }

  async updateResult(
    testcaseId: number,
    hashedOutput: string,
    id: number
  ): Promise<void> {
    const user = await this.prisma.user.findUnique({
      where: {
        id
      }
    })
    if (!user) {
      throw new BadRequestException('존재하지 않는 user 입니다')
    }

    const testcase = await this.getTestcase(testcaseId)

    const userTestCase = await this.prisma.userTestCase.findFirst({
      where: {
        userId: user.id,
        testCaseId: testcase.id
      }
    })
    try {
      await this.prisma.$transaction(async (tx) => {
        if (userTestCase) {
          // 나중에 hiddenCase 와 사용자의 hashedOutput 을 비교하는 부분 필요
          await tx.userTestCase.update({
            where: {
              id: userTestCase.id
            },
            data: {
              isCorrect: testcase.output === hashedOutput ? true : false
            }
          })
        } else {
          await tx.userTestCase.create({
            data: {
              userId: user.id,
              testCaseId: testcase.id,
              isCorrect: testcase.output === hashedOutput ? true : false
            }
          })
        }
      })
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }
}
