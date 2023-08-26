import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class ScoreDTO {
  @IsNumber()
  @IsNotEmpty()
  problemId: number

  @IsString()
  @IsNotEmpty()
  problemName: string

  @IsNumber()
  @IsNotEmpty()
  pass: number

  @IsNumber()
  @IsNotEmpty()
  total: number
}

export class ScoreCSVDTO {
  @IsNumber()
  @IsNotEmpty()
  problemId: number

  @IsString()
  @IsNotEmpty()
  problemName: string

  @IsString()
  @IsNotEmpty()
  data: string
}
