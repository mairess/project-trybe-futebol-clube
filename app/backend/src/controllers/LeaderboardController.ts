import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import LeaderboardService from '../services/LeaderboardService';

class LeaderboardController {
  constructor(private leaderboardService: LeaderboardService) {}

  public async getHomeLeaderBoard(_req: Request, res: Response) {
    const serviceResponse = await this.leaderboardService.getHomeLeaderboard();
    return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }

  public async getAwayLeaderBoard(_req: Request, res: Response) {
    const serviceResponse = await this.leaderboardService.getAwayLeaderboard();
    return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }

  public async getLeaderboard(req: Request, res: Response) {
    const serviceResponse = await this.leaderboardService.getLeaderboard();
    return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }
}

export default LeaderboardController;
