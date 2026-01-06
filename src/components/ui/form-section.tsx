import * as React from "react"
import { cn } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"

interface FormSectionProps {
  /** Optional section title */
  title?: string
  /** Optional section description */
  description?: string
  /** The form field groups */
  children: React.ReactNode
  /** Show a divider above the section */
  showDivider?: boolean
  /** Additional className */
  className?: string
}

/**
 * Groups related form fields with consistent spacing and optional title.
 *
 * @example
 * <FormSection title="Personal Information">
 *   <FormFieldGroup label="First Name" required>
 *     <Input {...register("firstName")} />
 *   </FormFieldGroup>
 *   <FormFieldGroup label="Last Name" required>
 *     <Input {...register("lastName")} />
 *   </FormFieldGroup>
 * </FormSection>
 *
 * @example
 * <FormSection title="Address" description="Enter your billing address" showDivider>
 *   ...
 * </FormSection>
 */
export const FormSection = React.forwardRef<HTMLDivElement, FormSectionProps>(
  ({ title, description, children, showDivider = false, className }, ref) => {
    return (
      <div ref={ref} className={cn("space-y-4", className)}>
        {/* Divider */}
        {showDivider && <Separator className="bg-border/50" />}

        {/* Section header */}
        {(title || description) && (
          <div className="space-y-1">
            {title && (
              <h3 className="text-base font-semibold text-foreground">
                {title}
              </h3>
            )}
            {description && (
              <p className="text-sm text-muted-foreground">
                {description}
              </p>
            )}
          </div>
        )}

        {/* Form fields */}
        <div className="space-y-4">
          {children}
        </div>
      </div>
    )
  }
)

FormSection.displayName = "FormSection"

export default FormSection
