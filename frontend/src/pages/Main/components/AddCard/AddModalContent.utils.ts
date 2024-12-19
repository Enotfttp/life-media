import {required} from 'src/helpers/validate';
import {TInitial} from './AddModalContent';

export const validate = (values: TInitial) => {
  const errors: Partial<TInitial> = {};

  // if (!values?.login) {
  //   errors.login = required(values?.login);
  // }
  //
  // if (!values?.password) {
  //   errors.password = required(values?.password);
  // }

  return errors;
};
