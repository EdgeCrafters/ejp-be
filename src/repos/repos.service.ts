import { BadRequestException, Injectable, NotAcceptableException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'

import * as nodegit  from 'nodegit'
import { Request } from 'express';

const path = require('path') 
const fs = require('fs')

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
        const repoPath = path.resolve(`./resources/${id}`)
        const mkdir = (dir) => {
            if(!fs.existsSync(dir)){
                fs.mkdirSync(dir)
                return true
            }
            else{
                return false
            }
        }
        if(!mkdir(repoPath)) 
            return new NotAcceptableException()

        await nodegit.Repository.init(repoPath, 0)
        const newRepo = await this.prismaService.repo.create({
            data:{
                name: id,
                url: repoPath,
            }
        })
        return repoPath
    }

    //학생이 url 요청했을때, userrepo에 학생 등록
    async getRepoUrl(id: number, body){
        const requestedUrl = await this.prismaService.repo.findUnique({
            where:{
                url: body.url
            }
        })
        if(!requestedUrl) return new BadRequestException()

        const createNewUserRepo = await this.prismaService.userRepo.create({
            data: {
                userId: id,
                repoId: requestedUrl.id
            }
        })

        return requestedUrl.url
        
    }
}
