import { toast } from "react-toastify";

export const toastSuccess = (title) => {
  toast.success(`${title}`, {
    autoClose: 1500,
  });
};

export const toastFailed = (title) =>
  toast.error(`${title}`, {
    autoClose: 1500,
  });

export const toastInfo = (title) =>
  toast.info(`${title}`, {
    autoClose: 1500,
  });

export const toastPending = (textPending, textSuccess) => {
  const resolveAfter2Sec = new Promise((resolve) => setTimeout(resolve, 2000));
  toast.promise(resolveAfter2Sec, {
    pending: `${textPending}`,
    success: `${textSuccess}`,
  });
};
