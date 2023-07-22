import { Injectable, NotFoundException } from '@nestjs/common'
import { Role } from '@prisma/client'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async validateUser(
    username: string,
    password: string
  ): Promise<{ username: string; role: Role }> {
    const user = await this.prisma.user.findFirst({
      where: {
        username,
        password
      },
      select: {
        username: true,
        role: true
      }
    })

    return user ? user : null
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

  async deSerializeUser(username: string): Promise<{ username: string }> {
    const user = await this.prisma.user.findUnique({
      where: { username },
      select: {
        username: true
      }
    })

    if (!user) {
      throw new NotFoundException('존재하지 않는 유저입니다.')
    }

    return user
  }
}
