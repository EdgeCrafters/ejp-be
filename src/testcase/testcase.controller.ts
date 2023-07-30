import {
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Patch,
  UseGuards
} from '@nestjs/common'
import { TestcaseService } from './testcase.service'
import { Roles } from 'src/common/decorator/roles.decorator'
import { type HiddenCase, Role, type TestCase } from '@prisma/client'
import { TestcaseGuard } from './guards/testcase.guard'
import { UpdateHiddencaseDTO, UpdateTestcaseDTO } from './dto/testcase.dto'
import { HiddencaseGuard } from './guards/hiddencase.guard'

@Roles(Role.Tutor)
@Controller('testcase')
export class TestcaseController {
  constructor(private readonly testcaseService: TestcaseService) {}

  @Patch('/testcase/:testcaseId')
  @UseGuards(TestcaseGuard)
  async updateTestcase(
    @Body() testcaseDTO: UpdateTestcaseDTO,
    @Param('testcaseId', ParseIntPipe) testcaseId: number
  ): Promise<TestCase> {
    return await this.testcaseService.updateTestcase(testcaseId, testcaseDTO)
  }

  @Delete('/testcase/:testcaseId')
  @UseGuards(TestcaseGuard)
  async deleteTestcase(
    @Param('testcaseId', ParseIntPipe) testcaseId: number
  ): Promise<TestCase> {
    return await this.testcaseService.deleteTestcase(testcaseId)
  }

  @Patch('/hiddencase/:hiddencaseId')
  @UseGuards(HiddencaseGuard)
  async updateHiddencase(
    @Body() testcaseDTO: UpdateHiddencaseDTO,
    @Param('hiddencaseId', ParseIntPipe) hiddencaseId: number
  ): Promise<HiddenCase> {
    return await this.testcaseService.updateHiddencase(
      hiddencaseId,
      testcaseDTO
    )
  }

  @Delete('/hiddencase/:hiddencaseId')
  @UseGuards(HiddencaseGuard)
  async deleteeHiddencase(
    @Param('hiddencaseId', ParseIntPipe) hiddencaseId: number
  ): Promise<HiddenCase> {
    return await this.testcaseService.deleteHiddencase(hiddencaseId)
  }
}
