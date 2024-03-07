import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import MatchService from '../services/MatchService';

class MatchController {
  constructor(private matchService = new MatchService()) {}

  public async getAllMatches(req: Request, res: Response) {
    const { inProgress } = req.query;
    let serviceResponse;
    if (inProgress === 'true') {
      serviceResponse = await this.matchService.getAllMatchesInProgress();
    } else if (inProgress === 'false') {
      serviceResponse = await this.matchService.findAllMatchesFinished();
    } else {
      serviceResponse = await this.matchService.getAllMatches();
    }
    res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }

  public async getMatchById(req: Request, res: Response) {
    const { id } = req.params;
    const serviceResponse = await this.matchService.getMatchById(Number(id));
    res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }

  public async finishMatch(req: Request, res: Response) {
    const { id } = req.params;
    const serviceResponse = await this.matchService.finishMatch(Number(id));
    res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }

  public async updateMatch(req: Request, res: Response) {
    const { id } = req.params;
    const serviceResponse = await this.matchService.updateMatch(Number(id), req.body);
    res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }

  public async createNewMatch(req: Request, res: Response) {
    const matchData = req.body;
    const serviceResponse = await this.matchService.createNewMatch(matchData);
    res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }
}

export default MatchController;
