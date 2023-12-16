import { toast } from "react-toastify";

export function showToast(message: string, type: string) {
  const typeToast = type === "success" ? "success" : "error";
  toast(message, {
    type: typeToast,
    hideProgressBar: true,
    autoClose: 500,
  });
}
