import * as React from 'react';
import {Button, Stack, ButtonGroup, Typography} from '@mui/material';
import {useGetCurrentOrder, useMutationUpdatenOrder} from 'src/rest-api/order/hooks';
import {IProduct} from 'src/rest-api/product/models';

export const OrderBtn = ({product, refetch}:{product?: IProduct, refetch():void}) => {
  const userId = localStorage.getItem('id');
  if (!userId) return null;

  const {data: dataOrder} = useGetCurrentOrder(product!.id, userId);
  const {mutateAsync} = useMutationUpdatenOrder();
  const updateCount = async (event: any) => {
    const type = event.target?.getAttribute('data-type');
    await mutateAsync({productId: product!.id, userId, type});
    refetch();
  };

  return (
    <Stack direction="row" justifyContent="center" sx={{width: '100%', marginTop: '40px'}}>
      {!dataOrder || dataOrder?.count === 0 ? (
        <Button
          variant="contained"
          data-type="plus"
          onClick={updateCount}
        >
          Добавить в корзину
        </Button>
      ) : (
        <ButtonGroup
          disableElevation
          variant="contained"
          aria-label="Disabled button group"
        >
          <Button
            onClick={updateCount}
            data-type="minus"
            disabled={dataOrder?.count === 0}
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
              width: '100%',
              padding: '0px 5px'}}
          >
            {dataOrder?.count ?? 0}
          </Typography>
          <Button onClick={updateCount} data-type="plus" disabled={product!.count === 0}>+</Button>
        </ButtonGroup>
      ) }
    </Stack>
  );
};
