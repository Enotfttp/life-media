import React, {ChangeEvent} from 'react';
import {styled} from '@mui/material/styles';
import {Button, Tooltip, FormControl, Avatar} from '@mui/material';
import {Field, FieldProps} from 'react-final-form';
import {fileToBase64} from 'src/helpers/utils';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1
});

interface IProps extends FieldProps<string, any> {
  base64?: string,
  maxLength?: number,
  multiline?: boolean,
  onChange: (value: string) => void
}

export const AvatarField = ({label, base64, ...props}: IProps) => {
  const [selectedFile, setSelectedFile] = React.useState<any>(null);

  return (
    <>
      <Field {...props} component="input">
        {({input}) => {
          const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
            // @ts-ignore
            setSelectedFile(event?.target?.files[0]);
            // @ts-ignore
            fileToBase64(event?.target?.files[0]).then((base64Strings) => {
              // @ts-ignore
              props.onChange(base64Strings);
            });
            input.onChange(event);
          };

          return (
            <>
              <FormControl
                sx={{position: 'relative'}}
                variant="outlined"
              >
                <Button
                  sx={{
                    position: 'absolute',
                    width: 300,
                    height: 300,
                    borderRadius: '50%',
                    backgroundColor: 'transparent',
                    zIndex: 999,
                    color: 'none'
                  }}
                  component="label"
                  role={undefined}
                  variant="text"
                  tabIndex={-1}
                >
                  <VisuallyHiddenInput
                    {...input}
                    value=""
                    type="file"
                    onChange={handleChange}
                    multiple
                  />
                  <Avatar
                    src={selectedFile ? URL.createObjectURL(selectedFile) : `data:image/jpeg;base64,${base64}`}
                    sx={(theme) => ({
                        position: 'absolute',
                        width: 300,
                        height: 300,
                        borderRadius: '50%',
                        cursor: 'pointer',
                        transition: '.5s all',
                        zIndex: 999,
                        '&:hover': {
                          boxShadow: theme.shadows[3],
                          '&::before': {
                            content: '" "',
                            position: 'absolute',
                            top: '-50%',
                            left: '-50%',
                            width: '200%',
                            height: '200%',
                            borderRadius: '50%',
                            backgroundColor: '#cccccc',
                            opacity: 0,
                            transition: 'opacity .3s ease-in-out'
                          },
                          '&:hover::before': {
                            opacity: 0.65
                          }
                        }
                      })}
                  />
                </Button>
              </FormControl>
            </>
          );
        }}

      </Field>

    </>
  );
};
