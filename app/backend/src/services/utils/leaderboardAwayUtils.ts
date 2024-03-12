import ITeam from '../../Interfaces/teams/ITeam';
import { ILeaderboardFull } from '../../Interfaces/leaderboard/ILeaderboard';
import IMatchInfos from '../../Interfaces/matches/IMatchInfos';

const getGames = (data: IMatchInfos[], team: ITeam): number => {
  const totalGames = data.filter((match: IMatchInfos) =>
    match.awayTeam.teamName === team.teamName).length;
  return totalGames;
};

const getVictories = (data: IMatchInfos[], team: ITeam): number => {
  const victories = data.filter((match: IMatchInfos) =>
    (match.awayTeam.teamName === team.teamName
      && match.awayTeamGoals > match.homeTeamGoals)).length;
  return victories;
};

const getLosses = (data: IMatchInfos[], team: ITeam): number => {
  const losses = data.filter((match: IMatchInfos) =>
    (match.awayTeam.teamName === team.teamName
      && match.awayTeamGoals < match.homeTeamGoals)).length;
  return losses;
};

const getDraws = (data: IMatchInfos[], team: ITeam): number => {
  const draws = data.filter((match: IMatchInfos) =>
    (match.awayTeam.teamName === team.teamName
      && match.awayTeamGoals === match.homeTeamGoals)).length;
  return draws;
};

const getPoints = (victories: number, draws: number): number => {
  const victoryPoints = victories * 3;
  return victoryPoints + draws;
};

const getGoalsFavor = (data: IMatchInfos[], team: ITeam): number => {
  const goalsFavor = data.filter((match: IMatchInfos) => match.awayTeam.teamName === team.teamName)
    .reduce((acc, match) => acc + match.awayTeamGoals, 0);

  return goalsFavor;
};

const getGoalsOwn = (data: IMatchInfos[], team: ITeam): number => {
  const goalsOwn = data.filter((match: IMatchInfos) => match.awayTeam.teamName === team.teamName)
    .reduce((acc, match) => acc + match.homeTeamGoals, 0);

  return goalsOwn;
};

const getEfficiency = (points: number, games: number) =>
  Number(((points / (games * 3)) * 100).toFixed(2));

const formAwayBoard = async (data: IMatchInfos[], teams: ITeam[]): Promise<ILeaderboardFull[]> => {
  const leaderboardPromises = teams.map(async (team: ITeam) => {
    const victories = getVictories(data, team);
    const draws = getDraws(data, team);
    return { name: team.teamName,
      totalPoints: getPoints(victories, draws),
      totalGames: getGames(data, team),
      totalVictories: victories,
      totalDraws: draws,
      totalLosses: getLosses(data, team),
      goalsFavor: getGoalsFavor(data, team),
      goalsOwn: getGoalsOwn(data, team),
      goalsBalance: getGoalsFavor(data, team) - getGoalsOwn(data, team),
      efficiency: getEfficiency(getPoints(victories, draws), getGames(data, team)) };
  });
  const resolved = await Promise.all(leaderboardPromises);
  return resolved;
};

export default formAwayBoard;
