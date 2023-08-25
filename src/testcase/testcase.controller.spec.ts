// import { Test, type TestingModule } from '@nestjs/testing'
// import { TestcaseController } from './testcase.controller'
// import { expect } from 'chai'
// import { TestcaseService } from './testcase.service'
// import { PrismaService } from 'src/prisma/prisma.service'
// import { ProblemService } from 'src/problem/problem.service'
// import { ReposService } from 'src/repos/repos.service'
// import { MinioService } from 'nestjs-minio-client'

// describe('TestcaseController', () => {
//   let controller: TestcaseController

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       controllers: [TestcaseController],
//       providers: [
//         TestcaseService,
//         ProblemService,
//         { provide: PrismaService, useValue: {} },
//         ReposService,
//         MinioService
//       ]
//     }).compile()

//     controller = module.get<TestcaseController>(TestcaseController)
//   })

//   it('should be defined', () => {
//     expect(controller).to.be.ok
//   })
// })
