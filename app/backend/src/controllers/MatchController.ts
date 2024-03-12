import { Request, Response } from 'express';
import IMatchService from '../Interfaces/matches/IMatchService';
import mapStatusHTTP from '../utils/mapStatusHTTP';

class MatchController {
  constructor(private matchService: IMatchService) {}

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
    return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }

  public async getMatchById(req: Request, res: Response) {
    const { id } = req.params;
    const serviceResponse = await this.matchService.getMatchById(Number(id));
    return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }

  public async finishMatch(req: Request, res: Response) {
    const { id } = req.params;
    const serviceResponse = await this.matchService.finishMatch(Number(id));
    return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }

  public async updateMatch(req: Request, res: Response) {
    const { id } = req.params;
    const serviceResponse = await this.matchService.updateMatch(Number(id), req.body);
    return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }

  public async createNewMatch(req: Request, res: Response) {
    const matchData = req.body;
    const serviceResponse = await this.matchService.createNewMatch(matchData);
    return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }
}

export default MatchController;
