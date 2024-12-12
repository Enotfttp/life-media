import React from 'react';
import {cloneDeep} from 'lodash';
import {Typography, Stack, Button} from '@mui/material';
import {Form} from 'react-final-form';
import {InputField} from 'src/UI';
import {PasswordField} from 'src/UI/PasswordField/PasswordField';
import {useMutationRegistrationUser} from 'src/rest-api/user/hooks';
import {IUser} from 'src/rest-api/user/models';

interface IRegistrationProps {
  setIsOpenRegistrationModal: (isShow: boolean) => void;
}

interface IInitial extends Omit<IUser, 'id' | 'chat_id' | 'order_id' | 'role_id'> {
  repeatPassword?: string
}

export const Registration = ({setIsOpenRegistrationModal}: IRegistrationProps) => {
  const {mutate, isSuccess} = useMutationRegistrationUser();
  const initialState: IInitial = React.useMemo(() => ({
    firstName: '',
    lastName: '',
    patronymic: '',
    email: '',
    login: '',
    password: '',
    repeatPassword: ''
  }), []);

  const onSubmit = (values: IInitial) => {
    const cloneValues = cloneDeep(values);

    delete cloneValues.repeatPassword;

    mutate(cloneValues);
    if (isSuccess) {
      setIsOpenRegistrationModal(false);
    }
  };

  return (
    <Form<IInitial> initialValues={initialState} onSubmit={onSubmit}>
      {({values, ...props}) => (
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
            <InputField name="firstName" label="Имя" required />
            <InputField name="lastName" label="Фамилия" required />
            <InputField name="patronymic" label="Отчество" required />
            <InputField name="email" label="Почта" type="email" required />
            <InputField name="login" label="Логин" required />
            <PasswordField
              name="password"
              label="Пароль"
              required
            />
            <PasswordField
              name="repeatPassword"
              label="Пароль"
              required
            />
            <Button type="submit" variant="contained">Зарегистрироваться</Button>
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
