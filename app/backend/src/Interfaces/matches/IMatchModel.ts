import IMatch from './IMatch';
import { ICRUDModelReader } from '../ICRUDModel';

export interface IMatchModel extends ICRUDModelReader<IMatch> {
  findAll(): Promise<IMatch[]>
  findAllMatchesInProgress(): Promise<IMatch[]>
  findAllMatchesFinished(): Promise<IMatch[]>
  findAllSimultaneous(id1: number, id2: number):Promise<IMatch[] | null>
  finishMatch(id: number): Promise<void | null>
  updateMatch(id: number, score: IMatch): Promise<void>
  createNewMatch(matchData: IMatch): Promise<IMatch>
}
