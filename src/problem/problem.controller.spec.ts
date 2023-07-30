import { Test, type TestingModule } from '@nestjs/testing'
import { ProblemController } from './problem.controller'
import { expect } from 'chai'
import { PrismaService } from 'src/prisma/prisma.service'
import { ProblemService } from './problem.service'

describe('ProblemController', () => {
  let controller: ProblemController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProblemController],
      providers: [ProblemService, { provide: PrismaService, useValue: {} }]
    }).compile()

    controller = module.get<ProblemController>(ProblemController)
  })

  it('should be defined', () => {
    expect(controller).to.be.ok
  })
})
