import { Type } from 'class-transformer'
import { ArrayMinSize, IsArray, IsNumber, IsString } from 'class-validator'

export class EnrollUserToRepoDto {
  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1)
  username: string[]

  @Type(() => Number)
  @IsArray()
  @IsNumber({}, { each: true })
  @ArrayMinSize(1)
  repoId: number[]
}

export class EnrollUserToRepo {
  userId: number
  repoId: number
  constructor(_userId: number, _repoId: number) {
    this.userId = _userId
    this.repoId = _repoId
  }
}
