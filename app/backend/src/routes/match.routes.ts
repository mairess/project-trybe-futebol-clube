import { Request, Response, Router } from 'express';
import MatchController from '../controllers/MatchController';
import Validations from '../middlewares/Validations';

const matchController = new MatchController();

const router = Router();

router.get('/:id', (req: Request, res: Response) => matchController.getMatchById(req, res));

router.get('/', (req: Request, res: Response) => matchController.getAllMatches(req, res));

router.patch('/:id', Validations
  .validateToken, (req: Request, res: Response) => matchController.updateMatch(req, res));

router.patch('/:id/finish', Validations
  .validateToken, (req: Request, res: Response) => matchController.finishMatch(req, res));

router.post('/', Validations
  .validateToken, (req: Request, res: Response) => matchController.createNewMatch(req, res));

export default router;
