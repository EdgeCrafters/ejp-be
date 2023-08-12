import { Module } from '@nestjs/common'
import { SubmitController } from './submit.controller'
import { SubmitService } from './submit.service'
import { ProblemModule } from 'src/problem/problem.module'

@Module({
  imports: [ProblemModule],
  controllers: [SubmitController],
  providers: [SubmitService]
})
export class SubmitModule {}
