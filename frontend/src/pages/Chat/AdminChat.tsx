import React, {useState} from 'react';
import {useParams} from 'react-router-dom';
import io from 'socket.io-client';
import {
  TextField, Button, List, ListItem, ListItemText, Grid, Paper, Avatar, ListItemAvatar
} from '@mui/material';
import {useGetChats} from 'src/rest-api/chats/hooks/chat.hook';

const socket = io(process.env.BASE_WS_URL);
export const ChatAdmin = () => {
  const {id: userId} = useParams();
  if (!userId) {
    throw new Error('Данный пользователь не был найден');
  }
  const {data: dataChats} = useGetChats(userId);

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
    socket.on('messages', (data) => {
      setMessages(data.messages);
    });
  }, []);

  return (
    <Grid
      container
      sx={{
        justifyContent: 'space-around'
      }}
    >
      <Grid
        item
        xs={2}
        sx={{
          textAlign: 'center'
        }}
      >
        <List sx={{color: '#d3d3d3'}}>
          {Boolean(dataChats?.length) && dataChats?.map((chat) => (
            <>
              <ListItem
                alignItems="flex-start"
                key={chat.id}
                onClick={() => {
                  setRoomId(chat.room_id);
                  socket.emit('joinRoom', {userId, room: chat.room_id});
                }}
                sx={{
                  margin: '40px 0px',
                  height: '50px',
                  borderRadius: '25px',
                  color: '#000',
                  cursor: 'pointer'
                }}
              >
                <ListItemAvatar>
                  <Avatar alt={`${chat.lastname} ${chat.firstname} ${chat.patronymic}`} src={`data:image/jpeg;base64,${chat.photo_link}`} />
                </ListItemAvatar>
                <ListItemText
                  primary={`${chat.lastname} ${chat.firstname} ${chat.patronymic}`}
                />
              </ListItem>
              <hr />
            </>
          ))}
        </List>
      </Grid>
      <Grid
        item
        xs={8}
        sx={{
          textAlign: 'center'
        }}
      >
        {roomId && (
          <>
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
                          <Avatar alt="Я" src={`data:image/jpeg;base64,${message?.photo_link}`} />
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
                            src={`data:image/jpeg;base64,${message?.photo_link}`}
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
          </>
        )}
      </Grid>
    </Grid>
  );
};
