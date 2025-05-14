
import { toast as sonnerToast, Toast, ToastOptions } from "sonner";

type ToastProps = ToastOptions & {
  title?: string;
  description?: string;
  variant?: "default" | "destructive" | "success";
};

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

  return sonnerToast(title, {
    description,
    style: styles,
    ...props,
  });
};

const useToast = () => {
  return { toast };
};

export { useToast, toast };
