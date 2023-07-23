import { Controller, Post, Req, UseGuards } from '@nestjs/common'
import { AuthService } from './auth.service'
import { LocalAuthGuard } from './guard/local-auth.guard'
import { Public } from 'src/common/decorator/public.decorator'
import { Roles } from 'src/common/decorator/roles.decorator'
import { Role } from '@prisma/client'

@Public()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

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
