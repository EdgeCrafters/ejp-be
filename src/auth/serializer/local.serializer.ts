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
    done(null, user.username)
  }

  async deserializeUser(username: string, done: CallableFunction) {
    return await this.authService
      .deSerializeUser(username)
      .then((user) => done(null, new AuthenticatedUser(user.username)))
      .catch((error) => done(error))
  }
}
