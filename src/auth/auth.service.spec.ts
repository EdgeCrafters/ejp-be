import { Test, type TestingModule } from '@nestjs/testing'
import { AuthService } from './auth.service'
import { expect } from 'chai'
import { PrismaService } from 'src/prisma/prisma.service'

describe('AuthService', () => {
  let service: AuthService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, { provide: PrismaService, useValue: {} }]
    }).compile()

    service = module.get<AuthService>(AuthService)
  })

  it('should be defined', () => {
    expect(service).to.be.ok
  })
})
