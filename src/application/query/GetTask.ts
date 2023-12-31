import { DatabaseConnection } from "../../infra/database/DatabaseConnection";
import { GetTaskOutput } from "../dtos/GetTaskOutput";
import { AuthorizationError } from "../errors/AuthorizationError";

export class GetTask {
  constructor(readonly connection: DatabaseConnection) {}

  async execute(externalId: string) {
    const [accountdata] = await this.connection.query(
      "SELECT id, email FROM account WHERE external_id = ?",
      [externalId]
    );
    if (accountdata.length < 1)
      throw new AuthorizationError({
        message: "You don't have permission to list tasks",
      });
    const [taskData] = await this.connection.query(
      "SELECT t.external_id as id, t.title, t.description, t.status FROM task t JOIN account a on (t.account_id = a.id) WHERE account_id = ?",
      [accountdata[0].id]
    );
    return new GetTaskOutput(accountdata[0].email, taskData);
  }
}
