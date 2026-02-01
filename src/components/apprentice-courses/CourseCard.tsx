/**
 * CourseCard - Best-in-class mobile course card
 *
 * Horizontal layout on mobile for single column:
 * - Icon on left
 * - Title + description on right
 * - Clean, minimal design
 */

import { LucideIcon, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface CourseCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  href?: string;
  number?: string;
  comingSoon?: boolean;
}

export function CourseCard({ title, description, icon: Icon, href, number, comingSoon }: CourseCardProps) {
  const content = (
    <div
      className={cn(
        "relative flex items-center gap-4 p-4 rounded-2xl h-full min-h-[100px]",
        "bg-gradient-to-r from-white/[0.06] to-white/[0.02]",
        "border border-white/10",
        "transition-all duration-200",
        comingSoon
          ? "opacity-50"
          : "active:scale-[0.98] hover:border-elec-yellow/30 hover:from-white/[0.10] hover:to-white/[0.04]"
      )}
    >
      {/* Icon with glow */}
      <div className="relative flex-shrink-0 self-start mt-1">
        <div className={cn(
          "absolute inset-0 rounded-xl blur-xl",
          comingSoon ? "bg-elec-yellow/5" : "bg-elec-yellow/20"
        )} />
        <div className={cn(
          "relative w-12 h-12 rounded-xl flex items-center justify-center",
          "bg-gradient-to-br from-elec-yellow/20 to-amber-600/10",
          "border border-elec-yellow/20"
        )}>
          <Icon className={cn(
            "h-6 w-6",
            comingSoon ? "text-elec-yellow/40" : "text-elec-yellow"
          )} />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 self-start">
        {/* Module number */}
        {number && (
          <span className={cn(
            "text-[11px] font-semibold tracking-wide uppercase",
            comingSoon ? "text-elec-yellow/40" : "text-elec-yellow"
          )}>
            {number}
          </span>
        )}

        {/* Title - fixed height for 2 lines */}
        <h3 className={cn(
          "font-bold text-[15px] leading-tight line-clamp-2 min-h-[2.5em]",
          comingSoon ? "text-white/40" : "text-white"
        )}>
          {title}
        </h3>

        {/* Description */}
        <p className={cn(
          "text-[12px] leading-snug mt-0.5 line-clamp-1",
          comingSoon ? "text-white/20" : "text-white/50"
        )}>
          {description}
        </p>
      </div>

      {/* Arrow or Coming Soon */}
      <div className="flex-shrink-0 self-start mt-1">
        {comingSoon ? (
          <span className="text-[10px] font-medium text-white/40 bg-white/10 px-2 py-1 rounded-full">
            Soon
          </span>
        ) : (
          <ChevronRight className="h-5 w-5 text-white/30" />
        )}
      </div>
    </div>
  );

  if (href && !comingSoon) {
    return (
      <Link to={href} className="block touch-manipulation">
        {content}
      </Link>
    );
  }

  return content;
}
