import { TaskRepository } from "../repositories/TaskRepository";
import { AccountRepository } from "../repositories/AccountRepository";
import { ChangeStatusOutput } from "../dtos/ChangeStatusOutput";
import { GetTask } from "../query/GetTask";
import { ChangeStatusInput } from "../dtos/ChangeStatusInput";
import { ChangeStatusError } from "../errors/ChangeStatusError";

export class CompletingTask {
  constructor(
    readonly accountRepository: AccountRepository,
    readonly taskRepository: TaskRepository,
    readonly getTask: GetTask
  ) {}

  async execute(input: ChangeStatusInput): Promise<ChangeStatusOutput> {
    const account = await this.accountRepository.getByExternalId(input.token);
    if (!account)
      throw new ChangeStatusError({
        message: "This user does not have permission to modify this task",
      });
    const userTasks = await this.getTask.execute(account.getExternalId());
    for (const task of userTasks.tasks) {
      if (
        (task.status === "In Progress" || task.status === "Canceled") &&
        task.id == input.taskId
      ) {
        const updateTask = await this.taskRepository.getByExternalId(
          input.taskId
        );
        if (!updateTask) throw new Error();
        updateTask.updateStatusDone();
        await this.taskRepository.updateStatus(updateTask.getId(), updateTask);
        return new ChangeStatusOutput("Task changed for Done");
      }
    }
    throw new ChangeStatusError({
      message: "There was a problem updating your task status",
    });
  }
}
