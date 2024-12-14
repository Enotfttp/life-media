import React from 'react';
import {Typography, Button} from '@mui/material';

export const ErrorScreen = () => {
  return (
    <>
      <Typography variant="h1" component="h2">
        Упс..., что-то пошло не так
      </Typography>
      <Button variant="text">Вернуться на домашнюю страницу</Button>
    </>
  );
};
