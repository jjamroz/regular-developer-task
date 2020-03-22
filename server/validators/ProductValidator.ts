import * as express from 'express';
import { body, param, validationResult, oneOf } from 'express-validator';

export interface IProductBody {
  name?: string;
  url?: string;
  prize?: number;
}

export class ProductValidator {
  static validate(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    } else {
      return res.status(400).json({ errors: errors.array() });
    }
  }

  static idValidationRules = () => {
    return [
      param('id', 'Id needs to be a number!')
        .exists()
        .bail()
        .isInt()
    ];
  };

  static addUserValidationRules = () => {
    return [
      body('name', 'name is required').notEmpty(),
      body('url', 'url is required and has to be an URL')
        .notEmpty()
        .bail()
        .isURL(),
      body('prize', 'prize is required and has to be decimal')
        .exists()
        .bail()
        .isDecimal(),
      body().customSanitizer(body => mapToProductBody(body))
    ];
  };

  static updateUserValidationRules = () => {
    return [
      param('id', 'Id needs to be a number!').isInt(),
      oneOf(
        [body('name').exists(), body('url').exists(), body('prize').exists()],
        'at least one of following params is required: name, url, prize'
      ),
      body('name', 'name is required')
        .optional()
        .notEmpty()
        .isString(),
      body('url', 'url is required')
        .optional()
        .notEmpty()
        .isURL(),
      body('prize', 'prize is required')
        .optional()
        .isDecimal(),
      body().customSanitizer(body => mapToProductBody(body))
    ];
  };
}

const mapToProductBody = (body: any): IProductBody => {
  const product: IProductBody = {};
  const { name, url, prize } = body;
  if (name) product.name = name;
  if (url) product.url = url;
  if (prize) product.prize = prize;
  return product;
};
