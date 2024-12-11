import React, {ChangeEvent} from 'react';
import {Field, FieldProps} from 'react-final-form';
import {Visibility, VisibilityOff} from '@mui/icons-material';
import {FormControl, IconButton, OutlinedInput, InputLabel, InputAdornment, FormHelperText} from '@mui/material';

interface Props extends FieldProps<string, any> {
  label: string,
  required?: boolean
}

export const PasswordField = ({label, maxLength = 255, required, ...props}: Props) => {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const validate = (value: string) => {
    if (!required) return false;
    if (!value) {
      return 'Данное поле обязательное';
    }
  };

  return (
    <Field {...props} component="input" validate={required ? validate : props.validate}>
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
            <InputLabel
              htmlFor="outlined-adornment-password"
              error={meta.error}
            >
              {label}
            </InputLabel>
            <OutlinedInput
              {...input}
              id="outlined-adornment-password"
              type={showPassword ? 'text' : 'password'}
              onChange={handleChange}
              label={label}
              error={meta.error}
              endAdornment={(
                <InputAdornment position="end">
                  <IconButton
                    aria-label={showPassword ? 'скрыть пароль' : 'показать пароль'}
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    onMouseUp={handleMouseUpPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
                            )}
            />
            {meta.error && (
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
