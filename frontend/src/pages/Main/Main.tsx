import React from 'react';
import {Container, Stack} from '@mui/material';
import {useGetProducts} from 'src/rest-api/product/hooks';
import {ViewShortCard, AddCard} from './components';

export const Main = () => {
  const {data} = useGetProducts();

  return (
    <Container
      maxWidth="xl"
      sx={{
        '&.MuiContainer-maxWidthXl': {
          maxWidth: '95%'
        }
      }}
    >
      <Stack
        useFlexGap
        spacing={2}
        direction="row"
        sx={{
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '20px'
        }}
      >
        {/* TODO.FIX Добавить разделение на роли */}
        <AddCard />
        {Boolean(data?.length) && data!.map(((product) => <ViewShortCard key={product.id} product={product} />))}
      </Stack>
    </Container>
  );
};
