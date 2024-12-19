import * as React from 'react';
import {Card as CardMui} from '@mui/material';
import CardActionArea from '@mui/material/CardActionArea';
import AddIcon from '@mui/icons-material/Add';
import {Modal} from 'src/UI';
import {AddModalContent} from './AddModalContent';

export const AddCard: React.FC = () => {
  const [isOpen, setOpen] = React.useState(false);
  return (
    <>
      <CardMui sx={{
        height: 280,
        width: 330
      }}
      >
        <CardActionArea
          sx={{
            height: '100%',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
          onClick={() => setOpen(true)}
        >
          <AddIcon
            color="disabled"
            sx={{
              height: '50%',
              width: '50%'
            }}
          />
        </CardActionArea>
      </CardMui>
      <Modal width="700px" isOpen={isOpen} handleOpen={setOpen}>
        <AddModalContent handleOpen={setOpen} />
      </Modal>
    </>
  );
};
