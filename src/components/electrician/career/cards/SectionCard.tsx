import { motion } from "framer-motion";
import { ChevronRight, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface SectionCardProps {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  color: "yellow" | "blue" | "green" | "purple" | "orange" | "amber" | "red";
  previewStat: string;
  statLabel: string;
  onClick: () => void;
  index?: number;
}

const colorConfig = {
  yellow: {
    bg: "bg-elec-yellow/10",
    border: "border-elec-yellow/20",
    hoverBorder: "hover:border-elec-yellow/40",
    icon: "text-elec-yellow",
    stat: "text-elec-yellow",
    glow: "group-hover:shadow-elec-yellow/20",
  },
  blue: {
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
    hoverBorder: "hover:border-blue-500/40",
    icon: "text-blue-400",
    stat: "text-blue-400",
    glow: "group-hover:shadow-blue-500/20",
  },
  green: {
    bg: "bg-green-500/10",
    border: "border-green-500/20",
    hoverBorder: "hover:border-green-500/40",
    icon: "text-green-400",
    stat: "text-green-400",
    glow: "group-hover:shadow-green-500/20",
  },
  purple: {
    bg: "bg-purple-500/10",
    border: "border-purple-500/20",
    hoverBorder: "hover:border-purple-500/40",
    icon: "text-purple-400",
    stat: "text-purple-400",
    glow: "group-hover:shadow-purple-500/20",
  },
  orange: {
    bg: "bg-orange-500/10",
    border: "border-orange-500/20",
    hoverBorder: "hover:border-orange-500/40",
    icon: "text-orange-400",
    stat: "text-orange-400",
    glow: "group-hover:shadow-orange-500/20",
  },
  amber: {
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
    hoverBorder: "hover:border-amber-500/40",
    icon: "text-amber-400",
    stat: "text-amber-400",
    glow: "group-hover:shadow-amber-500/20",
  },
  red: {
    bg: "bg-red-500/10",
    border: "border-red-500/20",
    hoverBorder: "hover:border-red-500/40",
    icon: "text-red-400",
    stat: "text-red-400",
    glow: "group-hover:shadow-red-500/20",
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.08,
      type: "spring",
      stiffness: 300,
      damping: 24,
    },
  }),
};

const SectionCard = ({
  title,
  description,
  icon: Icon,
  color,
  previewStat,
  statLabel,
  onClick,
  index = 0,
}: SectionCardProps) => {
  const colors = colorConfig[color];

  return (
    <motion.div
      custom={index}
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={cn(
        "group relative cursor-pointer rounded-2xl border bg-white/5 p-5 transition-all duration-300",
        colors.border,
        colors.hoverBorder,
        "hover:shadow-xl",
        colors.glow
      )}
    >
      {/* Icon and Arrow */}
      <div className="flex items-start justify-between mb-4">
        <div className={cn("p-3 rounded-xl", colors.bg)}>
          <Icon className={cn("h-6 w-6", colors.icon)} />
        </div>
        <ChevronRight className="h-5 w-5 text-white/30 group-hover:text-white/60 group-hover:translate-x-1 transition-all" />
      </div>

      {/* Title & Description */}
      <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-white/90 transition-colors">
        {title}
      </h3>
      <p className="text-sm text-white/60 leading-relaxed mb-4 line-clamp-2">
        {description}
      </p>

      {/* Stat Preview */}
      <div className={cn("pt-3 border-t border-white/10")}>
        <div className={cn("text-xl font-bold", colors.stat)}>{previewStat}</div>
        <div className="text-xs text-white/50">{statLabel}</div>
      </div>
    </motion.div>
  );
};

export default SectionCard;
