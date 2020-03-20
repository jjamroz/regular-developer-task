import * as express from 'express';
import { DatabaseProvider } from "./../database";
const products = new DatabaseProvider();

interface IProduct {
    id: number,
    name: string;
    url: string;
    prize: number;
}

export class ProductsController {
    static getAllItems(req: express.Request, res: express.Response) {
        return products.get('products').then((data: IProduct[]) => {
            res.status(200).json(data);
        }).catch((err) => {
            console.error(err);
            res.status(500).json({ 'error' : true });
        })
    }
}