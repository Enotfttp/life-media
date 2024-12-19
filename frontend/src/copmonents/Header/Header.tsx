import React from 'react';
import Typography from '@mui/material/Typography';
import {Container, TextField} from '@mui/material';
import {useNavigate} from 'react-router';
import {Enter} from './components';
import {style} from './Header.styled';

export const Header = () => {
  const navigate = useNavigate();

  const debounce = (fn: (...args: React.ChangeEventHandler<HTMLInputElement>[]) => void, ms = 300) => {
    let timeoutId: ReturnType<typeof setTimeout>;
    return function (this: any, ...args: React.ChangeEventHandler<HTMLInputElement>[]) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => fn.apply(this, args), ms);
    };
  };

  const searchElements = (event: React.ChangeEventHandler<HTMLInputElement>) => {
    console.log('test = ', event.target?.value);
  };

  return (
    <Container
      maxWidth="xl"
      sx={style}
    >
      <Typography
        variant="h4"
        sx={{
          color: '#26491996',
          fontWeight: '600',
          '&:hover': {
            cursor: 'pointer'
          }
        }}
        onClick={() => navigate('/', {replace: false})}
      >
        Лайф Медиа
      </Typography>
      <TextField
        id="filled-textarea"
        label="Поиск по название товара"
        placeholder="Введние значение для поиска"
        multiline
        variant="standard"
        sx={{
          width: '50%'
        }}
        onChange={debounce(searchElements)}
      />
      <Enter />
    </Container>
  );
};
