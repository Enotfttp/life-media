import React, {Suspense} from 'react';
import {Modal as ModalMui, Fade, Box, Backdrop, CircularProgress} from '@mui/material';
import {ModalProps} from '@mui/material/Modal/Modal';
import {style} from './Modal.styled';

interface IModal extends Omit<Partial<ModalProps>, 'children'>, React.PropsWithChildren {
  isOpen: boolean;
  handleOpen: (isShow: boolean) => void;
  width?: string
}

export const Modal = ({isOpen, handleOpen, children, width = '450px', ...props}: IModal) => {
  return (
    <Suspense fallback={<CircularProgress />}>
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
          <Box sx={style(width)}>
            {children}
          </Box>
        </Fade>
      </ModalMui>
    </Suspense>
  );
};
