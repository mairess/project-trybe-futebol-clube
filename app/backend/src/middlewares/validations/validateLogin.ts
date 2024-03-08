import schemaLogin from './schemas';
import { ILogin } from '../../Interfaces/ILogin';

const validateLogin = (keysObjectToValidate: ILogin) => {
  const { error } = schemaLogin.validate(keysObjectToValidate);
  let statusMessage = 'UNAUTHORIZED';
  if (error?.message === 'All fields must be filled') {
    statusMessage = 'BAD_REQUEST';
  }

  if (error) return { status: statusMessage, data: { message: error.message } };
};

export default validateLogin;
