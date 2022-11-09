import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { Users } from "../../svg";
import { User } from "../../types";
import { makeBEM } from "../../utils";
import { Title } from "../Title";

const bem = makeBEM("user-list");

export const UserList = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => toast.error(err));
  }, []);

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
