import React from 'react';
import Typography from '@mui/material/Typography';
import {Container} from '@mui/material';
import {useNavigate} from 'react-router';
import {Enter} from './components';
import {style} from './Header.styled';

export const Header = () => {
  const navigate = useNavigate();

  return (
    <Container
      maxWidth="xl"
      sx={style}
    >
      <Typography
        variant="h4"
        Как
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
      <Enter />
    </Container>
  );
};
