import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  User,
  IdCard,
  Building2,
  Settings2,
  Shield,
  CreditCard,
  ChevronRight,
} from "lucide-react";

interface SettingsNavItem {
  id: string;
  label: string;
  description: string;
  icon: React.ElementType;
  iconBg: string;
  iconColour: string;
  badge?: string;
  badgeColour?: string;
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

// New 6-tab grouped settings sections - iOS style
const SETTINGS_SECTIONS: SettingsSection[] = [
  {
    title: "Profile",
    items: [
      {
        id: "account",
        label: "Account",
        description: "Your profile & role settings",
        icon: User,
        iconBg: "bg-blue-500/15",
        iconColour: "text-blue-400",
      },
      {
        id: "elec-id",
        label: "Elec-ID",
        description: "Your digital identity card",
        icon: IdCard,
        iconBg: "bg-elec-yellow/15",
        iconColour: "text-elec-yellow",
        badge: "Gamified",
        badgeColour: "bg-elec-yellow/20 text-elec-yellow",
      },
    ],
  },
  {
    title: "Business",
    items: [
      {
        id: "business",
        label: "Business Settings",
        description: "Company, rates, instruments, branding",
        icon: Building2,
        iconBg: "bg-emerald-500/15",
        iconColour: "text-emerald-400",
      },
      {
        id: "billing",
        label: "Billing",
        description: "Subscription & payments",
        icon: CreditCard,
        iconBg: "bg-purple-500/15",
        iconColour: "text-purple-400",
      },
    ],
  },
  {
    title: "App Settings",
    items: [
      {
        id: "preferences",
        label: "Preferences",
        description: "Theme, notifications, AI assistant",
        icon: Settings2,
        iconBg: "bg-amber-500/15",
        iconColour: "text-amber-400",
      },
      {
        id: "privacy",
        label: "Privacy",
        description: "Data controls & analytics",
        icon: Shield,
        iconBg: "bg-rose-500/15",
        iconColour: "text-rose-400",
      },
    ],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.03,
      delayChildren: 0,
    },
  },
};

const sectionVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.25,
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
              const isIncomplete = incompleteItems[item.id] || false;

              return (
                <button
                  key={item.id}
                  onClick={() => onSelect(item.id)}
                  className={cn(
                    "relative w-full flex items-center gap-3 px-4 py-4",
                    "text-left transition-all duration-150",
                    "hover:bg-white/[0.04] active:bg-white/[0.08]",
                    "active:scale-[0.99] touch-manipulation",
                    "group",
                    index !== section.items.length - 1 && "border-b border-white/[0.04]"
                  )}
                >
                  {/* Icon */}
                  <div
                    className={cn(
                      "w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0",
                      item.iconBg
                    )}
                  >
                    <Icon className={cn("h-5 w-5", item.iconColour)} />
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
                            item.badgeColour
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
