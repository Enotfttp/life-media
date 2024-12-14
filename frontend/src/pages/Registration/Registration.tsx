import React from 'react';
import {cloneDeep} from 'lodash';
import {Typography, Stack, Button, Snackbar} from '@mui/material';
import {Form} from 'react-final-form';
import {InputField} from 'src/UI';
import {PasswordField} from 'src/UI/PasswordField/PasswordField';
import {useMutationRegistrationUser} from 'src/rest-api/user/hooks';
import {IUser} from 'src/rest-api/user/models';
import {validate} from './Registration.utils';

interface IRegistrationProps {
  setIsOpenRegistrationModal: (isShow: boolean) => void;
}

export interface IInitial extends Omit<IUser, 'id' | 'chat_id' | 'order_id' | 'role_id'> {
  repeatPassword?: string
}

export const Registration = ({setIsOpenRegistrationModal}: IRegistrationProps) => {
  const {mutateAsync, isSuccess, error} = useMutationRegistrationUser();

  const initialState: IInitial = React.useMemo(() => ({
    firstName: '',
    lastName: '',
    patronymic: '',
    email: '',
    login: '',
    password: '',
    repeatPassword: ''
  }), []);

  const onSubmit = async (values: IInitial) => {
    try {
      const cloneValues = cloneDeep(values);
      delete cloneValues.repeatPassword;

      await mutateAsync(cloneValues);
    } catch (e) {
    }
  };

  return (
    <Form<IInitial> initialValues={initialState} onSubmit={onSubmit} validate={validate}>
      {({values, hasValidationErrors, valid, submitError, ...props}) => (
        <form onSubmit={props.handleSubmit}>
          <Stack
            useFlexGap
            spacing={2}
            direction="column"
            sx={{
              alignItems: 'center'
            }}
          >
            {
                            /**
                             * TODO.FIX Не работает
                             */}

            {/* {submitError && ( */}
            {/* <Snackbar */}
            {/*  open */}
            {/*  autoHideDuration={6000} */}
            {/*  message={submitError} */}
            {/*  action={( */}
            {/*    <Button color="inherit" size="small"> */}
            {/*      s */}
            {/*      Undo */}
            {/*        </Button> */}
            {/*                    )} */}
            {/*  sx={{bottom: {xs: 90, sm: 0}}} */}
            {/* /> */}
            {/* )} */}
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Регистрация
            </Typography>
            <InputField name="firstName" label="Имя" />
            <InputField name="lastName" label="Фамилия" />
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
