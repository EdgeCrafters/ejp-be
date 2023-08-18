import { Module } from '@nestjs/common'
import { ReposController } from './repos.controller'
import { ReposService } from './repos.service'
import { ProblemModule } from 'src/problem/problem.module'

@Module({
  imports: [ProblemModule],
  controllers: [ReposController],
  providers: [ReposService]
})
export class ReposModule {}
