import HttpClient from './httpClient';
import { IUserResponsePayload } from '../interfaces/IUser';

interface LoginResponse {
  token: string;
  user: IUserResponsePayload;
}

class UsersService {
  static async signIn(email: string, password: string): Promise<LoginResponse> {
    const { data } = await HttpClient.api.post('/session', { email, password });

    return data;
  }

  static async create(): Promise<void> {
    const obj = {
      postOwnerId: 'e6f38942-a5a2-4513-b27d-a5875255ff99',
      title: 'fskjdfskdfhjskdjfhskdjfhsdf',
      content: 'vamo ',
      category: ['Games', 'Cultura'],
    };
    const { data } = await HttpClient.api.post('/post', obj);
    return data;
  }

  static async update(name: string, lastName: string, email: string, id: string): Promise<void> {
    const obj = {
      first_name: name,
      last_name: lastName,
      email,
    };
    const { data } = await HttpClient.api.put(`/users/${id}`, obj);
    return data;
  }

  static async delete(id: string): Promise<string> {
    const { statusText } = await HttpClient.api.delete(`/users/${id}`);
    return statusText;
  }
}

export default UsersService;
