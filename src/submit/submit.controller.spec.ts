import { Test, type TestingModule } from '@nestjs/testing'
import { SubmitController } from './submit.controller'
import { expect } from 'chai'
import { SubmitService } from './submit.service'
import { PrismaService } from 'src/prisma/prisma.service'

describe('SubmitController', () => {
  let controller: SubmitController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubmitController],
      providers: [SubmitService, { provide: PrismaService, useValue: {} }]
    }).compile()

    controller = module.get<SubmitController>(SubmitController)
  })

  it('should be defined', () => {
    expect(controller).to.be.ok
  })
})
