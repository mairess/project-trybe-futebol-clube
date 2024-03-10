import IMatch from './IMatch';

export default interface IMatchInfos extends IMatch {
  homeTeam: {
    teamName: string
  },
  awayTeam: {
    teamName: string
  }
}
