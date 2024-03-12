import { Request, Response, Router } from 'express';
import TeamModel from '../models/TeamModel';
import TeamService from '../services/TeamService';
import TeamController from '../controllers/TeamController';

const teamModel = new TeamModel();
const teamService = new TeamService(teamModel);
const teamController = new TeamController(teamService);

const router = Router();

router.get('/', (req: Request, res: Response) => teamController.getAllTeams(req, res));

router.get('/:id', (req: Request, res: Response) => teamController.getTeamById(req, res));

export default router;
