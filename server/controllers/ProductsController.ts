import * as express from 'express';
import { DatabaseProvider } from './../database';
import { ProductBody } from '../validators/ProductValidator';
const db = new DatabaseProvider();

interface IProduct {
  id: number;
  name: string;
  url: string;
  prize: number;
}

export class ProductsController {
  static getAllItems(req: express.Request, res: express.Response) {
    return db
      .get('products')
      .then((data: IProduct[]) => {
        res.status(200).json(data);
      })
      .catch(err => {
        console.error(err);
        res.status(500).json({ error: true });
      });
  }

  static getItemById(req: express.Request, res: express.Response) {
    return db
      .getById('products', req.params.id)
      .then((data: IProduct) => {
        res.status(200).json(data);
      })
      .catch(err => {
        handleError(err, res);
      });
  }

  static deleteById(req: express.Request, res: express.Response) {
    return db
      .deleteById('products', req.params.id)
      .then(() => {
        res.status(200).json({
          message: `succesfully deleted product with id: ${req.params.id}`
        });
      })
      .catch(err => {
        handleError(err, res);
      });
  }

  static addItem(req: express.Request, res: express.Response) {
    const item: ProductBody = req.body;
    return db
      .addItem('products', item)
      .then((data: IProduct) => {
        res.status(200).json(data);
      })
      .catch(err => {
        handleError(err, res);
      });
  }

  static updateItem(req: express.Request, res: express.Response) {
    const item: ProductBody = req.body;
    return db
      .updateItem('products', req.params.id, item)
      .then((data: IProduct) => {
        res.status(200).json(data);
      })
      .catch(err => {
        handleError(err, res);
      });
  }
}

const handleError = (err: Error, res: express.Response) => {
  if (err.message === 'NOT_FOUND') {
    res.status(404).json({ error: err.message });
  } else {
    res.status(500).json({ error: true });
  }
};
