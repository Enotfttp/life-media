import * as React from 'react';
import {Card as CardMui} from '@mui/material';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import {IProduct} from 'src/rest-api/product/models';
import {Modal} from 'src/UI';
import {ViewCard} from './components';

interface IProps {
  product: IProduct,
}

export const ViewShortCard: React.FC<IProps> = ({product}) => {
  const [isOpen, handleOpen] = React.useState(false);

  return (
    <>
      <CardMui
        sx={{
          height: 280,
          width: 330
        }}
      >
        <CardActionArea onClick={() => handleOpen(true)}>
          <CardMedia
            component="img"
            height="200"
            src={`data:image/jpeg;base64,${product.photo_link}`}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {product.name_product}
            </Typography>
            <Typography variant="body2" sx={{color: 'text.secondary'}}>
              {product.description}
            </Typography>
          </CardContent>
        </CardActionArea>
      </CardMui>
      <Modal isOpen={isOpen} handleOpen={handleOpen} width="700px">
        <ViewCard id={product.id} handleOpen={handleOpen} />
      </Modal>
    </>
  );
};
