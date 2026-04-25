import { useEffect, useState, useCallback, useMemo, useRef } from 'react';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { useSwipeable } from 'react-swipeable';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import { useAdminPrefetch } from '@/hooks/useAdminPrefetch';
import OfflineBanner from '@/components/admin/OfflineBanner';
import { ArrowLeft, ChevronDown, Search } from 'lucide-react';
import { Kbd, AnimatePresence } from '@/components/admin/editorial';
import { motion } from 'framer-motion';
import {
  CommandPalette,
  type CommandItem,
} from '@/components/admin/editorial/CommandPalette';

type NavItem = { name: string; path: string };

const primaryNavItems: NavItem[] = [
  { name: 'Dashboard', path: '/admin' },
  { name: 'Users', path: '/admin/users' },
  { name: 'Trials', path: '/admin/trials' },
  { name: 'Revenue', path: '/admin/revenue' },
  { name: 'Messages', path: '/admin/user-messages' },
  { name: 'IET Knowledge', path: '/admin/iet-knowledge' },
];

const campaignNavItems: NavItem[] = [
  { name: 'Incomplete Signup', path: '/admin/incomplete-signup' },
  { name: 'Win-Back', path: '/admin/winback' },
  { name: 'Apprentice Campaigns', path: '/admin/apprentice-campaigns' },
  { name: 'College Outreach', path: '/admin/outreach' },
  { name: 'Business Outreach', path: '/admin/business-outreach' },
  { name: 'Founders', path: '/admin/founders' },
  { name: 'Early Access', path: '/admin/early-access' },
];

const moderationNavItems: NavItem[] = [
  { name: 'Elec-IDs', path: '/admin/elec-ids' },
  { name: 'Verification', path: '/admin/verification' },
  { name: 'Doc Review', path: '/admin/document-review' },
  { name: 'Employer Moderation', path: '/admin/vacancies' },
  { name: 'Pricing Moderation', path: '/admin/pricing' },
];

const billingNavItems: NavItem[] = [
  { name: 'Subscriptions', path: '/admin/subscriptions' },
  { name: 'Failed Payments', path: '/admin/failed-payments' },
  { name: 'Offers', path: '/admin/offers' },
];

const adminToolItems: NavItem[] = [
  { name: 'Announcements', path: '/admin/announcements' },
  { name: 'Emails', path: '/admin/emails' },
  { name: 'Analytics', path: '/admin/analytics' },
  { name: 'System', path: '/admin/system' },
  { name: 'Flags', path: '/admin/feature-flags' },
  { name: 'Settings', path: '/admin/settings' },
  { name: 'Audit', path: '/admin/audit' },
  { name: 'Export', path: '/admin/export' },
  { name: 'Support', path: '/admin/support' },
];

type GroupKey = 'campaigns' | 'moderation' | 'billing' | 'tools';

const GROUPS: { key: GroupKey; label: string; items: NavItem[] }[] = [
  { key: 'campaigns', label: 'Campaigns', items: campaignNavItems },
  { key: 'moderation', label: 'Moderation', items: moderationNavItems },
  { key: 'billing', label: 'Billing', items: billingNavItems },
  { key: 'tools', label: 'Tools', items: adminToolItems },
];

