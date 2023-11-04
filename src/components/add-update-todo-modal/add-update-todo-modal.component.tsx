import { ChangeEvent, useContext, useEffect, useId, useState } from "react";
import { TodoPriority } from "../../@types/todo.d";
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
import { UserContext, UserProvider } from "../../context/user.context";

type AddUpdateTodoProps = {
  isOpen: boolean;
  afterOnClose?: () => void;
  afterOnSubmit: () => void;
};

const AddUpdateTodo = ({
  isOpen = false,
  afterOnClose = () => null,
  afterOnSubmit,
}: AddUpdateTodoProps) => {
  const { addTodo } = useContext(TodoContext);
  const { users } = useContext(UserContext);
  const [isModalOpen, setIsModalOpen] = useState(isOpen);
  const [disabled, setDisabled] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [notes, setNotes] = useState<string>("");
  const [priority, setPriority] = useState<TodoPriority>(TodoPriority.LOW);
  const [assignedUserID, setAssignedUserID] = useState<string | null>("");
  const nameInputID = useId();
  const notesInputID = useId();
  const prioritySelectID = useId();
  const assignedUserSelectID = useId();

  useEffect(() => {
    setName("");
    setNotes("");
    setPriority(TodoPriority.LOW);
    setAssignedUserID("");
    setIsModalOpen(isOpen);
  }, [isOpen]);

  const handleClose = () => {
    setIsModalOpen(false);
    afterOnClose();
  };

  const onSubmitHandler = () => {
    addTodo({
      name,
      notes,
      priority,
      assignedUserID: assignedUserID === "" ? null : assignedUserID,
      completed: false,
      createdAt: new Date(),
    });
    afterOnSubmit();
  };

  return (
    <div>
      <Modal
        isOpen={isModalOpen}
        title={"Add Todo"}
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
                value={assignedUserID as any}
                onChange={(event: SelectChangeEvent<HTMLSelectElement>) =>
                  setAssignedUserID(event.target.value as string)
                }
                label="Priority"
              >
                <MenuItem value="">Select a user</MenuItem>
                {users.map((user) => (
                  <MenuItem
                    key={user.id.value}
                    value={user.id.value}
                  >{`${user.name.first} ${user.name.last}`}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        }
        actions={
          <>
            <Button onClick={handleClose}>Close</Button>
            <Button autoFocus disabled={disabled} onClick={onSubmitHandler}>
              Save
            </Button>
          </>
        }
        onClose={handleClose}
      ></Modal>
    </div>
  );
};

export default AddUpdateTodo;
