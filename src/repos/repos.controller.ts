import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Req,
  UploadedFile,
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
import { FileDto } from './dtos/file.dto'
@Controller('repos')
export class ReposController {
  constructor(private readonly reposService: ReposService) {}

  @Roles(Role.Tutor)
  @Post()
  async createRepo(@Body() createRepoDto: CreateRepoDto) {
    const newRepo = await this.reposService.createNewRepo(createRepoDto)
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
  @Post('/files')
  @UseInterceptors(FileInterceptor('file'))
  async createFile(
    @UploadedFile() uploadedFile: Express.Multer.File,
    @Body() fileDto: FileDto
  ) {
    await this.reposService.createFile(uploadedFile, fileDto)
    return new CommonResponseDto()
  }
}
