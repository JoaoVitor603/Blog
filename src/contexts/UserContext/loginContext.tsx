import { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IResponseLogin } from '../../interfaces/IResponseLogin';
import HttpClient from '../../services/httpClient';
import toastMsg, { ToastType } from '../../utils/toastMsg';
import { IauthContext, IProvider, IUsercontext } from './interfaces';

export const AuthContext = createContext<IauthContext>({} as IauthContext);

export const AuthProvider = ({ children }: IProvider): React.ReactElement => {
  const userToken = localStorage.getItem('userToken');
  const userPermission = localStorage.getItem('userPermission');
  const id = localStorage.getItem('userID');
  const userName = localStorage.getItem('userName');
  const [token, setToken] = useState<string>(userToken || '');
  const [loggedUser, setLoggedUser] = useState<IUsercontext>({ id, userName, admin: userPermission });

  const navigate = useNavigate();
  HttpClient.api.defaults.headers.common.Authorization = `Bearer ${token}`;

  const handleLogin = (resToken: string, resUser: IResponseLogin): void => {
    try {
      setToken(resToken);

      setLoggedUser({
        id: resUser.id,
        userName: resUser.userName,
        admin: resUser.admin ? 'Administrador' : 'Colaborador',
      });
      localStorage.setItem('userToken', resToken);
      localStorage.setItem('userPermission', resUser.admin ? 'Administrador' : 'Colaborador');
      localStorage.setItem('userName', resUser.userName);
      localStorage.setItem('userID', resUser.id);
      if (resToken) {
        navigate('/MyPosts');
      }
    } catch (error) {
      toastMsg(ToastType.Error, (error as Error).message);
    }
  };

  const handleSignOut = (): void => {
    setToken('');
    setLoggedUser({
      id: '',
      userName: '',
      admin: 'false',
    });
    localStorage.removeItem('userID');
    localStorage.removeItem('userToken');
    localStorage.removeItem('userPermission');
    localStorage.removeItem('userName');
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ token, handleLogin, handleSignOut, loggedUser, signed: !!token }}>
      {children}
    </AuthContext.Provider>
  );
};
