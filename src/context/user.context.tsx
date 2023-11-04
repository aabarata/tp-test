import { ReactNode, createContext, useEffect, useState } from "react";
import { User } from "../@types/user.d";
import { fetchUsers } from "../business/user.service";
import displayNotification, {
  NotificationType,
} from "../components/notification/notification.component";

export type UserContextProps = {
  users: User[];
  setUsers: (users: User[]) => void;
};

export const UserContext = createContext<UserContextProps>({
  users: [],
  setUsers: () => null,
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
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
  }, []);

  const value = {
    users,
    setUsers,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
