import { IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class ModifyUserDto {
  @IsNotEmpty()
  @IsString()
  password: string

  @IsOptional()
  @IsString()
  username: string
}
