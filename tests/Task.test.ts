import { ChangeStatusError } from "../src/BusinessErrors";
import { Task } from "../src/Task";

describe("Classe Task", () => {
  test("Deve criar uma tarefa", function () {
    const task = Task.create("Tarefa 1", "Descrição da tarefa 1");
    expect(task).toBeTruthy();
  });

  test("Deve ser Todo para novas tarefas", () => {
    const task = Task.create("Tarefa 1", "Descrição da tarefa 1");
    expect(task.getStatus()).toBe("Todo");
  });

  test("Deve mudar somente para In Progress a tarefa com status Todo", () => {
    const task = Task.create("Tarefa 1", "Descrição da tarefa 1");
    task.changeStatusInProgress();
    expect(task.getStatus()).toBe("In Progress");
  });

  test("Deve mudar somente para Done a tarefa com status In Progress", () => {
    const task = Task.create("Tarefa 1", "Descrição da tarefa 1");
    task.changeStatusInProgress();
    expect(task.getStatus()).toBe("In Progress");
  });

  test("Deve cancelar tarefa com qualquer status que não seja vazio", () => {
    const task = Task.create("Tarefa 1", "Descrição da tarefa 1");
    task.cancelTask();
    expect(task.getStatus()).toBe("Cancelled");
  });

  test("Não deve mudar a tarefa de Done para In Progress", () => {
    const task = Task.create("Tarefa 1", "Descrição da tarefa 1");
    task.changeStatusInProgress();
    task.changeStatusDone();
    expect(() => task.changeStatusInProgress()).toThrow(
      new ChangeStatusError({
        message: "Não foi possível alterar o status de Done para In Progress",
      })
    );
  });

  test("Não deve mudar o status para Done de uma tarefa cancelada", () => {
    const task = Task.create("Tarefa 1", "Descrição da tarefa 1");
    task.cancelTask();
    expect(() => task.changeStatusDone()).toThrow(
      new ChangeStatusError({
        message: "Não foi possível alterar o status de uma tarefa cancelada",
      })
    );
  });

  test("Não deve mudar o status para In Progress de uma tarefa cancelada", () => {
    const task = Task.create("Tarefa 1", "Descrição da tarefa 1");
    task.cancelTask();
    expect(() => task.changeStatusInProgress()).toThrow(
      new ChangeStatusError({
        message: "Não foi possível alterar o status de uma tarefa cancelada",
      })
    );
  });
});
