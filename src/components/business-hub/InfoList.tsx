import { Check, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface InfoItem {
  title: string;
  description?: string;
  detail?: string;
  icon?: LucideIcon;
}

interface InfoListProps {
  items: InfoItem[];
  variant?: "default" | "checklist" | "numbered";
  className?: string;
}

const InfoList = ({ items, variant = "default", className }: InfoListProps) => {
  return (
    <div className={cn("space-y-3", className)}>
      {items.map((item, index) => {
        const Icon = item.icon || (variant === "checklist" ? Check : undefined);

        return (
          <div
            key={index}
            className={cn(
              "flex items-start gap-4 p-4 rounded-xl",
              "bg-white/[0.03] border border-white/10",
              "hover:bg-white/[0.05] transition-colors"
            )}
          >
            {/* Icon/Number */}
            {variant === "numbered" ? (
              <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center">
                <span className="text-sm font-bold text-yellow-400">{index + 1}</span>
              </div>
            ) : Icon ? (
              <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center">
                <Icon className="h-4 w-4 text-yellow-400" />
              </div>
            ) : null}

            {/* Content */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white">{item.title}</p>
              {item.description && (
                <p className="text-sm text-white/80 mt-1 leading-relaxed">{item.description}</p>
              )}
              {item.detail && (
                <p className="text-xs text-yellow-400/90 mt-2 font-medium">{item.detail}</p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default InfoList;
