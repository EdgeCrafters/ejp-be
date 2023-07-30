import {
  type CanActivate,
  type ExecutionContext,
  Injectable
} from '@nestjs/common'
import type { AuthenticatedRequest } from 'src/common/interface/authenticated-request.interface'
import { ProblemService } from '../problem.service'
import type { AuthenticatedUser } from 'src/auth/class/authenticated-user.class'

@Injectable()
export class ProblemGuard implements CanActivate {
  constructor(private readonly problemService: ProblemService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: AuthenticatedRequest = context.switchToHttp().getRequest()
    const user: AuthenticatedUser = request.user
    const problemId = parseInt(request.params.problemId)

    return await this.problemService.canAccessProblem(user.userId, problemId)
  }
}
