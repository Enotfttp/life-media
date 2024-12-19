import {emailRegexp, required} from 'src/helpers/validate';
import {IUser} from 'src/rest-api/user/models';

export interface IInitial extends Omit<IUser, 'id' | 'chat_id' | 'order_id' | 'role_id'> {
  repeatPassword?: string
}

export const validate = (values: IInitial) => {
  const errors: Partial<IInitial> = {};

  if (!values?.firstname) {
    errors.firstname = required(values?.firstname);
  }

  if (!values?.lastname) {
    errors.lastname = required(values?.lastname);
  }

  if (!values?.patronymic) {
    errors.patronymic = required(values?.patronymic);
  }

  if (!values?.email.match(emailRegexp)) {
    errors.email = 'Неправильно введён email';
  }

  if (!values?.login) {
    errors.login = required(values?.login);
  }

  if (!values?.password) {
    errors.password = required(values?.password);
  }
  if (!values?.repeatPassword) {
    errors.repeatPassword = required(values?.repeatPassword);
  }

  if ((values?.password || values?.repeatPassword) && values?.password !== values?.repeatPassword) {
    // eslint-disable-next-line no-multi-assign
    errors.password = errors.repeatPassword = 'Пароли не совпадают';
  }

  return errors;
};
