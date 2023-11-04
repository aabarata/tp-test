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
  assignedUserID: string | null;
  createdAt: Date;
};

export type TodoData = Omit<Todo, "id">;
