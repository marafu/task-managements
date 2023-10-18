export class CreateTaskInput {
  constructor(
    readonly token: string,
    readonly title: string,
    readonly description: string
  ) {}
}
