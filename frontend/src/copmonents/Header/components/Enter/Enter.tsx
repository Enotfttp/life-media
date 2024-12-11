import React from 'react';
import {Stack} from '@mui/material';
import {QueryCache} from '@tanstack/react-query';
import {AuthUser, NotAuthUser} from './components';

export const Enter = () => {
  const queryCache = new QueryCache();
  const isAuth = queryCache.find({queryKey: ['user']});

  console.log('isAuth = ', isAuth);
  return (
    <Stack
      useFlexGap
      spacing={3}
      direction="row"
      sx={{
        justifyContent: 'space-between',
        alignItems: 'center'
      }}
    >
      {isAuth ? (
        <AuthUser />
      ) : (
        <NotAuthUser />
      )}
    </Stack>
  );
};
