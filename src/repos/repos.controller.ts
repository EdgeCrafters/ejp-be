import { Controller, Get, Post } from '@nestjs/common';
import { ReposService } from './repos.service';
import { CurrentUser } from '../common/dtos/current-user.decorator'

//@auth_guard()
@Controller('repos')
export class ReposController {
    constructor(private readonly reposService : ReposService){}


    @Get()
    getScores(@CurrentUser() user){
        const scores = await this.reposService.getScoreList(user);
        const contents = scores.map((board) => {
            return new ScoreDtoBuilder().
        })
    }

    @Post()
    createRepo() {

    }

    @Post()
    createUser() {

    }
}
