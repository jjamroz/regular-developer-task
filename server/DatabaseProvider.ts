import * as mysql from 'mysql';
import * as _ from 'underscore';

export interface IDatabaseProvider {
  get(table: string): Promise<Object>;
  getById(table: string, id: number): Promise<Object>;
  deleteById(table: string, id: number): Promise<boolean>;
  addItem(table: string, item: Object): Promise<Object>;
  updateItem(table: string, id: number, item: Object): Promise<Object>;
}

export class DatabaseProvider implements IDatabaseProvider {
  private connection: mysql.Connection;

  constructor() {
    this.connection = mysql.createConnection({
      host: process.env.DBHOST || 'localhost',
      user: process.env.DBUSER || 'admin',
      password: process.env.DBPASSWORD || 'admin',
      port: parseInt(process.env.PORT) || 3306,
      database: process.env.DBNAME || 'test'
    });

    this.connection.connect(err => {
      if (err) throw err;
      console.log('DB connected!');
    });
  }

  public get(table: string): Promise<Object> {
    return new Promise((resolve, reject) => {
      this.connection.query(`SELECT * FROM ${table}`, (error, results) => {
        if (error) reject(error);
        resolve(results);
      });
    });
  }

  public getById(table: string, id: any): Promise<Object> {
    return new Promise((resolve, reject) => {
      this.connection.query(
        `SELECT * FROM ${table} WHERE id=${id}`,
        (error, results) => {
          if (_.isEmpty(results)) reject(new Error('NOT_FOUND'));
          if (error) reject(error);
          resolve(results);
        }
      );
    });
  }

  public deleteById(table: string, id: any): Promise<boolean> {
    return this.getById(table, id).then(() => {
      return new Promise((resolve, reject) => {
        this.connection.query(`DELETE FROM ${table} WHERE id=${id}`, error => {
          if (error) reject(error);
          resolve(true);
        });
      });
    });
  }

  public addItem(table: string, item: Object): Promise<Object> {
    const columnNames: string[] = [];
    const values: string[] = [];
    for (let [key, value] of Object.entries(item)) {
      columnNames.push(key);
      values.push(`'${value}'`);
    }

    const query = `INSERT INTO ${table} (${columnNames.toString()}) VALUES (${values.toString()})`;

    return new Promise((resolve, reject) => {
      this.connection.query(query, (error, results) => {
        if (error) reject(error);
        resolve(results.insertId);
      });
    }).then(insertId => {
      return this.getById(table, insertId);
    });
  }

  public updateItem(table: string, id: any, item: Object): Promise<Object> {
    const setStaments = Object.entries(item)
      .map(([key, value]) => {
        return `${key} = '${value}'`;
      })
      .join(', ');

    let query = `UPDATE ${table} SET ${setStaments} WHERE id = ${id}`;

    return new Promise((resolve, reject) => {
      this.connection.query(query, (error, results) => {
        if (error) reject(error);
        resolve();
      });
    }).then(() => {
      return this.getById(table, id);
    });
  }
}
