import { Module } from '@nestjs/common'
import { SubmitService } from './submit.service'
import { SubmitController } from './submit.controller'

@Module({
  providers: [SubmitService],
  controllers: [SubmitController]
})
export class SubmitModule {}
