import { Module } from '@nestjs/common'
import { ReposModule } from './repos/repos.module';
import  {AppConfigModule } from './config/app/config.module'
@Module({
  imports: [ReposModule, AppConfigModule]
})
export class AppModule {}
