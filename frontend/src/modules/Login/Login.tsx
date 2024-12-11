import React from 'react';
import {Typography, Stack, Button} from '@mui/material';
import {Form} from 'react-final-form';
import {InputField, Modal} from 'src/UI';

interface LoginProps {
  isOpen: boolean;
  handleOpen: (isShow: boolean) => void;
}

export const Login = ({isOpen, handleOpen}: LoginProps) => {
  const initialState = React.useMemo(() => ({
    login: '',
    password: ''
  }), []);

  const onSubmit = () => {

  };

  return (
    <Modal isOpen={isOpen} handleOpen={handleOpen}>
      <Form initialValues={initialState} onSubmit={onSubmit}>
        {(props) => (
          <form onSubmit={props.handleSubmit}>
            <Stack
              useFlexGap
              spacing={2}
              direction="column"
              sx={{
                alignItems: 'center'
              }}
            >
              <Typography id="transition-modal-title" variant="h6" component="h2">
                Авторизация
              </Typography>
              <InputField name="login" label="Логин" />
              <InputField name="password" type="password" label="Пароль" />
              <Button type="submit">Войти</Button>

            </Stack>
          </form>
        )}
      </Form>
    </Modal>
  );
};
