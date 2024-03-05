import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import TeamService from '../services/TeamService';

class TeamController {
  constructor(private teamsService = new TeamService()) {}

  public async getAllTeams(_req: Request, res: Response) {
    const serviceResponse = await this.teamsService.getAllTeams();
    res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }

  public async getTeamById(req: Request, res: Response) {
    const { id } = req.params;
    const serviceResponse = await this.teamsService.getTeamById(Number(id));
    res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }
}

export default TeamController;
