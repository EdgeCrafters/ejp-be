import { Controller, Post, Req, UseGuards } from '@nestjs/common'
import { LocalAuthGuard } from './guard/local-auth.guard'
import { Public } from 'src/common/decorator/public.decorator'
import { Roles } from 'src/common/decorator/roles.decorator'
import { Role } from '@prisma/client'
import { ReposService } from 'src/repos/repos.service'
@Public()
@Controller('auth')
export class AuthController {
  constructor(private readonly repoService: ReposService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  login() {
    return { msg: 'login succeed' }
  }

  @Post('logout')
  @Roles(Role.Student)
  logout(@Req() req) {
    req.session.destroy()
    return { msg: 'logout succeed' }
  }
}
