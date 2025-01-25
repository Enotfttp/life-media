import React from 'react';
import {Container, Stack, TextField} from '@mui/material';
import {usePostProducts} from 'src/rest-api/product/hooks';
import {RolesProvider} from 'src/modules/RolesProvider/RolesProvider';
import {ViewShortCard, AddCard} from './components';

export const Main = () => {
  const [searchTerm, setSearchTerm] = React.useState<string | undefined>(undefined);
  const {data} = usePostProducts(searchTerm);

  const debounce = (fn: (...args: React.ChangeEventHandler<HTMLInputElement>[]) => void, ms = 300) => {
    let timeoutId: ReturnType<typeof setTimeout>;
    // eslint-disable-next-line func-names
    return function (this: any, ...args: React.ChangeEventHandler<HTMLInputElement>[]) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => fn.apply(this, args), ms);
    };
  };

  const searchElements = (event: any) => {
    setSearchTerm(event.target?.value);
  };

  return (
    <Container
      maxWidth="xl"
      sx={{
        '&.MuiContainer-maxWidthXl': {
          maxWidth: '95%'
        }
      }}
    >
      <TextField
        id="filled-textarea"
        label="Поиск по название товара"
        placeholder="Введние значение для поиска"
        multiline
        variant="standard"
        sx={{
          width: '50%'
        }}
        onChange={debounce(searchElements)}
      />
      <Stack
        useFlexGap
        spacing={2}
        direction="row"
        sx={{
          marginTop: '40px',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '20px'
        }}
      >
        <RolesProvider>
          <AddCard />
          {Boolean(data?.length) && data!.map(((product) => <ViewShortCard key={product.id} product={product} />))}
        </RolesProvider>
      </Stack>
    </Container>
  );
};
