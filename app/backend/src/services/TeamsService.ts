import ITeams from '../Interfaces/ITeams';
import { ITeamsModel } from '../Interfaces/ITeamsModel';
import TeamsModel from '../models/TeamsModel';
import { ServiceResponse } from '../Interfaces/ServiceResponse';

class TeamsService {
  constructor(private teamsModel: ITeamsModel = new TeamsModel()) { }

  public async getAllTeams(): Promise<ServiceResponse<ITeams[]>> {
    const AllTeams = await this.teamsModel.findAll();
    return { status: 'SUCCESSFUL', data: AllTeams };
  }
}

export default TeamsService;
