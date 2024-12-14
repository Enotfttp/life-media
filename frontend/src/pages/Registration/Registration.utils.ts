import {emailRegexp, required} from 'src/helpers/validate';
import {IInitial} from './Registration';

export const validate = (values: IInitial) => {
  const errors: Partial<IInitial> = {};

  if (!values?.firstName) {
    errors.firstName = required(values?.firstName);
  }

  if (!values?.lastName) {
    errors.lastName = required(values?.lastName);
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
    errors.password = errors.repeatPassword = 'Пароли не совпадают';
  }

  return errors;
};
