import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common'
import { ReposService } from './repos.service'
import { Roles } from 'src/common/decorator/roles.decorator'
import { Role } from '@prisma/client'
import { Public } from 'src/common/decorator/public.decorator'
@Controller('repos')
export class ReposController {
  constructor(private readonly reposService: ReposService) {}

  @Roles(Role.Tutor)
  @Post(':repoName')
  async createRepo(@Param('repoName') repoName: string) {
    const newRepo = await this.reposService.createNewRepo(repoName)
    return { repoId: newRepo.id }
  }

  @Roles(Role.Tutor)
  @Put()
  async addUserToRepo(@Body() body) {
    return await this.reposService.addUserToRepo(body)
  }

  @Roles(Role.Tutor)
  @Get()
  async getAllRepos() {
    return await this.reposService.getAllRepos()
  }

  @Public()
  @Post()
  async createUser(@Body() body) {
    await this.reposService.createUser(body)
    return { msg: 'success' }
  }
}
