import { ReactNode, useId, useMemo } from "react";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

type ModalProps = {
  isOpen: boolean;
  title: string;
  content: ReactNode;
  actions: ReactNode;
  size?: "sm" | "md" | "lg";
  onClose: () => void;
};

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const Modal = ({
  isOpen = false,
  title,
  content,
  actions,
  size = "md",
  onClose,
}: ModalProps) => {
  const modalID = useId();

  const modalSize = useMemo((): string => {
    switch (size) {
      case "sm":
        return "400px";
      case "md":
        return "600px";
      case "lg":
        return "800px";
    }
  }, [size]);
  const handleClose = () => {
    onClose();
  };

  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby={modalID}
        open={isOpen}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id={modalID}>
          {title}
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers sx={{ width: modalSize }}>
          {content}
        </DialogContent>
        <DialogActions>{actions}</DialogActions>
      </BootstrapDialog>
    </div>
  );
};

export default Modal;
