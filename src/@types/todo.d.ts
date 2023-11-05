export enum TodoPriority {
  LOW = 1,
  MEDIUM = 2,
  HIGH = 3,
}

export type Todo = {
  id: string;
  name: string;
  notes: string;
  completed: boolean;
  priority: TodoPriority;
  assignedUserUUID: string | null;
  createdAt: number;
};

export type TodoData = Omit<Todo, "id">;
