import React, {useState} from 'react';
import {useParams} from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  ListItemAvatar, Avatar, Button,
  Select,
  InputLabel,
  FormControl,
  MenuItem, SelectChangeEvent,
  Box
} from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import {getOrderStatus, useGetOrders, useMutationUpdateStatusOrder} from 'src/rest-api/order/hooks';
import {RolesContext} from 'src/modules/RolesProvider/RolesProvider';

export const Purchases = () => {
  const {id: userId} = useParams();
  if (!userId) {
    throw new Error('Данный пользователь не был найден');
  }
  const {data: dataOrders} = useGetOrders(userId);
  const {mutateAsync} = useMutationUpdateStatusOrder();
  const {data: dataStatus} = getOrderStatus();

  const [selectedRows, setSelectedRows] = useState<{orderId:string, userId:string}[]>([]);
  const [status, setStatus] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setStatus(event.target.value);
  };

  // Функция для обновления состояния выбранных строк
  const handleRowSelect = ({orderId, userId}:{orderId:string, userId:string}) => {
    const newRowSelected = selectedRows.some((elem) => elem.userId === userId && elem.orderId === orderId);
    setSelectedRows(newRowSelected
      ? selectedRows.filter((elem) => elem.userId !== userId && elem.orderId !== orderId)
      : [...selectedRows, {orderId, userId}]);
  };
  const role = React.useContext(RolesContext);

  const handleClick = async () => {
    await Promise.all(selectedRows.map(async (elem) => {
      await mutateAsync({userId: elem.userId, statusId: status, orderId: elem.orderId});
    }));
  };

  return (
    <>
      <Typography variant="h6">История заказов</Typography>
      <TableContainer
        component={Paper}
        sx={{
          marginTop: '20px'
        }}
      >
        <Table>
          <TableHead>
            <TableRow sx={{
              '& .MuiTableCell-root': {
                fontSize: '18px'
              }
            }}
            >
              {role === 'admin' && (
                <>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedRows.length > 0}
                      indeterminate={selectedRows.length > 0 && selectedRows.length < selectedRows.length}
                      onChange={() => setSelectedRows((prev) => (prev.length > 0 ? [] : [...dataOrders!.map(({id, user_id}) => ({orderId: id, userId: user_id}))]))}
                    />

                  </TableCell>
                  <TableCell>Имя пользователя</TableCell>
                </>
              )}
              <TableCell>Картинка</TableCell>
              <TableCell>Название</TableCell>
              <TableCell>Количество</TableCell>
              <TableCell>Сумма</TableCell>
              <TableCell>Итоговая Сумма</TableCell>
              <TableCell>Статус</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Boolean(dataOrders?.length) && dataOrders!.map((order) => (
              <TableRow
                key={order.id}
                sx={{
                  '& .MuiTableCell-root': {
                    fontSize: '16px'
                  }
                }}
              >
                {role === 'admin' && (
                  <>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedRows.some((elem) => elem.userId === order.user_id && elem.orderId === order.id)}
                        onChange={() => handleRowSelect({orderId: order.id, userId: order.user_id})}
                      />
                    </TableCell>
                    <TableCell>{`${order.lastname} ${order.firstname} ${order.patronymic}`}</TableCell>
                  </>
                )}
                <TableCell>
                  <ListItemAvatar>
                    <Avatar
                      alt="Я"
                      src={`data:image/jpeg;base64,${order?.photo_link}`}
                      sx={{
                        width: '50px',
                        height: '50px',
                        borderRadius: '0',
                        paddingRight: '20px'
                      }}
                    />
                  </ListItemAvatar>
                </TableCell>
                <TableCell>{order.name_product}</TableCell>
                <TableCell>
                  {order.count}
                  {' '}
                  шт.
                </TableCell>
                <TableCell>
                  {order.product_cost}
                  {' '}
                  руб.
                </TableCell>
                <TableCell>
                  {order.count * order.product_cost}
                  {' '}
                  руб.
                </TableCell>
                <TableCell>
                  {order.name_status}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {role === 'admin' && (
        <Box sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          gap: '20px'
        }}
        >
          <FormControl sx={{m: 1, minWidth: 200}} size="small">
            <InputLabel id="demo-select-small-label">Статус заказа</InputLabel>
            <Select
              value={status}
              label="Статус заказа"
              onChange={handleChange}
            >
              {Boolean(dataStatus?.length) && dataStatus!.map((elem) => (
                <MenuItem key={elem.id} value={elem.id}>{elem.name_status}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            variant="contained"
            onClick={handleClick}
            sx={{
              margin: '20px 0px',
              float: 'right'
            }}
          >
            Сохранить
          </Button>

        </Box>
      )}
    </>
  );
};
