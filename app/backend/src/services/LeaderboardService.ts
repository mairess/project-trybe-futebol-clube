import { ServiceResponse } from '../Interfaces/ServiceResponse';
import { ILeaderboardFull } from '../Interfaces/leaderboard/ILeaderboard';
import { IMatchModelFinished } from '../Interfaces/matches/IMatchModel';
import MatchModel from '../models/MatchModel';
import IMatchInfos from '../Interfaces/matches/IMatchInfos';
import formHomeLeaderboard from './utils/leaderboardHomeUtils';
import formAwayLeaderboard from './utils/leaderboardAwayUtils';
import sortLeaderboard from './utils/sortLeaderboard';

class LeaderboardSerice {
  constructor(private leaderboardModel: IMatchModelFinished = new MatchModel()) {
  }

  public async getHomeLeaderdboard(): Promise<ServiceResponse<ILeaderboardFull[]>> {
    const allMatches = await this.leaderboardModel.findAllMatchesFinished() as IMatchInfos[];
    const duplicatedArray = await formHomeLeaderboard(allMatches);
    const filtered: ILeaderboardFull[] = duplicatedArray
      .filter((boardInfos: ILeaderboardFull, index: number) => duplicatedArray
        .findIndex((t: ILeaderboardFull) => (t.name === boardInfos.name)) === index);

    return { status: 'SUCCESSFUL', data: sortLeaderboard(filtered) };
  }

  public async getAwayLeaderdboard(): Promise<ServiceResponse<ILeaderboardFull[]>> {
    const allMatches = await this.leaderboardModel.findAllMatchesFinished() as IMatchInfos[];
    const duplicatedArray = await formAwayLeaderboard(allMatches);
    const filtered: ILeaderboardFull[] = duplicatedArray
      .filter((boardInfos: ILeaderboardFull, index: number) => duplicatedArray
        .findIndex((t: ILeaderboardFull) => (t.name === boardInfos.name)) === index);

    return { status: 'SUCCESSFUL', data: sortLeaderboard(filtered) };
  }
}

export default LeaderboardSerice;
