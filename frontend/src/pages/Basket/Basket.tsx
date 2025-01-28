import * as React from 'react';
import {useParams} from 'react-router-dom';
import {useGetOrders, useMutationUpdateStatusOrder} from 'src/rest-api/order/hooks';
import {Avatar, ListItem, List, ListItemAvatar, ListItemText, Grid, Divider, Paper, Button, ImageListItem, Flex} from '@mui/material';
import Typography from '@mui/material/Typography';
import {OrderBtn} from 'src/pages/Basket/components/OrderBtn';

export const Basket: React.FC = () => {
  const {id: userId} = useParams();
  if (!userId) {
    throw new Error('Данный пользователь не был найден');
  }
  const {data: dataOrder} = useGetOrders(userId);
  const {mutateAsync} = useMutationUpdateStatusOrder();

  const handleClick = async () => {
    await mutateAsync(userId);
  };

  if (!dataOrder?.length) {
    return (
      <Grid
        container
        sx={{
          justifyContent: 'center'
        }}
      >
        <Grid
          item
          xs={6}
          md={6}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            textAlign: 'center',
            placeItems: 'center'
          }}
        >
          <ImageListItem
            sx={{
              width: '200px',
              height: '200px'
            }}
          >
            <img
              src="../public/cat.svg"
              loading="lazy"
            />
          </ImageListItem>
          <Typography gutterBottom variant="h2">
            Товаров в заказе пока нет
          </Typography>
        </Grid>
      </Grid>
    );
  }

  return (
    <Grid
      container
      sx={{
        justifyContent: 'center'
      }}
    >
      <Grid
        item
        xs={6}
        spacing={1}
        sx={{
          textAlign: 'center'
        }}
      >
        <Typography gutterBottom variant="h2">
          Корзина
        </Typography>
        <Paper
          elevation={3}
          sx={{
            height: '70vh',
            overflow: 'auto',
            marginTop: '30px',
            boxShadow: '0px 0px 10px #000',
            border: '1px solid rgba(0, 0, 0, 0.23)',
            borderRadius: '10px 10px 0px 0px'
          }}
        >
          <List sx={{color: '#000', fontSize: '20px', display: 'flex', flexDirection: 'column', overflow: 'auto'}}>
            {Boolean(dataOrder?.length) && dataOrder.map((order) => (
              <>
                <ListItem
                  alignItems="center"
                  key={order.id}
                  sx={{
                    borderRadius: '25px',
                    fontSize: '20px',
                    justifyContent: 'space-between'
                  }}
                >
                  <ListItemAvatar>
                    <Avatar
                      alt="Я"
                      src={`data:image/jpeg;base64,${order?.photo_link}`}
                      sx={{
                        width: '80px',
                        height: '80px',
                        borderRadius: '0',
                        paddingRight: '20px'
                      }}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={order.name_product}
                    secondary={order.description}
                    sx={{
                      '& .MuiListItemText-primary': {
                        fontSize: '22px'
                      },
                      '& .MuiListItemText-secondary': {
                        color: '#d3d3d3',
                        fontSize: '18px'
                      }
                    }}
                  />
                  <OrderBtn order={order} />
                </ListItem>
                <Divider sx={{margin: '30px 0px'}} />
              </>
            ))}
          </List>
        </Paper>
        <Grid item xs={12}>
          <Button
            variant="contained"
            onClick={handleClick}
            sx={{
              margin: '20px 0px',
              float: 'right'
            }}
          >
            Заказать
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};
