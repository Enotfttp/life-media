import React, {Component, ErrorInfo, ReactNode} from 'react';
import {Button, Grid, ImageListItem, Typography} from '@mui/material';
import {ErrorScreen} from './components';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): State {
    return {hasError: true};
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <Grid>
          <Grid
            item
            xs={6}
            md={6}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'column',
              textAlign: 'center',
              placeItems: 'center',
              marginTop: '40px'
            }}
          >
            <ImageListItem
              sx={{
                width: '200px',
                height: '200px'
              }}
            >
              <img
                src="../public/cat-err.svg"
                loading="lazy"
              />
            </ImageListItem>
            <Typography gutterBottom variant="h2">
              Упс..., что-то пошло не так
            </Typography>
            <Button variant="contained" onClick={() => location.reload()}>Обновить страницу</Button>
          </Grid>
        </Grid>
      );
    }

    return this.props.children;
  }
}
