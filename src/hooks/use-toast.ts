
// Placeholder for future toast functionality if needed
export const useToast = () => {
  return {
    toasts: [],
    toast: (options: { description?: string; variant?: string }) => console.log("Toast:", options),
  };
};

// Simple console log as a substitute for toast notifications
export const toast = (options: { description?: string; variant?: string }) => {
  console.log("Notification:", options.description || "");
};
