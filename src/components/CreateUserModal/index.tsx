import { Box, Button, Modal, Stack, Typography } from '@mui/material';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { IUser } from '../../interfaces/IUser';

type Props = {
  onSubmit: (user: IUser) => void;
  handleCloseModal: () => void;
};

const schema = yup.object().shape({
  userName: yup.string().required('O nome de usuário é obrigatório'),
  email: yup.string().email('Coloque um formato de email válido').required('E-mail é obrigatório'),
  password: yup.string().min(8, 'minimo 8 caracteres').required('Uma senha é obrigatória'),
});
export default function CreateUserModal({ onSubmit, handleCloseModal }: Props): React.ReactElement {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUser>({ resolver: yupResolver(schema) });

  const handleSubmitLogin: SubmitHandler<IUser> = (data) => {
    onSubmit(data);
  };

  return (
    <>
      <Modal onClose={handleCloseModal} open>
        <Box
          component="form"
          onSubmit={handleSubmit(handleSubmitLogin)}
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

          <input placeholder="nome de usuário" {...register('userName', { required: true })} />
          {errors.userName && <p>{errors.email?.message}</p>}

          <input placeholder="Digite seu e-mail" {...register('email', { required: true })} />
          {errors.email && <p>{errors.email?.message}</p>}

          <input type="password" placeholder="Digite sua senha" {...register('password', { required: true })} />
          {errors.password && <p>{errors.password?.message}</p>}

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
