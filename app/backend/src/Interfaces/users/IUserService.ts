import { IPayload, IRole } from '../IRole';
import { IToken } from '../IToken';
import { ServiceMessage, ServiceResponse } from '../ServiceResponse';
import { ILogin } from './IUser';

interface IUserService {
  login(data: ILogin): Promise<ServiceResponse<ServiceMessage | IToken>>,
  getRole(userPayload: IPayload): Promise<ServiceResponse<ServiceMessage | IRole>>
}

export default IUserService;
