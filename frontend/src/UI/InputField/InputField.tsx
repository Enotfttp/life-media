import React from 'react';
import {Field, FieldProps} from 'react-final-form';
import {TextField, FormControl} from '@mui/material';

interface Props extends FieldProps<string, any> {
  name: string,
  label: string,
  maxLength?: number,
}

export const InputField = ({name, label, maxLength = 255, ...props}: Props) => {
  return (
    <Field {...props} name={name} component="input">
      {({input: {value, onChange, ...input}, meta}) => {
        const handleChange = ({currentTarget}: ChangeEvent<HTMLInputElement>) => {
          const {value} = currentTarget;

          // Ограничиваем ввод, если указан maxLength (admiral-ds предупреждает, но не ограничивает)
          if (value.length === maxLength + 1) {
            return;
          }

          input.onChange(value);
        };

        return (
          <>
            {console.log('input = ', input)}
            <FormControl sx={{m: 1, width: '100%'}} variant="outlined">
              <TextField
                {...input}
                label={label}
                id="inputField"
                variant="outlined"
                onChange={handleChange}
                error={meta.error}
                helperText={meta.error || ''}
              />
            </FormControl>
          </>
        );
      }}
    </Field>
  );
};
