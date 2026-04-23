import React from 'react';
import { motion } from 'framer-motion';
import { Eyebrow, Arrow, containerVariants, itemVariants } from '@/components/college/primitives';
import { cn } from '@/lib/utils';

type BadgeTone = 'yellow' | 'green' | 'blue' | 'red' | 'amber';

const badgeToneClass: Record<BadgeTone, string> = {
  yellow: 'text-elec-yellow',
  green: 'text-emerald-400',
  blue: 'text-blue-400',
  red: 'text-red-400',
  amber: 'text-amber-400',
};

interface SettingsNavItem {
  id: string;
  label: string;
  description: string;
  badge?: string;
  badgeTone?: BadgeTone;
}

interface SettingsNavSection {
  title: string;
  items: SettingsNavItem[];
}

interface SettingsNavGridProps {
  onSelect: (tabId: string) => void;
  isSubscribed?: boolean;
  incompleteItems?: Record<string, boolean>;
}

const SETTINGS_SECTIONS: SettingsNavSection[] = [
  {
    title: 'Profile',
    items: [
      { id: 'account', label: 'Account', description: 'Your profile and role settings' },
      {
        id: 'elec-id',
        label: 'Elec-ID',
        description: 'Your digital identity card',
        badge: 'Gamified',
        badgeTone: 'yellow',
      },
    ],
  },
  {
    title: 'Business',
    items: [
      {
        id: 'business',
        label: 'Business Settings',
        description: 'Company, rates, instruments, branding',
      },
      { id: 'billing', label: 'Billing', description: 'Subscription and payments' },
    ],
  },
  {
    title: 'Rewards',
    items: [
      {
        id: 'referrals',
        label: 'Refer a Mate',
        description: 'Free month for you and your mate',
        badge: 'New',
        badgeTone: 'green',
      },
    ],
  },
  {
    title: 'App Settings',
    items: [
      {
        id: 'preferences',
        label: 'Preferences',
        description: 'Theme, notifications, AI assistant',
      },
      { id: 'privacy', label: 'Privacy', description: 'Data controls and analytics' },
    ],
  },
];

const SettingsNavGrid = ({ onSelect, incompleteItems = {} }: SettingsNavGridProps) => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      {SETTINGS_SECTIONS.map((section) => (
        <motion.div key={section.title} variants={itemVariants} className="space-y-3">
          <Eyebrow>{section.title}</Eyebrow>
          <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl overflow-hidden divide-y divide-white/[0.06]">
            {section.items.map((item) => {
              const isIncomplete = !!incompleteItems[item.id];
              return (
                <button
                  key={item.id}
                  onClick={() => onSelect(item.id)}
                  className={cn(
                    'group w-full flex items-center gap-4 px-5 sm:px-6 py-4 sm:py-5 text-left',
                    'hover:bg-[hsl(0_0%_15%)] transition-colors touch-manipulation'
                  )}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[15px] font-medium text-white truncate">
                        {item.label}
                      </span>
                      {item.badge && (
                        <span
                          className={cn(
                            'text-[10px] font-medium uppercase tracking-[0.15em]',
                            badgeToneClass[item.badgeTone ?? 'yellow']
                          )}
                        >
                          {item.badge}
                        </span>
                      )}
                      {isIncomplete && (
                        <span
                          aria-hidden
                          className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse"
                        />
                      )}
                    </div>
                    <div className="mt-0.5 text-[12px] text-white/65 truncate">
                      {item.description}
                    </div>
                  </div>
                  <Arrow />
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
