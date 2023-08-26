import { Controller, Get, Param, ParseIntPipe, Req } from '@nestjs/common'
import { SubmitService } from './submit.service'
import { Roles } from 'src/common/decorator/roles.decorator'
import { Role } from '@prisma/client'
import { AuthenticatedRequest } from 'src/common/interface/authenticated-request.interface'
import type { ScoreCSVDTO, ScoreDTO } from './dto/score.dto'

@Controller('submit')
export class SubmitController {
  constructor(private readonly submitService: SubmitService) {}

  @Get('result/problemId/:problemId')
  async getMyScore(
    @Param('problemId', ParseIntPipe) problemId: number,
    @Req() req: AuthenticatedRequest
  ): Promise<ScoreDTO> {
    return await this.submitService.getScore(req.user.username, problemId)
  }

  @Get('result/username/:username/problemId/:problemId')
  @Roles(Role.Tutor)
  async getStudentScore(
    @Param('username') username: string,
    @Param('problemId', ParseIntPipe) problemId: number
  ): Promise<ScoreDTO> {
    console.log(username, problemId)
    return await this.submitService.getScore(username, problemId)
  }

  @Get('result/all/username/:username/reopId/:reopId')
  @Roles(Role.Tutor)
  async getStudentScores(
    @Param('username') username: string,
    @Param('reopId', ParseIntPipe) reopId: number
  ): Promise<ScoreDTO[]> {
    return await this.submitService.getRepoScores(username, reopId)
  }

  @Get('result/all/problemId/:problemId/reopId/:reopId')
  @Roles(Role.Tutor)
  async getRepoProblemScores(
    @Param('problemId', ParseIntPipe) problemId: number,
    @Param('reopId', ParseIntPipe) repoId: number
  ): Promise<ScoreCSVDTO> {
    return await this.submitService.getRepoProblemScores(problemId, repoId)
  }
}
