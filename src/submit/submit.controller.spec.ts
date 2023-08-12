import { Test, type TestingModule } from '@nestjs/testing'
import { expect } from 'chai'
import { PrismaService } from 'src/prisma/prisma.service'
import { SubmitController } from './submit.controller'
import { SubmitService } from './submit.service'
import { ProblemService } from 'src/problem/problem.service'

describe('SubmitController', () => {
  let controller: SubmitController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubmitController],
      providers: [
        SubmitService,
        ProblemService,
        { provide: PrismaService, useValue: {} }
      ]
    }).compile()

    controller = module.get<SubmitController>(SubmitController)
  })

  it('should be defined', () => {
    expect(controller).to.be.ok
  })
})
