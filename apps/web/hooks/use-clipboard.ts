import { message as notify } from "antd";

export const useClipboard = (message?: string) => {
  const copy = (text: string, description?: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        notify.info(description ?? message, 4000);
      })
      .catch(() => {
        notify.error("Unable to copy to clipboard", 4000);
      });
  };

  return copy;
};
