import { Task } from "../src/Task";

describe("Classe Task", () => {
  test("Deve criar uma tarefa", function () {
    const task = Task.create("Tarefa 1", "Descrição da tarefa 1", "Novo");
    expect(task).toBeTruthy();
  });
});
