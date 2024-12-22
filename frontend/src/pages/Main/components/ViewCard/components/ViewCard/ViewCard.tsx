import * as React from 'react';
import {Alert, Box, Button, Stack} from '@mui/material';
import Typography from '@mui/material/Typography';
import {IProductForm} from 'src/rest-api/product/models';
import {InputEditField, ImageField} from 'src/UI';
import {Form} from 'react-final-form';
import {useGetProduct, useMutationUpdateProduct} from 'src/rest-api/product/hooks';

interface IProps {
  id: string,
  handleOpen: (isShow: boolean) => void
}

export const ViewCard: React.FC<IProps> = ({id, handleOpen}) => {
  const {data} = useGetProduct(id);
  const {mutateAsync} = useMutationUpdateProduct();
  const [error, setError] = React.useState('');

  const initialState: IProductForm = React.useMemo(() => ({
    name_product: data?.name_product,
    cost: data?.cost,
    count: data?.count,
    description: data?.description,
    weight: data?.weight,
    width: data?.width,
    height: data?.height,
    color: data?.color,
    material: data?.material,
    photo_link: data?.photo_link,
    photo: null
  }), [data]);

  const handleSubmit = async (values: IProductForm) => {
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

      delete resultValues.photo;
      console.log('cloneValues = ', resultValues);
      if (id) await mutateAsync({body: resultValues, id});
      handleOpen(false);
    } catch (e: any) {
      setError(e?.response?.data?.error || 'Произошла ошибка');
    }
  };
  return (
    <Form<IProductForm>
      initialValues={initialState}
      onSubmit={handleSubmit}
    >
      {({form, dirtyFields, values, ...props}) => (
        <form onSubmit={props.handleSubmit}>
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
          <Stack direction="column" spacing={2}>
            <ImageField
              name="photo"
              onChange={(val) => form.change('photo_link', val)}
              base64={values.photo_link}
            />

            <Typography id="transition-modal-title" variant="h5">
              Детальная информация
            </Typography>
            <Box sx={{display: 'flex', flexDirection: 'column', gap: 1, fontSize: '18px'}}>
              <Typography variant="h6">Название:</Typography>
              <InputEditField name="name_product" />

              <Typography variant="h6">Цена:</Typography>
              <InputEditField name="cost" />

              <Typography variant="h6">Количество:</Typography>
              <InputEditField name="count" />

            </Box>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Typography variant="h6">Ширина:</Typography>
              <InputEditField name="width" />

              <Typography variant="h6">Длина: </Typography>
              <InputEditField name="height" />
            </Stack>

            <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
              <Typography variant="h6">Вес</Typography>
              <InputEditField name="weight" />
              <Typography variant="h6">Цвет</Typography>
              <InputEditField name="color" />

              <Typography variant="h6">Материал</Typography>
              <InputEditField name="material" />
            </Stack>

            <Typography variant="h6">Описание:</Typography>
            <InputEditField name="description" typeField="phone" />
          </Stack>
          <Stack direction="row" justifyContent="end" sx={{width: '100%', marginTop: '40px'}}>
            {Boolean(Object.keys(dirtyFields).length)
                            && (
                            <Button
                              type="submit"
                              variant="contained"
                            >
                              Сохранить
                            </Button>
                            )}
          </Stack>
        </form>
      )}
    </Form>
  );
};
