import ITeam from '../Interfaces/teams/ITeam';
import { ITeamModel } from '../Interfaces/teams/ITeamModel';
import { ServiceResponse } from '../Interfaces/ServiceResponse';

class TeamService {
  #teamModel: ITeamModel;
  constructor(teamModel: ITeamModel) {
    this.#teamModel = teamModel;
  }

  async getAllTeams(): Promise<ServiceResponse<ITeam[]>> {
    const allTeams = await this.#teamModel.findAll();
    return { status: 'SUCCESSFUL', data: allTeams };
  }

  async getTeamById(id: number): Promise<ServiceResponse<ITeam>> {
    const team = await this.#teamModel.findById(id);
    if (team === null) {
      return { status: 'NOT_FOUND', data: { message: 'Team not found!' } };
    }
    return { status: 'SUCCESSFUL', data: team };
  }
}

export default TeamService;
