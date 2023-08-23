import { Test, TestingModule } from '@nestjs/testing'
import { UserController } from './user.controller'
import { expect } from 'chai'

describe('UserController', () => {
  let controller: UserController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController]
    }).compile()

    controller = module.get<UserController>(UserController)
  })

  it('should be defined', () => {
    expect(controller).to.be.ok
  })
})
