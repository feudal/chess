export interface TimeInfo {
  createdAt: string;
  updatedAt: string;
}

export interface User extends TimeInfo {
  _id: string;
  name: string;
}

export interface Message extends TimeInfo {
  _id: string;
  time: string;
  user: User;
  text: string;
}

export interface Room {
  _id: string;
  name: string;
  messages: Message[];
}

export interface Game extends TimeInfo {
  _id: string;
  white: User;
  black: User;
  gamePosition: string;
  winner: User;
}
