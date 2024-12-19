import React from 'react';
import {Typography, Stack, Button, Alert} from '@mui/material';
import {Form} from 'react-final-form';
import {InputField, AmountField, NumberField, FileUpload} from 'src/UI';
import {IProduct} from 'src/rest-api/product/models';
import {useMutationCreateProducts} from 'src/rest-api/product/hooks';
import {validate} from './AddModalContent.utils';

interface IProps {
  handleOpen: (isShow: boolean) => void;
}

export type TInitial = Omit<IProduct, 'id'>;

export const AddModalContent = ({handleOpen}: IProps) => {
  const [error, setError] = React.useState('');
  const {mutateAsync} = useMutationCreateProducts();

  const initialState: TInitial = React.useMemo(() => ({
    name_product: '',
    cost: 0,
    count: 0,
    description: '',
    weight: 0,
    width: 0,
    height: 0,
    color: '',
    material: '',
    photo_link: ''
  }), []);

  const onSubmit = async (values: TInitial) => {
    try {
      setError('');
      console.log('values = ', values);
      const {data} = await mutateAsync(values);
      console.log('data = ', data);
      handleOpen(false);
    } catch (e: any) {
      setError(e?.response?.data?.error || 'Произошла ошибка');
    }
  };

  return (
    <Form<TInitial>
      initialValues={initialState}
      onSubmit={onSubmit}
      validate={validate}
    >
      {(props) => (
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

            <FileUpload />
            <InputField
              width="46.5%"
              name="name_product"
              label="Название продукта"
            />
            <AmountField
              width="46.5%"
              name="cost"
              label="Цена"
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
            <AmountField
              width="21%"
              name="count"
              label="Количество"
            />
            <InputField
              multiline
              name="description"
              label="Описание"
            />

            <Button
              type="submit"
              variant="contained"
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
