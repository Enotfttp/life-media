import React from 'react';
import {useParams} from 'react-router-dom';
import {Container, Stack, Avatar} from '@mui/material';
import {getCurrentUser} from 'src/rest-api/user/hooks';
import {Info, Purchases} from './components';

export const PersonalAccount = () => {
  const {id} = useParams();
  if (!id) {
    throw new Error('Данный пользователь не был найден');
  }
  const {data} = getCurrentUser(id);

  return (
    <Container
      maxWidth="xl"
    >
      <Stack direction="row" spacing={50} sx={{marginBottom: '100px'}}>
        <Avatar
          alt={data?.lastname}
          src="/src/pages/PersonalAccount/foto.jpg"
          sx={{width: 300, height: 300, borderRadius: '150px'}}
        />

        <Info data={data} />
      </Stack>
      <Purchases />
    </Container>
  );
};
