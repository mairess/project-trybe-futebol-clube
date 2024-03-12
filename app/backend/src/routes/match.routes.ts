import { Request, Response, Router } from 'express';
import MatchModel from '../models/MatchModel';
import MatchService from '../services/MatchService';
import MatchController from '../controllers/MatchController';
import Validations from '../middlewares/Validations';

const matchModel = new MatchModel();
const matchService = new MatchService(matchModel);
const matchController = new MatchController(matchService);

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
