import React from 'react';
import {Modal as ModalMui, Fade, Box, Backdrop} from '@mui/material';
import {OverridableComponent} from '@mui/material/OverridableComponent';
import {ModalTypeMap} from '@mui/material/Modal/Modal';
import {style} from './Modal.styled';

interface IModal extends Omit<OverridableComponent<ModalTypeMap>, 'children'>, React.PropsWithChildren {
  isOpen: boolean;
  handleOpen: (isShow: boolean) => void;
}

export const Modal = ({isOpen, handleOpen, children, ...props}: IModal) => {
  return (
    <ModalMui
      {...props}
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
          {children}
        </Box>
      </Fade>
    </ModalMui>
  );
};
