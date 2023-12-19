import { Toast } from "@/types/ToastType";
import { toast } from "react-toastify";

export function showToast(message: string, type: Toast) {
  const typeToast = type === "success" ? "success" : "error";
  toast(message, {
    type: typeToast,
    hideProgressBar: true,
    autoClose: 300,
  });
}
