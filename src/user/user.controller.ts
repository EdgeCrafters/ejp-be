import { Body, Controller, Post, Put, Req, UseGuards } from '@nestjs/common'
import { Roles } from 'src/common/decorator/roles.decorator'
import { AddUserDto } from './dto/add-user.dto'
import { UserService } from './user.service'
import { AuthenticatedRequest } from 'src/common/interface/authenticated-request.interface'
import { ModifyUserDto } from './dto/modify-user.dto'
import { Role } from '@prisma/client'
import { AuthenticatedGuard } from 'src/auth/guard/authenticated.guard'
import { CommonResponseDto } from 'src/common/dtos/common-response.dto'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Roles(Role.Tutor)
  @Post()
  async createUser(@Body() addUserdto: AddUserDto) {
    await this.userService.createUser(addUserdto)
    return { msg: 'success' }
  }

  @UseGuards(AuthenticatedGuard)
  @Put()
  async modifyUser(
    @Req() req: AuthenticatedRequest,
    @Body() modifyUserDto: ModifyUserDto
  ) {
    await this.userService.modifyUser(req, modifyUserDto)
    return new CommonResponseDto()
  }
}
