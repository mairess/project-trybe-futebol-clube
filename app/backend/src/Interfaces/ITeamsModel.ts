import ITeams from './ITeams';
import { ICRUDModelReader } from './ICRUDModel';

export interface ITeamsModel extends ICRUDModelReader<ITeams> {
  findAll(): Promise<ITeams[]>
}
