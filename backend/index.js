const express = require('express');
const routes = require('./routes/index')
const cors = require('cors');
const cookieParser = require('cookie-parser');
const http = require('http');
const { Server } = require('socket.io');
const db = require("./db");
const {v4: uuidv4} = require("uuid");
const {promises: fs} = require("fs");
const PORT = process.env.PORT || 8080;
const app = express();

const corsOptions = {
    origin:  "*",
}

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true}));
app.use(cookieParser());
app.use(cors(corsOptions));
Object.keys(routes).forEach((key) => app.use('/api', routes[key]))

const server = http.createServer(app)
const io = new Server(server, {
    cors: {origin: "*"},
    methods: ['GET', 'POST'],
});

io.on('connection', (socket) => {
    console.log('New client connected');

        socket.on('joinRoom', async ({ userId, room}) => {
            try {
                const existingUser = await db.query(`SELECT * FROM chats WHERE user_id = $1 `, [userId]);
                const uuid = uuidv4();
                if (!existingUser.rows[0]?.room_id && !room) {
                    const room_uuid = room ?? uuidv4();

                    await db.query(`INSERT INTO chats VALUES ($1, $2, $3)`, [uuid, room_uuid, userId]);
                    socket.join(room_uuid)
                    io.to(room_uuid).emit('room',{roomId:room_uuid})
                    return;
                }
                const {rows} = await db.query(`SELECT
                                  users.firstName, 
                                  users.patronymic, 
                                  users.lastName,
                                  users.photo_link,
                                  chat_message.id, 
                                  chat_message.user_id,
                                  chat_message.message,
                                  chat_message.chat_status_id 
                                  FROM chat_message LEFT JOIN users ON users.id = chat_message.user_id WHERE room_id = $1`, [room ?? existingUser.rows[0].room_id]);
                const newRows = await Promise.all(rows.map(async (elem) => {
                    if(!elem?.photo_link)  return elem
                    const fileBuffer = await fs.readFile((process.cwd() + elem.photo_link));
                    const base64String = fileBuffer.toString('base64');
                    return ({...elem, photo_link: base64String})
                }))

                socket.join(room ?? existingUser.rows[0].room_id)
                io.to(room ?? existingUser.rows[0].room_id).emit('room',{roomId:room ?? existingUser.rows[0].room_id})
                io.to(room ?? existingUser.rows[0].room_id).emit('messages', { room_id: room ?? existingUser.rows[0].room_id, user_id: userId, messages: newRows});
            } catch (error) {
                console.error('Error joining room:', error);
            }
        });

        socket.on('sendMessage', async ({roomId, message, userId }) => {
            try {
                const uuid = uuidv4();
              await db.query(`INSERT INTO chat_message(id ,message, user_id, room_id, chat_status_id)  VALUES ($1, $2, $3, $4, $5)`, [uuid, message, userId, roomId, '1']);
                const {rows} = await db.query(`SELECT
                                  users.firstName, 
                                  users.patronymic, 
                                  users.lastName,
                                  users.photo_link,
                                  chat_message.id, 
                                  chat_message.user_id,
                                  chat_message.message,
                                  chat_message.chat_status_id 
                                  FROM chat_message LEFT JOIN users ON users.id = chat_message.user_id WHERE room_id = $1`, [roomId]);

                const newRows = await Promise.all(rows.map(async (elem) => {
                    if(!elem?.photo_link)  return elem
                    const fileBuffer = await fs.readFile((process.cwd() + elem.photo_link));
                    const base64String = fileBuffer.toString('base64');
                    return ({...elem, photo_link: base64String})
                }))
                io.to(roomId).emit('messages', { room_id:roomId, user_id: userId, messages: newRows});
            } catch (error) {
                console.error('Error sending chat message:', error);
            }
        });

        socket.on('disconnect', async () => {
            // try {
            //     const disconnectedUser = await db.query(`SELECT * FROM users WHERE id = $1`, [socket.id]);
            //     if (disconnectedUser.rows.length > 0) {
            //         await db.query(`DELETE FROM users WHERE id = $1`, [socket.id]);
            //         io.emit('user left', { id: socket.id });
            //     }
            // } catch (error) {
            //     console.error('Error disconnecting user:', error);
            // }
            console.log('DISCONNECT')
        });
});



server.listen(PORT, () => console.log('READY TO WORK'))
