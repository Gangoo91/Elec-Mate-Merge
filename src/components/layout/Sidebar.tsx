import { Link } from 'react-router-dom';
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
          className="fixed inset-0 z-40 bg-black/60 lg:hidden backdrop-blur-md"
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
          'lg:relative lg:translate-x-0 lg:z-auto',
          open ? 'translate-x-0' : '-translate-x-full',
          // Hide completely on mobile/tablet when closed
          !open && 'max-lg:invisible'
        )}
        style={{
          paddingTop: 'calc(var(--native-header-offset, 0px) + env(safe-area-inset-top, 0px))',
        }}
      >
        {/* Logo section — hidden on mobile (header already shows branding) */}
        <div className="hidden lg:flex h-16 items-center justify-between px-4 border-b border-white/10">
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
        <div className="lg:hidden">
          {/* Brand row */}
          <div className="flex items-center px-5 pt-4 pb-2">
            <div className="flex items-center gap-2.5">
              <div className="rounded-xl overflow-hidden h-8 w-8 border border-elec-yellow/20">
                <img src="/logo.jpg" alt="" className="h-8 w-8 object-cover" />
              </div>
              <span className="font-bold text-lg tracking-tight">
                <span className="bg-gradient-to-r from-elec-yellow to-amber-400 bg-clip-text text-transparent">
                  Elec
                </span>
                <span className="text-white">Mate</span>
              </span>
            </div>
          </div>
          {/* Profile row */}
          <div className="flex items-center gap-3 px-5 pb-4 pt-1">
            <Avatar className="h-9 w-9">
              <AvatarImage src={profile?.avatar_url || ''} className="object-cover" />
              <AvatarFallback className="bg-elec-yellow/15 text-elec-yellow font-bold text-xs">
                {getInitials()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-white text-[14px] font-semibold truncate leading-tight">
                {profile?.full_name || 'Welcome'}
              </p>
              <p className="text-white text-[11px] capitalize truncate leading-tight mt-0.5">
                {profile?.role || 'User'}
              </p>
            </div>
          </div>
          <div className="border-t border-white/[0.06] mx-5" />
        </div>

        {/* Navigation with custom scrollbar */}
        <nav className="flex-1 overflow-y-auto pt-3 pb-4 px-3 custom-scrollbar">
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
