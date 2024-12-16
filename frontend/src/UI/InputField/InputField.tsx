import React, {ChangeEvent} from 'react';
import {Field, FieldProps} from 'react-final-form';
import {TextField, FormControl} from '@mui/material';

interface Props extends FieldProps<string, any> {
  label: string,
  maxLength?: number,
}

export const InputField = ({label, maxLength = 255, ...props}: Props) => {
  const [isTouch, setTouch] = React.useState(false);

  return (
    <Field {...props} component="input">
      {({input, meta}) => {
        const handleChange = ({currentTarget: {value}}: ChangeEvent<HTMLInputElement>) => {
          setTouch(true);
          // Ограничиваем ввод, если указан maxLength (admiral-ds предупреждает, но не ограничивает)
          if (value.length === maxLength + 1) {
            return;
          }

          input.onChange(value);
        };

        return (
          <FormControl sx={{m: 1, width: '100%'}} variant="outlined">
            <TextField
              {...input}
              label={label}
              variant="outlined"
              onChange={handleChange}
              error={isTouch && meta.error}
              helperText={isTouch && (meta.error || '')}
            />
          </FormControl>
        );
      }}
    </Field>
  );
};
