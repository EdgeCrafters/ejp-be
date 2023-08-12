import {
  BadRequestException,
  Injectable,
  InternalServerErrorException
} from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class SubmitService {
  constructor(private readonly prismaService: PrismaService) {}

  async getBias(hiddenCaseId: number) {
    return (await this.getHiddenCase(hiddenCaseId)).bias
  }

  async updateResult(hiddenCaseId: number, hashedOutput: string, request) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: request.session.passport.user
      }
    })

    if (!user) {
      throw new BadRequestException('존재하지 않는 user 입니다')
    }

    const hiddenCase = await this.getHiddenCase(hiddenCaseId)

    const userHiddenCase = await this.prismaService.userHiddenCase.findFirst({
      where: {
        userId: user.id,
        hiddenCaseId: hiddenCase.id
      }
    })

    try {
      await this.prismaService.$transaction(async (tx) => {
        if (userHiddenCase) {
          // 나중에 hiddenCase 와 사용자의 hashedOutput 을 비교하는 부분 필요
          await tx.userHiddenCase.update({
            where: {
              id: userHiddenCase.id
            },
            data: {
              isCorrect: hiddenCase.output === hashedOutput ? true : false
            }
          })
        } else {
          await tx.userHiddenCase.create({
            data: {
              userId: user.id,
              hiddenCaseId: hiddenCase.id,
              isCorrect: hiddenCase.output === hashedOutput ? true : false
            }
          })
        }
      })
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  private async getHiddenCase(hiddenCaseId: number) {
    const hiddenCase = await this.prismaService.hiddenCase.findUnique({
      where: {
        id: hiddenCaseId
      }
    })

    if (!hiddenCase) {
      throw new BadRequestException('존재하지 않는 hiddenCase 입니다.')
    }

    return hiddenCase
  }
}
