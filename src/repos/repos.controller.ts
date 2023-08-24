import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Req,
  Response,
  UploadedFile,
  UseGuards,
  UseInterceptors
} from '@nestjs/common'
import { ReposService } from './repos.service'
import { Roles } from 'src/common/decorator/roles.decorator'
import { Role } from '@prisma/client'
import { CreateRepoDto } from './dtos/createRepo.dto'
import { CommonResponseDto } from 'src/common/dtos/common-response.dto'
import { AddUserToRepoDto } from './dtos/addUserToRepo.dto'
import { RepoDto } from './dtos/repo.dto'
import { Content } from 'src/common/dtos/content-wrapper.dto'
import { AuthenticatedRequest } from 'src/common/interface/authenticated-request.interface'
import { Express } from 'express'
import { FileInterceptor } from '@nestjs/platform-express'
import { RepoGuard } from 'src/problem/guards/repo.guard'
import { ProblemGuard } from 'src/problem/guards/problem.guard'
import { Public } from 'src/common/decorator/public.decorator'
@Controller('repos')
export class ReposController {
  constructor(private readonly reposService: ReposService) {}

  @Get(':repoId')
  @UseGuards(RepoGuard)
  async getRepoInfos(@Param('repoId', ParseIntPipe) repoId: number) {
    return await this.reposService.getRepoInfos(repoId)
  }

  @Roles(Role.Tutor)
  @Post()
  async createRepo(
    @Body() createRepoDto: CreateRepoDto,
    @Req() req: AuthenticatedRequest
  ) {
    const newRepo = await this.reposService.createNewRepo(
      createRepoDto,
      req.user.userId
    )
    return new CommonResponseDto({ repoId: newRepo.id })
  }

  @Roles(Role.Tutor)
  @Put()
  async addUserToRepo(@Body() addUserToRepoDto: AddUserToRepoDto) {
    await this.reposService.addUserToRepo(addUserToRepoDto)
    return new CommonResponseDto()
  }

  @Get()
  async getAllRepos(@Req() req: AuthenticatedRequest) {
    const allRepos = await this.reposService.getAllRepos(req.user.userId)
    const repoDto = new Content(
      allRepos.map((repo) => {
        return new RepoDto(repo)
      })
    )
    return new CommonResponseDto(repoDto)
  }

  @Roles(Role.Tutor)
  @UseGuards(ProblemGuard)
  @Post('/files/:problemId')
  @UseInterceptors(FileInterceptor('file'))
  async createFile(
    @UploadedFile() uploadedFile: Express.Multer.File,
    @Param('problemId', ParseIntPipe) problemId: number
  ) {
    await this.reposService.createFile(uploadedFile, problemId)
    return new CommonResponseDto()
  }

  @Roles(Role.Tutor)
  @UseGuards(ProblemGuard)
  @Delete('/files/:problemId')
  async deleteFile(@Param('problemId', ParseIntPipe) problemId: number) {
    await this.reposService.deleteFile(problemId)
    return new CommonResponseDto()
  }

  @UseGuards(ProblemGuard)
  @Public()
  @Get('/files/:problemId')
  async getFile(
    @Param('problemId', ParseIntPipe) problemId: number,
    @Response() res
  ) {
    const { fileName, stream } = await this.reposService.getFile(problemId)
    stream.pipe(res)
  }
}
