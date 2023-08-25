import { Module } from '@nestjs/common'
import { ProblemService } from './problem.service'
import { ProblemController } from './problem.controller'
import { ReposService } from 'src/repos/repos.service'

@Module({
  providers: [ProblemService, ReposService],
  controllers: [ProblemController],
  exports: [ProblemService]
})
export class ProblemModule {}
