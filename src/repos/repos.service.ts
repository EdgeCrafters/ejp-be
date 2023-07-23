import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'

import * as nodegit  from 'nodegit'

const path = require('path') 

@Injectable()
export class ReposService {
    constructor(private readonly prismaService : PrismaService){}

    async getScoreList(id: number){
        const scores = await this.prismaService.score.findMany({
            where: {userId: id}
        })
        console.log({scores,})
        return scores
    }                //payload 확정되면 수정

    async createNewRepo(id: string){
        const repoPath = path.resolve(`../../../resources/${id}`)
        await nodegit.Repository.init(repoPath, 0)
        const newRepo = await this.prismaService.repo.create({
            data:{
                name: id,
                url: repoPath,
            }
        })
        return repoPath
    }
}
