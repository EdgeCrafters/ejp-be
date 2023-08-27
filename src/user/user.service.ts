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
import type { EnrollUserToRepoDto } from './dto/enroll-user-repo.dto'
import { EnrollUserToRepo } from './dto/enroll-user-repo.dto'
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
        data: addUserObject
      })
    } catch (e) {
      throw new BadRequestException('이미 존재하는 사용자입니다')
    }
    return
  }

  async arrayToObject(addUserdto: AddUserDto) {
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

  async enrollUserToRepo(enrollUserToRepoDto: EnrollUserToRepoDto) {
    if (
      enrollUserToRepoDto.repoId.length !== enrollUserToRepoDto.username.length
    ) {
      throw new BadRequestException(
        'length of username and repo does not match'
      )
    }
    // const userIds = await this.prismaService.user.findMany({
    //   where: {
    //     username: {
    //       in: enrollUserToRepoDto.username
    //     }
    //   }
    // })
    const addUserRepoObject = await this.addUserRepoDtoToObject(
      enrollUserToRepoDto
    )
    try {
      await this.prismaService.userRepo.createMany({
        data: addUserRepoObject
      })
    } catch (error) {
      throw new BadRequestException('current userRepo alreay exists')
    }
  }

  async addUserRepoDtoToObject(enrollUserToRepoDto: EnrollUserToRepoDto) {
    const returnObject = []
    for (let idx = 0; idx < enrollUserToRepoDto.username.length; idx++) {
      let userId
      try {
        userId = await this.prismaService.user.findUnique({
          where: {
            username: enrollUserToRepoDto.username[idx]
          },
          select: {
            id: true
          }
        })
      } catch (error) {
        throw new BadRequestException('username does not exists')
      }
      returnObject.push(
        new EnrollUserToRepo(userId.id, enrollUserToRepoDto.repoId[idx])
      )
    }
    return returnObject
  }
}
