import React from 'react';
import {Container, Stack} from '@mui/material';
import {useGetProducts} from 'src/rest-api/product/hooks';

export const PersonalAccount = () => {
  const {data} = useGetProducts();

  return (
    <Container
      maxWidth="xl"
    >
      PersonalAccount
    </Container>
  );
};
