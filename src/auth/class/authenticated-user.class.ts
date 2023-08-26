export class AuthenticatedUser {
  #userId: number
  #username: string

  constructor(userId: number, username: string) {
    this.#userId = userId
    this.#username = username
  }

  get userId() {
    return this.#userId
  }

  get username() {
    return this.#username
  }
}
