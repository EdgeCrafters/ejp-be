import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-local'
import { AuthService } from '../auth.service'
import { AuthenticatedUser } from '../class/authenticated-user.class'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super()
  }

  async validate(
    username: string,
    password: string
  ): Promise<AuthenticatedUser> {
    const user = await this.authService.validateUser(username, password)

    if (!user) {
      throw new UnauthorizedException()
    } else {
      return new AuthenticatedUser(user.userId, user.username)
    }
  }
}
