import { ITeamModel } from '../Interfaces/teams/ITeamModel';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import { ILeaderboardFull } from '../Interfaces/leaderboard/ILeaderboard';
import { IMatchModelFinished } from '../Interfaces/matches/IMatchModel';
import IMatchInfos from '../Interfaces/matches/IMatchInfos';
import formHomeBoard from './utils/leaderboardHomeUtils';
import formAwayBoard from './utils/leaderboardAwayUtils';
import sortLeaderboard from './utils/sortLeaderboard';
import formGeneral from './utils/leaderboardGeneralUtils';
import ITeam from '../Interfaces/teams/ITeam';

class LeaderboardService {
  constructor(
    private matchModel: IMatchModelFinished,
    private teamModel: ITeamModel,
  ) { }

  private async getTeamNames(): Promise<ITeam[]> {
    const teams = await this.teamModel.findAll();
    return teams;
  }

  public async getHomeLeaderboard(): Promise<ServiceResponse<ILeaderboardFull[]>> {
    const teams = await this.getTeamNames();
    const allMatches = await this.matchModel.findAllMatchesFinished() as IMatchInfos[];
    const leaderboardHome = await formHomeBoard(allMatches, teams);
    return { status: 'SUCCESSFUL', data: sortLeaderboard(leaderboardHome) };
  }

  public async getAwayLeaderboard(): Promise<ServiceResponse<ILeaderboardFull[]>> {
    const teams = await this.getTeamNames();
    const allMatches = await this.matchModel.findAllMatchesFinished() as IMatchInfos[];
    const leaderboardAway = await formAwayBoard(allMatches, teams);
    return { status: 'SUCCESSFUL', data: sortLeaderboard(leaderboardAway) };
  }

  public async getLeaderboard(): Promise<ServiceResponse<ILeaderboardFull[]>> {
    const teams = await this.getTeamNames();
    const allMatches = await this.matchModel.findAllMatchesFinished() as IMatchInfos[];
    const leaderboardGeneral = await formGeneral(allMatches, teams);
    return { status: 'SUCCESSFUL', data: sortLeaderboard(leaderboardGeneral) };
  }
}

export default LeaderboardService;
