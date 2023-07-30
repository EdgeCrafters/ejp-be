import { Controller } from '@nestjs/common'
import { TestcaseService } from './testcase.service'

@Controller('testcase')
export class TestcaseController {
  constructor(private readonly testcaseService: TestcaseService) {}
}
