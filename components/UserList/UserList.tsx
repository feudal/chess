import axios from "axios";
import React, { Dispatch, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

import { Button, Modal, Title } from "..";
import { SO_EVENTS } from "../../app-const";
import { GameContext } from "../../context";
import { Users } from "../../svg";
import { GameStatusEnum, Room, User } from "../../types";
import { makeBEM } from "../../utils";

const bem = makeBEM("user-list");

const getUsersAndSetThem = async (setUsers: Dispatch<React.SetStateAction<User[]>>) => {
  fetch("/api/users")
    .then((res) => res.json())
    .then((data) => setUsers(data))
    .catch((err) => toast.error(err));
};

export const UserList = () => {
  const { game, socket, room, setRoom, user: mainUser } = useContext(GameContext);
  const [users, setUsers] = useState<User[]>([]);
  const [usersOnline, setUsersOnline] = useState<string[]>([]);
  const [inviteModalIsOpen, setInviteModalIsOpen] = useState(false);
  const [inviteeUser, setInviteeUser] = useState<User | null>(null);

  useEffect(() => {
    getUsersAndSetThem(setUsers);
    socket?.on(SO_EVENTS.USERS_ONLINE, (usersId: string[]) => setUsersOnline(usersId));
    socket?.on(SO_EVENTS.USER_CHANGED, () => getUsersAndSetThem(setUsers));
    socket?.on(SO_EVENTS.INVITE_RECEIVED, (user: User) => {
      setInviteModalIsOpen(true);
      setInviteeUser(user);
    });
  }, [socket]);

  const handleRoomChange = async (user: User) => {
    const { data } = await axios<Room>(`/api/room/${mainUser?._id}-${user._id}`);
    socket?.emit(SO_EVENTS.JOIN_ROOM, data?._id);
    setRoom(data);
  };

  const handelInvite = (fromUser?: User, toUser?: User) => {
    socket?.emit(SO_EVENTS.INVITE_SENT, fromUser, toUser);
  };

  const handleInviteAccept = (fromUser?: User | null, toUser?: User | null) => {
    setInviteModalIsOpen(false);
    socket?.emit(SO_EVENTS.INITIATE_GAME, fromUser, toUser);
  };

  return (
    <>
      <div className={bem()}>
        <Title icon={<Users />}>User list</Title>
        <ul className={bem("container")}>
          {users
            .filter((user) => user._id !== mainUser?._id)
            .map((user) => {
              const isOnline = usersOnline.includes(user._id);
              return (
                <li
                  key={user?._id}
                  className={bem("item", {
                    active: room?.name.includes(user._id),
                    online: isOnline,
                  })}
                >
                  <span onClick={() => handleRoomChange(user)}>{user?.name}</span>
                  {isOnline && !game?.status && (
                    <Button
                      shape="pill"
                      color="secondary"
                      onClick={() => handelInvite(mainUser, user)}
                    >
                      Invite
                    </Button>
                  )}
                  {isOnline && game?.status && "online"}
                </li>
              );
            })}
        </ul>
      </div>

      <Modal
        title="Invitation"
        open={inviteModalIsOpen}
        onClose={() => setInviteModalIsOpen(false)}
        onAccept={() => handleInviteAccept(mainUser, inviteeUser)}
        acceptButtonLabel="Accept"
        rejectButtonLabel="Reject"
      >
        {inviteeUser?.name} invite you to play
      </Modal>
    </>
  );
};
