import IUser from './IUser';
import { ICRUDModelReader } from '../ICRUDModel';

export interface IUserModel extends ICRUDModelReader<IUser> {
  findByEmail(email: IUser['email']): Promise<IUser | null>,
}
