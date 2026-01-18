import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  User,
  IdCard,
  Bell,
  Shield,
  CreditCard,
  Palette,
  HelpCircle,
  FileText,
  Mic,
  Lock,
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

interface SettingsSection {
  title: string;
  items: SettingsNavItem[];
}

interface SettingsNavGridProps {
  onSelect: (tabId: string) => void;
  isSubscribed?: boolean;
  incompleteItems?: {
    [key: string]: boolean;
  };
}

// Grouped settings sections - iOS style
const SETTINGS_SECTIONS: SettingsSection[] = [
  {
    title: "Profile",
    items: [
      {
        id: "elec-id",
        label: "ELEC-iD",
        description: "Your digital identity",
        icon: IdCard,
        iconBg: "bg-elec-yellow/15",
        iconColor: "text-elec-yellow",
        badge: "Primary",
        badgeColor: "bg-elec-yellow/20 text-elec-yellow",
      },
      {
        id: "account",
        label: "Account",
        description: "Profile & preferences",
        icon: User,
        iconBg: "bg-blue-500/15",
        iconColor: "text-blue-400",
      },
    ],
  },
  {
    title: "Preferences",
    items: [
      {
        id: "notifications",
        label: "Notifications",
        description: "Alerts & updates",
        icon: Bell,
        iconBg: "bg-amber-500/15",
        iconColor: "text-amber-400",
      },
      {
        id: "appearance",
        label: "Appearance",
        description: "Theme & display",
        icon: Palette,
        iconBg: "bg-violet-500/15",
        iconColor: "text-violet-400",
      },
      {
        id: "voice",
        label: "Voice Settings",
        description: "AI assistant voice",
        icon: Mic,
        iconBg: "bg-pink-500/15",
        iconColor: "text-pink-400",
      },
    ],
  },
  {
    title: "Privacy & Security",
    items: [
      {
        id: "security",
        label: "Security",
        description: "Password & 2FA",
        icon: Shield,
        iconBg: "bg-green-500/15",
        iconColor: "text-green-400",
      },
      {
        id: "privacy",
        label: "Privacy",
        description: "Data & cookies",
        icon: Lock,
        iconBg: "bg-rose-500/15",
        iconColor: "text-rose-400",
      },
    ],
  },
  {
    title: "Business",
    items: [
      {
        id: "billing",
        label: "Billing",
        description: "Plans & payments",
        icon: CreditCard,
        iconBg: "bg-emerald-500/15",
        iconColor: "text-emerald-400",
      },
    ],
  },
  {
    title: "Support",
    items: [
      {
        id: "help",
        label: "Help & Support",
        description: "FAQ & contact",
        icon: HelpCircle,
        iconBg: "bg-cyan-500/15",
        iconColor: "text-cyan-400",
      },
      {
        id: "legal",
        label: "Legal",
        description: "Terms & policies",
        icon: FileText,
        iconBg: "bg-slate-500/15",
        iconColor: "text-slate-400",
      },
    ],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.02,
      delayChildren: 0,
    },
  },
};

const sectionVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.2,
      ease: 'easeOut',
    },
  },
};

const SettingsNavGrid = ({ onSelect, incompleteItems = {} }: SettingsNavGridProps) => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {SETTINGS_SECTIONS.map((section) => (
        <motion.div key={section.title} variants={sectionVariants}>
          {/* Section header */}
          <h3 className="text-xs font-semibold text-white/40 uppercase tracking-wider px-4 mb-2">
            {section.title}
          </h3>

          {/* iOS-style grouped card */}
          <div className="bg-white/[0.04] rounded-2xl border border-white/[0.06] overflow-hidden">
            {section.items.map((item, index) => {
              const Icon = item.icon;
              const isLast = index === section.items.length - 1;
              const isIncomplete = incompleteItems[item.id] || false;

              return (
                <button
                  key={item.id}
                  onClick={() => onSelect(item.id)}
                  className={cn(
                    "relative w-full flex items-center gap-3 px-4 py-3.5",
                    "text-left transition-all duration-150",
                    "hover:bg-white/[0.04] active:bg-white/[0.08]",
                    "active:scale-[0.99] touch-manipulation",
                    "group"
                  )}
                >
                  {/* Icon */}
                  <div
                    className={cn(
                      "w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0",
                      item.iconBg
                    )}
                  >
                    <Icon className={cn("h-[18px] w-[18px]", item.iconColor)} />
                  </div>

                  {/* Label & Description */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="text-[15px] font-medium text-white group-hover:text-elec-yellow transition-colors">
                        {item.label}
                      </h4>
                      {item.badge && (
                        <span
                          className={cn(
                            "px-1.5 py-0.5 rounded text-[10px] font-semibold",
                            item.badgeColor
                          )}
                        >
                          {item.badge}
                        </span>
                      )}
                      {isIncomplete && (
                        <span className="h-2 w-2 bg-red-500 rounded-full animate-pulse" />
                      )}
                    </div>
                    <p className="text-[12px] text-white/40 truncate">
                      {item.description}
                    </p>
                  </div>

                  {/* Chevron */}
                  <ChevronRight className="h-5 w-5 text-white/20 flex-shrink-0 group-hover:text-white/40 group-hover:translate-x-0.5 transition-all" />
                </button>
              );
            })}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default SettingsNavGrid;
