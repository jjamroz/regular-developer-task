var fs = require('fs');
var path = require('path');

var DB_FILE = path.join(__dirname, '../../database.json');

export interface IDatabaseProvider {
    get(table: string) : Promise<Object>;
}

export class DatabaseProvider implements IDatabaseProvider {

    constructor() {}

    public get(table: string): Promise<Object> {
        return new Promise((resolve, reject) => {
           fs.readFile(DB_FILE, (err, data) => {
                if (err) {
                   reject(err);
                }
                
                return resolve(JSON.parse(data)[table] || null);
            });
        });
    }
}