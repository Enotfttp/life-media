import React from 'react';
import {useParams} from 'react-router-dom';
import {Container, Divider} from '@mui/material';
import {getCurrentUser} from 'src/rest-api/user/hooks';
import {RolesProvider} from 'src/modules/RolesProvider/RolesProvider';
import {Info, Purchases} from './components';

export const PersonalAccount = () => {
  const {id} = useParams();
  if (!id) {
    throw new Error('Данный пользователь не был найден');
  }
  const {data} = getCurrentUser(id);
  return (
    <RolesProvider>
      <Container
        maxWidth="xl"
      >
        <Info data={data} />
        <Divider sx={{margin: '30px 0px'}} />
        <Purchases />
      </Container>
    </RolesProvider>
  );
};
