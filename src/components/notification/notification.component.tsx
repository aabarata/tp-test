import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { createRoot } from "react-dom/client";

export enum NotificationType {
  SUCCESS = "success",
  ERROR = "error",
  WARNING = "warning",
  INFO = "info",
}

type NotificationProps = {
  type: NotificationType;
  message: string;
  duration?: number;
};

const displayNotification = ({
  type,
  message,
  duration = 3000,
}: NotificationProps) => {
  const rootNode = document.getElementById("root") as HTMLElement;
  const domNode = document.createElement("div");
  const root = createRoot(domNode);
  rootNode.appendChild(domNode);

  root.render(
    <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      open={true}
      sx={{ position: "fixed", zIndex: 1 }}
    >
      <Alert severity={type} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );

  setTimeout(() => {
    root.unmount();
  }, duration);
};

export default displayNotification;
