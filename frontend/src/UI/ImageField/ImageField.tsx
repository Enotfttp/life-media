import React, {ChangeEvent} from 'react';
import {styled} from '@mui/material/styles';
import {Button, FormControl, Avatar} from '@mui/material';
import {Field, FieldProps} from 'react-final-form';
import {fileToBase64} from 'src/helpers/utils';
import EditIcon from '@mui/icons-material/Edit';
import {RolesContext} from 'src/modules/RolesProvider/RolesProvider';

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
  base64?: string | null,
  maxLength?: number,
  multiline?: boolean,
  onChange: (value: string) => void
}

export const ImageField = ({label, base64, ...props}: IProps) => {
  const [selectedFile, setSelectedFile] = React.useState<any>(null);
  const role = React.useContext(RolesContext);

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
                sx={{position: 'relative', width: '100%', height: '450px'}}
                variant="outlined"
              >
                <Avatar
                  variant="rounded"
                  src={selectedFile ? URL.createObjectURL(selectedFile) : `data:image/jpeg;base64,${base64}`}
                  sx={{
                    position: 'absolute',
                    width: '100%',
                    height: '400px',
                    cursor: 'pointer',
                    transition: '.5s all',
                    zIndex: 999
                  }}
                />
                {role === 'admin' && (
                <Button
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    backgroundColor: 'transparent',
                    zIndex: 999,
                    color: 'none'
                  }}
                  component="label"
                  role={undefined}
                  variant="text"
                  tabIndex={-1}
                  endIcon={(
                    <EditIcon
                      color="action"
                    />
                  )}
                >
                  <VisuallyHiddenInput
                    {...input}
                    value=""
                    type="file"
                    onChange={handleChange}
                    multiple
                  />

                </Button>
                )}
              </FormControl>
            </>
          );
        }}

      </Field>

    </>
  );
};
