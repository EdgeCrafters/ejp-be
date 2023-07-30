import { Module } from '@nestjs/common'
import { TestcaseController } from './testcase.controller'
import { TestcaseService } from './testcase.service'
import { ProblemModule } from 'src/problem/problem.module'

@Module({
  imports: [ProblemModule],
  controllers: [TestcaseController],
  providers: [TestcaseService]
})
export class TestcaseModule {}
