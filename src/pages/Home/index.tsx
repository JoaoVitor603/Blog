import { Row, Container } from 'react-bootstrap';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { useContext, useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import { Box, Modal, Stack, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Text from '../../components/Text';
import style from './style.module.scss';
import { IPost } from '../../interfaces';
import toastMsg, { ToastType } from '../../utils/toastMsg';
import PostsService from '../../services/posts.services/posts.service';
import formatDate from '../../utils/formatDate';
import UsersService from '../../services/users.service';
import HttpClient from '../../services/httpClient';
import { AuthContext } from '../../contexts/UserContext/loginContext';
import CreateUserModal from '../../components/CrateUserModal';

const Home: React.FunctionComponent = () => {
  const [showModalLogin, setShowModalLogin] = useState(false);
  const [allPosts, setAllPosts] = useState<IPost[]>([]);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { handleLogin } = useContext(AuthContext);
  const handleCloseModal = (): void => setShowModalLogin(!showModalLogin);
  const navigate = useNavigate();

  const handleSubmit = async (c: React.FormEvent<HTMLFormElement>): Promise<void> => {
    c.preventDefault();
    try {
      const data = await UsersService.signIn(email, password);
      const userRes = {
        id: data.user.id,
        userName: data.user.userName,
        admin: data.user.admin,
      };

      handleLogin(data.token, userRes);

      if (data.token) {
        HttpClient.api.defaults.headers.common.Authorization = `Bearer ${data.token}`;
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
      <Modal open={showModalLogin} onClose={handleCloseModal} sx={{ borderRadius: '6%' }}>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 600,
            height: 400,
            bgcolor: 'background.paper',
            borderRadius: '6px',
            boxShadow: 24,
            p: 4,
            flexDirection: 'column',
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Faça seu login
          </Typography>
          <TextField
            required
            fullWidth
            name="E-mail"
            label="Digite seu e-mail"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="new-password"
            value={password}
            onChange={(c) => setPassword(c.target.value)}
          />
          <Stack direction="row-reverse" spacing={2}>
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Entrar
            </Button>
          </Stack>
        </Box>
      </Modal>
      <Row className={style.header}>
        <Text as="h1" size="2rem" weight={700} className={style.nameHeader}>
          Johnsons
        </Text>
        <Stack direction="row-reverse" spacing={2}>
          <Button variant="contained" onClick={() => setShowModalLogin(!showModalLogin)}>
            Login
          </Button>
          <CreateUserModal key={Math.random()} />
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
