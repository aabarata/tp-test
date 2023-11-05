import { TodoPriority } from "../@types/todo.d";

export const getPriorityLabel = (priority: number): string => {
  const priorityIndex = Object.values(TodoPriority).indexOf(priority);
  return Object.keys(TodoPriority)[priorityIndex] || "Unclassified";
};

export const getPriorityColor = (priority: number): string => {
  switch (priority) {
    case 1:
      return "green";
    case 2:
      return "orange";
    case 3:
      return "red";
    default:
      return "inherit";
  }
};
