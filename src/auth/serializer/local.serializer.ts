import { Injectable } from '@nestjs/common'
import { PassportSerializer } from '@nestjs/passport'
import { AuthenticatedUser } from '../class/authenticated-user.class'
import { AuthService } from '../auth.service'

@Injectable()
export class LocalSerializer extends PassportSerializer {
  constructor(private readonly authService: AuthService) {
    super()
  }
  serializeUser(user: AuthenticatedUser, done: CallableFunction) {
    done(null, user.userId)
  }

  async deserializeUser(userId: number, done: CallableFunction) {
    return await this.authService
      .deSerializeUser(userId)
      .then((user) => done(null, new AuthenticatedUser(user.userId)))
      .catch((error) => done(error))
  }
}
