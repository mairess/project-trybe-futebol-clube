import LeaderboardHome from '../entities/LeaderboardHome';
import { ITeamModel } from '../Interfaces/teams/ITeamModel';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import { ILeaderboardFull } from '../Interfaces/leaderboard/ILeaderboard';
import { IMatchModelFinished } from '../Interfaces/matches/IMatchModel';
import IMatchInfos from '../Interfaces/matches/IMatchInfos';
import sortLeaderboard from './utils/sortLeaderboard';
import ITeam from '../Interfaces/teams/ITeam';
import LeaderboardAway from '../entities/LeaderboardAway';
import LeaderboardGeneral from '../entities/LeaderboardGeneral';

class LeaderboardService {
  constructor(
    private matchModel: IMatchModelFinished,
    private teamModel: ITeamModel,
  ) { }

  private async getTeamNames(): Promise<ITeam[]> {
    const teams = await this.teamModel.findAll();
    return teams;
  }

  #getSortedLeaderboard = (data: ILeaderboardFull[]): ILeaderboardFull[] => {
    const sorted = data.sort((a: ILeaderboardFull, b: ILeaderboardFull) => {
      if (a.totalPoints !== b.totalPoints) return b.totalPoints - a.totalPoints;
      if (a.totalVictories !== b.totalVictories) return b.totalVictories - a.totalVictories;
      if (a.goalsBalance !== b.goalsBalance) return b.goalsBalance - a.goalsBalance;
      return b.goalsFavor - a.goalsFavor;
    });
    return sorted;
  };

  public async getHomeLeaderboard(): Promise<ServiceResponse<ILeaderboardFull[]>> {
    const teams = await this.getTeamNames();
    const allMatches = await this.matchModel.findAllMatchesFinished() as IMatchInfos[];

    let leaderboardHome = teams.map((team: ITeam) => {
      const leaderboard = new LeaderboardHome(team, allMatches);
      return leaderboard.getLeadboardObject();
    });

    leaderboardHome = this.#getSortedLeaderboard(leaderboardHome);
    return { status: 'SUCCESSFUL', data: sortLeaderboard(leaderboardHome) };
  }

  public async getAwayLeaderboard(): Promise<ServiceResponse<ILeaderboardFull[]>> {
    const teams = await this.getTeamNames();
    const allMatches = await this.matchModel.findAllMatchesFinished() as IMatchInfos[];

    let leaderboardAway = teams.map((team: ITeam) => {
      const leaderboard = new LeaderboardAway(team, allMatches);
      return leaderboard.getLeadboardObject();
    });
    leaderboardAway = this.#getSortedLeaderboard(leaderboardAway);
    return { status: 'SUCCESSFUL', data: sortLeaderboard(leaderboardAway) };
  }

  public async getGeneralLeaderboard(): Promise<ServiceResponse<ILeaderboardFull[]>> {
    const teams = await this.getTeamNames();
    const allMatches = await this.matchModel.findAllMatchesFinished() as IMatchInfos[];

    let leaderboardGeneral = teams.map((team: ITeam) => {
      const leaderboard = new LeaderboardGeneral(team, allMatches);
      return leaderboard.getLeadboardObject();
    });
    leaderboardGeneral = this.#getSortedLeaderboard(leaderboardGeneral);
    return { status: 'SUCCESSFUL', data: sortLeaderboard(leaderboardGeneral) };
  }
}

export default LeaderboardService;
