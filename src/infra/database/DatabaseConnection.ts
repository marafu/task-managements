export interface DatabaseConnection {
  query(statement: string, data: any): Promise<any>;
  close(): Promise<void>;
}
