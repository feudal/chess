import { SO_EVENTS } from "../../app-const";
import { GameContext } from "../../context";
import { Users } from "../../svg";
import { Room, User } from "../../types";
import { makeBEM } from "../../utils";
import axios from "axios";
import React, { Dispatch, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import io from "Socket.IO-client";

import { Title } from "..";

const bem = makeBEM("user-list");

let socket;

const getUsersAndSetThem = async (setUsers: Dispatch<React.SetStateAction<User[]>>) => {
  fetch("/api/users")
    .then((res) => res.json())
    .then((data) => setUsers(data))
    .catch((err) => toast.error(err));
};

export const UserList = () => {
  const { room, setRoom, user: mainUser } = useContext(GameContext);
  const [users, setUsers] = useState<User[]>([]);
  const [needUpdate, setNeedUpdate] = useState(false);

  const socketInitializer = async () => {
    await axios("/api/socket");
    socket = io();

    socket.on("connect", () => console.log("user-list connected"));
    socket.on(SO_EVENTS.USER_CHANGED, () => setNeedUpdate(true));
  };

  useEffect(() => {
    getUsersAndSetThem(setUsers);
    socketInitializer();
  }, []);

  useEffect(() => {
    getUsersAndSetThem(setUsers);
    setNeedUpdate(false);
  }, [needUpdate]);

  const handleRoomChange = async (user: User) => {
    const { data } = await axios<Room>(`/api/room/${mainUser?._id}-${user._id}`);
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
