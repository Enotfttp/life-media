import React from 'react';
import {Badge, Avatar, IconButton, MenuItem, Menu} from '@mui/material';
import MailIcon from '@mui/icons-material/Mail';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import {getCurrentUser} from 'src/rest-api/user/hooks';
import {useNavigate} from 'react-router';

export const AuthUser = ({userId, setUserId}: {userId: string, setUserId: (id: string | null) => void}) => {
  const {data} = getCurrentUser(userId);
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleMenuOpen = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handlePersonalAccount = () => {
    setAnchorEl(null);
    navigate('personal-account', {replace: false});
  };

  const logout = () => {
    setAnchorEl(null);
    setUserId(null);
    localStorage.clear();
  };

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
        <Avatar
          alt={data?.lastname || '-'}
          src="/static/images/avatar/1.jpg"
          onClick={handleMenuOpen}
        />
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handlePersonalAccount}>Личный кабинет</MenuItem>
          <MenuItem onClick={logout}>Выйти</MenuItem>
        </Menu>
      </IconButton>
    </>
  );
};
