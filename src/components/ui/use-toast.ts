// Adapted from https://ui.shadcn.com/docs/components/toast
import { useToast as useToastOriginal } from "@/components/ui/toast";

export const useToast = useToastOriginal;

export {
  toast,
  type Toast,
  type ToastActionElement,
  type ToastProps,
} from "@/components/ui/toast";
