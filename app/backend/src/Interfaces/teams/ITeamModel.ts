import ITeam from './ITeam';
import { ICRUDModelReader } from '../ICRUDModel';

export interface ITeamModel extends ICRUDModelReader<ITeam> {
  findAll(): Promise<ITeam[]>
}
