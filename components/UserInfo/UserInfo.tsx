import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { LS_USER_NAME } from "../../app-const";
import { Edit, User } from "../../svg";
import { getError, makeBEM } from "../../utils";

const bem = makeBEM("user-info");

export const UserInfo = () => {
  const ref = useRef<HTMLInputElement>(null);
  const [name, setName] = useState("");
  const [isEdit, setIsEdit] = useState(false);

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

  const handleKeyDown = (event: { key: string }) => {
    if (event.key === "Enter") {
      axios
        .post("/api/user", { name: localStorage.getItem(LS_USER_NAME), newName: name })
        .then(() => {
          localStorage.setItem(LS_USER_NAME, name);
          setIsEdit(false);
          toast.success("Name updated", { toastId: "name-updated" });
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
