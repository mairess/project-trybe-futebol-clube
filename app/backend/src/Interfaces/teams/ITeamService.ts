import { ServiceResponse } from '../ServiceResponse';
import ITeam from './ITeam';

interface ITeamService {
  getAllTeams(): Promise<ServiceResponse<ITeam[]>>,
  getTeamById(id: number): Promise<ServiceResponse<ITeam>>
}

export default ITeamService;
