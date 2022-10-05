import { IResponseLogin } from '../../interfaces/IResponseLogin';

export interface IauthContext {
  token: string;
  LogedUser: IUsercontext;
  handleLogin: (resToken: string, resUser: IResponseLogin) => void;
  handleSignOut: () => void;
  signed: boolean;
}

export interface IUsercontext {
  id: string | null;
  userName: string | null;
  admin: string | null;
}

export interface IProvider {
  children: JSX.Element;
}
