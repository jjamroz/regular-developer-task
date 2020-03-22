import * as express from 'express';
import { ProductsController } from './controllers/ProductsController';
import { ProductValidator as Validator } from './validators/ProductValidator';

const bodyParser = require('body-parser');
const app = express();

app.set('port', process.env.PORT || 3000);

app.use('/', express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Methods', 'GET,PATCH,POST,DELETE');
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

app.get('/products', ProductsController.getAllItems);
app.get(
  '/products/:id',
  Validator.idValidationRules(),
  Validator.validate,
  ProductsController.getItemById
);
app.delete(
  '/products/:id',
  Validator.idValidationRules(),
  Validator.validate,
  ProductsController.deleteById
);
app.post(
  '/products',
  Validator.addUserValidationRules(),
  Validator.validate,
  ProductsController.addItem
);
app.patch(
  '/products/:id',
  Validator.updateUserValidationRules(),
  Validator.validate,
  ProductsController.updateItem
);

export const server = app.listen(app.get('port'), function() {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
});

module.exports = server;
