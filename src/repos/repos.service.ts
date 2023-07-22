import { Injectable } from '@nestjs/common';
import { PrismaService } from '../config/database/prisma.service'
@Injectable()
export class ReposService {
    constructor(private readonly prismaService : PrismaService)
}
