import { Injectable } from '@nestjs/common';
import { PrismaService } from '../config/database/prisma.service'
@Injectable()
export class ReposService {
    constructor(private readonly prismaService : PrismaService){}

    async getScoreList(id: number){
        const scores = await this.prismaService.score.findMany({
            // where: { userId: id }
        })
        console.log({scores,})
        return scores
    }                //payload 확정되면 수정

}
