import { Module } from '@nestjs/common';
import { TestcaseController } from './testcase.controller';
import { TestcaseService } from './testcase.service';

@Module({
  controllers: [TestcaseController],
  providers: [TestcaseService]
})
export class TestcaseModule {}
