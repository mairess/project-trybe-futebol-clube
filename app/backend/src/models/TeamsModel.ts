import { ITeamsModel } from '../Interfaces/ITeamsModel';
import ITeams from '../Interfaces/ITeams';
import SequelizeTeams from '../database/models/SequelizeTeams';

class TeamsModel implements ITeamsModel {
  private model = SequelizeTeams;

  async findAll(): Promise<ITeams[]> {
    const dbData = await this.model.findAll();
    return dbData;
  }
}

export default TeamsModel;
