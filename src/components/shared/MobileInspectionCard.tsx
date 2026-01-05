import { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface InspectionField {
  label: string;
  value: ReactNode;
  fullWidth?: boolean;
}

interface MobileInspectionCardProps {
  title: string;
  subtitle?: string;
  fields: InspectionField[];
  status?: {
    label: string;
    variant?: "default" | "secondary" | "destructive" | "outline";
    className?: string;
  };
  actions?: ReactNode;
  onClick?: () => void;
  className?: string;
  leftIcon?: ReactNode;
  borderColor?: string;
}

export function MobileInspectionCard({
  title,
  subtitle,
  fields,
  status,
  actions,
  onClick,
  className,
  leftIcon,
  borderColor = "border-l-border"
}: MobileInspectionCardProps) {
  return (
    <Card
      className={cn(
        "bg-card border-l-4 touch-feedback transition-all duration-200",
        onClick && "cursor-pointer active:scale-[0.98]",
        borderColor,
        className
      )}
      onClick={onClick}
    >
      <CardContent className="p-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-start gap-3 min-w-0 flex-1">
            {leftIcon && (
              <div className="flex-shrink-0 mt-0.5">
                {leftIcon}
              </div>
            )}
            <div className="min-w-0 flex-1">
              <h4 className="font-semibold text-foreground text-sm truncate leading-tight">{title}</h4>
              {subtitle && (
                <p className="text-xs text-muted-foreground truncate mt-0.5">{subtitle}</p>
              )}
            </div>
          </div>
          {status && (
            <Badge
              variant={status.variant || "default"}
              className={cn("text-[10px] flex-shrink-0", status.className)}
            >
              {status.label}
            </Badge>
          )}
        </div>

        {/* Fields Grid */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-2.5">
          {fields.map((field, index) => (
            <div
              key={index}
              className={cn(
                "min-w-0",
                field.fullWidth && "col-span-2"
              )}
            >
              <p className="text-[10px] text-muted-foreground uppercase tracking-wide mb-0.5">
                {field.label}
              </p>
              <div className="text-sm text-foreground truncate font-medium">
                {field.value}
              </div>
            </div>
          ))}
        </div>

        {/* Actions */}
        {actions && (
          <div className="flex gap-2 mt-3 pt-3 border-t border-border">
            {actions}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
