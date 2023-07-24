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
import { ProbsModule } from './probs/probs.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    ReposModule,
    ProbsModule
    //AuthModule
  ],
  controllers: [AppController],
  providers: [
    AppService
    // {
    //   provide: APP_GUARD,
    //   useClass: AuthenticatedGuard
    // },
    // {
    //   provide: APP_GUARD,
    //   useClass: RolesGuard
    // }
  ]
})
export class AppModule {}
