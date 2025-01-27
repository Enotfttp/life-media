import React, {useState} from 'react';
import {useParams} from 'react-router-dom';
import io from 'socket.io-client';
import {
  TextField, Button, Typography, List, ListItem, ListItemText, Grid, Paper, Avatar, ListItemAvatar
} from '@mui/material';

const socket = io(process.env.BASE_WS_URL);
export const Chat = () => {
  const {id: userId} = useParams();

  if (!userId) {
    throw new Error('Данный пользователь не был найден');
  }

  const [roomId, setRoomId] = useState<string>('');
  const [messages, setMessages] = useState<any[]>([]);
  const [inputMessage, setInputMessage] = useState('');

  const sendMessage = () => {
    if (inputMessage.trim()) {
      socket.emit('sendMessage', {
        roomId,
        message: inputMessage,
        userId
      });
      setInputMessage('');
    }
  };

  React.useEffect(() => {
    socket.emit('joinRoom', {userId});
    socket.on('room', (data) => {
      setRoomId(data.roomId);
    });
  }, []);

  React.useEffect(() => {
    socket.on('messages', (data) => {
      setMessages(data.messages);
    });
  }, []);

  return (
    <Grid
      container
      sx={{
        justifyContent: 'center'
      }}
    >
      <Grid
        item
        xs={8}
        spacing={2}
        sx={{
          textAlign: 'center'
        }}
      >
        <Typography variant="h3">Чат с администратором</Typography>
        <Paper
          elevation={3}
          sx={{
            height: '70vh',
            overflow: 'auto',
            marginTop: '30px',
            boxShadow: 'none',
            border: '1px solid rgba(0, 0, 0, 0.23)',
            borderRadius: '10px 10px 0px 0px'
          }}
        >
          <List sx={{color: '#d3d3d3'}}>
            {Boolean(messages?.length) && messages.map((message) => (
              <>
                {message.user_id === userId ? (
                  <ListItem
                    alignItems="flex-start"
                    key={message.id}
                    sx={{
                      backgroundColor: '#266283',
                      width: '50%',
                      margin: '10px',
                      borderRadius: '25px'
                    }}
                  >
                    <ListItemAvatar>
                      <Avatar alt="Я" />
                    </ListItemAvatar>
                    <ListItemText
                      primary="Я"
                      secondary={message.message}
                      sx={{
                        '& .MuiListItemText-secondary': {
                          color: '#fff',
                          fontSize: '18px'
                        }
                      }}
                    />
                  </ListItem>
                ) : (
                  <ListItem
                    alignItems="flex-start"
                    key={message.id}
                    sx={{
                      textAlign: 'right',
                      float: 'right',
                      backgroundColor: '#71b2c9',
                      width: '50%',
                      margin: '10px',
                      borderRadius: '25px'
                    }}
                  >
                    <ListItemText
                      primary={`${message.lastname} ${message.firstname} ${message.patronymic}`}
                      secondary={message.message}
                      sx={{
                        '& .MuiListItemText-secondary': {
                          color: '#fff',
                          fontSize: '18px'
                        }
                      }}
                    />
                    <ListItemAvatar>
                      <Avatar
                        alt={`${message.lastname} ${message.firstname} ${message.patronymic}`}
                        sx={{
                          float: 'right'
                        }}
                      />
                    </ListItemAvatar>
                  </ListItem>
                )}
              </>
            ))}
          </List>
        </Paper>
        <Grid
          item
          xs={12}
        >
          <TextField
            fullWidth
            multiline
            rows={4}
            value={inputMessage}
            onChange={(event) => {
              setInputMessage(event.target.value);
            }}
            placeholder="Введите сообщение..."
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            onClick={sendMessage}
            disabled={!inputMessage.trim().length}
            sx={{
              margin: '20px 0px',
              float: 'right'
            }}
          >
            Отправить
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};
