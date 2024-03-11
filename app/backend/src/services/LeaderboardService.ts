import { ServiceResponse } from '../Interfaces/ServiceResponse';
import { ILeaderboardFull } from '../Interfaces/leaderboard/ILeaderboard';
import { IMatchModelFinished } from '../Interfaces/matches/IMatchModel';
import MatchModel from '../models/MatchModel';
import IMatchInfos from '../Interfaces/matches/IMatchInfos';
import formHomeBoard from './utils/leaderboardHomeUtils';
import formAwayBoard from './utils/leaderboardAwayUtils';
import sortLeaderboard from './utils/sortLeaderboard';
import formGeneral from './utils/leaderboardGeneralUtils';
import TeamModel from '../models/TeamModel';
import ITeam from '../Interfaces/teams/ITeam';

class LeaderboardSerice {
  protected teamModel: TeamModel;
  constructor(private leaderboardModel: IMatchModelFinished = new MatchModel()) {
    this.teamModel = new TeamModel();
  }

  private async getTeams(): Promise<ITeam[]> {
    const teamsName = await this.teamModel.findAll();
    return teamsName;
  }

  private async getTeamNames(): Promise<string[]> {
    const teams = this.getTeams();
    const teamNames = (await teams).map((team) => team.teamName);
    return teamNames;
  }

  public async getHomeLeaderboard(): Promise<ServiceResponse<ILeaderboardFull[]>> {
    const names = await this.getTeamNames();
    const allMatches = await this.leaderboardModel.findAllMatchesFinished() as IMatchInfos[];
    const leaderboardHome = await formHomeBoard(allMatches, names);
    return { status: 'SUCCESSFUL', data: sortLeaderboard(leaderboardHome) };
  }

  public async getAwayLeaderboard(): Promise<ServiceResponse<ILeaderboardFull[]>> {
    const names = await this.getTeamNames();
    const allMatches = await this.leaderboardModel.findAllMatchesFinished() as IMatchInfos[];
    const leaderboardAway = await formAwayBoard(allMatches, names);
    return { status: 'SUCCESSFUL', data: sortLeaderboard(leaderboardAway) };
  }

  public async getLeaderboard(): Promise<ServiceResponse<ILeaderboardFull[]>> {
    const names = await this.getTeamNames();
    const allMatches = await this.leaderboardModel.findAllMatchesFinished() as IMatchInfos[];
    const leaderboardGeneral = await formGeneral(allMatches, names);
    return { status: 'SUCCESSFUL', data: sortLeaderboard(leaderboardGeneral) };
  }
}

export default LeaderboardSerice;
