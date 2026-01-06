import * as React from "react";
import { Loader2 } from "lucide-react";
import { Button, ButtonProps } from "./button";
import { cn } from "@/lib/utils";

export interface LoadingButtonProps extends ButtonProps {
  /** Show loading spinner and disable button */
  loading?: boolean;
  /** Text to show while loading (optional, defaults to children) */
  loadingText?: string;
  /** Position of the spinner */
  spinnerPosition?: "left" | "right";
}

/**
 * Button with built-in loading state.
 * Shows a spinner and optional loading text when `loading` is true.
 *
 * Usage:
 * ```tsx
 * <LoadingButton loading={isSubmitting}>
 *   Save Changes
 * </LoadingButton>
 *
 * <LoadingButton loading={isSubmitting} loadingText="Saving...">
 *   Save Changes
 * </LoadingButton>
 * ```
 */
const LoadingButton = React.forwardRef<HTMLButtonElement, LoadingButtonProps>(
  (
    {
      children,
      loading = false,
      loadingText,
      spinnerPosition = "left",
      disabled,
      className,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    return (
      <Button
        ref={ref}
        disabled={isDisabled}
        className={cn(
          loading && "cursor-wait",
          className
        )}
        {...props}
      >
        {loading && spinnerPosition === "left" && (
          <Loader2 className="h-4 w-4 animate-spin" />
        )}
        {loading ? (loadingText || children) : children}
        {loading && spinnerPosition === "right" && (
          <Loader2 className="h-4 w-4 animate-spin" />
        )}
      </Button>
    );
  }
);

LoadingButton.displayName = "LoadingButton";

export { LoadingButton };
