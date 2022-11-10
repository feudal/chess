export interface User {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface Message {
  time: string;
  user: User;
  text: string;
}

export interface Room {
  _id: string;
  name: string;
  users: User[];
  messages: Message[];
}
