import React, {ChangeEvent} from 'react';
import {Field, FieldProps} from 'react-final-form';
import {OutlinedInput, InputLabel, FormControl, InputAdornment, FormHelperText} from '@mui/material';

interface Props extends FieldProps<string, any> {
  label: string,
  maxLength?: number,
  width?: string
}

export const AmountField = ({label, maxLength = 255, multiline = false, width = '100%', ...props}: Props) => {
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
          <FormControl sx={{m: 1, width}} variant="outlined">
            <InputLabel
              htmlFor="outlined-adornment-amount"
              error={isTouch && meta.error}
            >
              {label}
            </InputLabel>
            <OutlinedInput
              {...input}
              type="number"
              startAdornment={<InputAdornment position="start">Руб</InputAdornment>}
              label={label}
              error={isTouch && meta.error}
              onChange={handleChange}
            />
            {isTouch && meta.error && (
            <FormHelperText sx={{color: '#d32f2f'}}>
              {meta.error || ''}
            </FormHelperText>
            )}
          </FormControl>
        );
      }}
    </Field>
  );
};
