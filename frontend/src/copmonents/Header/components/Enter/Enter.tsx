import React from 'react';
import {Stack} from '@mui/material';
import {AuthUser, NotAuthUser} from './components';

export const Enter = () => {
  const [userId, setUserId] = React.useState(localStorage.getItem('id'));

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
      {userId ? (
        <AuthUser userId={userId} setUserId={setUserId} />
      ) : (
        <NotAuthUser setUserId={setUserId} />
      )}
    </Stack>
  );
};
