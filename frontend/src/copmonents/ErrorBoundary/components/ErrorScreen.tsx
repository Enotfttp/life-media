import React from 'react';
import {Typography, Button} from '@mui/material';

export const ErrorScreen = () => {
  return (
    <>
      <Typography variant="h1" component="h2">
        Произошли непредвиденные проблемы
      </Typography>
      <Button variant="text">Вернуться на домашнюю страницу</Button>
    </>
  );
};
