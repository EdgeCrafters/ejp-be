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

export class UpdateHiddencaseDTO extends UpdateTestcaseDTO {
  @IsString()
  @IsOptional()
  bias?: string
}

export class CreateTestcaseDto extends UpdateTestcaseDTO {
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  problemId: number
}

export class CreateHiddencaseDto extends CreateTestcaseDto {
  @IsNotEmpty()
  @IsString()
  output: string

  @IsNotEmpty()
  @IsString()
  bias: string
}
