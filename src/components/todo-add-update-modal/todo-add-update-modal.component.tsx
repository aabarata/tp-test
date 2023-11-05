import { ChangeEvent, useContext, useEffect, useId, useState } from "react";
import { Todo, TodoPriority } from "../../@types/todo.d";
import Modal from "../modal/modal.component";
import {
  FormControl,
  TextField,
  InputLabel,
  Button,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import { TodoContext } from "../../context/todo.context";
import { UserContext } from "../../context/user.context";

type TodoAddUpdateProps = {
  isOpen: boolean;
  todo?: Todo;
  afterOnClose?: () => void;
  afterOnSubmit: () => void;
};

const TodoAddUpdate = ({
  isOpen = false,
  todo,
  afterOnClose = () => null,
  afterOnSubmit,
}: TodoAddUpdateProps) => {
  const { addTodo, updateTodo } = useContext(TodoContext);
  const { users } = useContext(UserContext);
  const [isModalOpen, setIsModalOpen] = useState(isOpen);
  const [disabled] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [notes, setNotes] = useState<string>("");
  const [priority, setPriority] = useState<TodoPriority>(TodoPriority.LOW);
  const [assignedUserUUID, setAssignedUserUUID] = useState<string | null>("");
  const nameInputID = useId();
  const notesInputID = useId();
  const prioritySelectID = useId();
  const assignedUserSelectID = useId();

  useEffect(() => {
    if (!todo) {
      setName("");
      setNotes("");
      setPriority(TodoPriority.LOW);
      setAssignedUserUUID("");
    } else {
      setName(todo.name);
      setNotes(todo.notes);
      setPriority(todo.priority);
      setAssignedUserUUID(todo.assignedUserUUID);
    }
    setIsModalOpen(isOpen);
  }, [isOpen, todo]);

  const handleClose = () => {
    setIsModalOpen(false);
    afterOnClose();
  };

  const onSubmitHandler = () => {
    if (!todo) {
      addTodo({
        name,
        notes,
        priority,
        assignedUserUUID: assignedUserUUID === "" ? null : assignedUserUUID,
        completed: false,
        createdAt: new Date().getTime(),
      });
    } else {
      updateTodo(todo.id, {
        name,
        notes,
        priority,
        assignedUserUUID: assignedUserUUID === "" ? null : assignedUserUUID,
      });
    }
    afterOnSubmit();
  };

  return (
    <div>
      <Modal
        isOpen={isModalOpen}
        title={todo ? "Update Todo" : "Add Todo"}
        content={
          <div>
            <TextField
              className="w-full"
              id={nameInputID}
              variant="standard"
              label="Type the todo name"
              helperText={!name ? "The name is required." : null}
              error={!name}
              value={name}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setName(event.target.value)
              }
            />
            <TextField
              className="w-full"
              id={notesInputID}
              variant="standard"
              multiline
              rows={4}
              label="Type some notes"
              value={notes}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setNotes(event.target.value)
              }
            />
            <FormControl
              variant="standard"
              sx={{ marginTop: "16px", width: "100%" }}
            >
              <InputLabel id={`${prioritySelectID}-label`}>Priority</InputLabel>
              <Select
                labelId={`${prioritySelectID}-label`}
                id={prioritySelectID}
                value={priority as any}
                onChange={(event: SelectChangeEvent<HTMLSelectElement>) =>
                  setPriority(event.target.value as any)
                }
                label="Priority"
              >
                <MenuItem value={TodoPriority.LOW}>Low</MenuItem>
                <MenuItem value={TodoPriority.MEDIUM}>Medium</MenuItem>
                <MenuItem value={TodoPriority.HIGH}>High</MenuItem>
              </Select>
            </FormControl>
            <FormControl
              variant="standard"
              sx={{ marginTop: "16px", width: "100%" }}
            >
              <InputLabel id={`${assignedUserSelectID}-label`}>
                Assign to
              </InputLabel>
              <Select
                labelId={`${assignedUserSelectID}-label`}
                id={assignedUserSelectID}
                value={assignedUserUUID as any}
                onChange={(event: SelectChangeEvent<HTMLSelectElement>) =>
                  setAssignedUserUUID(event.target.value as string)
                }
                label="Priority"
              >
                <MenuItem value="">Select a user</MenuItem>
                {users.map((user) => (
                  <MenuItem
                    key={user.login.uuid}
                    value={user.login.uuid}
                  >{`${user.name.first} ${user.name.last}`}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        }
        actions={
          <>
            <Button onClick={handleClose}>Close</Button>
            <Button
              autoFocus
              variant="contained"
              disabled={disabled}
              onClick={onSubmitHandler}
            >
              Confirm
            </Button>
          </>
        }
        onClose={handleClose}
      ></Modal>
    </div>
  );
};

export default TodoAddUpdate;
