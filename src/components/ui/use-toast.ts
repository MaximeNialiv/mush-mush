
// Re-export from the main hook for backwards compatibility
import { toast, useToast } from "@/hooks/use-toast";

// Re-export types
export type Toast = {
  id: string;
  title?: string;
  description?: string;
  action?: React.ReactNode;
};

export type ToastActionElement = React.ReactElement;

export type ToastProps = {
  variant?: "default" | "destructive";
};

export { toast, useToast };
