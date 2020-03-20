
import { IDatabaseProvider } from '../../server/database';

export class MockDatabaseProvider implements IDatabaseProvider {
    public database: any = {};
    
    constructor(database: Object = {}) {
        this.database = database;
    }

    public get(table: string): Promise<Object> {
        return new Promise((resolve) => {
            return resolve(this.database[table] || null);
        });
    }
}