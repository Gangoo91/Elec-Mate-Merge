import { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface AdminEmptyStateProps {
  icon: LucideIcon;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

/**
 * Consistent empty state component for admin pages
 */
export default function AdminEmptyState({
  icon: Icon,
  title,
  description,
  action,
  className,
}: AdminEmptyStateProps) {
  return (
    <div className={cn(
      "flex flex-col items-center justify-center py-12 px-4 text-center",
      className
    )}>
      <div className="w-16 h-16 rounded-2xl bg-muted/50 flex items-center justify-center mb-4">
        <Icon className="h-8 w-8 text-muted-foreground" />
      </div>
      <h3 className="font-semibold text-lg mb-1">{title}</h3>
      {description && (
        <p className="text-sm text-muted-foreground max-w-sm">{description}</p>
      )}
      {action && (
        <Button
          onClick={action.onClick}
          className="mt-4 h-11 px-6 touch-manipulation"
        >
          {action.label}
        </Button>
      )}
    </div>
  );
}
