import React from 'react';
import {IconButton} from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import {Login, Registration} from 'src/pages/index';
import {Modal} from 'src/UI';

export const NotAuthUser = () => {
  const [isOpen, handleOpen] = React.useState(false);
  const [isOpenRegistrationModal, setIsOpenRegistrationModal] = React.useState(false);

  return (
    <>
      <IconButton onClick={() => handleOpen(true)}>
        <LoginIcon color="action" />
      </IconButton>
      <Modal isOpen={isOpen} handleOpen={handleOpen}>
        {isOpenRegistrationModal ? (
          <Registration
            setIsOpenRegistrationModal={setIsOpenRegistrationModal}
          />
        ) : (
          <Login
            handleOpen={handleOpen}
            setIsOpenRegistrationModal={setIsOpenRegistrationModal}
          />
        )}
      </Modal>
    </>
  );
};
