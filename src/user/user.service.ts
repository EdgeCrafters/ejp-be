import {
  BadRequestException,
  Injectable,
  InternalServerErrorException
} from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import type { AddUserDto } from './dto/add-user.dto'
import { AddUser } from './dto/add-user.dto'
import * as argon2 from 'argon2'
import type { AuthenticatedRequest } from 'src/common/interface/authenticated-request.interface'
import type { ModifyUserDto } from './dto/modify-user.dto'
import { Role } from '@prisma/client'
@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async createUser(addUserdto: AddUserDto) {
    if (addUserdto.username.length !== addUserdto.password.length) {
      throw new BadRequestException(
        'length of username string does not match with password'
      )
    }
    const addUserObject = await this.arrayToObject(addUserdto)
    try {
      await this.prismaService.user.createMany({
        data: addUserObject as any
      })
    } catch (e) {
      throw new BadRequestException('이미 존재하는 사용자입니다')
    }
    return
  }

  async arrayToObject(addUserdto: AddUserDto): Promise<AddUser[]> {
    const returnObject = []
    for (let idx = 0; idx < addUserdto.password.length; idx++) {
      returnObject.push(
        new AddUser(
          addUserdto.username[idx],
          await argon2.hash(addUserdto.password[idx])
        )
      )
    }
    return returnObject
  }

  async modifyUser(req: AuthenticatedRequest, modifyUserDto: ModifyUserDto) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: req.user.userId
      }
    })
    console.log(user)
    if (user.role === Role.Tutor) {
      const { username, password } = modifyUserDto
      if (!username) {
        throw new BadRequestException('tutor should provide username to modify')
      }
      try {
        await this.prismaService.user.update({
          where: {
            username
          },
          data: {
            password: await argon2.hash(password)
          }
        })
      } catch (error) {
        throw new InternalServerErrorException(error)
      }
    } else {
      try {
        await this.prismaService.user.update({
          where: {
            id: req.user.userId
          },
          data: {
            password: await argon2.hash(modifyUserDto.password)
          }
        })
      } catch (error) {
        throw new InternalServerErrorException(error)
      }
    }
    return
  }
}
