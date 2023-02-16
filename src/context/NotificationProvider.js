import { createContext, useContext, useEffect, useState } from "react";

import Notification from "../components/Notification";

const NotificationContext = createContext();

const NotificationProvider = ({ children }) => {
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    if (!showNotification) return;

    const timeout = setTimeout(() => {
      setShowNotification(false);
    }, 3000);

    return () => clearTimeout(timeout);
  }, [showNotification]);

  return (
    <NotificationContext.Provider
      value={{ showNotification, setShowNotification }}
    >
      {children}
      <Notification show={showNotification} />
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);

  if (!context) {
    throw new Error(
      "useNotification must be used within a NotificationProvider"
    );
  }
  return context;
};

export default NotificationProvider;
