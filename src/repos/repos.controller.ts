import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Req
} from '@nestjs/common'
import { ReposService } from './repos.service'
import { CurrentUser } from '../common/dtos/current-user.decorator'
import { GetScoreListDto, ScoreDtoBuilder } from './dtos/score.dto'
import { CommonResponseDto } from 'src/common/dtos/common-response.dto'
import { Roles } from 'src/common/decorator/roles.decorator'
import { Role } from '@prisma/client'
@Controller('repos')
export class ReposController {
  constructor(private readonly reposService: ReposService) {}

  @Get('/scores/:id')
  async getScores(@Param('id', ParseIntPipe) id: number) {
    const scores = await this.reposService.getScoreList(id)
    const contents = scores.map((score) => {
      return new ScoreDtoBuilder().setScoreInfo(score).build()
    })

    return new CommonResponseDto(new GetScoreListDto(contents))
  }

  @Post(':id')
  async createRepo(@Param('id') id: string) {
    const newRepoUrl = await this.reposService.createNewRepo(id)
    return newRepoUrl
  }

  //학생이 레포 url 요청
  @Roles(Role.Student)
  @Get(':id') //repo이름
  async getRepoUrl(@Param('id') id: string, @Body() body) {
    return await this.reposService.getRepoUrl(id, body)
  }

  @Roles(Role.Student)
  @Get()
  async getRepos() {
    return await this.reposService.getRepos()
  }
}

//학생이 레포 url 요청하면
