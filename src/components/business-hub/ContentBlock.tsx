import { ReactNode } from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ContentBlockProps {
  title: string;
  icon?: LucideIcon;
  summary?: ReactNode;
  children?: ReactNode;
  id?: string;
  className?: string;
}

const ContentBlock = ({
  title,
  icon: Icon,
  summary,
  children,
  id,
  className,
}: ContentBlockProps) => {
  return (
    <div
      id={id}
      className={cn(
        "rounded-2xl overflow-hidden scroll-mt-24",
        "bg-white/[0.03] border border-white/10",
        className
      )}
    >
      {/* Header */}
      <div className="px-6 py-5 border-b border-white/5 bg-white/[0.02]">
        <div className="flex items-center gap-4">
          {Icon && (
            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center">
              <Icon className="h-6 w-6 text-yellow-400" />
            </div>
          )}
          <h3 className="text-lg font-bold text-white">{title}</h3>
        </div>
      </div>

      {/* Content - Always fully visible */}
      <div className="p-6 space-y-5">
        {/* Summary */}
        {summary && (
          <div className="text-base text-white leading-relaxed">
            {summary}
          </div>
        )}

        {/* Full Content - Always visible, no accordion */}
        {children && (
          <div className={cn(summary && "pt-5 border-t border-white/10")}>
            {children}
          </div>
        )}
      </div>
    </div>
  );
};

export default ContentBlock;
