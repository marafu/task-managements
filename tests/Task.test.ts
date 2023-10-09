import { Task } from "../src/Task";

describe("Tarefa", () => {
  test("Deve criar uma tarefa", function () {
    const task = new Task("Tarefa 1", "Descrição da tarefa 1", "Novo");

    expect(task).toBeTruthy();
  });

  test("Não deve criar uma task que tenha o titulo vazio", function () {
    const task = new Task("", "Descrição da tarefa 1", "Novo");

    expect(() => {
      task.create();
    }).toThrowError(new Error("The title cannot be empty"));
  });
});
