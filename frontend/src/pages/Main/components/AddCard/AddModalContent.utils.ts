import {required} from 'src/helpers/validate';
import {IProductForm} from 'src/rest-api/product/models';

export interface IInitial extends Omit<IProductForm, 'id'> {
  photoName?: string
}

export const validate = (values: IInitial) => {
  const errors: Partial<Record<keyof IInitial, string | undefined>> = {};
  errors.name_product = required(values?.name_product);
  errors.color = required(values?.color);
  errors.material = required(values?.material);
  errors.photoName = required(values?.photoName);
  errors.description = required(values?.description);

  if (Number(values?.cost) < 0) {
    errors.cost = 'Цена не может быть меньше 0';
  } else {
    errors.cost = required(values?.cost);
  }

  if (Number(values?.count) < 0) {
    errors.count = 'Количество не может быть меньше 0';
  } else {
    errors.count = required(values?.count);
  }

  if (Number(values?.weight) < 0) {
    errors.weight = 'Вес не может быть меньше 0';
  } else {
    errors.weight = required(values?.weight);
  }

  if (Number(values?.width) < 0) {
    errors.width = 'Ширина не может быть меньше 0';
  } else {
    errors.width = required(values?.width);
  }

  if (Number(values?.height) < 0) {
    errors.height = 'Длина не может быть меньше 0';
  } else {
    errors.height = required(values?.height);
  }

  return errors;
};
