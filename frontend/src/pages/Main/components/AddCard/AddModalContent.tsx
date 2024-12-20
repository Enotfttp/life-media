import React from 'react';
import {Typography, Stack, Button, Alert} from '@mui/material';
import {Form} from 'react-final-form';
import {InputField, NumberField, FileUploadField} from 'src/UI';
import {useMutationCreateProducts} from 'src/rest-api/product/hooks';
import {fileToBase64} from 'src/helpers/utils';
import {validate, IInitial} from './AddModalContent.utils';

interface IProps {
  handleOpen: (isShow: boolean) => void;
}

export const AddModalContent = ({handleOpen}: IProps) => {
  const [error, setError] = React.useState('');
  const {mutateAsync} = useMutationCreateProducts();

  const initialState: IInitial = React.useMemo(() => ({
    name_product: '',
    cost: '',
    count: '',
    description: '',
    weight: '',
    width: '',
    height: '',
    color: '',
    material: '',
    // Заглушка для валидации,
    photoName: '',
    photo_link: undefined
  }), []);

  const onSubmit = async (values: IInitial) => {
    try {
      setError('');
      const resultValues = {
        ...values,
        cost: Number(values.cost),
        count: Number(values.count),
        weight: Number(values.weight),
        width: Number(values.width),
        height: Number(values.height)
      };
      delete resultValues?.photoName;
      await mutateAsync(resultValues);
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
      {({form, valid, ...props}) => (
        <form onSubmit={props.handleSubmit}>
          <Typography
            id="transition-modal-title"
            variant="h6"
            component="h2"
            sx={{
              textAlign: 'center',
              marginBottom: '20px'
            }}
          >
            Добавление товара
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
          <Stack
            useFlexGap
            spacing={2}
            direction="row"
            sx={{
              flexWrap: 'wrap'
            }}
          >
            <FileUploadField
              label="Загрузите файл"
              name="photoName"
              onChange={(event) => {
                const base64Array: string[] = [];
                Promise.all(Array.from(event.target?.files as any).map((file) => fileToBase64(file))).then((base64Strings) => {
                  // @ts-ignore
                  base64Array.push(...base64Strings);
                });
                form.change('photo_link', base64Array);
              }}
            />
            <InputField
              width="46.5%"
              name="name_product"
              label="Название продукта"
            />
            <NumberField
              width="46.5%"
              name="cost"
              label="Цена"
              systemCount="Руб"
            />
            <InputField
              width="46.5%"
              name="color"
              label="Цвет"
            />
            <InputField
              width="46.5%"
              name="material"
              label="Материал"
            />

            <NumberField
              width="21%"
              name="weight"
              label="Вес"
              systemCount="кг"
            />
            <NumberField
              width="21%"
              name="width"
              label="Ширина"
              systemCount="см"
            />
            <NumberField
              width="21%"
              name="height"
              label="Длина"
              systemCount="см"
            />
            <NumberField
              width="21%"
              name="count"
              label="Количество"
              systemCount="Шт"
            />
            <InputField
              multiline
              name="description"
              label="Описание"
            />

            <Button
              type="submit"
              variant="contained"
              disabled={!valid}
              sx={{marginLeft: 'auto'}}
            >
              Добавить
            </Button>
          </Stack>
        </form>
      )}
    </Form>
  );
};
