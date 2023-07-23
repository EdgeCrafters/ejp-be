export class AuthenticatedUser {
  #username: string

  constructor(username: string) {
    this.#username = username
  }

  get username() {
    return this.#username
  }
}
