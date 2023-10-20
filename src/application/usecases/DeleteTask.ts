import { TaskRepository } from "../repositories/TaskRepository";
import { AccountRepository } from "../repositories/AccountRepository";
import { Task } from "../../domain/entities/task/Task";
import { Account } from "../../domain/entities/account/Account";
import { DeleteTaskOutput } from "../dtos/DeleteTaskOutput";
import { DeleteTaskInput } from "../dtos/DeleteTaskInput";
import { DeleteTaskError } from "../errors/DeleteTaskError";

export class DeleteTask {
  constructor(
    readonly accountRepository: AccountRepository,
    readonly taskRepository: TaskRepository
  ) {}

  async execute(input: DeleteTaskInput): Promise<DeleteTaskOutput> {
    const task = this.validate(
      await this.taskRepository.getByExternalId(input.taskId),
      await this.accountRepository.getByExternalId(input.token)
    );
    await this.taskRepository.delete(task);
    return new DeleteTaskOutput(task);
  }

  private validate(task: Task | undefined, account: Account | undefined) {
    if (!account)
      throw new DeleteTaskError({
        message: "You don't have permission to delete this task",
      });
    if (!task) throw new DeleteTaskError({ message: "Task not found" });
    if (task.getAccountId() != account.getId())
      throw new DeleteTaskError({
        message: "You don't have permission to delete this task",
      });
    return task;
  }
}
