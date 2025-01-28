export interface  IChats{
  id :string,
  room_id :string ,
  user_id:string
}

export interface IChatMessage{
  id :string,
  message:string,
  date_message :string,
  user_id :string,
  room_id :string,
  chat_status_id :string
}

export interface IChatStatuses{
  id :string,
  is_read: boolean
}
