
import { toast as sonnerToast, type ToasterProps } from "sonner";

type ToastProps = {
  title?: string;
  description?: string;
  variant?: "default" | "destructive" | "success";
} & ToasterProps;

const toast = ({ title, description, variant = "default", ...props }: ToastProps) => {
  const styles = {
    background: variant === "destructive" ? "hsl(350 100% 15%)" : 
                variant === "success" ? "hsl(142 76% 15%)" : 
                "hsl(220 12% 10%)",
    border: variant === "destructive" ? "1px solid hsl(350 100% 30% / 0.3)" : 
           variant === "success" ? "1px solid hsl(142 76% 30% / 0.3)" : 
           "1px solid hsl(220 12% 30% / 0.3)",
    color: "white",
  };

  // Auto-dismiss durations based on variant
  const defaultDuration = 
    variant === "success" ? 3000 :     // Success - 3s
    variant === "destructive" ? 5000 : // Errors - 5s (more time to read)
    3000;                              // Default - 3s

  return sonnerToast(title, {
    description,
    style: styles,
    duration: props.duration ?? defaultDuration,
    ...props,
  });
};

const useToast = () => {
  return {
    toast,
    toasts: [] // Adding this to match the expected interface in toaster.tsx
  };
};

export { useToast, toast };
