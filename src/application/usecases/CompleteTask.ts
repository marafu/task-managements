import { TaskRepository } from "../repositories/TaskRepository";
import { AccountRepository } from "../repositories/AccountRepository";
import { UpdateTaskOutput } from "../dtos/UpdateTaskOutput";
import { UpdateTaskInput } from "../dtos/UpdateTaskInput";
import { ChangeStatusError } from "../errors/ChangeStatusError";
import { Task } from "../../domain/entities/task/Task";
import { Account } from "../../domain/entities/account/Account";

export class CompleteTask {
  constructor(
    readonly accountRepository: AccountRepository,
    readonly taskRepository: TaskRepository
  ) {}

  async execute(input: UpdateTaskInput): Promise<UpdateTaskOutput> {
    const task = this.validate(
      await this.taskRepository.getByExternalId(input.taskId),
      await this.accountRepository.getByExternalId(input.token)
    );
    task.updateStatusDone();
    await this.taskRepository.updateStatus(task.getId(), task);
    return new UpdateTaskOutput(task);
  }

  private validate(task: Task | undefined, account: Account | undefined) {
    if (!account)
      throw new ChangeStatusError({
        message: "You don't have permission to delete this task",
      });
    if (!task) throw new ChangeStatusError({ message: "Task not found" });
    if (task.getAccountId() != account.getId())
      throw new ChangeStatusError({
        message: "You don't have permission to delete this task",
      });
    if (task.getStatus() === "Todo" || task.getStatus() === "Cancelled")
      throw new ChangeStatusError({
        message: "Could not change tasks with status In Progress or Canceled",
      });
    return task;
  }
}
