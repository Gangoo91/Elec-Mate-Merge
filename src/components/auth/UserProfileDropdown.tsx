import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { LogOut, MessageSquare, Bell, ChevronRight, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useNotifications } from '@/components/notifications/NotificationProvider';
import { useCombinedUnreadWithNotifications } from '@/hooks/useCombinedUnread';
import { MessagesSheet } from './MessagesSheet';
import { NotificationsSheet } from './NotificationsSheet';

const UserProfileDropdown = () => {
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();

  const [messagesOpen, setMessagesOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const { unreadCount: notificationUnread } = useNotifications();
  const { messageUnread } = useCombinedUnreadWithNotifications(notificationUnread);
  const totalUnread = notificationUnread + messageUnread;
  const bellBadgeCount = notificationUnread;

  const handleOpenMessages = () => {
    setDropdownOpen(false);
    setTimeout(() => setMessagesOpen(true), 150);
  };

  const handleOpenNotifications = () => {
    setDropdownOpen(false);
    setTimeout(() => setNotificationsOpen(true), 150);
  };

  const handleSignOut = async () => {
    await signOut();
    window.location.replace('/');
  };

  if (!user) {
    return (
      <button
        onClick={() => navigate('/auth/signin')}
        className="px-4 py-2 rounded-xl font-medium text-sm bg-gradient-to-r from-elec-yellow to-amber-500 text-elec-dark hover:shadow-lg hover:shadow-elec-yellow/25 active:scale-95 transition-all border border-elec-yellow/50"
      >
        Sign In
      </button>
    );
  }

  const getInitials = () => {
    if (profile?.full_name) {
      return profile.full_name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2);
    }
    return user.email?.substring(0, 2).toUpperCase() || 'U';
  };

  const MenuItem = ({ icon: Icon, label, badge, onClick, variant = 'default' }: {
    icon: typeof Bell;
    label: string;
    badge?: number;
    onClick: () => void;
    variant?: 'default' | 'danger';
  }) => (
    <DropdownMenuItem
      onClick={onClick}
      className={cn(
        'flex items-center justify-between px-3 py-2.5 rounded-xl cursor-pointer group touch-manipulation min-h-[44px]',
        variant === 'danger'
          ? 'text-red-400 hover:bg-red-500/10 focus:bg-red-500/10 hover:text-red-400 focus:text-red-400'
          : 'hover:bg-white/[0.06] focus:bg-white/[0.06]'
      )}
    >
      <div className="flex items-center gap-3">
        <Icon className={cn('h-[18px] w-[18px]', variant === 'danger' ? 'text-red-400' : 'text-white')} />
        <span className={cn('font-medium text-sm', variant === 'danger' ? 'text-red-400' : 'text-white')}>{label}</span>
      </div>
      <div className="flex items-center gap-2">
        {badge !== undefined && badge > 0 && (
          <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1.5 text-[10px] font-bold text-white">
            {badge > 9 ? '9+' : badge}
          </span>
        )}
        {variant !== 'danger' && <ChevronRight className="h-4 w-4 text-white/30 group-hover:text-white transition-colors" />}
      </div>
    </DropdownMenuItem>
  );

  return (
    <>
      <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
        <DropdownMenuTrigger asChild>
          <button
            className="relative touch-manipulation h-9 w-9 sm:h-10 sm:w-10 flex items-center justify-center rounded-full active:scale-95 transition-transform duration-150"
            aria-label="User profile"
          >
            <Avatar className="h-[30px] w-[30px] sm:h-[34px] sm:w-[34px] ring-2 ring-white/20 hover:ring-elec-yellow/40 transition-all">
              <AvatarImage src={profile?.avatar_url || ''} className="object-cover" />
              <AvatarFallback className="bg-gradient-to-br from-elec-yellow to-amber-500 text-elec-dark font-bold text-xs sm:text-sm">
                {getInitials()}
              </AvatarFallback>
            </Avatar>
            <span className="absolute bottom-0.5 right-0.5 block h-2.5 w-2.5 rounded-full border-2 border-elec-dark bg-green-500" />
            {totalUnread > 0 && (
              <span className="absolute -top-1 -right-1 flex items-center justify-center">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-50" />
                <span className="relative flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
                  {totalUnread > 9 ? '9+' : totalUnread}
                </span>
              </span>
            )}
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          className="w-72 p-0 bg-background border border-white/[0.1] shadow-2xl shadow-black/50 rounded-2xl overflow-hidden"
          align="end"
          sideOffset={8}
          forceMount
        >
          {/* Profile header */}
          <div className="p-4">
            <div className="flex items-center gap-3">
              <Avatar className="h-11 w-11 ring-2 ring-elec-yellow/20 flex-shrink-0">
                <AvatarImage src={profile?.avatar_url || ''} className="object-cover" />
                <AvatarFallback className="bg-gradient-to-br from-elec-yellow to-amber-500 text-elec-dark font-bold text-sm">
                  {getInitials()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-white text-[15px] truncate leading-tight">
                  {profile?.full_name || 'User'}
                </p>
                <p className="text-[11px] text-white truncate mt-0.5">{user.email}</p>
              </div>
              <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-elec-yellow/10 border border-elec-yellow/20 flex-shrink-0">
                <Sparkles className="h-3 w-3 text-elec-yellow" />
                <span className="text-[10px] font-bold text-elec-yellow">PRO</span>
              </div>
            </div>
          </div>

          <div className="h-px bg-white/[0.06] mx-3" />

          {/* Menu */}
          <div className="p-1.5">
            <MenuItem icon={Bell} label="Notifications" badge={bellBadgeCount} onClick={handleOpenNotifications} />
            <MenuItem icon={MessageSquare} label="Messages" badge={messageUnread} onClick={handleOpenMessages} />
          </div>

          <div className="h-px bg-white/[0.06] mx-3" />

          <div className="p-1.5">
            <MenuItem icon={LogOut} label="Sign out" onClick={handleSignOut} variant="danger" />
          </div>
        </DropdownMenuContent>
      </DropdownMenu>

      <MessagesSheet open={messagesOpen} onOpenChange={setMessagesOpen} />
      <NotificationsSheet open={notificationsOpen} onOpenChange={setNotificationsOpen} />
    </>
  );
};

export default UserProfileDropdown;
