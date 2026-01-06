
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";

interface QuickAccessCardProps {
  title: string;
  description: string;
  linkText: string;
  linkTo: string;
  icon?: ReactNode;
}

const QuickAccessCard = ({ title, description, linkText, linkTo, icon }: QuickAccessCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -2, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
    >
      <Link
        to={linkTo}
        className={cn(
          "block rounded-xl sm:rounded-2xl",
          "bg-white/[0.03] border border-white/10",
          "hover:bg-white/[0.06] hover:border-elec-yellow/30",
          "transition-all duration-200",
          "min-h-[80px] sm:min-h-[90px]",
          "touch-manipulation"
        )}
      >
        <div className="p-3 sm:p-4 flex flex-col h-full">
          {/* Header with icon */}
          <div className="flex items-center justify-between gap-2 mb-2">
            <div className="flex items-center gap-2 sm:gap-2.5">
              {icon && (
                <div className="p-1.5 sm:p-2 rounded-lg bg-elec-yellow/10">
                  {icon}
                </div>
              )}
              <h3 className="text-sm sm:text-base font-semibold text-white">{title}</h3>
            </div>
            <ChevronRight className="h-4 w-4 text-white/40 flex-shrink-0" />
          </div>

          {/* Description */}
          {description && (
            <p className="text-xs sm:text-sm text-white/60 leading-relaxed flex-grow">
              {description}
            </p>
          )}

          {/* Link text */}
          <div className="mt-2 pt-2 border-t border-white/5">
            <span className="text-xs sm:text-sm font-medium text-elec-yellow">
              {linkText}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default QuickAccessCard;
