import { ITeamModel } from '../Interfaces/teams/ITeamModel';
import ITeam from '../Interfaces/teams/ITeam';
import SequelizeTeam from '../database/models/SequelizeTeam';

class TeamModel implements ITeamModel {
  private model = SequelizeTeam;

  async findAll(): Promise<ITeam[]> {
    return this.model.findAll();
  }

  async findById(id: ITeam['id']): Promise<ITeam | null> {
    return this.model.findByPk(id);
  }
}

export default TeamModel;
