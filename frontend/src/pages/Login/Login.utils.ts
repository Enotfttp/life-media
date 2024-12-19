import {required} from 'src/helpers/validate';

export interface IInitial {
  login: string,
  password: string
}

export const validate = (values: IInitial) => {
  const errors: Partial<IInitial> = {};

  if (!values?.login) {
    errors.login = required(values?.login);
  }

  if (!values?.password) {
    errors.password = required(values?.password);
  }

  return errors;
};
