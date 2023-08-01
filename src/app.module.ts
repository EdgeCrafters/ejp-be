import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { PrismaModule } from './prisma/prisma.module'
import { ConfigModule } from '@nestjs/config'
import { APP_GUARD } from '@nestjs/core'
import { AuthenticatedGuard } from './auth/guard/authenticated.guard'
import { RolesGuard } from './common/guard/roles.guard'
import { ReposModule } from './repos/repos.module'
import { ProblemModule } from './problem/problem.module'
import { TestcaseModule } from './testcase/testcase.module'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ReposModule,
    AuthModule,
    PrismaModule,
    ProblemModule,
    TestcaseModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthenticatedGuard
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard
    }
  ]
})
export class AppModule {}
