import React from 'react';
import {Typography, Stack, Button} from '@mui/material';
import {Form} from 'react-final-form';
import {InputField} from 'src/UI';
import {PasswordField} from 'src/UI/PasswordField/PasswordField';

interface ILoginProps {
  setIsOpenRegistrationModal: (isShow: boolean) => void;
}

interface IInitial {
  login: string,
  password: string
}

export const Login = ({setIsOpenRegistrationModal}: ILoginProps) => {
  const initialState: IInitial = React.useMemo(() => ({
    login: '',
    password: ''
  }), []);

  const onSubmit = (values: IInitial) => {
    console.log('values = ', values);
  };

  return (
    <Form<IInitial> initialValues={initialState} onSubmit={onSubmit}>
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
            <InputField name="login" label="Логин" type="email" />
            <PasswordField name="password" label="Пароль" />
            <Button type="submit" variant="contained">Войти</Button>
            <Stack
              useFlexGap
              spacing={1}
              direction="row"
              sx={{
                alignItems: 'center', fontSize: '16px'
              }}
            >
              <Typography>У вас нет учетной записи?</Typography>
              <Button
                variant="text"
                sx={{
                  textTransform: 'math-auto',
                  backgroundColor: 'transparent'
                }}
                onClick={() => setIsOpenRegistrationModal(true)}
              >
                <Typography>Зарегестрироваться</Typography>
              </Button>
            </Stack>
          </Stack>
        </form>
      )}
    </Form>
  );
};
