import React from 'react';
import {Box, Container, Stack} from '@mui/material';
import Typography from '@mui/material/Typography';
import {style} from './Footer.styled';

export const Footer = () => {
  return (
    <Container
      maxWidth="xl"
      sx={style}
    >
      <Container
        maxWidth="xl"
        sx={{
          '&.MuiContainer-maxWidthXl': {
            maxWidth: '90%'
          },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          color: '#fff'
        }}
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

        <Stack direction="column" spacing={2}>
          <Typography id="transition-modal-title" variant="h6">
            Контактная информация
          </Typography>
          <Stack direction="row" justifyContent="space-between" spacing={1}>
            <Box sx={{display: 'flex', flexDirection: 'column', gap: '3px'}}>
              <Typography variant="body1">Телефон для связи:</Typography>
              <Box component="span" sx={{fontWeight: 'normal'}}>
                +7 929 001 21 21
              </Box>

              <Typography variant="body1">Почта:</Typography>
              <Box component="span" sx={{fontWeight: 'normal'}}>
                life-media@mail.ru
              </Box>
            </Box>
          </Stack>
        </Stack>

      </Container>
    </Container>
  );
};
