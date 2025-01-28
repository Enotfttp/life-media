import React from 'react';
import {Typography, Button, Grid, ImageListItem} from '@mui/material';

export const ErrorScreen = () => {
  return (
    <Grid>
      <Grid
        item
        xs={6}
        md={6}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          textAlign: 'center',
          placeItems: 'center',
          marginTop: '40px'
        }}
      >
        <ImageListItem
          sx={{
            width: '200px',
            height: '200px'
          }}
        >
          <img
            src="../public/cat-err.svg"
            loading="lazy"
          />
        </ImageListItem>
        <Typography gutterBottom variant="h2">
          Упс..., что-то пошло не так
        </Typography>
        <Button variant="contained" onClick={() => location.reload()}>Обновить страницу</Button>
      </Grid>
    </Grid>
  );
};
