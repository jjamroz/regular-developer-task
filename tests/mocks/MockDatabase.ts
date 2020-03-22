import { IDatabaseProvider } from '../../server/DatabaseProvider';

export class MockDatabaseProvider implements IDatabaseProvider {
  public database: any = {};

  constructor(database: Object = {}) {
    this.database = database;
  }

  public get(table: string): Promise<Object> {
    return new Promise(resolve => {
      return resolve(this.database[table] || null);
    });
  }

  public getById(table: string, id: number): Promise<Object> {
    return new Promise(resolve => {
      return resolve(this.database[table][0] || null);
    });
  }

  public addItem(table: string): Promise<Object> {
    return new Promise(resolve => {
      return resolve(this.database[table][0] || null);
    });
  }

  public updateItem(table: string, id: number, item: Object): Promise<Object> {
    return new Promise(resolve => {
      return resolve(this.database[table][0] || null);
    });
  }

  public deleteById(table: string): Promise<boolean> {
    return new Promise(resolve => {
      return resolve(true);
    });
  }
}
