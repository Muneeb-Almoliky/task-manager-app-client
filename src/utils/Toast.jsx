import { toast } from "react-toastify";

const Toast = {
  success: (message, options = {}) => {
    toast.success(message, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      ...options,
    });
  },
  error: (message, options = {}) => {
    toast.error(message, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      ...options,
    });
  },
  info: (message, options = {}) => {
    toast.info(message, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      ...options,
    });
  },
};

export default Toast;
