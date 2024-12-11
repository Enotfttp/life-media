import React from 'react';
import {Container, Stack} from '@mui/material';
import Typography from '@mui/material/Typography';
import {style} from './Footer.styled';

export const Footer = () => {
  return (
    <Container
      maxWidth="xl"
      sx={style}
    >
      <Typography
        variant="h3"
        sx={{
          color: '#fff',
          fontWeight: '600'
        }}
      >
        Лайф Медиа
      </Typography>
      <Stack
        useFlexGap
        spacing={3}
        direction="row"
        sx={{
          width: '70%',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      />
    </Container>
  );
};
