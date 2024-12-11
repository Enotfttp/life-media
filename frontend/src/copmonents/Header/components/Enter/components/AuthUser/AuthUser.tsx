import React from 'react';
import {Badge, Avatar, IconButton} from '@mui/material';
import MailIcon from '@mui/icons-material/Mail';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';

export const AuthUser = () => {
  return (
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
      <IconButton>
        <Avatar alt="Лепахин" src="/static/images/avatar/1.jpg" />
      </IconButton>
    </>
  );
};
