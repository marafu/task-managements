export class CreateTaskOutput {
  constructor(
    readonly id: string,
    readonly title: string,
    readonly description: string,
    readonly status: string
  ) {}
}
