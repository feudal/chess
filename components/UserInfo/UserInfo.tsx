import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

import { LOCAL_STORAGE, SO_EVENTS } from "../../app-const";
import { GameContext } from "../../context";
import { Edit, User } from "../../svg";
import { getError, makeBEM } from "../../utils";

const bem = makeBEM("user-info");

export const UserInfo = () => {
  const { socket, user } = useContext(GameContext);
  const ref = useRef<HTMLInputElement>(null);
  const [name, setName] = useState(user?.name || "");
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => setName(user?.name || ""), [user]);

  const handleKeyDown = (event: { key: string }) => {
    if (event.key === "Enter") {
      axios
        .post("/api/user", { name: user?.name, newName: name })
        .then((res) => {
          localStorage.setItem(LOCAL_STORAGE.USER, JSON.stringify(res.data));
          setIsEdit(false);
          toast.success("Name updated", { toastId: "name-updated" });

          socket?.emit(SO_EVENTS.USER_CHANGED);
          window.dispatchEvent(new Event("storage"));
        })
        .catch((err) => toast.error(getError(err)));
    }
  };

  return (
    <div className={bem()}>
      <User />
      {isEdit ? (
        <input
          ref={ref}
          className={bem("name")}
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={() => setIsEdit(false)}
        />
      ) : (
        <>
          <div className={bem("name")}>{name}</div>

          <Edit
            className="cursor-pointer"
            onClick={() => {
              setIsEdit(true);
              setTimeout(() => ref.current?.focus(), 0);
            }}
          />
        </>
      )}
    </div>
  );
};
