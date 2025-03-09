
import { toast as sonnerToast } from "sonner";

// Re-export sonner toast for convenience
export const toast = sonnerToast;

// Create a custom hook to access toast context (this will be empty since we're using sonner)
export const useToast = () => {
  return {
    toasts: [],
    dismiss: () => {},
  };
};
