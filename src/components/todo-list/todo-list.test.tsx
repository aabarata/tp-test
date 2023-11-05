import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Todo } from "../../@types/todo.d";
import TodoList from "./todo-list.component";

describe("todoCard", () => {
  const mockedTodos: Todo[] = [
    {
      assignedUserUUID: "33b250e0-fbaa-4a24-bd80-02f41cbe6c65",
      completed: false,
      createdAt: 1699208593120,
      id: "9df5d6db-3cc2-4c86-919b-b781f0020c73",
      name: "todo 1",
      notes: "Random notes 1",
      priority: 2,
    },
    {
      name: "todo 2",
      notes: "Random notes 2",
      priority: 1,
      assignedUserUUID: "9310d272-78b3-47c3-a989-0f5b0f7bb302",
      completed: false,
      createdAt: 1699208605997,
      id: "3b6d64ca-331b-41d9-9bd3-40730b798b87",
    },
  ];
  it("Should match the snapshot", () => {
    const { container } = render(
      <MemoryRouter initialEntries={["/"]}>
        <TodoList todos={mockedTodos} />
      </MemoryRouter>
    );
    expect(container).toMatchSnapshot();
  });
  it("Should display all the todos", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <TodoList todos={mockedTodos} />
      </MemoryRouter>
    );
    expect(screen.getByText("todo 1")).toBeInTheDocument();
    expect(screen.getByText("todo 2")).toBeInTheDocument();
  });
});
