import { Type } from 'class-transformer'
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString
} from 'class-validator'

export class UpdateTestcaseDTO {
  @IsString()
  @IsOptional()
  url?: string
}

export class UpdateHiddencaseDTO extends UpdateTestcaseDTO {}

export class CreateTestcaseDto extends UpdateTestcaseDTO {
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  problemId: number

  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  repoId: number

  @IsNotEmpty()
  @IsString()
  input: string

  @IsNotEmpty()
  @IsString()
  output: string
}

export class CreateHiddencaseDto extends CreateTestcaseDto {}
