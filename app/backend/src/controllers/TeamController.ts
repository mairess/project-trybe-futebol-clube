import { Request, Response } from 'express';
import ITeamService from '../Interfaces/teams/ITeamService';
import mapStatusHTTP from '../utils/mapStatusHTTP';

class TeamController {
  #teamService: ITeamService;
  constructor(teamService: ITeamService) {
    this.#teamService = teamService;
  }

  async getAllTeams(_req: Request, res: Response) {
    const serviceResponse = await this.#teamService.getAllTeams();
    res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }

  async getTeamById(req: Request, res: Response) {
    const { id } = req.params;
    const serviceResponse = await this.#teamService.getTeamById(Number(id));
    res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }
}

export default TeamController;
