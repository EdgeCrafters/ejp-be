import { Controller, Get, Post } from '@nestjs/common';
import { ReposService } from './repos.service';
import { CurrentUser } from '../common/dtos/current-user.decorator'
import { GetScoreListDto, ScoreDtoBuilder } from './dtos/score.dto';
import { CommonResponseDto } from 'src/common/dtos/common-response.dto';
//@auth_guard()
@Controller('repos')
export class ReposController {
  constructor(private readonly reposService: ReposService) {}


    @Get()
    async getScores(@CurrentUser() user){
        const scores = await this.reposService.getScoreList(user);
        const contents = scores.map((score) => {
            return new ScoreDtoBuilder().setScoreInfo(score).build()
        })

        return new CommonResponseDto(new GetScoreListDto(contents))
    }

    @Post()
    createRepo() {

    }

    @Post()
    createUser() {

    }
}
