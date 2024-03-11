import { ILeaderboardFull } from '../../Interfaces/leaderboard/ILeaderboard';
import IMatchInfos from '../../Interfaces/matches/IMatchInfos';

const getGames = (data: IMatchInfos[], name: string): number => {
  const totalGames = data.filter((match: IMatchInfos) =>
    match.awayTeam.teamName === name || match.homeTeam.teamName === name).length;
  return totalGames;
};

const getVictories = (data: IMatchInfos[], name: string): number => {
  const victories = data.filter((match: IMatchInfos) => (
    match.awayTeam.teamName === name && match.awayTeamGoals > match.homeTeamGoals
  ) || (
    match.homeTeam.teamName === name && match.homeTeamGoals > match.awayTeamGoals)).length;
  return victories;
};

const getLosses = (data: IMatchInfos[], name: string): number => {
  const losses = data.filter((match: IMatchInfos) => (
    match.awayTeam.teamName === name && match.awayTeamGoals < match.homeTeamGoals
  ) || (
    match.homeTeam.teamName === name && match.homeTeamGoals < match.awayTeamGoals
  )).length;
  return losses;
};

const getDraws = (data: IMatchInfos[], name: string): number => {
  const draws = data.filter((match: IMatchInfos) =>
    (match.awayTeamGoals === match.homeTeamGoals)
    && (match.awayTeam.teamName === name || match.homeTeam.teamName === name)).length;
  return draws;
};

const getPoints = (victories: number, draws: number): number => {
  const victoryPoints = victories * 3;
  return victoryPoints + draws;
};

const getGoalsFavor = (data: IMatchInfos[], name: string): number => {
  const homeGoals = data.filter((match: IMatchInfos) => match.homeTeam.teamName === name)
    .reduce((acc, match) => acc + match.homeTeamGoals, 0);

  const awayGoals = data.filter((match: IMatchInfos) => match.awayTeam.teamName === name)
    .reduce((acc, match) => acc + match.awayTeamGoals, 0);

  return homeGoals + awayGoals;
};

const getGoalsOwn = (data: IMatchInfos[], name: string): number => {
  const homeGoalsOwn = data.filter((match: IMatchInfos) => match.homeTeam.teamName === name)
    .reduce((acc, match) => acc + match.awayTeamGoals, 0);

  const awayGoalsOwn = data.filter((match: IMatchInfos) => match.awayTeam.teamName === name)
    .reduce((acc, match) => acc + match.homeTeamGoals, 0);

  return homeGoalsOwn + awayGoalsOwn;
};

const getEfficiency = (points: number, games: number) =>
  Number(((points / (games * 3)) * 100).toFixed(2));

const formGeneral = async (data: IMatchInfos[], names: string[]): Promise<ILeaderboardFull[]> => {
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

export default formGeneral;
