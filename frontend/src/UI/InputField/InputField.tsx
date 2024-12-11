import React, {InputHTMLAttributes} from 'react';
import {Field} from 'react-final-form';
import {TextField} from '@mui/material';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name: string,
  label: string,
}

export const InputField = ({name, label, ...props}: Props) => {
  return (
    <Field {...props} name="inputField" component="input">
      {({input: {value, onChange, ...input}}) => (
        <>
          {console.log('inpurt = ', input)}
          <TextField
            {...input}
            label={label}
            id="inputField"
            variant="outlined"
            helperText=""
          />
        </>
      )}
    </Field>
  );
};
