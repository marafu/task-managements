import { Description } from "../../domain/entities/task/Description";
import { Task } from "../../domain/entities/task/Task";
import { TaskRepository } from "../repositories/TaskRepository";
import { Title } from "../../domain/entities/task/Title";
import { randomUUID } from "crypto";
import { CreateTaskInput } from "../dtos/CreateTaskInput";
import { CreateTaskOutput } from "../dtos/CreateTaskOutput";
import { AccountRepository } from "../repositories/AccountRepository";
import { CreateTaskError } from "../errors/CreateTaskError";

export class CreateTask {
  constructor(
    readonly accountRepository: AccountRepository,
    readonly taskRepository: TaskRepository
  ) {}

  async execute(input: CreateTaskInput): Promise<CreateTaskOutput> {
    const account = await this.accountRepository.getByExternalId(input.token);
    if (!account)
      throw new CreateTaskError({ message: "Could not create your task" });
    const task = new Task(
      randomUUID(),
      new Title(input.title),
      new Description(input.description),
      "Todo",
      randomUUID(),
      account.getId()
    );

    await this.taskRepository.save(task);
    return new CreateTaskOutput(
      task.getExternalId(),
      task.title,
      task.description,
      task.getStatus()
    );
  }
}
