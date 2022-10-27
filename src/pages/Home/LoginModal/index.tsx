import { Box, Button, Modal, Stack, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { IUser } from '../../../interfaces/IUser';

type Props = {
  onSubmitLogin: (user: IUser) => void;
  handleCloseModal: () => void;
};

export default function LoginModal({ onSubmitLogin, handleCloseModal }: Props): React.ReactElement {
  const [loginUser, setLoginUser] = useState<IUser>({
    email: '',
    password: '',
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    onSubmitLogin(loginUser);
  };

  return (
    <>
      <Modal open onClose={handleCloseModal} sx={{ borderRadius: '6%' }}>
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
            value={loginUser.email}
            onChange={(e) => setLoginUser({ ...loginUser, email: e.target.value })}
          />
          <TextField
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="new-password"
            value={loginUser.password}
            onChange={(e) => setLoginUser({ ...loginUser, password: e.target.value })}
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
