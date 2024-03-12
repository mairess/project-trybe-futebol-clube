import { Request, Response, Router } from 'express';
import TeamModel from '../models/TeamModel';
import MatchModel from '../models/MatchModel';
import LeaderboardService from '../services/LeaderboardService';
import LeaderboardController from '../controllers/LeaderboardController';

const matchModel = new MatchModel();
const teamModel = new TeamModel();
const leaderboardService = new LeaderboardService(matchModel, teamModel);
const leaderboardController = new LeaderboardController(leaderboardService);

const router = Router();

router.get('/', (req: Request, res: Response) => leaderboardController.getLeaderboard(req, res));

router.get('/home', (req: Request, res: Response) =>
  leaderboardController.getHomeLeaderBoard(req, res));

router.get('/away', (req: Request, res: Response) =>
  leaderboardController.getAwayLeaderBoard(req, res));

export default router;
