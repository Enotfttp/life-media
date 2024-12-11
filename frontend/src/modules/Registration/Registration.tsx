import React from 'react';
import {Modal, Fade, Box, Typography, Backdrop} from '@mui/material';
import {style} from './Registration.styled';

interface RegistrationProps {
  isOpen: boolean;
  handleOpen: (isShow: boolean) => void;
}

export const Registration = ({isOpen, handleOpen}: RegistrationProps) => {
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={isOpen}
      onClose={() => handleOpen(false)}
      closeAfterTransition
      slots={{backdrop: Backdrop}}
      slotProps={{
        backdrop: {
          timeout: 500
        }
      }}
    >
      <Fade in={isOpen}>
        <Box sx={style}>
          <Typography id="transition-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="transition-modal-description" sx={{mt: 2}}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Fade>
    </Modal>
  );
};
