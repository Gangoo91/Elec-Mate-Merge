import { Link } from 'react-router-dom';
import { Settings } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import SidebarNavSection from './SidebarNavSection';
import SidebarFooter from './SidebarFooter';
import { mainNavItems } from './SidebarNavItems';
import { useEffect } from 'react';
import { useScrollLock } from '@/hooks/use-scroll-lock';
import SafeLink from '@/components/common/SafeLink';

interface SidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const Sidebar = ({ open, setOpen }: SidebarProps) => {
  const { profile, user } = useAuth();

  // Get the user role from the profile, defaulting to "visitor" if not available
  const userRole = profile?.role || 'visitor';
  const adminRole = profile?.admin_role;

  // Close sidebar on Escape key press (mobile)
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [open, setOpen]);

  // Prevent body scroll when mobile sidebar is open
  useScrollLock(open);

  const getInitials = () => {
    if (profile?.full_name) {
      return profile.full_name
        .split(' ')
        .map((n: string) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
    }
    return user?.email?.substring(0, 2).toUpperCase() || 'U';
  };

  return (
    <>
      {/* Mobile overlay with enhanced blur */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/60 md:hidden backdrop-blur-md"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar with glass morphism */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-[60] flex w-64 flex-col',
          'backdrop-blur-xl bg-elec-dark/90 border-r border-white/10',
          'shadow-2xl shadow-black/50',
          'transition-transform duration-300 ease-in-out',
          'md:relative md:translate-x-0 md:z-auto',
          open ? 'translate-x-0' : '-translate-x-full',
          // Hide completely on mobile when closed
          !open && 'max-md:invisible'
        )}
        style={{
          paddingTop: 'calc(var(--native-header-offset, 0px) + env(safe-area-inset-top, 0px))',
        }}
      >
        {/* Logo section — hidden on mobile (header already shows branding) */}
        <div className="hidden md:flex h-16 items-center justify-between px-4 border-b border-white/10">
          <Link to="/" className="flex items-center gap-2 group" onClick={() => setOpen(false)}>
            <div className="rounded-xl overflow-hidden border border-elec-yellow/20 group-hover:border-elec-yellow/40 transition-all duration-200 shadow-lg shadow-elec-yellow/5">
              <img src="/logo.jpg" alt="Elec-Mate" className="h-10 w-10 object-cover" />
            </div>
            <span className="font-bold text-lg">
              <span className="bg-gradient-to-r from-elec-yellow to-amber-400 bg-clip-text text-transparent">
                Elec
              </span>
              <span className="text-white">Mate</span>
            </span>
          </Link>
        </div>

        {/* Mobile: premium branded header */}
        <div className="md:hidden bg-gradient-to-b from-elec-yellow/[0.06] to-transparent">
          {/* Brand row */}
          <div className="flex items-center justify-between px-4 pt-3 pb-2">
            <div className="flex items-center gap-2">
              <div className="rounded-lg overflow-hidden h-7 w-7 border border-elec-yellow/20">
                <img src="/logo.jpg" alt="" className="h-7 w-7 object-cover" />
              </div>
              <span className="font-bold text-base">
                <span className="bg-gradient-to-r from-elec-yellow to-amber-400 bg-clip-text text-transparent">
                  Elec
                </span>
                <span className="text-white">Mate</span>
              </span>
            </div>
            <SafeLink
              to="/settings"
              onClick={() => setOpen(false)}
              className="p-2 rounded-lg hover:bg-white/5 transition-colors touch-manipulation"
              aria-label="Settings"
            >
              <Settings className="h-5 w-5 text-white" />
            </SafeLink>
          </div>
          {/* Profile row */}
          <div className="flex items-center gap-3 px-4 pb-3">
            <div className="relative shrink-0">
              <Avatar className="h-10 w-10 ring-2 ring-elec-yellow/25 ring-offset-2 ring-offset-elec-dark">
                <AvatarImage src={profile?.avatar_url || ''} className="object-cover" />
                <AvatarFallback className="bg-gradient-to-br from-elec-yellow to-amber-500 text-elec-dark font-bold text-sm">
                  {getInitials()}
                </AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-green-500 border-2 border-elec-dark" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-[15px] font-semibold truncate leading-tight">
                {profile?.full_name || 'Welcome'}
              </p>
              <p className="text-elec-yellow text-xs capitalize truncate leading-tight mt-0.5">
                {profile?.role || 'User'}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation with custom scrollbar */}
        <nav className="flex-1 overflow-y-auto pt-2 pb-4 px-3 custom-scrollbar">
          <SidebarNavSection
            items={mainNavItems}
            userRole={userRole}
            userEmail={user?.email}
            adminRole={adminRole}
            onItemClick={() => setOpen(false)}
          />
        </nav>

        {/* Footer with premium upgrade CTA */}
        <SidebarFooter />
      </aside>
    </>
  );
};

export default Sidebar;
