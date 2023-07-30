import { IsOptional, IsString } from 'class-validator'

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
