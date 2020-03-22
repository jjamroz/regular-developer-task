import * as express from 'express';
import { body, param, validationResult, oneOf } from 'express-validator';

export interface ProductBody {
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
        .isInt()
    ];
  };

  static addUserValidationRules = () => {
    return [
      body('name', 'name is required')
        .notEmpty()
        .isString(),
      body('url', 'url is required')
        .notEmpty()
        .isURL(),
      body('prize', 'prize is required')
        .exists()
        .isDecimal(),
      body().customSanitizer(body => mapToProductBody(body))
    ];
  };

  static updateUserValidationRules = () => {
    return [
      param('id', 'Id needs to be a number!')
        .exists()
        .isInt(),
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

const mapToProductBody = (body: any): ProductBody => {
  const product: ProductBody = {};
  const { name, url, prize } = body;
  if (name) product.name = name;
  if (url) product.url = url;
  if (prize) product.prize = prize;
  return product;
};
