"use client";

import { useEffect, useState } from "react";

type ToastProps = {
  type: "success" | "error" | "warning" | "info";
  message: string;
  duration?: number; // Optional duration prop to auto-hide the toast
  onClose?: () => void; // Optional onClose prop for manual closing
};

export const Toast = ({
  type,
  message,
  duration = 3000,
  onClose,
}: ToastProps) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    setShow(true);

    const timer = setTimeout(() => {
      setShow(false);
      if (onClose) onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [message, duration, onClose]);

  const handleClose = () => {
    setShow(false);
    if (onClose) onClose();
  };

  return (
    show && (
      <div className="toast toast-end">
        <div className={`alert alert-${type}`}>
          <span>{message}</span>
          <button
            className="btn btn-sm btn-ghost absolute right-3 top-3 hover:bg-transparent"
            onClick={handleClose}
          >
            ✕
          </button>
        </div>
      </div>
    )
  );
};
