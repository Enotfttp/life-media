import React from 'react';
import {Stack, Typography, Box} from '@mui/material';
import {Form} from 'react-final-form';
import {IUserForm, IUser} from 'src/rest-api/user/models';

export const Info = ({data}: {data?: IUser}) => {
  console.log('data = ', data);
  const initialState: IUserForm = React.useMemo(() => ({
    email: data?.email ?? '-',
    firstname: data?.firstname ?? '-',
    patronymic: data?.firstname ?? '-',
    lastname: data?.lastname ?? '-',
    phone: data?.phone ?? '-'
  }), [data]);

  const handleSubmit = () => {

  };
    // TODO.FIX переписать через форму
  return (
    <Form<IUserForm>
      initialValues={initialState}
      onSubmit={handleSubmit}
    >
      {(props) => (
        <form onSubmit={props.handleSubmit}>
          <Stack direction="column" spacing={2}>
            <Typography id="transition-modal-title" variant="h4">
              Персональная информация
            </Typography>
            <Stack direction="row" justifyContent="space-between" spacing={2}>
              <Box sx={{display: 'flex', flexDirection: 'column', gap: 2}}>
                <Typography variant="h6">Фамилия:</Typography>
                <Box component="span" sx={{fontWeight: 'normal'}}>
                  {data?.lastname ?? '-'}
                </Box>

                <Typography variant="h6">Имя:</Typography>
                <Box component="span" sx={{fontWeight: 'normal'}}>
                  {data?.firstname ?? '-'}
                </Box>

                <Typography variant="h6">Отчество:</Typography>
                <Box component="span" sx={{fontWeight: 'normal'}}>
                  {data?.patronymic ?? '-'}
                </Box>
              </Box>
              <Box sx={{display: 'flex', flexDirection: 'column', gap: 2}}>
                <Typography variant="h6">Номер телефона:</Typography>
                <Box component="span" sx={{fontWeight: 'normal'}}>
                  {data?.phone ?? '-'}
                </Box>
                <Typography variant="h6">Почта</Typography>
                <Box component="span" sx={{fontWeight: 'normal'}}>
                  {data?.email ?? '-'}
                </Box>
              </Box>
            </Stack>
          </Stack>
        </form>
      )}
    </Form>
  );
};
