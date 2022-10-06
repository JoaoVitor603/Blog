import { useContext, useEffect, useState } from 'react';
import {
  Button,
  Card,
  CardContent,
  Stack,
  Typography,
  Box,
  CardActions,
  Modal,
  TextField,
  Select,
  MenuItem,
} from '@mui/material';
import { Row } from 'react-bootstrap';
import { AuthContext } from '../../contexts/UserContext/loginContext';
import Text from '../../components/Text';
import style from './style.module.scss';
import { IPost, IUpdatePost } from '../../interfaces/IPost';
import formatDate from '../../utils/formatDate';
import toastMsg, { ToastType } from '../../utils/toastMsg';
import PostsService from '../../services/posts.services/posts.service';

const MyPosts: React.FunctionComponent = () => {
  const { loggedUser, handleSignOut, token } = useContext(AuthContext);
  const [posts, setPosts] = useState<IPost[]>([]);
  const [showModalLogin, setShowModalLogin] = useState(false);

  const [newPostFields, setNewPostFields] = useState<IUpdatePost>({
    title: '',
    content: '',
    category: '',
  });

  const CATEGORIAS = ['CINEMA', 'CIÊNCIA', 'TECNOLOGIA'];
  const fetchPosts = async (): Promise<void> => {
    PostsService.getUserPosts(loggedUser.id)
      .then((data) => {
        setPosts(data);
      })
      .catch(() => toastMsg(ToastType.Error, 'Falha ao carregar posts'));
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleNewPost = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    try {
      await PostsService.createPost(newPostFields, loggedUser.id, token);

      fetchPosts();
      setShowModalLogin(false);
      toastMsg(ToastType.Info, 'Nova postagem feita com sucesso !');
    } catch (error) {
      toastMsg(ToastType.Error, 'Falha ao realizar o login');
      setShowModalLogin(false);
    }
  };
  const deletePost = async (userId: string | null, postId: string, tokenUser: string): Promise<void> => {
    try {
      await PostsService.delete(userId, postId, tokenUser);
      fetchPosts();
      toastMsg(ToastType.Success, 'Post deletado com sucesso! ');
    } catch (error) {
      toastMsg(ToastType.Error, 'Falha ao deletar');
    }
  };

  return (
    <Box>
      <Modal open={showModalLogin}>
        <Box
          component="form"
          onSubmit={handleNewPost}
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 600,
            height: 600,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Button variant="contained" onClick={() => setShowModalLogin(!showModalLogin)}>
            Fechar
          </Button>
          <TextField
            name="title"
            label="Titulo"
            id="title"
            value={newPostFields.title}
            onChange={(event) => setNewPostFields({ ...newPostFields, title: event.target.value })}
          />{' '}
          <TextField
            name="content"
            label="Conteúdo"
            id="content"
            value={newPostFields.content}
            onChange={(event) => setNewPostFields({ ...newPostFields, content: event.target.value })}
          />
          <Select
            id="categoryId"
            name="Categoria"
            label="Categoria"
            value={newPostFields.category}
            onChange={(event) => setNewPostFields({ ...newPostFields, category: event.target.value })}
          >
            {CATEGORIAS.map((Cat) => (
              <MenuItem key={Cat} value={Cat}>
                {Cat}
              </MenuItem>
            ))}
          </Select>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
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
          <Button variant="outlined" size="small" onClick={() => setShowModalLogin(!showModalLogin)}>
            Criar Post
          </Button>
          <Button variant="contained" onClick={() => handleSignOut()}>
            Sair
          </Button>
          <Text as="small" size=".85rem" weight={400}>
            {loggedUser?.userName}
          </Text>
        </Stack>
      </Row>
      <Box
        sx={{ width: '100%', backgroundColor: 'primary.dark', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}
      >
        {posts.map((u: IPost) => (
          <Card key={u.id} variant="outlined" sx={{ width: 400, margin: '10px' }}>
            <CardContent>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                {u.postOwnerUserName}
              </Typography>
              <Typography variant="h5" component="div">
                {u.title}
              </Typography>
              <Typography sx={{ mb: 1.5, fontSize: 14 }} color="text.secondary">
                Data da publicação {formatDate(u.created_at)}
                {u.category}
              </Typography>
              <Typography variant="body2">{u.content}</Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: 'space-around' }}>
              <Button
                variant="outlined"
                color="error"
                size="small"
                onClick={() => deletePost(loggedUser.id, u.id, token)}
              >
                Deletar
              </Button>
            </CardActions>
          </Card>
        ))}
      </Box>
    </Box>
  );
};
export default MyPosts;
