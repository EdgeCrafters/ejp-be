import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import type {
  CreateTestcaseDto,
  UpdateHiddencaseDTO,
  UpdateTestcaseDTO,
  CreateHiddencaseDto
} from './dto/testcase.dto'
import { ProblemService } from 'src/problem/problem.service'
import type { TestCase, HiddenCase } from '@prisma/client'

@Injectable()
export class TestcaseService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly problemService: ProblemService
  ) {}

  async updateTestcase(
    id: number,
    testcaseDTO: UpdateTestcaseDTO
  ): Promise<TestCase> {
    return await this.prisma.testCase.update({
      where: {
        id
      },
      data: {
        url: testcaseDTO.url
      }
    })
  }

  async updateHiddencase(
    id: number,
    testcaseDTO: UpdateHiddencaseDTO
  ): Promise<HiddenCase> {
    return await this.prisma.hiddenCase.update({
      where: {
        id
      },
      data: {
        url: testcaseDTO.url
      }
    })
  }

  async deleteTestcase(id: number): Promise<TestCase> {
    return await this.prisma.testCase.delete({
      where: {
        id
      }
    })
  }

  async deleteHiddencase(id: number): Promise<HiddenCase> {
    return await this.prisma.hiddenCase.delete({
      where: {
        id
      }
    })
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
    const { url, problemId } = createTestcaseDto
    await this.prisma.testCase.create({
      data: {
        problemId,
        ...(url && { url })
      }
    })
    return
  }

  async createHiddencase(createHiddencaseDto: CreateHiddencaseDto) {
    const { url, bias, problemId, output } = createHiddencaseDto
    await this.prisma.hiddenCase.create({
      data: {
        ...(url && { url }),
        bias,
        problemId,
        output
      }
    })
    return
  }
}
