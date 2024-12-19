import React, {ChangeEvent} from 'react';
import {styled} from '@mui/material/styles';
import {Button, Stack, ImageList, ImageListItem, FormHelperText, FormControl} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import {Field, FieldProps} from 'react-final-form';

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
  label: string,
  maxLength?: number,
  multiline?: boolean,
  onChange: (event: ChangeEvent<HTMLInputElement>) => void,
  width?: string,
}

export const FileUploadField = ({width = '100%', label, ...props}: IProps) => {
  const [isTouch, setTouch] = React.useState(false);
  const [selectedFiles, setSelectedFiles] = React.useState<File[] | null>(null);

  return (
    <>
      <Field {...props} component="input">
        {({input, meta}) => {
          const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
            setTouch(true);
            // input.onChange(event);
            setSelectedFiles(Array.from(event.target?.files as any));
            input.onChange(event);
            props.onChange(event);
          };

          return (
            <FormControl sx={{m: 1, width}} variant="outlined">
              <Button
                sx={{
                  width,
                  height: 100
                }}
                color={isTouch && meta?.error ? 'error' : 'primary'}
                component="label"
                role={undefined}
                variant="outlined"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
              >
                {label}
                <VisuallyHiddenInput
                  {...input}
                  type="file"
                  onChange={handleChange}
                  onClick={() => {
                    console.log('testqweqweqwe');
                    setTouch(true);
                  }}
                  helperText={isTouch && (meta.error || '')}
                  multiple
                />
              </Button>
              {isTouch && meta.error && (
                <FormHelperText sx={{color: '#d32f2f'}}>
                  {meta.error || ''}
                </FormHelperText>
              )}
            </FormControl>
          );
        }}
      </Field>
      <Stack
        useFlexGap
        spacing={2}
        direction="row"
        sx={{
          flexWrap: 'wrap',
          gap: '20px',
          width: '100%'
        }}
      >
        {Boolean(selectedFiles?.length) && (
        <ImageList sx={{width: '100%', maxHeight: 450}} cols={4} rowHeight={164}>
          {selectedFiles!.map((file, index) => (
            <ImageListItem
              key={index}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <img
                src={URL.createObjectURL(file)}
                alt={file.name}
                loading="lazy"
                style={{
                  maxWidth: '150px',
                  maxHeight: '150px',
                  boxShadow: '0 0 10px #000'
                }}
              />
            </ImageListItem>
          ))}
        </ImageList>
        )}
      </Stack>
    </>
  );
};
