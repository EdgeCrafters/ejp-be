import { Module } from '@nestjs/common'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { PassportModule } from '@nestjs/passport'
import { LocalSerializer } from './serializer/local.serializer'
import { LocalStrategy } from './strategy/local.strategy'

@Module({
  imports: [
    PassportModule.register({ session: true, defaultStrategy: 'local' })
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalSerializer, LocalStrategy]
})
export class AuthModule {}
