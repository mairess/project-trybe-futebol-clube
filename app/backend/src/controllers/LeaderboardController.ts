import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import LeaderboardSerice from '../services/LeaderboardService';

class LeaderboardController {
  constructor(private leaderboardService = new LeaderboardSerice()) {}

  public async getLeaderBoard(_req: Request, res: Response) {
    const serviceResponse = await this.leaderboardService.getFullLeaderboardSorted();
    return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }
}

export default LeaderboardController;
