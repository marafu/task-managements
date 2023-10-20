import { Description } from "../../domain/entities/task/Description";
import { Title } from "../../domain/entities/task/Title";

export class CreateTaskOutput {
  constructor(
    readonly id: string,
    readonly title: Title,
    readonly description: Description,
    readonly status: string
  ) {}
}
