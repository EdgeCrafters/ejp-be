import { Test, type TestingModule } from '@nestjs/testing'
import { TestcaseController } from './testcase.controller'
import { expect } from 'chai'
import { TestcaseService } from './testcase.service'
import { PrismaService } from 'src/prisma/prisma.service'

describe('TestcaseController', () => {
  let controller: TestcaseController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TestcaseController],
      providers: [TestcaseService, { provide: PrismaService, useValue: {} }]
    }).compile()

    controller = module.get<TestcaseController>(TestcaseController)
  })

  it('should be defined', () => {
    expect(controller).to.be.ok
  })
})
