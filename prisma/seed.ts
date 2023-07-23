import { type Prisma, PrismaClient, Role } from '@prisma/client'
import { hash } from 'argon2'

const prisma = new PrismaClient()

async function seed() {
  const users: Prisma.UserCreateManyInput[] = [
    {
      username: 'tutor01',
      nickname: 'tutor01',
      password: await hash('1234'),
      role: Role.Tutor
    },
    {
      username: 'student01',
      nickname: 'student01',
      password: await hash('1234'),
      role: Role.Student
    },
    {
      username: 'student02',
      nickname: 'student02',
      password: await hash('1234'),
      role: Role.Student
    }
  ]

  await prisma.user.createMany({
    data: users
  })
}

seed()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.log(e)
    await prisma.$disconnect()
    process.exit(1)
  })
