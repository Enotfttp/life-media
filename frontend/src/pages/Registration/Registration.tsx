import React from 'react';
import {cloneDeep} from 'lodash';
import {Typography, Stack, Button, Alert} from '@mui/material';
import {Form} from 'react-final-form';
import {InputField, PasswordField} from 'src/UI';
import {useMutationRegistrationUser} from 'src/rest-api/user/hooks';
import {validate, IInitial} from './Registration.utils';

interface IRegistrationProps {
  setIsOpenRegistrationModal: (isShow: boolean) => void;
}

export const Registration = ({setIsOpenRegistrationModal}: IRegistrationProps) => {
  const [error, setError] = React.useState('');
  const {mutateAsync} = useMutationRegistrationUser();

  const initialState: IInitial = React.useMemo(() => ({
    firstname: '',
    lastname: '',
    patronymic: '',
    email: '',
    login: '',
    password: '',
    repeatPassword: ''
  }), []);

  const onSubmit = async (values: IInitial) => {
    try {
      setError('');
      const cloneValues = cloneDeep(values);
      delete cloneValues.repeatPassword;

      // @ts-ignore
      await mutateAsync(cloneValues);
      setIsOpenRegistrationModal(false);
    } catch (e: any) {
      setError(e?.response?.data?.error || 'Произошла ошибка');
    }
  };

  return (
    <Form<IInitial> initialValues={initialState} onSubmit={onSubmit} validate={validate}>
      {({values, hasValidationErrors, valid, ...props}) => (
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
            <InputField name="firstname" label="Имя" />
            <InputField name="lastname" label="Фамилия" />
            <InputField name="patronymic" label="Отчество" />
            <InputField name="email" label="Почта" type="email" />
            <InputField name="login" label="Логин" />
            <PasswordField
              name="password"
              label="Пароль"
            />
            <PasswordField
              name="repeatPassword"
              label="Пароль"
            />
            <Button
              disabled={!valid}
              type="submit"
              variant="contained"
            >
              Зарегистрироваться
            </Button>
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
                <Typography>Авторизироваться</Typography>
              </Button>
            </Stack>
          </Stack>
        </form>
      )}
    </Form>
  );
};
