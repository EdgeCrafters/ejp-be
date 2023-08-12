import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Put,
  Req,
  UseGuards
} from '@nestjs/common'
import { SubmitService } from './submit.service'
import { AuthenticatedRequest } from 'src/common/interface/authenticated-request.interface'
import { RepoGuard } from 'src/problem/guards/repo.guard'

@Controller('submit')
export class SubmitController {
  constructor(private readonly submitService: SubmitService) {}

  @Get('repoId/:repoId/hiddenCaseId/:hiddenCaseId')
  @UseGuards(RepoGuard)
  async getBias(@Param('hiddenCaseId', ParseIntPipe) hiddenCaseId: number) {
    const bias = await this.submitService.getBias(hiddenCaseId)

    return { bias: bias }
  }

  @Put('repoId/:repoId/hiddenCaseId/:hiddenCaseId')
  @UseGuards(RepoGuard)
  async updateResult(
    @Param('hiddenCaseId', ParseIntPipe) hiddenCaseId: number,
    @Body('hashedOutput') hashedOutput: string,
    @Req() req: AuthenticatedRequest
  ) {
    await this.submitService.updateResult(
      hiddenCaseId,
      hashedOutput,
      req.user.userId
    )

    return { message: 'succeed' }
  }
}
