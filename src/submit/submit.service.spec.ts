import { Test, type TestingModule } from '@nestjs/testing'
import { expect } from 'chai'
import { PrismaService } from 'src/prisma/prisma.service'
import { SubmitService } from './submit.service'

describe('AuthService', () => {
  let service: SubmitService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubmitService, { provide: PrismaService, useValue: {} }]
    }).compile()

    service = module.get<SubmitService>(SubmitService)
  })

  it('should be defined', () => {
    expect(service).to.be.ok
  })
})
