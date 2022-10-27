import HttpClient from './httpClient';
import { IUser, IUserResponsePayload } from '../interfaces/IUser';

export interface LoginResponse {
  token: string;
  user: IUserResponsePayload;
}

class UsersService {
  static async signIn(loginUser: IUser): Promise<LoginResponse> {
    const { email, password } = loginUser;

    const { data } = await HttpClient.api.post('/session', { email, password });
    return data;
  }

  static async create(user: IUser): Promise<void> {
    const { userName, email, password } = user;

    const { data } = await HttpClient.api.post('/users', { userName, email, password });
    return data;
  }

  static async delete(id: string): Promise<string> {
    const { statusText } = await HttpClient.api.delete(`/users/${id}`);
    return statusText;
  }
}

export default UsersService;
