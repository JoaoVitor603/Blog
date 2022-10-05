import { useContext, useEffect, useState } from 'react';
import { Button, Card, CardContent, Stack, Typography, Box } from '@mui/material';
import { Row, Container } from 'react-bootstrap';
import { AuthContext } from '../../contexts/UserContext/loginContext';
import Text from '../../components/Text';
import style from './style.module.scss';
import { IPost } from '../../interfaces/IPost';
import formatDate from '../../utils/formatDate';
import toastMsg, { ToastType } from '../../utils/toastMsg';
import PostsService from '../../services/posts.services/posts.service';

const MyPosts: React.FunctionComponent = () => {
  const { LogedUser, handleSignOut } = useContext(AuthContext);
  const [user, setUser] = useState<string | null>('');
  const [posts, setPosts] = useState<IPost[]>([]);

  useEffect(() => {
    setUser(LogedUser.userName);

    PostsService.GetPosts(LogedUser.id)
      .then((data) => {
        setPosts(data);
      })
      .catch(() => toastMsg(ToastType.Error, 'Falha ao carregar posts'));
  }, []);

  return (
    <Container fluid>
      <Row className={style.header}>
        <Text as="h1" size="2rem" weight={700} className={style.nameHeader}>
          Johnsons
        </Text>

        <Stack direction="row-reverse" spacing={2}>
          <Button variant="contained" onClick={() => handleSignOut()}>
            Sair
          </Button>
          <Text as="small" size=".85rem" weight={400}>
            {user}
          </Text>
        </Stack>
      </Row>
      <Box
        sx={{ width: '100%', backgroundColor: 'primary.dark', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}
      >
        {posts.map((u: IPost) => (
          <Card sx={{ width: 400, margin: '10px' }}>
            <CardContent>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                {u.title}
              </Typography>
              <Typography variant="h5" component="div">
                {u.postOwnerUserName}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {formatDate(u.created_at)}
              </Typography>
              <Typography variant="body2">
                {u.content}
                <br />
                hahah
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Container>
  );
};
export default MyPosts;
