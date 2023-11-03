export enum TodoStatus {
  COMPLETED = "COMPLETED",
  INCOMPLETE = "INCOMPLETE",
}

export type Todo = {
  id: string;
  name: string;
  notes: string;
  status: TodoStatus;
  assignedUserID: string | null;
  createdAt: Date;
};
