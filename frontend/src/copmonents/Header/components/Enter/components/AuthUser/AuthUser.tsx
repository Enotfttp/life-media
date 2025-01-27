import React from 'react';
import {Badge, Avatar, IconButton, MenuItem, Menu} from '@mui/material';
import MailIcon from '@mui/icons-material/Mail';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import {getCurrentUser} from 'src/rest-api/user/hooks';
import {useNavigate} from 'react-router';
import {useGetOrders} from 'src/rest-api/order/hooks';
import {useGetChats} from 'src/rest-api/chats/hooks/chat.hook';
import {RolesContext} from 'src/modules/RolesProvider/RolesProvider';

export const AuthUser = ({userId, setUserId}: {userId: string, setUserId: (id: string | null) => void}) => {
  const {data} = getCurrentUser(userId);
  const {data: dataOrder} = useGetOrders(userId);
  const {data: dataChats} = useGetChats(userId);
  const role = React.useContext(RolesContext);

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
    navigate(`personal-account/${data?.id}`, {replace: false});
  };

  const logout = () => {
    setAnchorEl(null);
    setUserId(null);
    localStorage.clear();
  };
  return (
    <>
      <IconButton>
        <Badge badgeContent={4} color="primary" onClick={() => navigate(role === 'admin' ? `chatsAdmin/${data?.id}` : `chats/${data?.id}`, {replace: false})}>
          <MailIcon color="action" />
        </Badge>
      </IconButton>
      <IconButton>
        <Badge badgeContent={dataOrder?.reduce((acc, {count}) => acc + count, 0)} color="primary" onClick={() => navigate(`basket/${data?.id}`, {replace: false})}>
          <ShoppingBasketIcon color="action" />
        </Badge>
      </IconButton>
      <IconButton>
        <Avatar
          alt={data?.lastname || '-'}
          src={`data:image/jpeg;base64,${data?.photo_link}`}
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
