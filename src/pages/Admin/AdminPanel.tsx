import { useEffect, useState, useCallback, useMemo } from 'react';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { useSwipeable } from 'react-swipeable';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import { useAdminPrefetch } from '@/hooks/useAdminPrefetch';
import OfflineBanner from '@/components/admin/OfflineBanner';
import {
  LayoutDashboard,
  Users,
  Gift,
  IdCard,
  CreditCard,
  MessageSquare,
  Activity,
  Shield,
  ShieldCheck,
  Megaphone,
  DollarSign,
  HeadphonesIcon,
  History,
  Mail,
  BarChart3,
  Flag,
  Settings,
  CheckSquare,
  Briefcase,
  Download,
  ChevronDown,
  ChevronUp,
  PoundSterling,
  Crown,
  FileCheck,
  Camera,
  ArrowLeft,
  Rocket,
  Inbox,
  Timer,
  GraduationCap,
  UserPlus,
  AlertTriangle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

// Primary navigation items - always visible
const primaryNavItems = [
  { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
  { name: 'Users', path: '/admin/users', icon: Users },
  { name: 'Trials', path: '/admin/trials', icon: Timer },
  { name: 'Revenue', path: '/admin/revenue', icon: DollarSign },
  { name: 'Messages', path: '/admin/user-messages', icon: Inbox },
];

// Secondary navigation items - in expandable section (More)
const secondaryNavItems = [
  { name: 'Incomplete Signup', path: '/admin/incomplete-signup', icon: UserPlus },
  { name: 'Win-Back', path: '/admin/winback', icon: Gift },
  { name: 'Apprentice Campaigns', path: '/admin/apprentice-campaigns', icon: GraduationCap },
  { name: 'Outreach', path: '/admin/outreach', icon: Megaphone },
  { name: 'Founders', path: '/admin/founders', icon: Crown },
  { name: 'Early Access', path: '/admin/early-access', icon: Rocket },
  { name: 'Elec-IDs', path: '/admin/elec-ids', icon: IdCard },
  { name: 'Verification', path: '/admin/verification', icon: CheckSquare },
  { name: 'Doc Review', path: '/admin/document-review', icon: FileCheck },
  { name: 'Subscriptions', path: '/admin/subscriptions', icon: CreditCard },
  { name: 'Failed Payments', path: '/admin/failed-payments', icon: AlertTriangle },
];

// Admin tools - in expandable section (rarely used)
const adminToolItems = [
  { name: 'Announcements', path: '/admin/announcements', icon: Megaphone },
  { name: 'Emails', path: '/admin/emails', icon: Mail },
  { name: 'Analytics', path: '/admin/analytics', icon: BarChart3 },
  { name: 'System', path: '/admin/system', icon: Activity },
];

export default function AdminPanel() {
  const { profile, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();
  const { handlePrefetch } = useAdminPrefetch(queryClient);
  const [showMore, setShowMore] = useState(false);
  const [showTools, setShowTools] = useState(false);

  // Protect admin routes
  useEffect(() => {
    if (!isLoading && !profile?.admin_role) {
      navigate('/dashboard', { replace: true });
    }
  }, [profile, isLoading, navigate]);

  // Auto-expand sections based on current path
  useEffect(() => {
    const isInSecondary = secondaryNavItems.some(
      (item) => location.pathname === item.path || location.pathname.startsWith(item.path + '/')
    );
    const isInTools = adminToolItems.some(
      (item) => location.pathname === item.path || location.pathname.startsWith(item.path + '/')
    );
    if (isInSecondary) setShowMore(true);
    if (isInTools) setShowTools(true);
  }, [location.pathname]);

  // Swipe between primary nav pages
  const currentPrimaryIndex = useMemo(() => {
    const idx = primaryNavItems.findIndex(
      (item) =>
        location.pathname === item.path ||
        (item.path !== '/admin' && location.pathname.startsWith(item.path + '/'))
    );
    return idx >= 0 ? idx : 0;
  }, [location.pathname]);

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => {
      const next = currentPrimaryIndex + 1;
      if (next < primaryNavItems.length) {
        navigate(primaryNavItems[next].path);
      }
    },
    onSwipedRight: () => {
      const prev = currentPrimaryIndex - 1;
      if (prev >= 0) {
        navigate(primaryNavItems[prev].path);
      }
    },
    delta: 60,
    trackTouch: true,
    trackMouse: false,
    preventScrollOnSwipe: false,
  });

  // Prefetch data on hover/touch for faster navigation
  const onPrefetch = useCallback((path: string) => handlePrefetch(path), [handlePrefetch]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-elec-yellow" />
      </div>
    );
  }

  if (!profile?.admin_role) {
    return null;
  }

  const isSuperAdmin = profile.admin_role === 'super_admin';

  const renderNavItem = (item: {
    name: string;
    path: string;
    icon: React.ComponentType<{ className?: string }>;
  }) => {
    const isActive =
      location.pathname === item.path ||
      (item.path !== '/admin' && location.pathname.startsWith(item.path + '/'));
    const Icon = item.icon;

    return (
      <Button
        key={item.path}
        variant={isActive ? 'default' : 'ghost'}
        size="sm"
        onClick={() => navigate(item.path)}
        onMouseEnter={() => onPrefetch(item.path)}
        onTouchStart={() => onPrefetch(item.path)}
        className={cn(
          'shrink-0 gap-1.5 sm:gap-2 touch-manipulation h-11 sm:h-9 px-3 sm:px-4 text-xs sm:text-sm',
          isActive
            ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30'
            : 'text-muted-foreground hover:text-foreground'
        )}
      >
        <Icon className="h-4 w-4" />
        {item.name}
      </Button>
    );
  };

  return (
    <div className="bg-background min-h-screen -mt-3 sm:-mt-4 md:-mt-6">
      {/* Offline Banner */}
      <OfflineBanner />

      {/* Sticky Header — matches NativePageWrapper pattern */}
      <header className="sticky top-0 z-40 bg-background border-b border-white/[0.06]">
        <div className="px-4">
          {/* Title Row */}
          <div className="flex items-center h-14 gap-3">
            <button
              onClick={() => navigate('/dashboard')}
              className="flex items-center justify-center -ml-2 h-11 w-11 rounded-xl hover:bg-white/5 active:scale-95 transition-all touch-manipulation"
            >
              <ArrowLeft className="h-5 w-5 text-muted-foreground" />
            </button>

            <div className="p-1.5 rounded-lg bg-red-500/10">
              <Shield className="h-4 w-4 text-red-400" />
            </div>

            <div className="flex-1 min-w-0">
              <span className="text-base font-semibold text-foreground">Admin Panel</span>
              <div className="flex items-center gap-1.5">
                {isSuperAdmin ? (
                  <ShieldCheck className="h-3 w-3 text-red-400" />
                ) : (
                  <Shield className="h-3 w-3 text-orange-400" />
                )}
                <span className="text-xs text-muted-foreground">
                  {isSuperAdmin ? 'Super Admin' : 'Admin'}
                </span>
              </div>
            </div>
          </div>

          {/* Primary Navigation */}
          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
            {primaryNavItems.map(renderNavItem)}

            {/* More Button */}
            <Button
              variant={showMore ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => setShowMore(!showMore)}
              className="shrink-0 gap-1 touch-manipulation h-11 sm:h-9 px-3 text-xs sm:text-sm text-muted-foreground"
            >
              More
              {showMore ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
            </Button>

            {/* Tools Button */}
            <Button
              variant={showTools ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => setShowTools(!showTools)}
              className="shrink-0 gap-1 touch-manipulation h-11 sm:h-9 px-3 text-xs sm:text-sm text-muted-foreground"
            >
              Tools
              {showTools ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
            </Button>
          </div>
        </div>

        {/* Secondary Navigation - Expandable */}
        {showMore && (
          <div className="px-4 pb-2 border-t border-white/[0.06] pt-2">
            <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
              {secondaryNavItems.map(renderNavItem)}
            </div>
          </div>
        )}

        {/* Tools Navigation - Expandable */}
        {showTools && (
          <div className="px-4 pb-2 border-t border-white/[0.06] pt-2">
            <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
              {adminToolItems.map(renderNavItem)}
            </div>
          </div>
        )}
      </header>

      {/* Admin Content — swipeable between primary pages */}
      <div className="p-4 pb-20 safe-bottom" {...swipeHandlers}>
        <Outlet />
      </div>
    </div>
  );
}
