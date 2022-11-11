export interface TimeInfo {
  createdAt: string;
  updatedAt: string;
}

export interface User extends TimeInfo {
  _id: string;
  name: string;
}

export interface Message extends TimeInfo {
  time: string;
  user_name: string;
  text: string;
}

export interface Room {
  _id: string;
  name: string;
  users: User[];
  messages: Message[];
}
