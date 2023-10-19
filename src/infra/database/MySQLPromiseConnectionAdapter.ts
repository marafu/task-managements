require("dotenv").config();
import mysql, { Pool as MySQLConnection } from "mysql2";
import bluebird from "bluebird";
import { DatabaseConnection } from "./DatabaseConnection";

interface MySQLProps {
  host: string;
  port: number;
  user: string;
  password: string;
  database: string;
}
export class MySQLPromiseConnectionAdapter implements DatabaseConnection {
  private connection: MySQLConnection;
  constructor({ host, port, user, password, database }: MySQLProps) {
    this.connection = mysql.createPool({
      host,
      port,
      user,
      password,
      database,
      Promise: bluebird,
      charset: "utf8",
      waitForConnections: true,
      connectionLimit: 10,
      maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
      idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
      queueLimit: 0,
      enableKeepAlive: true,
      keepAliveInitialDelay: 0,
    });
  }
  async query(statement: string, data: any): Promise<any> {
    return await this.connection.promise().query(statement, data);
  }

  async close(): Promise<void> {
    this.connection.end();
  }
}
