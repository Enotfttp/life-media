const db = require('../../db');
const {promises: fs} = require("fs");

class ChatController {
    async getChats(req, res) {
        const {userId} = req.params;
        try {
            const {rows} = await db.query(`SELECT 
                      users.firstName, 
                      users.patronymic, 
                      users.lastName,
                      chats.user_id,
                      chats.room_id,
                      users.photo_link
                      FROM 
                         chats
                      LEFT JOIN 
                         users ON users.id = chats.user_id
                      WHERE chats.user_id != $1`,[userId]);
            const newRows = await Promise.all(rows.map(async (elem) => {
                if(!elem?.photo_link)  return elem
                const fileBuffer = await fs.readFile((process.cwd() + elem.photo_link));
                const base64String = fileBuffer.toString('base64');
                return ({...elem, photo_link: base64String})
            }))
            return res.json(newRows)
        } catch (e) {
            console.error('Ошибка в поиска чатов:', e);
            return res.status(400).json({error: e.message});
        }
    }

    async getChatMessages(_, res) {
        try {
            const {roomId} = req.params;
            const {rows} = await db.query(`SELECT * FROM chat_message WHERE roomId = $1 `, [roomId]);

            return res.json(rows);
        } catch (e) {
            console.error('Ошибка во время получения сообщений:', e);
            return res.status(400).json({error: e.message});
        }
    }
}

module.exports = ChatController;
