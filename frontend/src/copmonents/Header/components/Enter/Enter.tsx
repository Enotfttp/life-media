import React from 'react';
import {Stack, Badge, Avatar, IconButton} from '@mui/material';
import MailIcon from '@mui/icons-material/Mail';
import LoginIcon from '@mui/icons-material/Login';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import {Login, Registration} from '../index';

const isAuth = true;
export const Enter = () => {
  const [isOpenLoginModal, setIsOpenLoginModal] = React.useState(false);
  const [isOpenRegistrationModal, setIsOpenRegistrationModal] = React.useState(false);

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
        <>
          <IconButton>
            <Badge badgeContent={4} color="primary">
              <MailIcon color="action" />
            </Badge>
          </IconButton>
          <IconButton>
            <Badge badgeContent={10} color="primary">
              <ShoppingBasketIcon color="action" />
            </Badge>
          </IconButton>
          <IconButton onClick={() => setIsOpenRegistrationModal(true)}>
            <Avatar alt="Лепахин" src="/static/images/avatar/1.jpg" />
          </IconButton>
          <Registration isOpen={isOpenRegistrationModal} handleOpen={setIsOpenRegistrationModal} />
        </>
      ) : (
        <>
          <IconButton onClick={() => setIsOpenLoginModal(true)}>
            <LoginIcon color="action" />
          </IconButton>
          <Login isOpen={isOpenLoginModal} handleOpen={setIsOpenLoginModal} />
        </>
      )}
    </Stack>
  );
};
