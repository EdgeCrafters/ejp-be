import { IsArray, IsNotEmpty } from 'class-validator'

export class AddUserDto {
  @IsNotEmpty()
  @IsArray()
  username: string[]

  @IsNotEmpty()
  @IsArray()
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
