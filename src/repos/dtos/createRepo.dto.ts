import { Transform, Type } from 'class-transformer'
import { IsNotEmpty, IsString } from 'class-validator'

export class CreateRepoDto {
  @IsNotEmpty()
  @IsString()
  repoName: string
}
