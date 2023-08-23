import { ArrayMinSize, IsArray, IsString } from 'class-validator'

export class AddUserDto {
  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1)
  username: string[]

  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1)
  password: string[]
}

export class AddUser {
  username: string
  password: string
  role: string
  constructor(_username: string, _password: string) {
    this.username = _username
    this.password = _password
    this.role = 'Student'
  }
}
