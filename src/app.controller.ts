import { Controller, Get } from '@nestjs/common'
import { AppService } from './app.service'
import { Roles } from './common/decorator/roles.decorator'
import { Role } from '@prisma/client'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello()
  }

  @Get('/test')
  @Roles(Role.Tutor)
  checkAdmin(): string {
    return 'roles guard test passed'
  }
}
