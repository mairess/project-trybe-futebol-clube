import { ServiceMessage, ServiceResponse } from '../ServiceResponse';
import IMatch from './IMatch';

interface IMatchService {
  getAllMatches(): Promise<ServiceResponse<IMatch[]>>,
  getAllMatchesInProgress(): Promise<ServiceResponse<IMatch[]>>,
  findAllMatchesFinished(): Promise<ServiceResponse<IMatch[]>>,
  getMatchById(id: number): Promise<ServiceResponse<IMatch>>,
  finishMatch(id: number): Promise<ServiceResponse<ServiceMessage>>,
  updateMatch(id: number, score: IMatch): Promise<ServiceResponse<IMatch>>
  createNewMatch(matchData: IMatch): Promise<ServiceResponse<IMatch | ServiceMessage>>
}

export default IMatchService;
