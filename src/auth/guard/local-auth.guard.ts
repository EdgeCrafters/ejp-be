import { type ExecutionContext, Injectable } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const valid = await super.canActivate(context)

    if (valid) {
      const request = context.switchToHttp().getRequest()
      await super.logIn(request)
    }

    return true
  }
}
