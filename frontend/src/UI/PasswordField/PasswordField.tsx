import React, {InputHTMLAttributes} from 'react';
import {Field} from 'react-final-form';
import {Visibility, VisibilityOff} from '@mui/icons-material';
import {FormControl, IconButton, OutlinedInput, InputLabel, InputAdornment} from '@mui/material';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name: string,
  label: string,
}

export const PasswordField = ({name, label, ...props}: Props) => {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <Field {...props} name={name} component="input">
      {({input: {value, onChange, ...input}}) => (
        <FormControl sx={{m: 1, width: '100%'}} variant="outlined">
          {console.log('inputPass = ', input)}
          <InputLabel htmlFor="outlined-adornment-password">{label}</InputLabel>
          <OutlinedInput
            {...input}
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
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
            label={label}
          />
        </FormControl>

      )}
    </Field>
  );
};
