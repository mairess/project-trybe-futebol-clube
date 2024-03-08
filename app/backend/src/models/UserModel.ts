import { IUserModel } from '../Interfaces/users/IUserModel';
import IUser from '../Interfaces/users/IUser';
import SequelizeUser from '../database/models/SequelizeUser';

class UserModel implements IUserModel {
  private model = SequelizeUser;

  async findByEmail(email: IUser['email']): Promise<IUser | null> {
    const user = await this.model.findOne({ where: { email } });
    if (!user) return null;
    return { ...user.dataValues };
  }
}

export default UserModel;
