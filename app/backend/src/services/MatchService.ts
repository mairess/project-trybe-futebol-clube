import IMatch from '../Interfaces/matches/IMatch';
import { ServiceMessage, ServiceResponse } from '../Interfaces/ServiceResponse';
import { IMatchModel } from '../Interfaces/matches/IMatchModel';
import MatchModel from '../models/MatchModel';

const notFoundMessage = 'Match not found!';
const equalTeamsMessage = { message: 'It is not possible to create a match with two equal teams' };
class MatchService {
  constructor(
    private matchModel: IMatchModel = new MatchModel(),
  ) { }

  public async getAllMatches(): Promise<ServiceResponse<IMatch[]>> {
    const AllMatches = await this.matchModel.findAll();
    return { status: 'SUCCESSFUL', data: AllMatches };
  }

  public async getAllMatchesInProgress(): Promise<ServiceResponse<IMatch[]>> {
    const inProgressMatches = await this.matchModel.findAllMatchesInProgress();
    return { status: 'SUCCESSFUL', data: inProgressMatches };
  }

  public async findAllMatchesFinished(): Promise<ServiceResponse<IMatch[]>> {
    const finishedMatches = await this.matchModel.findAllMatchesFinished();
    return { status: 'SUCCESSFUL', data: finishedMatches };
  }

  public async getMatchById(id: number): Promise<ServiceResponse<IMatch>> {
    const match = await this.matchModel.findById(id);
    if (match === null) {
      return { status: 'NOT_FOUND', data: { message: notFoundMessage } };
    }
    return { status: 'SUCCESSFUL', data: match };
  }

  public async finishMatch(id: number): Promise<ServiceResponse<ServiceMessage>> {
    const match = await this.matchModel.findById(id);
    if (match === null) {
      return { status: 'NOT_FOUND', data: { message: notFoundMessage } };
    }
    const matchToFinish = await this.matchModel.finishMatch(id);
    if (matchToFinish === null) {
      return { status: 'NOT_FOUND', data: { message: notFoundMessage } };
    }
    return { status: 'SUCCESSFUL', data: { message: 'Finished' } };
  }

  public async updateMatch(id: number, score: IMatch): Promise<ServiceResponse<IMatch>> {
    const match = await this.matchModel.findById(id);
    if (match === null) {
      return { status: 'NOT_FOUND', data: { message: notFoundMessage } };
    }
    const matchUpdated = await this.matchModel.updateMatch(id, score);
    if (matchUpdated === null) {
      return { status: 'NOT_FOUND', data: { message: notFoundMessage } };
    }
    return { status: 'SUCCESSFUL', data: matchUpdated };
  }

  public async createNewMatch(matchData: IMatch):
  Promise<ServiceResponse<IMatch | ServiceMessage>> {
    const { awayTeamId, homeTeamId } = matchData;
    if (awayTeamId === homeTeamId) {
      return { status: 'UNPROCESSABLE_CONTENT', data: equalTeamsMessage };
    }
    const awayTeam = await this.matchModel.findById(awayTeamId);
    const homeTeam = await this.matchModel.findById(homeTeamId);
    if (!awayTeam || !homeTeam) {
      return { status: 'NOT_FOUND', data: { message: 'There is no team with such id!' } };
    }
    const match = await this.matchModel.createNewMatch(matchData);
    return { status: 'CREATED', data: match };
  }
}

export default MatchService;
