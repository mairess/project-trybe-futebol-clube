import { Router } from 'express';
import UserModel from '../models/UserModel';
import UserService from '../services/UserService';
import UsersController from '../controllers/UserController';
import Validations from '../middlewares/Validations';

const userModel = new UserModel();
const userService = new UserService(userModel);
const userController = new UsersController(userService);

const router = Router();

router.post('/', Validations.validateLogin, (req, res) => userController.login(req, res));
router.get('/role', Validations
  .validateToken, (req, res) => userController.getRole(req, res));

export default router;
