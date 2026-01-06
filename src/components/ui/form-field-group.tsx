import * as React from "react"
import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"
import { AlertCircle } from "lucide-react"

interface FormFieldGroupProps {
  /** Field label text */
  label: string
  /** Unique identifier for the field */
  htmlFor?: string
  /** Optional description text below the label */
  description?: string
  /** Error message to display */
  error?: string
  /** Whether the field is required */
  required?: boolean
  /** The form input element(s) */
  children: React.ReactNode
  /** Additional className for the wrapper */
  className?: string
}

/**
 * Standardized form field wrapper with consistent spacing and error handling.
 *
 * @example
 * <FormFieldGroup label="Email" required error={errors.email?.message}>
 *   <Input type="email" {...register("email")} />
 * </FormFieldGroup>
 *
 * @example
 * <FormFieldGroup
 *   label="Password"
 *   description="Must be at least 8 characters"
 *   error={errors.password?.message}
 * >
 *   <Input type="password" {...register("password")} />
 * </FormFieldGroup>
 */
export const FormFieldGroup = React.forwardRef<HTMLDivElement, FormFieldGroupProps>(
  ({ label, htmlFor, description, error, required, children, className }, ref) => {
    return (
      <div ref={ref} className={cn("space-y-2", className)}>
        {/* Label row */}
        <div className="flex items-center justify-between">
          <Label
            htmlFor={htmlFor}
            className={cn(
              "text-sm font-medium text-foreground",
              error && "text-destructive"
            )}
          >
            {label}
            {required && (
              <span className="text-destructive ml-1" aria-hidden="true">
                *
              </span>
            )}
          </Label>
        </div>

        {/* Description (if provided) */}
        {description && !error && (
          <p className="text-xs text-muted-foreground">
            {description}
          </p>
        )}

        {/* Field content */}
        <div className={cn(error && "[&>*]:border-destructive")}>
          {children}
        </div>

        {/* Error message */}
        {error && (
          <div className="flex items-center gap-1.5 text-sm text-destructive" role="alert">
            <AlertCircle className="h-3.5 w-3.5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}
      </div>
    )
  }
)

FormFieldGroup.displayName = "FormFieldGroup"

export default FormFieldGroup
