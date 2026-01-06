import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Users, FileText, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

export const MobileNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Users, label: 'Customers', path: '/customers' },
    { icon: FileText, label: 'Reports', path: '/reports' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  return (
    <nav className={cn(
      "fixed bottom-0 left-0 right-0 z-50 lg:hidden",
      "backdrop-blur-xl bg-elec-dark/90",
      "border-t border-white/10",
      "shadow-[0_-4px_20px_rgba(0,0,0,0.3)]",
      "pb-safe"
    )}>
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path ||
                          (item.path !== '/' && location.pathname.startsWith(item.path));

          return (
            <motion.button
              key={item.path}
              onClick={() => navigate(item.path)}
              whileTap={{ scale: 0.95 }}
              className={cn(
                "flex flex-col items-center justify-center flex-1 h-full gap-1",
                "touch-manipulation select-none",
                "transition-colors duration-200",
                isActive
                  ? "text-elec-yellow"
                  : "text-white/50 active:text-white/70"
              )}
            >
              <div className="relative">
                {/* Active background indicator */}
                {isActive && (
                  <motion.div
                    layoutId="mobile-nav-indicator"
                    className="absolute -inset-2 rounded-xl bg-elec-yellow/10 border border-elec-yellow/20"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <Icon className={cn(
                  "relative h-5 w-5 transition-transform duration-200",
                  isActive && "scale-110"
                )} />
              </div>
              <span className={cn(
                "text-[10px] font-medium transition-all duration-200",
                isActive ? "text-elec-yellow" : "text-white/50"
              )}>
                {item.label}
              </span>
            </motion.button>
          );
        })}
      </div>
    </nav>
  );
};
