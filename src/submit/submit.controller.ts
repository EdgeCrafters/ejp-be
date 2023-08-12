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
import { AuthenticatedGuard } from 'src/auth/guard/authenticated.guard'

@Controller('submit')
export class SubmitController {
  constructor(private readonly submitService: SubmitService) {}

  @Get(':hiddenCaseId')
  async getBias(@Param('hiddenCaseId', ParseIntPipe) hiddenCaseId: number) {
    const bias = await this.submitService.getBias(hiddenCaseId)

    return { bias: bias }
  }

  @Put(':hiddenCaseId')
  @UseGuards(AuthenticatedGuard)
  async updateResult(
    @Param('hiddenCaseId', ParseIntPipe) hiddenCaseId: number,
    @Body('hashedOutput') hashedOutput: string,
    @Req() request
  ) {
    await this.submitService.updateResult(hiddenCaseId, hashedOutput, request)

    return { message: 'succeed' }
  }
}
