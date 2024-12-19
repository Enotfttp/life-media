import React from 'react';
import {Typography, Stack, Button, Alert} from '@mui/material';
import {Form} from 'react-final-form';
import {InputField, PasswordField} from 'src/UI';
import {useMutationLoginUser} from 'src/rest-api/user/hooks';
import {validate} from './Login.utils';

interface ILoginProps {
  handleOpen: (isShow: boolean) => void;
  setUserId: (id: string) => void;
  setIsOpenRegistrationModal: (isShow: boolean) => void;
}

export interface IInitial {
  login: string,
  password: string
}

export const Login = ({setIsOpenRegistrationModal, handleOpen, setUserId}: ILoginProps) => {
  const [error, setError] = React.useState('');
  const {mutateAsync} = useMutationLoginUser();
  const initialState: IInitial = React.useMemo(() => ({
    login: '',
    password: ''
  }), []);

  const onSubmit = async (values: IInitial) => {
    try {
      setError('');

      const {data} = await mutateAsync(values);
      setUserId(data.id);
      localStorage.setItem('id', data.id);
      handleOpen(false);
    } catch (e: any) {
      setError(e?.response?.data?.error || 'Произошла ошибка');
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

            {error && (
            <Alert
              severity="error"
              sx={{
                width: '100%'
              }}
            >
              {error}
            </Alert>
            )}

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
