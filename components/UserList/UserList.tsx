import axios from "axios";
import React, { Dispatch, useEffect, useState } from "react";
import { toast } from "react-toastify";
import io from "Socket.IO-client";

import { SO_EVENTS } from "../../app-const";
import { Users } from "../../svg";
import { User } from "../../types";
import { makeBEM } from "../../utils";
import { Title } from "../Title";

const bem = makeBEM("user-list");

let socket;

const getDataAndSet = async (setUsers: Dispatch<React.SetStateAction<User[]>>) => {
  fetch("/api/users")
    .then((res) => res.json())
    .then((data) => setUsers(data))
    .catch((err) => toast.error(err));
};

export const UserList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [needUpdate, setNeedUpdate] = useState(false);

  const socketInitializer = async () => {
    await axios("/api/socket");
    socket = io();

    socket.on("connect", () => console.log("user-list connected"));
    socket.on(SO_EVENTS.USER_CHANGED, () => setNeedUpdate(true));
  };

  useEffect(() => {
    getDataAndSet(setUsers);
    socketInitializer();
  }, []);

  useEffect(() => {
    getDataAndSet(setUsers);
    setNeedUpdate(false);
  }, [needUpdate]);

  return (
    <div className={bem()}>
      <Title icon={<Users />}>User list</Title>
      <ul>
        {users.map((user) => (
          <li key={user?._id}>{user?.name}</li>
        ))}
      </ul>
    </div>
  );
};
