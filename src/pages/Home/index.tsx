import { useContext, useEffect, useState } from 'react';
import { Row, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Box, Button, Stack } from '@mui/material';
import { IPost } from '../../interfaces';
import Text from '../../components/Text';
import toastMsg, { ToastType } from '../../utils/toastMsg';
import PostsService from '../../services/posts.services/posts.service';
import formatDate from '../../utils/formatDate';
import UsersService from '../../services/users.service';
import { AuthContext } from '../../contexts/UserContext/loginContext';
import { IUser } from '../../interfaces/IUser';
import CreateUserModal from '../../components/CreateUserModal';
import LoginModal from './LoginModal';
import style from './style.module.scss';

const Home: React.FunctionComponent = () => {
  const [allPosts, setAllPosts] = useState<IPost[]>([]);
  const [openCreateUSER, setOpenCreateUSER] = useState(false);
  const [openModalLogin, setOpenModalLogin] = useState(false);
  const handleCloseModalNewUser = (): void => {
    setOpenCreateUSER(!openCreateUSER);
  };
  const handleCloseModalLogin = (): void => {
    setOpenModalLogin(!openModalLogin);
  };
  const { handleLogin, loggedUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const onSubmit = async (user: IUser): Promise<void> => {
    try {
      await UsersService.create(user);
      toastMsg(ToastType.Info, 'Usuário criado');
    } catch (error) {
      toastMsg(ToastType.Error, 'Falha criar usuário');
    }
  };

  const onSubmitLogin = async (loginUser: IUser): Promise<void> => {
    try {
      const data = await UsersService.signIn(loginUser);
      const userRes = {
        id: data.user.id,
        userName: data.user.userName,
        admin: data.user.admin,
      };

      handleLogin(data.token, userRes);

      if (data.token) {
        navigate('/MyPosts');
      }

      toastMsg(ToastType.Success, 'Logou com sucesso! ');
    } catch (error) {
      toastMsg(ToastType.Error, 'Falha ao realizar o login');
    }
  };

  useEffect(() => {
    PostsService.readAll()
      .then((data) => {
        setAllPosts(data);
      })
      .catch(() => toastMsg(ToastType.Error, 'Falha ao carregar posts'));
  }, []);

  return (
    <Container className={style.background} fluid>
      <Row className={style.header}>
        <Text as="h1" size="2rem" weight={700} className={style.nameHeader}>
          Johnsons
        </Text>
        <Stack direction="row-reverse" spacing={2}>
          <Text as="small" size=".85rem" weight={400}>
            {loggedUser?.userName}
          </Text>
          <Button variant="contained" onClick={() => handleCloseModalNewUser()}>
            Criar novo usuário
          </Button>
          {openCreateUSER && (
            <CreateUserModal key={Math.random()} onSubmit={onSubmit} handleCloseModal={handleCloseModalNewUser} />
          )}
          <Button variant="contained" onClick={() => handleCloseModalLogin()}>
            Fazer Login
          </Button>
          {openModalLogin && <LoginModal onSubmitLogin={onSubmitLogin} handleCloseModal={handleCloseModalLogin} />}
        </Stack>
      </Row>
      <Box sx={{ width: '100%', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', margin: '10px' }}>
        {allPosts.map((u: IPost) => (
          <Card sx={{ width: 400, margin: '10px', borderRadius: '6%' }}>
            <CardContent>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                {u.postOwnerUserName} em {u.category}
              </Typography>
              <Typography variant="h5" component="div">
                {u.title}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {formatDate(u.created_at)}
              </Typography>
              <Typography variant="body2">{u.content}</Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Container>
  );
};

export default Home;
