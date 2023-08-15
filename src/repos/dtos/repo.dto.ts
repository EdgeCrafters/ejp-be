export class RepoDto {
  repoId: number
  repoName: string

  constructor(repoDto) {
    this.repoId = repoDto.id
    this.repoName = repoDto.name
  }
}
