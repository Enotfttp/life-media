import React from 'react';
import Typography from '@mui/material/Typography';
import {Container, TextField} from '@mui/material';
import {Enter} from './components';
import {style} from './Header.styled';

export const Header = () => {
  return (
    <Container
      maxWidth="xl"
      sx={style}
    >
      <Typography
        variant="h4"
        sx={{
          color: '#26491996',
          fontWeight: '600'
        }}
      >
        Лайф Медиа
      </Typography>
      <TextField
        id="filled-textarea"
        label="Поиск"
        placeholder="Введние значение для поиска"
        multiline
        variant="standard"
        sx={{
          width: '50%'
        }}
      />
      <Enter />
    </Container>
  );
};
