import React, {ChangeEvent} from 'react';
import {Field, FieldProps} from 'react-final-form';
import {TextField, FormControl} from '@mui/material';

interface Props extends FieldProps<string, any> {
  label: string,
  maxLength?: number,
  required?: boolean
}

export const InputField = ({label, required, maxLength = 255, ...props}: Props) => {
  const [isRequired, setRequired] = React.useState(false);

  const changeRequire = () => {
    if (required) setRequired(true);
  };

  const validate = (value: string, allValues: any, meta: any) => {
    if (typeof props?.validate === 'function') return props.validate(value, allValues, meta);
    if (!isRequired) return false;
    if (!value) {
      return 'Данное поле обязательное';
    }
  };

  return (
    <Field {...props} component="input" validate={validate}>
      {({input, meta}) => {
        const handleChange = ({currentTarget: {value}}: ChangeEvent<HTMLInputElement>) => {
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
              onKeyUp={changeRequire}
              onChange={handleChange}
              error={meta.error}
              helperText={meta.error || ''}
            />
          </FormControl>
        );
      }}
    </Field>
  );
};
