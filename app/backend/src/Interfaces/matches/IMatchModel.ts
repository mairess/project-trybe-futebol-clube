import IMatch from './IMatch';
import { ICRUDModelReader } from '../ICRUDModel';

export interface IMatchModel extends ICRUDModelReader<IMatch> {
  findAll(): Promise<IMatch[]>
  findAllMatchesInProgress(): Promise<IMatch[]>
  findAllMatchesFinished(): Promise<IMatch[]>
  finishMatch(id: number): Promise<void | null>
  updateMatch(id: number, score: IMatch): Promise<IMatch | null>
  createNewMatch(matchData: IMatch): Promise<IMatch>
}
