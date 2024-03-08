import { Op } from 'sequelize';
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

  async findAllSimultaneous(homeTeamId: number, awayTeamId: number): Promise<IMatch[]> {
    return this.model.findAll({ where: { id: { [Op.or]: [homeTeamId, awayTeamId] } } });
  }

  async findById(id: IMatch['id']): Promise<IMatch | null> {
    return this.model.findByPk(id);
  }

  async finishMatch(id: IMatch['id']): Promise<void> {
    this.model.update({ inProgress: false }, { where: { id } });
  }

  async updateMatch(id: IMatch['id'], score: IMatch): Promise<void> {
    this.model.update(score, { where: { id } });
  }

  async createNewMatch(matchData: IMatch): Promise<IMatch> {
    return this.model.create({ ...matchData, inProgress: true });
  }
}

export default MatchModel;
