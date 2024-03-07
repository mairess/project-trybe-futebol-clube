import SequelizeTeam from '../database/models/SequelizeTeam';
import { IMatchModel } from '../Interfaces/matches/IMatchModel';
import IMatch from '../Interfaces/matches/IMatch';
import SequelizeMatch from '../database/models/SequelizeMatch';

class MatchModel implements IMatchModel {
  private model = SequelizeMatch;

  async findAll(): Promise<IMatch[]> {
    const dbData = await this.model.findAll({
      include: [
        { model: SequelizeTeam,
          as: 'homeTeam',
          attributes: ['teamName'],
        },
        {
          model: SequelizeTeam,
          as: 'awayTeam',
          attributes: ['teamName'],
        },
      ],
    });
    return dbData;
  }

  async findAllMatchesInProgress(): Promise<IMatch[]> {
    const dbData = await this.model.findAll({
      where: { inProgress: true },
      include: [
        { model: SequelizeTeam,
          as: 'homeTeam',
          attributes: ['teamName'],
        },
        {
          model: SequelizeTeam,
          as: 'awayTeam',
          attributes: ['teamName'],
        },
      ],
    });
    return dbData;
  }

  async findAllMatchesFinished(): Promise<IMatch[]> {
    const dbData = await this.model.findAll({
      where: { inProgress: false },
      include: [
        { model: SequelizeTeam,
          as: 'homeTeam',
          attributes: ['teamName'],
        },
        {
          model: SequelizeTeam,
          as: 'awayTeam',
          attributes: ['teamName'],
        },
      ],
    });
    return dbData;
  }

  async findById(id: IMatch['id']): Promise<IMatch | null> {
    const dbData = await this.model.findByPk(id);
    if (dbData === null) return null;
    return dbData;
  }

  async finishMatch(id: IMatch['id']): Promise<void | null> {
    const dbData = await this.model.findByPk(id);
    if (dbData === null) return null;
    dbData.inProgress = false;
    await dbData.save();
  }

  async updateMatch(id: IMatch['id'], score: IMatch): Promise<IMatch | null> {
    const dbData = await this.model.findByPk(id);
    if (dbData === null) return null;
    dbData.homeTeamGoals = score.homeTeamGoals;
    dbData.awayTeamGoals = score.awayTeamGoals;
    await dbData.save();
    return dbData;
  }

  async createNewMatch(matchData: IMatch): Promise<IMatch> {
    const match = await this.model.create({
      homeTeamId: matchData.homeTeamId,
      homeTeamGoals: matchData.homeTeamGoals,
      awayTeamId: matchData.awayTeamId,
      awayTeamGoals: matchData.awayTeamGoals,
      inProgress: true,
    });
    return match;
  }
}

export default MatchModel;
