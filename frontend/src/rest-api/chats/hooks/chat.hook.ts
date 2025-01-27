import {useQuery} from "@tanstack/react-query";
import {IChatMessage, IChats} from "src/rest-api/chats/models/chat.types";
import {chatService} from "src/rest-api/chats/sevices/chat.service";


export const useGetChats = ( userId: string) => {
    return useQuery({
        queryKey: ['chats'],
        queryFn: async () => await chatService.getChats(userId),
        select: (data) => data.data as IChats[]
    })
}
export const useGetChatMessages = ( roomId: string) => {
    return useQuery({
        queryKey: ['chatMessages'],
        queryFn: async () => await chatService.getChatMessages(roomId),
        select: (data) => data.data as IChatMessage[]
    })
}