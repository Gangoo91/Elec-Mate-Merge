import { cn } from "@/lib/utils";

type StatusType = "active" | "pending" | "completed" | "expired" | "warning" | "inactive" | "approved" | "rejected";

interface StatusBadgeProps {
  status: StatusType | string;
  className?: string;
}

const statusStyles: Record<StatusType, string> = {
  active: "bg-success/20 text-success border-success/30",
  completed: "bg-success/20 text-success border-success/30",
  approved: "bg-success/20 text-success border-success/30",
  pending: "bg-warning/20 text-warning border-warning/30",
  warning: "bg-warning/20 text-warning border-warning/30",
  expired: "bg-destructive/20 text-destructive border-destructive/30",
  rejected: "bg-destructive/20 text-destructive border-destructive/30",
  inactive: "bg-muted text-muted-foreground border-muted",
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const normalizedStatus = status.toLowerCase() as StatusType;
  const style = statusStyles[normalizedStatus] || statusStyles.inactive;
  
  return (
    <span className={cn(
      "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border capitalize",
      style,
      className
    )}>
      {status}
    </span>
  );
}