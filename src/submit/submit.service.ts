import { Injectable } from '@nestjs/common'
import type { Score } from '@prisma/client'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class SubmitService {
  constructor(private readonly prismaService: PrismaService) {}

  async getScore(userId: number, problemId: number): Promise<Score> {
    return await this.prismaService.score.findFirst({
      where: {
        userId,
        problemId
      }
    })
  }
}
