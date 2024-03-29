import * as bcrypt from 'bcryptjs';
import { IPayload, IRole } from '../Interfaces/IRole';
import { IToken } from '../Interfaces/IToken';
import { ILogin } from '../Interfaces/users/IUser';
import { ServiceMessage, ServiceResponse } from '../Interfaces/ServiceResponse';
import { IUserModel } from '../Interfaces/users/IUserModel';
import JWT from '../utils/JWT';

const invalidMailOrPassword = 'Invalid email or password';

class UserService {
  #userModel: IUserModel;
  constructor(userModel: IUserModel, private jwtService = JWT) {
    this.#userModel = userModel;
  }

  async login(data: ILogin): Promise<ServiceResponse<ServiceMessage | IToken>> {
    const user = await this.#userModel.findByEmail(data.email);
    if (!user || !bcrypt.compareSync(data.password, user.password)) {
      return { status: 'UNAUTHORIZED', data: { message: invalidMailOrPassword } };
    }
    const token = this.jwtService.sign({ email: user.email, role: user.role });
    return { status: 'SUCCESSFUL', data: { token } };
  }

  async getRole(userPayload: IPayload): Promise<ServiceResponse<ServiceMessage | IRole>> {
    const { email, role } = userPayload;
    const user = await this.#userModel.findByEmail(email);
    if (!user) {
      return { status: 'NOT_FOUND', data: { message: 'User not found!' } };
    }
    return { status: 'SUCCESSFUL', data: { role } };
  }
}

export default UserService;
