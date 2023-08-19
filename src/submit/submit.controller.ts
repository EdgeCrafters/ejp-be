import { Controller, Get, Param, ParseIntPipe, Req } from '@nestjs/common'
import { SubmitService } from './submit.service'
import { Roles } from 'src/common/decorator/roles.decorator'
import { Role, type Score } from '@prisma/client'
import { AuthenticatedRequest } from 'src/common/interface/authenticated-request.interface'

@Controller('submit')
export class SubmitController {
  constructor(private readonly submitService: SubmitService) {}

  @Get('result/userId/:userId/problemId/:problemId')
  @Roles(Role.Tutor)
  async getStudentScore(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('problemId', ParseIntPipe) problemId: number
  ): Promise<Score> {
    return await this.submitService.getScore(userId, problemId)
  }

  @Get('result/problemId/:problemId')
  async getScore(
    @Param('problemId', ParseIntPipe) problemId: number,
    @Req() req: AuthenticatedRequest
  ): Promise<Score> {
    return await this.submitService.getScore(req.user.userId, problemId)
  }
}
