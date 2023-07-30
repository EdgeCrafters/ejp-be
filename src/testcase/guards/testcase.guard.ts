import {
  type CanActivate,
  type ExecutionContext,
  Injectable
} from '@nestjs/common'
import type { AuthenticatedRequest } from 'src/common/interface/authenticated-request.interface'
import type { AuthenticatedUser } from 'src/auth/class/authenticated-user.class'
import { TestcaseService } from '../testcase.service'

@Injectable()
export class TestcaseGuard implements CanActivate {
  constructor(private readonly testcaseSerivce: TestcaseService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: AuthenticatedRequest = context.switchToHttp().getRequest()
    const user: AuthenticatedUser = request.user
    const testcaseId = parseInt(request.params.testcaseId)

    return await this.testcaseSerivce.canAccessTestcase(user.userId, testcaseId)
  }
}
