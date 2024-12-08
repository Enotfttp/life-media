import React from 'react';
import {Container, Stack} from '@mui/material';
import Typography from '@mui/material/Typography';

const style = {
  '&.MuiContainer-maxWidthXl': {
    maxWidth: '100%'
  },
  backgroundColor: '#26491996',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  height: '150px',
  color: '#fff'
};

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
