import React, {ChangeEvent} from 'react';
import {Field, FieldProps} from 'react-final-form';
import {TextField, FormControl, InputAdornment} from '@mui/material';

interface Props extends FieldProps<string, any> {
  label: string,
  maxLength?: number,
  systemCount: string,
  width?: string
}

export const NumberField = ({
  label,
  maxLength = 255,
  multiline = false,
  systemCount,
  width = '100%',
  ...props
}: Props) => {
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
            <TextField
              {...input}
              type="number"
              label={label}
              onChange={handleChange}
              error={isTouch && meta.error}
              helperText={isTouch && (meta.error || '')}
              slotProps={{
                input: {
                  startAdornment: <InputAdornment position="start">{systemCount}</InputAdornment>
                }
              }}
            />
          </FormControl>
        );
      }}
    </Field>
  );
};
