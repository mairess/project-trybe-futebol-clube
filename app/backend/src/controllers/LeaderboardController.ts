import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import LeaderboardService from '../services/LeaderboardService';

class LeaderboardController {
  #leaderboardService: LeaderboardService;
  constructor(leaderboardService: LeaderboardService) {
    this.#leaderboardService = leaderboardService;
  }

  async getHomeLeaderBoard(_req: Request, res: Response) {
    const serviceResponse = await this.#leaderboardService.getHomeLeaderboard();
    return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }

  async getAwayLeaderBoard(_req: Request, res: Response) {
    const serviceResponse = await this.#leaderboardService.getAwayLeaderboard();
    return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }

  async getLeaderboard(req: Request, res: Response) {
    const serviceResponse = await this.#leaderboardService.getGeneralLeaderboard();
    return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }
}

export default LeaderboardController;
