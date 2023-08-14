import { Body, Controller, Get, Post, Put } from '@nestjs/common'
import { ReposService } from './repos.service'
import { Roles } from 'src/common/decorator/roles.decorator'
import { Role } from '@prisma/client'
import { CreateRepoDto } from './dtos/createRepo.dto'
import { CommonResponseDto } from 'src/common/dtos/common-response.dto'
import { AddUserToRepoDto } from './dtos/addUserToRepo.dto'
import { RepoDto } from './dtos/repo.dto'
import { Content } from 'src/common/dtos/content-wrapper.dto'
@Controller('repos')
export class ReposController {
  constructor(private readonly reposService: ReposService) {}

  @Roles(Role.Tutor)
  @Post()
  async createRepo(@Body() createRepoDto: CreateRepoDto) {
    const newRepo = await this.reposService.createNewRepo(createRepoDto)
    return new CommonResponseDto({ repoId: newRepo.id })
  }

  @Roles(Role.Tutor)
  @Put()
  async addUserToRepo(@Body() addUserToRepoDto: AddUserToRepoDto) {
    await this.reposService.addUserToRepo(addUserToRepoDto)
    return new CommonResponseDto()
  }

  @Roles(Role.Tutor)
  @Get()
  async getAllRepos() {
    const allRepos = await this.reposService.getAllRepos()
    const repoDto = new Content(
      allRepos.map((repo) => {
        return new RepoDto(repo)
      })
    )
    return new CommonResponseDto(repoDto)
  }
}
