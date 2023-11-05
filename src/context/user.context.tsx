import { ReactNode, createContext, useEffect, useState } from "react";
import { User } from "../@types/user.d";
import { fetchUsers } from "../business/user.service";
import displayNotification, {
  NotificationType,
} from "../components/notification/notification.component";

const LOCAL_STORAGE_KEY = "tp_users";

export type UserContextProps = {
  users: User[];
  getUserByUUID: (id: string) => User | undefined;
};

export const UserContext = createContext<UserContextProps>({
  users: [],
  getUserByUUID: () => undefined,
});

function getInitialState(): User[] {
  const users = localStorage.getItem(LOCAL_STORAGE_KEY);
  return users ? JSON.parse(users) : [];
}

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [users, setUsers] = useState<User[]>(getInitialState);

  useEffect(() => {
    if (getInitialState().length === 0) {
      fetchUsers()
        .then((users) => setUsers(users))
        .catch(() =>
          displayNotification({
            type: NotificationType.ERROR,
            message:
              "Was not possible to get the users list :( Please try again later.",
            duration: 5000,
          })
        );
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(users));
  }, [users]);

  const getUserByUUID = (uuid: string): User | undefined =>
    users.find((user) => user.login.uuid === uuid);

  const value = {
    users,
    getUserByUUID,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
