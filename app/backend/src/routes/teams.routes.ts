import { Request, Response, Router } from 'express';
import TeamsController from '../controllers/TeamsController';

const teamController = new TeamsController();

const router = Router();

router.get('/', (req: Request, res: Response) => teamController.getAllTeams(req, res));

router.get('/:id', (req: Request, res: Response) => teamController.getTeamById(req, res));

export default router;