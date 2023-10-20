import { UpdateStatusError } from "../../../src/domain/errors/UpdateStatusError";
import { Description } from "../../../src/domain/entities/task/Description";
import { Task } from "../../../src/domain/entities/task/Task";
import { Title } from "../../../src/domain/entities/task/Title";

let task: Task;

beforeEach(() => {
  task = new Task(
    "",
    new Title("Tarefa 1"),
    new Description("Descrição da tarefa 1"),
    "Todo",
    "",
    ""
  );
});

describe("Classe Task", () => {
  test("Deve criar uma tarefa", function () {
    expect(task.getId()).toBe("");
    expect(task.title.value).toBe("Tarefa 1");
    expect(task.description.value).toBe("Descrição da tarefa 1");
    expect(task).toBeTruthy();
  });

  test("Deve ser Todo para novas tarefas", () => {
    expect(task.getStatus()).toBe("Todo");
  });

  test("Deve mudar somente para In Progress a tarefa com status Todo", () => {
    task.updateStatusInProgress();
    expect(task.getStatus()).toBe("In Progress");
  });

  test("Deve mudar somente para Done a tarefa com status In Progress", () => {
    task.updateStatusInProgress();
    expect(task.getStatus()).toBe("In Progress");
  });

  test("Deve cancelar tarefa com qualquer status que não seja vazio", () => {
    task.cancelTask();
    expect(task.getStatus()).toBe("Cancelled");
  });

  test("Não deve mudar a tarefa de Todo para Done", () => {
    expect(() => task.updateStatusDone()).toThrow(
      new UpdateStatusError({
        message: "A tarefa deve ser alterada para In Progress primeiro",
      })
    );
  });

  test("Não deve mudar a tarefa de Done para In Progress", () => {
    task.updateStatusInProgress();
    task.updateStatusDone();
    expect(() => task.updateStatusInProgress()).toThrow(
      new UpdateStatusError({
        message: "Não foi possível alterar o status de Done para In Progress",
      })
    );
  });

  test("Não deve mudar o status para Done de uma tarefa cancelada", () => {
    task.cancelTask();
    expect(() => task.updateStatusDone()).toThrow(
      new UpdateStatusError({
        message: "Não foi possível alterar o status de uma tarefa cancelada",
      })
    );
  });

  test("Não deve mudar o status para In Progress de uma tarefa cancelada", () => {
    task.cancelTask();
    expect(() => task.updateStatusInProgress()).toThrow(
      new UpdateStatusError({
        message: "Não foi possível alterar o status de uma tarefa cancelada",
      })
    );
  });
});
