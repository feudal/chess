import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { LS_USER_NAME } from "../../app-const";
import { Edit, User } from "../../svg";

export const UserInfo = () => {
  const [name, setName] = useState("");

  useEffect(() => {
    const name = localStorage.getItem(LS_USER_NAME);

    if (!name) {
      axios("/api/user")
        .then((res) => res.data)
        .then((data) => {
          setName(data.name);
          localStorage.setItem(LS_USER_NAME, data.name);
        })
        .catch((err) => toast.error(err));
    } else {
      setName(name);
    }
  }, []);

  return (
    <div className="user-info">
      <User />
      {name}
      <Edit className="cursor-pointer" />
    </div>
  );
};
