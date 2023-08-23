import { Test, TestingModule } from '@nestjs/testing'
import { UserController } from './user.controller'
import { expect } from 'chai'
import { UserService } from './user.service'
import { PrismaService } from 'src/prisma/prisma.service'

describe('UserController', () => {
  let controller: UserController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService, { provide: PrismaService, useValue: {} }]
    }).compile()

    controller = module.get<UserController>(UserController)
  })

  it('should be defined', () => {
    expect(controller).to.be.ok
  })
})
