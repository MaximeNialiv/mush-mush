
// Placeholder for future toast functionality if needed
export const useToast = () => {
  return {
    toasts: [],
    dismiss: () => {},
  };
};

// Simple console log as a substitute for toast notifications
export const toast = (options: { description?: string }) => {
  console.log("Notification:", options.description || "");
};
