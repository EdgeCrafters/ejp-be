import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards
} from '@nestjs/common'
import { ProblemService } from './problem.service'
import { ProblemGuard } from './guards/problem.guard'
import { Role, type Problem } from '@prisma/client'
import { RepoGuard } from './guards/repo.guard'
import { CreateProblemDTO } from './dto/createProblem.dto'
import { Roles } from 'src/common/decorator/roles.decorator'
import { UpdateProblemDTO } from './dto/updateProblem.dto'

@Controller('problem')
export class ProblemController {
  constructor(private readonly problemService: ProblemService) {}

  @Get(':problemId')
  @UseGuards(ProblemGuard)
  async getProblem(
    @Param('problemId', ParseIntPipe) id: number
  ): Promise<Problem> {
    return await this.problemService.getProblem(id)
  }

  @Get('repo/:repoId')
  @UseGuards(RepoGuard)
  async getProblems(
    @Param('repoId', ParseIntPipe) repoId: number
  ): Promise<{ id: number; title: string }[]> {
    return await this.problemService.getProblems(repoId)
  }

  @Post(':repoId')
  @Roles(Role.Tutor)
  @UseGuards(RepoGuard)
  async createProblem(
    @Body() problemDTO: CreateProblemDTO,
    @Param('repoId', ParseIntPipe) repoId: number
  ): Promise<Problem> {
    return await this.problemService.createProblem(repoId, problemDTO)
  }

  @Patch(':problemId')
  @Roles(Role.Tutor)
  @UseGuards(ProblemGuard)
  async updateProblem(
    @Body() problemDTO: UpdateProblemDTO,
    @Param('problemId', ParseIntPipe) id: number
  ): Promise<Problem> {
    return await this.problemService.updateProblem(id, problemDTO)
  }

  @Delete(':problemId')
  @Roles(Role.Tutor)
  @UseGuards(ProblemGuard)
  async deleteProblem(
    @Param('problemId', ParseIntPipe) id: number
  ): Promise<Problem> {
    return await this.problemService.deleteProblem(id)
  }
}
