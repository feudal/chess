import axios from "axios";
import React, { Dispatch, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

import { Title } from "..";
import { SO_EVENTS } from "../../app-const";
import { GameContext } from "../../context";
import { Users } from "../../svg";
import { Room, User } from "../../types";
import { makeBEM } from "../../utils";

const bem = makeBEM("user-list");

const getUsersAndSetThem = async (setUsers: Dispatch<React.SetStateAction<User[]>>) => {
  fetch("/api/users")
    .then((res) => res.json())
    .then((data) => setUsers(data))
    .catch((err) => toast.error(err));
};

export const UserList = () => {
  const { socket, room, setRoom, user: mainUser } = useContext(GameContext);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    getUsersAndSetThem(setUsers);
    socket?.on(SO_EVENTS.USER_CHANGED, () => getUsersAndSetThem(setUsers));
  }, []);

  const handleRoomChange = async (user: User) => {
    const { data } = await axios<Room>(`/api/room/${mainUser?._id}-${user._id}`);
    socket?.emit(SO_EVENTS.JOIN_ROOM, data?._id);
    setRoom(data);
  };

  return (
    <div className={bem()}>
      <Title icon={<Users />}>User list</Title>
      <ul>
        {users
          .filter((user) => user._id !== mainUser?._id)
          .map((user) => (
            <li
              key={user?._id}
              className={bem("item", { active: room?.name.includes(user._id) })}
              onClick={() => handleRoomChange(user)}
            >
              {user?.name}
            </li>
          ))}
      </ul>
    </div>
  );
};
