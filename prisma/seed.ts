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
      username: 'tutor02',
      nickname: 'tutor02',
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
    },
    {
      username: 'student03',
      nickname: 'student03',
      password: await hash('1234'),
      role: Role.Student
    }
  ]

  await prisma.user.createMany({
    data: users
  })

  const repos: Prisma.RepoCreateManyInput[] = [
    {
      name: "tutor01's repo1"
    },
    {
      name: "tutor01's repo2"
    },
    {
      name: "tutor02's repo1"
    }
  ]

  await prisma.repo.createMany({
    data: repos
  })

  const userRepos: Prisma.UserRepoCreateManyInput[] = [
    {
      userId: 1,
      repoId: 1
    },
    {
      userId: 1,
      repoId: 2
    },
    {
      userId: 2,
      repoId: 3
    },
    {
      userId: 3,
      repoId: 1
    },
    {
      userId: 4,
      repoId: 2
    },
    {
      userId: 5,
      repoId: 3
    }
  ]

  await prisma.userRepo.createMany({
    data: userRepos
  })

  const problems: Prisma.ProblemCreateManyInput[] = [
    {
      repoId: 1,
      title: '첫번째 문제입니다.',
      text: 'BubbleSort 를 구현하세요'
    },
    {
      repoId: 1,
      title: '두번째 문제입니다.',
      text: 'Binary Search 를 구현하세요'
    }
  ]

  await prisma.problem.createMany({
    data: problems
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
