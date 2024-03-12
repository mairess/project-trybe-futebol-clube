import { NextFunction, Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import JWT from '../utils/JWT';
import validateLogin from './validations/validateLogin';

class Validations {
  static validateLogin(req: Request, res: Response, next: NextFunction): Response | void {
    const error = validateLogin(req.body);
    if (error) {
      return res
        .status(mapStatusHTTP(error.status))
        .json({ message: error.data.message });
    }
    next();
  }

  static async validateToken(req: Request, res: Response, next: NextFunction):
  Promise<Response | void> {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: 'Token not found' });
    }
    const tokenWithoutBearer = token.split(' ')[1];
    const payload = JWT.verify(tokenWithoutBearer);

    if (payload === 'Token must be a valid token') {
      return res.status(401).json({ message: payload });
    }
    res.locals.user = payload;

    next();
  }
}

export default Validations;
