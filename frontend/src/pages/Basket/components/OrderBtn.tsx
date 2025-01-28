import * as React from 'react';
import {Button, Stack, ButtonGroup, Typography} from '@mui/material';
import {useGetCurrentOrder, useMutationUpdateOrder} from 'src/rest-api/order/hooks';
import {IProduct} from 'src/rest-api/product/models';

export const OrderBtn = ({order}:{order?: any}) => {
  const userId = localStorage.getItem('id');
  if (!userId) return null;

  const {mutateAsync} = useMutationUpdateOrder();

  const updateCount = async (event: any) => {
    const type = event.target?.getAttribute('data-type');
    await mutateAsync({productId: order.product_id, userId, type});
  };

  return (
    <Stack direction="row" sx={{height: '70px'}}>
      <ButtonGroup
        disableElevation
        variant="contained"
        aria-label="Disabled button group"
      >
        <Button
          onClick={updateCount}
          data-type="minus"
          disabled={order?.count === 0}
          sx={{
            width: '100px'
          }}
        >
          -
        </Button>
        <Typography
          variant="h6"
          sx={{display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            background: '#1976d2',
            color: '#fff',
            width: '30px',
            padding: '0px 5px'}}
        >
          {order?.count ?? 0}
        </Typography>
        <Button
          onClick={updateCount}
          data-type="plus"
          disabled={order!.product_count === 0}
          sx={{
            width: '100px'
          }}
        >
          +
        </Button>
      </ButtonGroup>
    </Stack>
  );
};
