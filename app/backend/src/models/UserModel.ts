import { IUserModel } from '../Interfaces/users/IUserModel';
import IUser from '../Interfaces/users/IUser';
import SequelizeUser from '../database/models/SequelizeUser';

class UserModel implements IUserModel {
  private model = SequelizeUser;

  async findAll(): Promise<IUser[]> {
    const dbData = await this.model.findAll();
    return dbData;
  }

  async findById(id: IUser['id']): Promise<IUser | null> {
    const dbData = await this.model.findByPk(id);
    if (dbData === null) return null;
    return dbData;
  }

  async findByEmail(email: IUser['email']): Promise<IUser | null> {
    const user = await this.model.findOne({ where: { email } });
    if (!user) return null;
    const { id, username, role, password } = user;
    return { id, username, role, email, password };
  }
}

export default UserModel;