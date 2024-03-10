import { /* ILeaderboard, */ ILeaderboardFull } from '../Interfaces/leaderboard/ILeaderboard';
import { IMatchModelFinished } from '../Interfaces/matches/IMatchModel';
import MatchModel from '../models/MatchModel';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import IMatchInfos from '../Interfaces/matches/IMatchInfos';

const getGames = (data: IMatchInfos[], name: string): number => {
  const totalGames = data.filter((match: IMatchInfos) =>
    match.homeTeam.teamName === name).length;
  return totalGames;
};

const getVictories = (data: IMatchInfos[], name: string): number => {
  const victories = data.filter((match: IMatchInfos) =>
    (match.homeTeam.teamName === name && match.homeTeamGoals > match.awayTeamGoals)).length;
  return victories;
};

const getLosses = (data: IMatchInfos[], name: string): number => {
  const victories = data.filter((match: IMatchInfos) =>
    (match.homeTeam.teamName === name && match.homeTeamGoals < match.awayTeamGoals)).length;
  return victories;
};

const getDraws = (data: IMatchInfos[], name: string): number => {
  const victories = data.filter((match: IMatchInfos) =>
    (match.homeTeam.teamName === name && match.homeTeamGoals === match.awayTeamGoals)).length;
  return victories;
};

const getPoints = (victories: number, draws: number): number => {
  const victoryPoints = victories * 3;
  return victoryPoints + draws;
};

const getGoalsFavor = (data: IMatchInfos[], name: string): number => {
  const homeGoals = data.filter((match: IMatchInfos) => match.homeTeam.teamName === name)
    .reduce((acc, match) => acc + match.homeTeamGoals, 0);

  return homeGoals;
};

const getGoalsOwn = (data: IMatchInfos[], name: string): number => {
  const homeGoalsOwn = data.filter((match: IMatchInfos) => match.homeTeam.teamName === name)
    .reduce((acc, match) => acc + match.awayTeamGoals, 0);

  return homeGoalsOwn;
};

const getEfficiency = (points: number, games: number) =>
  Number(((points / (games * 3)) * 100).toFixed(2));

const formLeaderboard = async (data: IMatchInfos[]): Promise<ILeaderboardFull[]> => {
  const leaderboardPromises = data.map(async (match: IMatchInfos) => {
    const name = match.homeTeam.teamName;
    const victories = getVictories(data, name);
    const draws = getDraws(data, name);
    return { name,
      totalPoints: getPoints(victories, draws),
      totalGames: getGames(data, name),
      totalVictories: victories,
      totalDraws: draws,
      totalLosses: getLosses(data, name),
      goalsFavor: getGoalsFavor(data, name),
      goalsOwn: getGoalsOwn(data, name),
      goalsBalance: getGoalsFavor(data, name) - getGoalsOwn(data, name),
      efficiency: getEfficiency(getPoints(victories, draws), getGames(data, name)) };
  });
  const resolved = await Promise.all(leaderboardPromises);
  return resolved;
};

class LeaderboardSerice {
  constructor(private leaderboardModel: IMatchModelFinished = new MatchModel()) {
  }

  private async getMatches(): Promise<IMatchInfos[]> {
    const allFinishedMatches = await this.leaderboardModel.findAllMatchesFinished();
    const allFinishedMatchesInfos: IMatchInfos[] = allFinishedMatches as IMatchInfos[];
    return allFinishedMatchesInfos;
  }

  // private async getLeaderdboard(): Promise<ILeaderboard[]> {
  //   const allMatches = await this.getMatches();
  //   const leaderboardPromises = (await this.getMatches()).map(async (match: IMatchInfos) => {
  //     const name = match.homeTeam.teamName; const victories = getVictories(allMatches, name);
  //     const draws = getDraws(allMatches, name);
  //     return {
  //       name,
  //       totalPoints: getPoints(victories, draws),
  //       totalGames: getGames(allMatches, name),
  //       totalVictories: victories,
  //       totalDraws: draws,
  //       totalLosses: getLosses(allMatches, name),
  //       goalsFavor: getGoalsFavor(allMatches, name),
  //       goalsOwn: getGoalsOwn(allMatches, name),
  //     };
  //   });
  //   const resolved = await Promise.all(leaderboardPromises);
  //   const unique = resolved.filter((v, i, a) => a.findIndex((t) => (t.name === v.name)) === i);
  //   return unique;
  // }

  private async getFullLeaderdboard(): Promise<ILeaderboardFull[]> {
    const allMatches = await this.getMatches();
    const duplicatedArray = await formLeaderboard(allMatches);
    const filtered: ILeaderboardFull[] = duplicatedArray
      .filter((boardInfos: ILeaderboardFull, index: number) => duplicatedArray
        .findIndex((t: ILeaderboardFull) => (t.name === boardInfos.name)) === index);

    return filtered;
  }

  public async getFullLeaderboardSorted(): Promise<ServiceResponse<ILeaderboardFull[]>> {
    const leaderboard = await this.getFullLeaderdboard();
    const sorted = leaderboard.sort((a: ILeaderboardFull, b: ILeaderboardFull) => {
      if (a.totalPoints !== b.totalPoints) return b.totalPoints - a.totalPoints;
      if (a.totalVictories !== b.totalVictories) return b.totalVictories - a.totalVictories;
      if (a.goalsBalance !== b.goalsBalance) return b.goalsBalance - a.goalsBalance;
      return b.goalsFavor - a.goalsFavor;
    });
    return { status: 'SUCCESSFUL', data: sorted };
  }

  // public async getFullLeaderboardNotSorted(): Promise<ServiceResponse<ILeaderboardFull[]>> {
  //   const leaderboard = await this.getFullLeaderdboard();
  //   return { status: 'SUCCESSFUL', data: leaderboard };
  // }

  // public async getLeaderBoardSorted(): Promise<ServiceResponse<ILeaderboard[]>> {
  //   const leaderboard = await this.getLeaderdboard();
  //   const sorted = leaderboard.sort((a: ILeaderboard, b: ILeaderboard) => {
  //     if (a.totalVictories !== b.totalVictories) {
  //       return b.totalVictories - a.totalVictories;
  //     }
  //     return b.goalsFavor - a.goalsFavor;
  //   });
  //   return { status: 'SUCCESSFUL', data: sorted };
  // }
}

export default LeaderboardSerice;
