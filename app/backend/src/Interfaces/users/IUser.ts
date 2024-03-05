import { Identifiable } from '..';

export default interface IUser extends Identifiable {
  id: number,
  username: string
  role: string
  email: string
  password: string
}
