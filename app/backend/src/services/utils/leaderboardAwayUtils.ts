import { ILeaderboardFull } from '../../Interfaces/leaderboard/ILeaderboard';
import IMatchInfos from '../../Interfaces/matches/IMatchInfos';

const getGames = (data: IMatchInfos[], name: string): number => {
  const totalGames = data.filter((match: IMatchInfos) =>
    match.awayTeam.teamName === name).length;
  return totalGames;
};

const getVictories = (data: IMatchInfos[], name: string): number => {
  const victories = data.filter((match: IMatchInfos) =>
    (match.awayTeam.teamName === name && match.awayTeamGoals > match.homeTeamGoals)).length;
  return victories;
};

const getLosses = (data: IMatchInfos[], name: string): number => {
  const victories = data.filter((match: IMatchInfos) =>
    (match.awayTeam.teamName === name && match.awayTeamGoals < match.homeTeamGoals)).length;
  return victories;
};

const getDraws = (data: IMatchInfos[], name: string): number => {
  const victories = data.filter((match: IMatchInfos) =>
    (match.awayTeam.teamName === name && match.awayTeamGoals === match.homeTeamGoals)).length;
  return victories;
};

const getPoints = (victories: number, draws: number): number => {
  const victoryPoints = victories * 3;
  return victoryPoints + draws;
};

const getGoalsFavor = (data: IMatchInfos[], name: string): number => {
  const homeGoals = data.filter((match: IMatchInfos) => match.awayTeam.teamName === name)
    .reduce((acc, match) => acc + match.awayTeamGoals, 0);

  return homeGoals;
};

const getGoalsOwn = (data: IMatchInfos[], name: string): number => {
  const awayGoalsOwn = data.filter((match: IMatchInfos) => match.awayTeam.teamName === name)
    .reduce((acc, match) => acc + match.homeTeamGoals, 0);

  return awayGoalsOwn;
};

const getEfficiency = (points: number, games: number) =>
  Number(((points / (games * 3)) * 100).toFixed(2));

const formAwayBoard = async (data: IMatchInfos[], names: string[]): Promise<ILeaderboardFull[]> => {
  const leaderboardPromises = names.map(async (name: string) => {
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

export default formAwayBoard;
