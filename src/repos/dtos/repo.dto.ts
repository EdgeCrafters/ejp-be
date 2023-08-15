export class RepoDto {
  repoId: number
  repoName: string

  constructor(repoDto) {
    this.repoId = repoDto.repo.id
    this.repoName = repoDto.repo.name
  }
}
