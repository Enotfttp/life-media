const express = require('express');
const ChatController = require('../../controllers/chat/chat.controller');

const router = express.Router();
const chatInstance = new ChatController();

router.get('/chats/:userId', chatInstance.getChats)
router.get('/chat-messages/:roomId', chatInstance.getChatMessages)


module.exports = router