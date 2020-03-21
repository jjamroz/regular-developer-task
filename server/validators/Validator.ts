import * as express from 'express';
import { body, param, validationResult } from 'express-validator';

export class Validator {
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
        .exists()
        .isString(),
      body('url', 'url is required')
        .exists()
        .isURL(),
      body('prize', 'prize is required')
        .exists()
        .isDecimal()
    ];
  };

  static updateUserValidationRules = () => {
    return [
      param('id', 'Id needs to be a number!')
        .exists()
        .isInt(),
      body('name', 'name is required')
        .optional()
        .isString(),
      body('url', 'url is required')
        .optional()
        .isURL(),
      body('prize', 'prize is required')
        .optional()
        .isDecimal()
    ];
  };
}
