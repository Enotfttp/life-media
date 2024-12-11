import React from 'react';
import {Typography, Stack, Button} from '@mui/material';
import {Form} from 'react-final-form';
import {InputField} from 'src/UI';
import {PasswordField} from 'src/UI/PasswordField/PasswordField';

interface IRegistrationProps {
  setIsOpenRegistrationModal: (isShow: boolean) => void;
}

export const Registration = ({setIsOpenRegistrationModal}: IRegistrationProps) => {
  const initialState = React.useMemo(() => ({
    login: '',
    password: ''
  }), []);

  const onSubmit = () => {

  };

  return (
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
              Регистрация
            </Typography>
            <InputField name="firstName" label="Имя" />
            <InputField name="lastName" label="Фамилия" />
            <InputField name="surname" label="Отчество" />
            <InputField name="email" label="Почта" type="email" />
            <InputField name="login" label="Логин" />
            <PasswordField name="password" label="Пароль" />
            <PasswordField name="repeatPassword" label="Пароль" />
            <Button type="submit" variant="contained">Войти</Button>
            <Stack
              useFlexGap
              spacing={1}
              direction="row"
              sx={{
                alignItems: 'center', fontSize: '16px'
              }}
            >
              <Typography>У вас уже есть учетная запись?</Typography>
              <Button
                variant="text"
                sx={{
                  textTransform: 'math-auto',
                  backgroundColor: 'transparent'
                }}
                onClick={() => setIsOpenRegistrationModal(false)}
              >
                <Typography>Авторизация</Typography>
              </Button>
            </Stack>
          </Stack>
        </form>
      )}
    </Form>
  );
};
