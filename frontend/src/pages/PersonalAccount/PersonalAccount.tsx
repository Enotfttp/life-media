import React from 'react';
import {useParams} from 'react-router-dom';
import {Container, Stack, Divider} from '@mui/material';
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
      <Info data={data} />
      <Divider sx={{margin: '30px 0px'}} />
      <Purchases />
    </Container>
  );
};
