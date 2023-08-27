import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Req,
  UseGuards
} from '@nestjs/common'
import { TestcaseService } from './testcase.service'
import { Roles } from 'src/common/decorator/roles.decorator'
import { Role, type TestCase } from '@prisma/client'
import { TestcaseGuard } from './guards/testcase.guard'
import { CreateTestcaseDto, DeleteTestcasesDto } from './dto/testcase.dto'
import { CommonResponseDto } from 'src/common/dtos/common-response.dto'
import { AuthenticatedRequest } from 'src/common/interface/authenticated-request.interface'
import { RepoGuard } from 'src/problem/guards/repo.guard'

@Controller('testcase')
export class TestcaseController {
  constructor(private readonly testcaseService: TestcaseService) {}

  @Roles(Role.Tutor)
  @Get(':testcaseId')
  @UseGuards(TestcaseGuard)
  async getTestcase(
    @Param('testcaseId', ParseIntPipe) testcaseId: number
  ): Promise<TestCase> {
    return await this.testcaseService.getTestcase(testcaseId)
  }

  @Roles(Role.Tutor)
  @Delete(':testcaseId')
  @UseGuards(TestcaseGuard)
  async deleteTestcase(
    @Param('testcaseId', ParseIntPipe) testcaseId: number
  ): Promise<TestCase> {
    return await this.testcaseService.deleteTestcase(testcaseId)
  }

  @Roles(Role.Tutor)
  @Delete('all/:repoId')
  @UseGuards(RepoGuard)
  async deleteTestcases(
    @Param('repoId', ParseIntPipe) repoId: number,
    @Body() testcases: DeleteTestcasesDto
  ): Promise<number> {
    console.log(testcases)
    return await this.testcaseService.deleteTestcases(testcases.id)
  }

  @Roles(Role.Tutor)
  @Post()
  async createTestCase(@Body() createTestcaseDto: CreateTestcaseDto) {
    await this.testcaseService.createTestcase(createTestcaseDto)
    return new CommonResponseDto()
  }

  @Put(':testcaseId')
  async updateResult(
    @Param('testcaseId', ParseIntPipe) testcaseId: number,
    @Body('hashedOutput') hashedOutput: string,
    @Req() req: AuthenticatedRequest
  ) {
    await this.testcaseService.updateResult(
      testcaseId,
      hashedOutput,
      req.user.userId
    )

    return { message: 'succeed' }
  }
}
