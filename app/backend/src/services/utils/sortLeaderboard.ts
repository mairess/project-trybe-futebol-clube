import { ILeaderboardFull } from '../../Interfaces/leaderboard/ILeaderboard';

const sortLeaderboard = (data: ILeaderboardFull[]): ILeaderboardFull[] => {
  const sorted = data.sort((a: ILeaderboardFull, b: ILeaderboardFull) => {
    if (a.totalPoints !== b.totalPoints) return b.totalPoints - a.totalPoints;
    if (a.totalVictories !== b.totalVictories) return b.totalVictories - a.totalVictories;
    if (a.goalsBalance !== b.goalsBalance) return b.goalsBalance - a.goalsBalance;
    return b.goalsFavor - a.goalsFavor;
  });
  return sorted;
};

export default sortLeaderboard;
