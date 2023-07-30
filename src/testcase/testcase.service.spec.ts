import { Test, type TestingModule } from '@nestjs/testing'
import { TestcaseService } from './testcase.service'
import { expect } from 'chai'
import { PrismaService } from 'src/prisma/prisma.service'
import { ProblemService } from 'src/problem/problem.service'

describe('TestcaseService', () => {
  let service: TestcaseService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TestcaseService,
        ProblemService,
        { provide: PrismaService, useValue: {} }
      ]
    }).compile()

    service = module.get<TestcaseService>(TestcaseService)
  })

  it('should be defined', () => {
    expect(service).to.be.ok
  })
})
