import { IsNotEmpty, IsString } from 'class-validator'

export class CreateProblemDTO {
  @IsString()
  @IsNotEmpty()
  title: string

  @IsString()
  @IsNotEmpty()
  text: string
}
