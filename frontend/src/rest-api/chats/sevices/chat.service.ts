import axios from "axios";
import {IChatMessage, IChats} from "src/rest-api/chats/models/chat.types";

class ChatService {
    private URL = process.env.BASE_API_URL + '/chat'

    getChats( userId: string) {
        return axios.get<IChats[]>(`${this.URL}s/${userId}`)
    }
    getChatMessages(roomId: string) {
        return axios.get<IChatMessage[]>(`${this.URL}-messages/${roomId}`)
    }
}

export const chatService = new ChatService();