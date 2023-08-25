// import { Test, type TestingModule } from '@nestjs/testing'
// import { ProblemService } from './problem.service'
// import { PrismaService } from 'src/prisma/prisma.service'
// import { expect } from 'chai'
// import { ReposService } from 'src/repos/repos.service'
// import { MinioService } from 'nestjs-minio-client'

// describe('ProblemService', () => {
//   let service: ProblemService

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       providers: [
//         ProblemService,
//         { provide: PrismaService, useValue: {} },
//         ReposService,
//         MinioService
//       ]
//     }).compile()

//     service = module.get<ProblemService>(ProblemService)
//   })

//   it('should be defined', () => {
//     expect(service).to.be.ok
//   })
// })
