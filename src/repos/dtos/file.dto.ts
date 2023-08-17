import { Type } from 'class-transformer'
import { IsInt, IsNotEmpty, IsPositive } from 'class-validator'

export class FileDto {
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  problemId: number
}
