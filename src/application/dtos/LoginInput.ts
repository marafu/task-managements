export class LoginInput {
  date: Date;
  constructor(readonly email: string, readonly password: string, date: Date) {
    this.date = date;
  }
}
