import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IResponseLogin } from '../../interfaces/IResponseLogin';
import HttpClient from '../../services/httpClient';
import toastMsg, { ToastType } from '../../utils/toastMsg';
import { IauthContext, IProvider, IUsercontext } from './interfaces';

export const AuthContext = createContext<IauthContext>({} as IauthContext);

export const AuthProvider = ({ children }: IProvider): React.ReactElement => {
  const [token, setToken] = useState<string>('');
  const [LogedUser, setLogedUser] = useState<IUsercontext>({} as IUsercontext);

  const navigate = useNavigate();

  useEffect(() => {
    const userToken = localStorage.getItem('userToken');
    const userPermission = localStorage.getItem('userPermission');
    const userId = localStorage.getItem('userID');
    const userName = localStorage.getItem('userName');

    if (userToken) {
      setToken(userToken);
      setLogedUser({
        id: userId,
        userName,
        admin: userPermission,
      });
    }
  }, []);

  const handleLogin = (resToken: string, resUser: IResponseLogin): void => {
    try {
      setToken(resToken);
      setLogedUser({
        id: resUser.id,
        userName: resUser.userName,
        admin: resUser.admin ? 'Administrador' : 'Colaborador',
      });
      localStorage.setItem('userToken', resToken);
      localStorage.setItem('userPermission', resUser.admin ? 'Administrador' : 'Colaborador');
      localStorage.setItem('userName', resUser.userName);
      localStorage.setItem('userID', resUser.id);
      if (resToken) {
        HttpClient.api.defaults.headers.common.Authorization = `Bearer ${resToken}`;
        navigate('/MyPosts');
      }
    } catch (error) {
      toastMsg(ToastType.Error, (error as Error).message);
    }
  };

  const handleSignOut = (): void => {
    setToken('');
    setLogedUser({
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
    <AuthContext.Provider value={{ token, handleLogin, handleSignOut, LogedUser, signed: !!token }}>
      {children}
    </AuthContext.Provider>
  );
};
