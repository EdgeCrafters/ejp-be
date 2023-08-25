import { TestcaseType } from '@prisma/client'

export class RepoDto {
  repoId: number
  repoName: string

  constructor(repoDto) {
    this.repoId = repoDto.id
    this.repoName = repoDto.name
  }
}

export class RepoInfoDto {
  id: number
  name: string
  Problem: ProblemDto[]

  constructor(repo) {
    this.id = repo.id
    this.name = repo.name
    this.Problem = repo.Problem.map((problem) => {
      return new ProblemDto(problem)
    })
  }
}

class ProblemDto {
  id: number
  title: string
  text: string
  uuid: string
  testCase: TestCaseDto[]
  constructor(problem) {
    this.id = problem.id
    this.title = problem.title
    this.text = problem.text
    this.uuid = problem.uuid
    this.testCase = problem.testCase.map((testcase) => {
      return new TestCaseDto(testcase)
    })
  }
}

class TestCaseDto {
  id: number
  input: string
  output: string
  isHidden: string
  constructor(testcase) {
    this.id = testcase.id
    this.input = testcase.input
    this.output =
      testcase.isHidden == TestcaseType['OPENED'] ? testcase.output : ''
    this.isHidden = testcase.isHidden
  }
}
