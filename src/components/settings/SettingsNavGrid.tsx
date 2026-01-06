import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  User,
  IdCard,
  Bell,
  Shield,
  Building2,
  CreditCard,
  Palette,
  HelpCircle,
  FileText,
  Mic,
  Lock,
  Mail,
  ChevronRight,
} from "lucide-react";

interface SettingsNavItem {
  id: string;
  label: string;
  description: string;
  icon: React.ElementType;
  iconBg: string;
  iconColor: string;
  badge?: string;
  badgeColor?: string;
}

interface SettingsNavGridProps {
  onSelect: (tabId: string) => void;
  isSubscribed?: boolean;
}

const SETTINGS_NAV_ITEMS: SettingsNavItem[] = [
  {
    id: "elec-id",
    label: "Elec-ID",
    description: "Your digital identity",
    icon: IdCard,
    iconBg: "bg-elec-yellow/10",
    iconColor: "text-elec-yellow",
    badge: "Primary",
    badgeColor: "bg-elec-yellow/20 text-elec-yellow",
  },
  {
    id: "account",
    label: "Account",
    description: "Profile & preferences",
    icon: User,
    iconBg: "bg-blue-500/10",
    iconColor: "text-blue-400",
  },
  {
    id: "notifications",
    label: "Notifications",
    description: "Alerts & updates",
    icon: Bell,
    iconBg: "bg-amber-500/10",
    iconColor: "text-amber-400",
  },
  {
    id: "security",
    label: "Security",
    description: "Password & 2FA",
    icon: Shield,
    iconBg: "bg-green-500/10",
    iconColor: "text-green-400",
  },
  {
    id: "company",
    label: "Company",
    description: "Business details",
    icon: Building2,
    iconBg: "bg-purple-500/10",
    iconColor: "text-purple-400",
  },
  {
    id: "voice",
    label: "Voice",
    description: "AI assistant voice",
    icon: Mic,
    iconBg: "bg-pink-500/10",
    iconColor: "text-pink-400",
  },
  {
    id: "billing",
    label: "Billing",
    description: "Plans & payments",
    icon: CreditCard,
    iconBg: "bg-emerald-500/10",
    iconColor: "text-emerald-400",
  },
  {
    id: "appearance",
    label: "Appearance",
    description: "Theme & display",
    icon: Palette,
    iconBg: "bg-violet-500/10",
    iconColor: "text-violet-400",
  },
  {
    id: "privacy",
    label: "Privacy",
    description: "Data & cookies",
    icon: Lock,
    iconBg: "bg-rose-500/10",
    iconColor: "text-rose-400",
  },
  {
    id: "help",
    label: "Help",
    description: "Support & FAQ",
    icon: HelpCircle,
    iconBg: "bg-cyan-500/10",
    iconColor: "text-cyan-400",
  },
  {
    id: "legal",
    label: "Legal",
    description: "Terms & policies",
    icon: FileText,
    iconBg: "bg-slate-500/10",
    iconColor: "text-slate-400",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 28,
    },
  },
};

const SettingsNavGrid = ({ onSelect, isSubscribed }: SettingsNavGridProps) => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-2 sm:grid-cols-3 gap-3"
    >
      {SETTINGS_NAV_ITEMS.map((item) => {
        const Icon = item.icon;
        return (
          <motion.button
            key={item.id}
            variants={itemVariants}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelect(item.id)}
            className={cn(
              "relative flex flex-col items-start p-4 rounded-2xl",
              "bg-white/[0.03] border border-white/[0.08]",
              "hover:bg-white/[0.06] hover:border-white/[0.12]",
              "transition-colors duration-200",
              "text-left group"
            )}
          >
            {/* Badge */}
            {item.badge && (
              <span
                className={cn(
                  "absolute top-2 right-2 px-1.5 py-0.5 rounded-md text-[9px] font-semibold",
                  item.badgeColor
                )}
              >
                {item.badge}
              </span>
            )}

            {/* Icon */}
            <div
              className={cn(
                "w-11 h-11 rounded-xl flex items-center justify-center mb-3",
                item.iconBg
              )}
            >
              <Icon className={cn("h-5 w-5", item.iconColor)} />
            </div>

            {/* Label & Description */}
            <h3 className="text-sm font-semibold text-white mb-0.5 group-hover:text-elec-yellow transition-colors">
              {item.label}
            </h3>
            <p className="text-[11px] text-white/40 leading-tight">
              {item.description}
            </p>

            {/* Chevron indicator */}
            <ChevronRight className="absolute right-3 bottom-3 h-4 w-4 text-white/20 group-hover:text-white/40 group-hover:translate-x-0.5 transition-all" />
          </motion.button>
        );
      })}
    </motion.div>
  );
};

export default SettingsNavGrid;
