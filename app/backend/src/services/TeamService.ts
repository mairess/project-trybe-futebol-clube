import ITeam from '../Interfaces/teams/ITeam';
import { ITeamModel } from '../Interfaces/teams/ITeamModel';
import TeamsModel from '../models/TeamModel';
import { ServiceResponse } from '../Interfaces/ServiceResponse';

class TeamService {
  constructor(private teamModel: ITeamModel = new TeamsModel()) { }

  public async getAllTeams(): Promise<ServiceResponse<ITeam[]>> {
    const AllTeams = await this.teamModel.findAll();
    return { status: 'SUCCESSFUL', data: AllTeams };
  }

  public async getTeamById(id: number): Promise<ServiceResponse<ITeam>> {
    const team = await this.teamModel.findById(id);
    if (team === null) {
      return { status: 'NOT_FOUND', data: { message: 'Team not found!' } };
    }
    return { status: 'SUCCESSFUL', data: team };
  }
}

export default TeamService;
