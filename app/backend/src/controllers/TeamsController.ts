import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import TeamsService from '../services/TeamsService';

class TeamsController {
  constructor(private teamsService = new TeamsService()) {}

  public async getAllTeams(_req: Request, res: Response) {
    const serviceResponse = await this.teamsService.getAllTeams();
    res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }

  public async getTeamById(req: Request, res: Response) {
    const { id } = req.params;
    const serviceResponse = await this.teamsService.getTeamById(Number(id));
    if (serviceResponse.status !== 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
    }
    res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }
}

export default TeamsController;
