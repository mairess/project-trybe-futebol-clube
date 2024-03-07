import IUser from './IUser';
// import { ICRUDModelReader } from '../ICRUDModel';

export interface IUserModel {
  findByEmail(email: IUser['email']): Promise<IUser | null>,
}
