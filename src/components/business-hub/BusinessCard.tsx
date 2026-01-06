import { Link } from "react-router-dom";
import { ChevronRight, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface BusinessCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
  comingSoon?: boolean;
  className?: string;
}

const BusinessCard = ({
  title,
  description,
  icon: Icon,
  href,
  comingSoon = false,
  className,
}: BusinessCardProps) => {
  const CardContent = (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl p-4 sm:p-5",
        "bg-white/5 border border-white/10",
        "transition-all duration-300",
        "hover:border-yellow-400/40 hover:bg-white/[0.07]",
        "active:scale-[0.98] touch-manipulation",
        comingSoon && "opacity-60 cursor-not-allowed",
        className
      )}
    >
      {/* Coming Soon Badge */}
      {comingSoon && (
        <div className="absolute top-3 right-3 z-10">
          <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-yellow-400 text-black rounded-full">
            Soon
          </span>
        </div>
      )}

      {/* Content */}
      <div className="relative flex items-center gap-4">
        {/* Icon */}
        <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-yellow-400/10 flex items-center justify-center">
          <Icon className="h-6 w-6 sm:h-7 sm:w-7 text-yellow-400" />
        </div>

        {/* Text */}
        <div className="flex-1 min-w-0">
          <h3 className="text-base sm:text-lg font-semibold text-white">{title}</h3>
          <p className="text-xs sm:text-sm text-white line-clamp-2 mt-0.5">{description}</p>
        </div>

        {/* Arrow */}
        {!comingSoon && (
          <div className="flex-shrink-0">
            <ChevronRight className="h-5 w-5 text-white/80 group-hover:text-yellow-400 transition-colors" />
          </div>
        )}
      </div>
    </div>
  );

  if (comingSoon) {
    return CardContent;
  }

  return (
    <Link
      to={href}
      className="block group focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400/50 rounded-2xl"
    >
      {CardContent}
    </Link>
  );
};

export default BusinessCard;
