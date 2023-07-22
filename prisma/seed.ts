import { type Prisma, PrismaClient, Role } from '@prisma/client'

const prisma = new PrismaClient()

async function seed() {
  const users: Prisma.UserCreateManyInput[] = [
    {
      username: 'tutor01',
      nickname: 'tutor01',
      password: '1234',
      role: Role.Tutor
    },
    {
      username: 'student01',
      nickname: 'student01',
      password: '1234',
      role: Role.Student
    },
    {
      username: 'student02',
      nickname: 'student02',
      password: '1234',
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
