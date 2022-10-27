import { Box, Button, Modal, Stack, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { IUser } from '../../interfaces/IUser';

type Props = {
  onSubmit: (user: IUser) => void;
  handleCloseModal: () => void;
};
const DEFAULT_USER = { userName: '', email: '', password: '' };

export default function CreateUserModal({ onSubmit, handleCloseModal }: Props): React.ReactElement {
  const [user, setUser] = useState<IUser>(DEFAULT_USER);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    onSubmit(user);
  };

  return (
    <>
      <Modal onClose={handleCloseModal} open>
        <Box
          component="form"
          onSubmit={handleSubmit}
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
            Digite os dados do novo usuário
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
