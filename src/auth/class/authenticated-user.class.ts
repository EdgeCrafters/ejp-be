export class AuthenticatedUser {
  #userId: number
  constructor(userId: number) {
    this.#userId = userId
  }

  get userId() {
    return this.#userId
  }
}
