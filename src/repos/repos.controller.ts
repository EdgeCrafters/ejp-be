import { Body, Controller, Get, Post, Put } from '@nestjs/common'
import { ReposService } from './repos.service'
import { Roles } from 'src/common/decorator/roles.decorator'
import { Role } from '@prisma/client'
import { CreateRepoDto } from './dtos/createRepo.dto'
import { CommonResponseDto } from 'src/common/dtos/common-response.dto'
import { AddUserToRepoDto } from './dtos/addUserToRepo.dto'
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
    return new CommonResponseDto(allRepos)
  }
}
