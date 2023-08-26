import {
  Injectable,
  NotFoundException,
  UnauthorizedException
} from '@nestjs/common'
import { Role } from '@prisma/client'
import { verify } from 'argon2'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async validateUser(
    username: string,
    password: string
  ): Promise<{ userId: number; username: string }> {
    const user = await this.prisma.user.findUnique({
      where: {
        username
      },
      select: {
        id: true,
        password: true,
        username: true
      }
    })

    if (!user) {
      throw new NotFoundException()
    }

    const valid = await this.verifyPassword(user.password, password)

    if (!valid) {
      throw new UnauthorizedException()
    }

    return {
      userId: user.id,
      username: user.username
    }
  }

  async isTutor(username: string): Promise<boolean> {
    const user = await this.prisma.user.findUnique({
      where: {
        username
      },
      select: {
        role: true
      }
    })

    if (!user) {
      throw new NotFoundException('존재하지 않는 유저입니다.')
    }

    return user.role === Role.Tutor
  }

  async deSerializeUser(
    userId: number
  ): Promise<{ userId: number; username: string }> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        username: true
      }
    })

    if (!user) {
      throw new NotFoundException('존재하지 않는 유저입니다.')
    }

    return {
      userId: user.id,
      username: user.username
    }
  }

  async verifyPassword(password: string, passwordInput: string) {
    if (!(await verify(password, passwordInput))) {
      return false
    } else {
      return true
    }
  }
}
