import { Test, type TestingModule } from '@nestjs/testing'
import { AuthController } from './auth.controller'
import { expect } from 'chai'
import { AuthService } from './auth.service'
import { PrismaService } from 'src/prisma/prisma.service'

describe('AuthController', () => {
  let controller: AuthController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService, { provide: PrismaService, useValue: {} }]
    }).compile()

    controller = module.get<AuthController>(AuthController)
  })

  it('should be defined', () => {
    expect(controller).to.be.ok
  })
})
