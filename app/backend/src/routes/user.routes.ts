import { Router } from 'express';
import UsersController from '../controllers/UserController';
import Validations from '../middlewares/Validations';

const userController = new UsersController();

const router = Router();

router.post('/', Validations.validateLogin, (req, res) => userController.login(req, res));

export default router;
