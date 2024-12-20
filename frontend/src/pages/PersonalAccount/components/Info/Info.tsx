import React from 'react';
import {useParams} from 'react-router-dom';
import {cloneDeep} from 'lodash';
import {Stack, Typography, Box, Button, Alert} from '@mui/material';
import {Form} from 'react-final-form';
import {IUserForm, IUser} from 'src/rest-api/user/models';
import {AvatarField, InputEditField} from 'src/UI';
import {useMutationUpdatenUser} from 'src/rest-api/user/hooks';

export const Info = ({data}: {data?: IUser}) => {
  const {id} = useParams();
  const {mutateAsync} = useMutationUpdatenUser();
  const [error, setError] = React.useState('');

  const initialState: IUserForm = React.useMemo(() => ({
    email: data?.email ?? '-',
    firstname: data?.firstname ?? '-',
    patronymic: data?.patronymic ?? '-',
    lastname: data?.lastname ?? '-',
    phone: data?.phone,
    photo: '',
    photo_link: data?.photo_link
  }), [data]);

  const handleSubmit = async (values: IUserForm) => {
    try {
      console.log('values = ', values);
      setError('');
      const cloneValues = cloneDeep(values);
      delete cloneValues.photo;
      if (id) await mutateAsync({body: cloneValues, id});
    } catch (e: any) {
      setError(e?.response?.data?.error || 'Произошла ошибка');
    }
  };

  return (
    <Form<IUserForm>
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
          <Stack direction="row" justifyContent="space-between" sx={{marginBottom: '100px', width: '90%'}}>

            <AvatarField
              name="photo"
              onChange={(val) => form.change('photo_link', val)}
              base64={values.photo_link}
            />

            <Stack direction="column" spacing={2}>
              <Typography id="transition-modal-title" variant="h4">
                Персональная информация
              </Typography>
              <Stack direction="row" justifyContent="space-between" spacing={2}>
                <Box sx={{display: 'flex', flexDirection: 'column', gap: 1, fontSize: '18px'}}>
                  <Typography variant="h6">Фамилия:</Typography>
                  <InputEditField name="lastname" />

                  <Typography variant="h6">Имя:</Typography>
                  <InputEditField name="firstname" />

                  <Typography variant="h6">Отчество:</Typography>
                  <InputEditField name="patronymic" />

                </Box>
                <Box sx={{display: 'flex', flexDirection: 'column', gap: 1, fontSize: '18px'}}>
                  <Typography variant="h6">Номер телефона:</Typography>
                  <InputEditField name="phone" typeField="phone" />

                  <Typography variant="h6">Почта</Typography>
                  <InputEditField name="email" />
                </Box>
              </Stack>
            </Stack>
          </Stack>
          <Stack direction="row" justifyContent="end" sx={{width: '90%'}}>
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
