import * as React from 'react';
import {Card as CardMui} from '@mui/material';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import {IProduct} from 'src/rest-api/product/models';

interface IProps {
  product: IProduct,
}

export const ViewCard: React.FC<IProps> = ({product}) => {
  return (
    <CardMui sx={{
      height: 280,
      width: 330
    }}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
                    // src={`data:image/jpeg;base64,${imgBase64}`}
                    // image="/static/images/cards/contemplative-reptile.jpg"
          alt="green iguana"
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
  );
};
