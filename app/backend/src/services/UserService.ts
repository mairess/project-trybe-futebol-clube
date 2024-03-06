import * as bcrypt from 'bcryptjs';
import { IToken } from '../Interfaces/IToken';
import { ILogin } from '../Interfaces/users/IUser';
import UserModel from '../models/UserModel';
import { ServiceMessage, ServiceResponse } from '../Interfaces/ServiceResponse';
import { IUserModel } from '../Interfaces/users/IUserModel';
import JWT from '../utils/JWT';

const invalidMailOrPassword = 'Invalid email or password';

class UserService {
  constructor(
    private userModel: IUserModel = new UserModel(),
    private jwtService = JWT,
  ) { }

  public async login(data: ILogin): Promise<ServiceResponse<ServiceMessage | IToken>> {
    const user = await this.userModel.findByEmail(data.email);
    if (user) {
      if (!bcrypt.compareSync(data.password, user.password)) {
        return { status: 'UNAUTHORIZED', data: { message: invalidMailOrPassword } };
      }
      const { email, role } = user;
      const token = this.jwtService.sign({ email, role });
      return { status: 'SUCCESSFUL', data: { token } };
    }
    return { status: 'UNAUTHORIZED', data: { message: invalidMailOrPassword } };
  }
}

export default UserService;
