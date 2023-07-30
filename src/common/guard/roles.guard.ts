import {
  type CanActivate,
  type ExecutionContext,
  Injectable
} from '@nestjs/common'
import { IS_PUBLIC_KEY } from '../decorator/public.decorator'
import { ROLES_KEY } from '../decorator/roles.decorator'
import { Reflector } from '@nestjs/core'
import { Role } from '@prisma/client'
import type { AuthenticatedRequest } from '../interface/authenticated-request.interface'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly prisma: PrismaService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass()
    ])

    if (isPublic) {
      return true
    }

    const role = this.reflector.getAllAndOverride<string>(ROLES_KEY, [
      context.getHandler(),
      context.getClass()
    ])

    if (!role) {
      return true
    }

    const request: AuthenticatedRequest = context.switchToHttp().getRequest()

    if (role === Role.Tutor) {
      const id = request.user.userId
      const user = await this.prisma.user.findUnique({
        where: {
          id
        },
        select: {
          role: true
        }
      })

      return user.role === Role.Tutor ? true : false
    }

    return false
  }
}
