import { Test, type TestingModule } from '@nestjs/testing'
import { AuthController } from './auth.controller'
import { expect } from 'chai'

describe('AuthController', () => {
  let controller: AuthController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController]
    }).compile()

    controller = module.get<AuthController>(AuthController)
  })

  it('should be defined', () => {
    expect(controller).to.be.ok
  })
})
