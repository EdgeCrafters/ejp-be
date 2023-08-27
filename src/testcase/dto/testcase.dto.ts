import { Type } from 'class-transformer'
import {
  IsArray,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsString
} from 'class-validator'

export enum TestcaseType {
  OPENED = 'OPENED',
  HIDDEN = 'HIDDEN'
}
export class TestcaseDto {
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

  @IsNotEmpty()
  @IsEnum(TestcaseType)
  isHidden: TestcaseType
}
export class CreateTestcaseDto extends TestcaseDto {}

export class DeleteTestcasesDto {
  @IsArray()
  id: Array<number>
}
