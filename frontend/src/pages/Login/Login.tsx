import React from 'react';
import {Typography, Stack, Button} from '@mui/material';
import {Form} from 'react-final-form';
import {InputField} from 'src/UI';
import {PasswordField} from 'src/UI/PasswordField/PasswordField';
import {useMutationLoginUser} from 'src/rest-api/user/hooks';
import {validate} from './Login.utils';

interface ILoginProps {
  handleOpen: (isShow: boolean) => void;
  setIsOpenRegistrationModal: (isShow: boolean) => void;
}

export interface IInitial {
  login: string,
  password: string
}

export const Login = ({setIsOpenRegistrationModal, handleOpen}: ILoginProps) => {
  const {mutate, isSuccess} = useMutationLoginUser();
  const initialState: IInitial = React.useMemo(() => ({
    login: '',
    password: ''
  }), []);

  const onSubmit = (values: IInitial) => {
    mutate(values);
    if (isSuccess) {
      handleOpen(false);
    }
  };

  return (
    <Form<IInitial>
      initialValues={initialState}
      onSubmit={onSubmit}
      validate={validate}
    >
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
            <InputField
              name="login"
              label="Логин"
            />
            <PasswordField
              required
              name="password"
              label="Пароль"
            />
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
                <Typography>Зарегистрироваться</Typography>
              </Button>
            </Stack>
          </Stack>
        </form>
      )}
    </Form>
  );
};
