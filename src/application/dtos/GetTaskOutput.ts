export class GetTaskOutput {
  constructor(
    readonly owner: string,
    readonly tasks: {
      id: string;
      title: string;
      description: string;
      status: string;
    }[]
  ) {}
}
