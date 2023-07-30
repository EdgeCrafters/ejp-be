import { IsOptional, IsString } from 'class-validator'

export class UpdateProblemDTO {
  @IsString()
  @IsOptional()
  title?: string

  @IsString()
  @IsOptional()
  text?: string
}
