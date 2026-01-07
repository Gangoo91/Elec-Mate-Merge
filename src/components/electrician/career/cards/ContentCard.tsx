import { motion } from "framer-motion";
import { ChevronRight, LucideIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ContentCardStat {
  label: string;
  value: string;
}

interface ContentCardProps {
  id: string;
  title: string;
  description: string;
  icon?: LucideIcon;
  badge?: string;
  badgeVariant?: "default" | "secondary" | "outline";
  stats?: ContentCardStat[];
  color?: "yellow" | "blue" | "green" | "purple" | "orange" | "amber" | "red";
  onClick: () => void;
  index?: number;
}

const colorConfig = {
  yellow: {
    iconBg: "bg-elec-yellow/10",
    icon: "text-elec-yellow",
    badge: "bg-elec-yellow/20 text-elec-yellow border-elec-yellow/30",
    hoverBorder: "hover:border-elec-yellow/30",
  },
  blue: {
    iconBg: "bg-blue-500/10",
    icon: "text-blue-400",
    badge: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    hoverBorder: "hover:border-blue-500/30",
  },
  green: {
    iconBg: "bg-green-500/10",
    icon: "text-green-400",
    badge: "bg-green-500/20 text-green-400 border-green-500/30",
    hoverBorder: "hover:border-green-500/30",
  },
  purple: {
    iconBg: "bg-purple-500/10",
    icon: "text-purple-400",
    badge: "bg-purple-500/20 text-purple-400 border-purple-500/30",
    hoverBorder: "hover:border-purple-500/30",
  },
  orange: {
    iconBg: "bg-orange-500/10",
    icon: "text-orange-400",
    badge: "bg-orange-500/20 text-orange-400 border-orange-500/30",
    hoverBorder: "hover:border-orange-500/30",
  },
  amber: {
    iconBg: "bg-amber-500/10",
    icon: "text-amber-400",
    badge: "bg-amber-500/20 text-amber-400 border-amber-500/30",
    hoverBorder: "hover:border-amber-500/30",
  },
  red: {
    iconBg: "bg-red-500/10",
    icon: "text-red-400",
    badge: "bg-red-500/20 text-red-400 border-red-500/30",
    hoverBorder: "hover:border-red-500/30",
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.06,
      type: "spring",
      stiffness: 300,
      damping: 24,
    },
  }),
};

const ContentCard = ({
  title,
  description,
  icon: Icon,
  badge,
  stats,
  color = "yellow",
  onClick,
  index = 0,
}: ContentCardProps) => {
  const colors = colorConfig[color];

  return (
    <motion.div
      custom={index}
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ y: -2, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={cn(
        "group relative cursor-pointer rounded-xl border border-white/10 bg-white/5 p-4 transition-all duration-200",
        colors.hoverBorder,
        "hover:bg-white/[0.07]"
      )}
    >
      {/* Header Row */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-start gap-3 flex-1 min-w-0">
          {Icon && (
            <div className={cn("p-2 rounded-lg flex-shrink-0", colors.iconBg)}>
              <Icon className={cn("h-5 w-5", colors.icon)} />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-white text-sm leading-tight mb-1 line-clamp-2">
              {title}
            </h4>
            {badge && (
              <Badge variant="outline" className={cn("text-[10px] h-5", colors.badge)}>
                {badge}
              </Badge>
            )}
          </div>
        </div>
        <ChevronRight className="h-4 w-4 text-white/50 group-hover:text-white group-hover:translate-x-0.5 transition-all flex-shrink-0 mt-1" />
      </div>

      {/* Description */}
      <p className="text-xs text-white leading-relaxed line-clamp-2 mb-3">
        {description}
      </p>

      {/* Stats Row */}
      {stats && stats.length > 0 && (
        <div className="flex gap-3 pt-3 border-t border-white/10">
          {stats.slice(0, 3).map((stat, idx) => (
            <div key={idx} className="flex-1 min-w-0">
              <div className={cn("text-sm font-semibold truncate", colors.icon)}>
                {stat.value}
              </div>
              <div className="text-[10px] text-white truncate">{stat.label}</div>
            </div>
          ))}
        </div>
      )}

      {/* Tap indicator for mobile */}
      <div className="sm:hidden absolute bottom-2 right-2 text-[10px] text-white/70 group-active:text-white">
        Tap to view
      </div>
    </motion.div>
  );
};

export default ContentCard;
