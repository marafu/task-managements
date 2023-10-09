export class Task {
  constructor(
    readonly title: string,
    readonly description: string,
    readonly status: string
  ) {}

  create() {
    if (this.title === "") throw new Error("The title cannot be empty");
  }
}