export default function AdminPanel() {
  const { profile, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();
  const { handlePrefetch } = useAdminPrefetch(queryClient);
  const [openGroup, setOpenGroup] = useState<GroupKey | null>(null);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isLoading && !profile?.admin_role) {
      navigate('/dashboard', { replace: true });
    }
  }, [profile, isLoading, navigate]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setPaletteOpen((v) => !v);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const commandItems: CommandItem[] = useMemo(() => {
    const items: CommandItem[] = [];
    primaryNavItems.forEach((n) =>
      items.push({ id: `nav:${n.path}`, label: n.name, group: 'Pages', path: n.path })
    );
    GROUPS.forEach((g) =>
      g.items.forEach((n) =>
        items.push({
          id: `nav:${n.path}`,
          label: n.name,
          group: g.label,
          path: n.path,
        })
      )
    );
    return items;
  }, []);

  // Close dropdown on outside click / Esc
  useEffect(() => {
    if (!openGroup) return;
    const onDown = (e: MouseEvent) => {
      if (!dropdownRef.current?.contains(e.target as Node)) setOpenGroup(null);
    };
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenGroup(null);
    };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onEsc);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onEsc);
    };
  }, [openGroup]);

  // Close dropdown when route changes
  useEffect(() => {
    setOpenGroup(null);
  }, [location.pathname]);

  const isActivePath = (path: string) =>
    location.pathname === path ||
    (path !== '/admin' && location.pathname.startsWith(path + '/'));

  const activeGroupKey: GroupKey | null = useMemo(() => {
    for (const g of GROUPS) {
      if (g.items.some((i) => isActivePath(i.path))) return g.key;
    }
    return null;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const currentPrimaryIndex = useMemo(
    () => primaryNavItems.findIndex((item) => isActivePath(item.path)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [location.pathname]
  );

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => {
      if (currentPrimaryIndex < 0) return;
      const next = currentPrimaryIndex + 1;
      if (next < primaryNavItems.length) navigate(primaryNavItems[next].path);
    },
    onSwipedRight: () => {
      if (currentPrimaryIndex < 0) return;
      const prev = currentPrimaryIndex - 1;
      if (prev >= 0) navigate(primaryNavItems[prev].path);
    },
    delta: 60,
    trackTouch: true,
    trackMouse: false,
    preventScrollOnSwipe: false,
  });

  const onPrefetch = useCallback((path: string) => handlePrefetch(path), [handlePrefetch]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="h-8 w-8 rounded-full border-2 border-elec-yellow border-t-transparent animate-spin" />
      </div>
    );
  }
  if (!profile?.admin_role) return null;

  const isSuperAdmin = profile.admin_role === 'super_admin';

  const NavPill = ({ item }: { item: NavItem }) => {
    const active = isActivePath(item.path);
    return (
      <button
        key={item.path}
        onClick={() => navigate(item.path)}
        onMouseEnter={() => onPrefetch(item.path)}
        onTouchStart={() => onPrefetch(item.path)}
        className={cn(
          'shrink-0 h-9 sm:h-10 px-3.5 sm:px-4 rounded-full text-[13px] font-medium whitespace-nowrap transition-colors touch-manipulation',
          active
            ? 'bg-elec-yellow text-black'
            : 'text-white hover:text-white hover:bg-white/[0.05]'
        )}
      >
        {item.name}
      </button>
    );
  };

  return (
    <div className="bg-background min-h-screen -mt-3 sm:-mt-4 md:-mt-6">
      <OfflineBanner />

      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b border-white/[0.06]">
        <div className="px-4 sm:px-6 lg:px-8">
          {/* Title row */}
          <div className="flex items-center h-14 gap-3">
            <button
              onClick={() => navigate('/dashboard')}
              aria-label="Back to app"
              className="flex items-center justify-center -ml-2 h-10 w-10 rounded-full hover:bg-white/[0.05] active:scale-95 transition-all touch-manipulation"
            >
              <ArrowLeft className="h-5 w-5 text-white" />
            </button>
            <div className="min-w-0 flex-1">
              <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white">
                {isSuperAdmin ? 'Super Admin' : 'Admin'}
              </div>
              <div className="text-[15px] font-semibold text-white truncate">Admin Panel</div>
            </div>
            <button
              onClick={() => setPaletteOpen(true)}
              aria-label="Open command palette"
              className="shrink-0 flex items-center gap-2 h-10 px-3 rounded-full bg-white/[0.05] border border-white/[0.08] hover:bg-white/[0.08] text-white hover:text-white transition-colors touch-manipulation"
            >
              <Search className="h-4 w-4" />
              <span className="hidden sm:inline text-[12.5px]">Search</span>
              <Kbd className="hidden sm:inline-flex">⌘K</Kbd>
            </button>
          </div>

          {/* Navigation rail */}
          <nav
            ref={dropdownRef}
            className="relative flex items-center gap-1.5 pb-2 overflow-x-auto hide-scrollbar"
          >
            {primaryNavItems.map((item) => (
              <NavPill key={item.path} item={item} />
            ))}

            <div className="mx-1 h-5 w-px bg-white/[0.08] shrink-0" aria-hidden />

            {GROUPS.map((g) => {
              const isOpen = openGroup === g.key;
              const isActive = activeGroupKey === g.key;
              return (
                <div key={g.key} className="relative shrink-0">
                  <button
                    onClick={() => setOpenGroup(isOpen ? null : g.key)}
                    className={cn(
                      'shrink-0 h-9 sm:h-10 px-3.5 sm:px-4 rounded-full text-[13px] font-medium whitespace-nowrap transition-colors touch-manipulation flex items-center gap-1.5',
                      isOpen || isActive
                        ? 'bg-white/[0.08] text-white'
                        : 'text-white hover:text-white hover:bg-white/[0.05]'
                    )}
                  >
                    {g.label}
                    <ChevronDown
                      className={cn(
                        'h-3.5 w-3.5 transition-transform',
                        isOpen && 'rotate-180'
                      )}
                    />
                  </button>
                </div>
              );
            })}
          </nav>

          {/* Dropdown panel */}
          <AnimatePresence>
            {openGroup && (
              <motion.div
                key={openGroup}
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                className="absolute left-0 right-0 top-full bg-background/98 backdrop-blur border-b border-white/[0.08] shadow-2xl"
              >
                <div className="px-4 sm:px-6 lg:px-8 py-3">
                  <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white mb-2">
                    {GROUPS.find((g) => g.key === openGroup)?.label}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {GROUPS.find((g) => g.key === openGroup)?.items.map((item) => {
                      const active = isActivePath(item.path);
                      return (
                        <button
                          key={item.path}
                          onClick={() => {
                            setOpenGroup(null);
                            navigate(item.path);
                          }}
                          onMouseEnter={() => onPrefetch(item.path)}
                          onTouchStart={() => onPrefetch(item.path)}
                          className={cn(
                            'h-9 px-3.5 rounded-full text-[13px] font-medium whitespace-nowrap transition-colors touch-manipulation',
                            active
                              ? 'bg-elec-yellow text-black'
                              : 'bg-white/[0.04] text-white border border-white/[0.08] hover:bg-white/[0.08] hover:text-white'
                          )}
                        >
                          {item.name}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      <div
        className="px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 pb-20 safe-bottom"
        {...swipeHandlers}
      >
        <Outlet />
      </div>

      <CommandPalette
        open={paletteOpen}
        onOpenChange={setPaletteOpen}
        items={commandItems}
      />
    </div>
  );
}
