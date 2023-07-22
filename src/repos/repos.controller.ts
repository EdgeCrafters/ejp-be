import { Controller, Get, Post } from '@nestjs/common';
import { ReposService } from './repos.service';

@Controller('repos')
export class ReposController {
    constructor(private readonly reposService : ReposService){}

    //auth_guard(), roles-based gurard()
    @Get()
    getScores(){
        
    }

    @Post()
    createRepo() {

    }

    @Post()
    createUser() {

    }
}
