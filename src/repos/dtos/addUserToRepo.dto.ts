import { Type } from 'class-transformer'
import { IsInt, IsNotEmpty, IsPositive } from 'class-validator'

export class AddUserToRepoDto {
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  repoId: number

  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  userId: number
}
