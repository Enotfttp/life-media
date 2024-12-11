import React from 'react';
import {Stack} from '@mui/material';
import {AuthUser, NotAuthUser} from './components';

const isAuth = false;
export const Enter = () => {
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
