import IMatch from '../Interfaces/matches/IMatch';
import { ServiceMessage, ServiceResponse } from '../Interfaces/ServiceResponse';
import { IMatchModel } from '../Interfaces/matches/IMatchModel';

const notFoundMessage = 'Match not found!';
const equalTeamsMessage = { message: 'It is not possible to create a match with two equal teams' };
class MatchService {
  #matchModel: IMatchModel;
  constructor(matchModel: IMatchModel) {
    this.#matchModel = matchModel;
  }

  async getAllMatches(): Promise<ServiceResponse<IMatch[]>> {
    const AllMatches = await this.#matchModel.findAll();
    return { status: 'SUCCESSFUL', data: AllMatches };
  }

  async getAllMatchesInProgress(): Promise<ServiceResponse<IMatch[]>> {
    const inProgressMatches = await this.#matchModel.findAllMatchesInProgress();
    return { status: 'SUCCESSFUL', data: inProgressMatches };
  }

  async findAllMatchesFinished(): Promise<ServiceResponse<IMatch[]>> {
    const finishedMatches = await this.#matchModel.findAllMatchesFinished();
    return { status: 'SUCCESSFUL', data: finishedMatches };
  }

  async getMatchById(id: number): Promise<ServiceResponse<IMatch>> {
    const match = await this.#matchModel.findById(id);
    if (match === null) {
      return { status: 'NOT_FOUND', data: { message: notFoundMessage } };
    }
    return { status: 'SUCCESSFUL', data: match };
  }

  async finishMatch(id: number): Promise<ServiceResponse<ServiceMessage>> {
    const match = await this.#matchModel.findById(id);
    if (match === null) {
      return { status: 'NOT_FOUND', data: { message: notFoundMessage } };
    }
    await this.#matchModel.finishMatch(id);
    return { status: 'SUCCESSFUL', data: { message: 'Finished' } };
  }

  async updateMatch(id: number, score: IMatch): Promise<ServiceResponse<IMatch>> {
    const match = await this.#matchModel.findById(id);
    if (match === null) {
      return { status: 'NOT_FOUND', data: { message: notFoundMessage } };
    }
    await this.#matchModel.updateMatch(id, score);
    const { awayTeamGoals, awayTeamId, homeTeamGoals, homeTeamId, inProgress } = match;
    return { status: 'SUCCESSFUL',
      data: {
        id, awayTeamGoals, awayTeamId, homeTeamGoals, homeTeamId, inProgress,
      } };
  }

  async createNewMatch(matchData: IMatch):
  Promise<ServiceResponse<IMatch | ServiceMessage>> {
    const { awayTeamId, homeTeamId } = matchData;
    if (awayTeamId === homeTeamId) {
      return { status: 'UNPROCESSABLE_CONTENT', data: equalTeamsMessage };
    }
    const teams = await this.#matchModel.findAllSimultaneous(homeTeamId, awayTeamId);
    if (teams && teams.length <= 1) {
      return { status: 'NOT_FOUND', data: { message: 'There is no team with such id!' } };
    }
    const match = await this.#matchModel.createNewMatch(matchData);
    return { status: 'CREATED', data: match };
  }
}

export default MatchService;
