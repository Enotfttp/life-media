import React, {ChangeEvent} from 'react';
import {Field, FieldProps} from 'react-final-form';
import {TextField, FormControl, Button, Stack, Box, Input} from '@mui/material';
import {IMaskInput} from 'react-imask';
import EditIcon from '@mui/icons-material/Edit';

interface CustomProps {
  onChange: (event: {target: {name: string; value: string}}) => void;
  name: string;
}

const TextMaskCustom = React.forwardRef<HTMLInputElement, CustomProps>(
  (props, ref) => {
    const {onChange, ...other} = props;
    return (
      <IMaskInput
        {...other}
        mask="+# (000) 000-0000"
        definitions={{
          '#': /[1-9]/
        }}
        inputRef={ref}
        onAccept={(value: any) => onChange({target: {name: props.name, value}})}
        overwrite
      />
    );
  }
);

interface Props extends FieldProps<string, any> {
  label?: string,
  typeField?: string,
  maxLength?: number,
  multiline?: boolean,
  width?: string
}

export const InputEditField = ({
  maxLength = 255,
  multiline = false,
  width = '100%',
  typeField = 'standart',
  ...props
}: Props) => {
  const [isEdit, setEdit] = React.useState(false);

  return (
    <Field {...props} component="input">
      {({input, meta}) => {
        const handleChange = ({currentTarget: {value}}: ChangeEvent<HTMLInputElement>) => {
          // Ограничиваем ввод, если указан maxLength (admiral-ds предупреждает, но не ограничивает)
          if (value.length === maxLength + 1) {
            return;
          }

          input.onChange(value);
        };

        return (
          <FormControl
            sx={{
              m: 1,
              width,
              padding: '0px',
              margin: '0px'
            }}
            variant="outlined"
          >
            <Stack direction="row" alignItems="center" spacing={1}>
              {!isEdit ? (
                <Box
                  component="span"
                  sx={{
                    fontWeight: 'normal'
                  }}
                >
                  {input.value}
                </Box>
              ) : (typeField === 'phone' ? (
                <Input
                  placeholder="+7 (000) 000-0000"
                  {...input}
                  sx={{
                      padding: '0px',
                      margin: '0px'
                    }}

                  inputComponent={TextMaskCustom as any}
                />
              ) : (
                <TextField
                  {...input}
                  sx={{
                      padding: '0px',
                      margin: '0px',
                      width: '100%'
                    }}
                  label={props?.label}
                  variant="standard"
                  multiline={multiline}
                  onChange={handleChange}
                  error={meta.error}
                  helperText={meta.error || ''}
                />
              )
              )}

              <Button
                sx={{
                  width: '10px',
                  height: '10px',
                  backgroundColor: 'transparent',
                  color: 'transparent'
                }}
                component="label"
                onClick={() => setEdit((prev) => !prev)}
                startIcon={(
                  <EditIcon
                    color="action"
                  />
                                )}
              />
            </Stack>
          </FormControl>
        );
      }}
    </Field>
  );
};
