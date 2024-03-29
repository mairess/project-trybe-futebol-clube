import { Request, Response } from 'express';
import IUserService from '../Interfaces/users/IUserService';
import mapStatusHTTP from '../utils/mapStatusHTTP';

class UserController {
  #userService: IUserService;
  constructor(userService: IUserService) {
    this.#userService = userService;
  }

  async login(req: Request, res: Response): Promise<Response> {
    const serviceResponse = await this.#userService.login(req.body);
    return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }

  async getRole(_req: Request, res: Response): Promise<Response> {
    const serviceResponse = await this.#userService.getRole(res.locals.user);
    return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }
}

export default UserController;
