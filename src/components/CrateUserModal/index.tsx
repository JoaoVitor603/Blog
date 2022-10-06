import { Box, Button, Modal, Stack, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import toastMsg, { ToastType } from '../../utils/toastMsg';
import UsersService from '../../services/users.service';
import { IUser } from '../../interfaces/IUser';

export default function CreateUserModal(): React.ReactElement {
  const [open, setOpen] = useState(false);
  const handleCloseModal = (): void => setOpen(!open);

  const [user, setUser] = useState<IUser>({
    userName: '',
    email: '',
    password: '',
  });

  const handleNewUser = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    try {
      await UsersService.create(user);

      //  fetchPosts();
      setOpen(false);
      toastMsg(ToastType.Info, 'Usuário criado');
    } catch (error) {
      toastMsg(ToastType.Error, 'Falha criar usuário');
      setOpen(false);
    }
  };

  return (
    <>
      <Button variant="contained" onClick={() => setOpen(!open)}>
        Criar novo usuário
      </Button>
      <Modal onClose={handleCloseModal} open={open}>
        <Box
          component="form"
          onSubmit={handleNewUser}
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            borderRadius: '6px',
            justifyContent: 'space-between',
            transform: 'translate(-50%, -50%)',
            width: 600,
            height: 500,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>

          <TextField
            label="Nome de usuário"
            id="user"
            value={user.userName}
            onChange={(event) => setUser({ ...user, userName: event.target.value })}
          />
          <TextField
            label="email"
            id="email"
            value={user.email}
            onChange={(event) => setUser({ ...user, email: event.target.value })}
          />
          <TextField
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="new-password"
            value={user.password}
            onChange={(event) => setUser({ ...user, password: event.target.value })}
          />

          <Stack direction="row-reverse" spacing={2}>
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Entrar
            </Button>
          </Stack>
        </Box>
      </Modal>
    </>
  );
}
