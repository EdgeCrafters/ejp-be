import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import type { CreateProblemDTO } from './dto/createProblem.dto'
import type { Problem } from '@prisma/client'
import type { UpdateProblemDTO } from './dto/updateProblem.dto'
import { ReposService } from 'src/repos/repos.service'

@Injectable()
export class ProblemService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly repos: ReposService
  ) {}

  async getProblem(id: number): Promise<Partial<Problem>> {
    return await this.prisma.problem.findUniqueOrThrow({
      where: {
        id
      }
    })
  }

  async getProblems(repoId: number): Promise<{ id: number; title: string }[]> {
    return await this.prisma.problem.findMany({
      where: {
        repoId
      },
      select: {
        id: true,
        title: true
      }
    })
  }

  async createProblem(
    repoId: number,
    problemDTO: CreateProblemDTO
  ): Promise<Problem> {
    return await this.prisma.problem.create({
      data: {
        repoId,
        ...problemDTO
      }
    })
  }

  async updateProblem(
    id: number,
    problemDTO: UpdateProblemDTO
  ): Promise<Problem> {
    return await this.prisma.problem.update({
      where: {
        id
      },
      data: {
        ...problemDTO
      }
    })
  }

  async deleteProblem(id: number): Promise<Problem> {
    try {
      await this.repos.deleteFile(id)
    } catch (e) {
      throw new InternalServerErrorException(e)
    }

    return await this.prisma.problem.delete({
      where: {
        id
      }
    })
  }

  async isMemberOfRepo(userId: number, repoId: number): Promise<boolean> {
    console.log(userId, repoId)

    const userRepo = await this.prisma.userRepo.findFirst({
      where: {
        userId,
        repoId
      }
    })

    return userRepo ? true : false
  }

  async canAccessProblem(userId: number, problemId: number): Promise<boolean> {
    const repo = await this.prisma.problem.findUnique({
      where: {
        id: problemId
      },
      select: {
        Repo: {
          select: {
            id: true
          }
        }
      }
    })

    if (!repo) {
      return false
    }

    return await this.isMemberOfRepo(userId, repo.Repo.id)
  }
}
