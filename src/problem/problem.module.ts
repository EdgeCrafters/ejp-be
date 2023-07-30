import { Module } from '@nestjs/common'
import { ProblemService } from './problem.service'
import { ProblemController } from './problem.controller'

@Module({
  providers: [ProblemService],
  controllers: [ProblemController]
})
export class ProblemModule {}
