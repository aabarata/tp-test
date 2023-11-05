import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { UserContext } from "../../context/user.context";
import { User } from "../../@types/user.d";
import { Todo } from "../../@types/todo.d";
import TodoCard from "./todo-card.component";

describe("todoCard", () => {
  const mockedUser: User = {
    gender: "female",
    name: {
      title: "Miss",
      first: "Adrijana",
      last: "Anđelković",
    },
    email: "adrijana.andelkovic@example.com",
    login: {
      uuid: "33b250e0-fbaa-4a24-bd80-02f41cbe6c65",
      username: "angrysnake265",
      password: "accord",
      salt: "zXxvyXJm",
      md5: "2c8355b1fcd96ae3f8a9608fa41a7d3c",
      sha1: "819ec2faa5da2a07ce4e7e1d3e900cd191de9af8",
      sha256:
        "e8eef923c9f1da23484142694ef584cd59d1210aae167e7b8495dadcd9b70daf",
    },
    phone: "027-2482-165",
    cell: "065-0937-094",
    id: {
      name: "SID",
      value: "772018127",
    },
    picture: {
      large: "https://randomuser.me/api/portraits/women/48.jpg",
      medium: "https://randomuser.me/api/portraits/med/women/48.jpg",
      thumbnail: "https://randomuser.me/api/portraits/thumb/women/48.jpg",
    },
    nat: "RS",
  };
  const mockedTodo: Todo = {
    assignedUserUUID: "33b250e0-fbaa-4a24-bd80-02f41cbe6c65",
    completed: false,
    createdAt: 1699208593120,
    id: "9df5d6db-3cc2-4c86-919b-b781f0020c73",
    name: "todo 1",
    notes: "Random notes 1",
    priority: 2,
  };
  it("Should match the snapshot", () => {
    const { container } = render(
      <MemoryRouter initialEntries={["/"]}>
        <TodoCard todo={mockedTodo} />
      </MemoryRouter>
    );
    expect(container).toMatchSnapshot();
  });
  it("Should display the correct information", () => {
    const users = [mockedUser];
    const getUserByUUID = () => mockedUser;
    render(
      <MemoryRouter initialEntries={["/"]}>
        <UserContext.Provider value={{ users, getUserByUUID }}>
          <TodoCard todo={mockedTodo} />
        </UserContext.Provider>
      </MemoryRouter>
    );
    const name = screen.queryByTestId("card-name");
    const priority = screen.queryByTestId("card-priority");
    const createdAt = screen.queryByTestId("card-created-at");
    const assignedUserImage = screen.queryByTestId("card-assigned-photo");
    expect(name?.textContent).toBe(mockedTodo.name);
    expect(priority?.textContent).toBe("MEDIUM");
    expect(createdAt?.textContent).toBe("Created at: 11/5/2023");
    expect(assignedUserImage?.getAttribute("src")).toBe(
      mockedUser.picture.thumbnail
    );
  });
  it("Should have the checkbox unchecked if the todo is incomplete", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <TodoCard todo={mockedTodo} />
      </MemoryRouter>
    );
    const checkboxWrapper = screen.queryByTestId("card-action-status");
    const checkbox = checkboxWrapper?.childNodes[0] as HTMLInputElement;
    expect(checkbox?.checked).toBeFalsy();
  });
  it("Should have the checkbox checked if the todo is complete", () => {
    const todo = { ...mockedTodo, completed: true };
    render(
      <MemoryRouter initialEntries={["/"]}>
        <TodoCard todo={todo} />
      </MemoryRouter>
    );
    const checkboxWrapper = screen.queryByTestId("card-action-status");
    const checkbox = checkboxWrapper?.childNodes[0] as HTMLInputElement;
    expect(checkbox?.checked).toBeTruthy();
  });
  //TODO: test if the actions are triggered
});
