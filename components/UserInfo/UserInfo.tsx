import { DefaultEventsMap } from "@socket.io/component-emitter";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import io, { Socket } from "Socket.IO-client";

import { LS_USER_NAME, SO_EVENTS } from "../../app-const";
import { Edit, User } from "../../svg";
import { getError, makeBEM } from "../../utils";

const bem = makeBEM("user-info");
let socket: Socket<DefaultEventsMap, DefaultEventsMap>;

export const UserInfo = () => {
  const ref = useRef<HTMLInputElement>(null);
  const [name, setName] = useState("");
  const [isEdit, setIsEdit] = useState(false);

  const socketInitializer = async () => {
    await axios("/api/socket");
    socket = io();

    socket.on("connect", () => {
      console.log("user-info connected");
    });
  };

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

    socketInitializer();
  }, []);

  const handleKeyDown = (event: { key: string }) => {
    if (event.key === "Enter") {
      axios
        .post("/api/user", { name: localStorage.getItem(LS_USER_NAME), newName: name })
        .then(() => {
          localStorage.setItem(LS_USER_NAME, name);
          setIsEdit(false);
          toast.success("Name updated", { toastId: "name-updated" });

          socket.emit(SO_EVENTS.USER_CHANGED);
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
