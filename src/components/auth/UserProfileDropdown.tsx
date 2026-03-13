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

  // Sheet states
  const [messagesOpen, setMessagesOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Push notification count (clearable system notifications)
  const { unreadCount: notificationUnread } = useNotifications();

  // Get combined unread counts
  const { messageUnread } = useCombinedUnreadWithNotifications(notificationUnread);

  // Total for avatar badge — push notifications + messages
  const totalUnread = notificationUnread + messageUnread;
  // Bell badge uses push notifications only (matches what NotificationsSheet shows)
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
    navigate('/');
  };

  if (!user) {
    return (
      <button
        onClick={() => navigate('/auth/signin')}
        className={cn(
          'px-4 py-2 rounded-xl font-medium text-sm transition-all duration-300',
          'bg-gradient-to-r from-elec-yellow to-amber-500',
          'text-elec-dark',
          'hover:shadow-lg hover:shadow-elec-yellow/25',
          'hover:scale-105 active:scale-95',
          'border border-elec-yellow/50'
        )}
      >
        Sign In
      </button>
    );
  }

  // Get initials for avatar fallback
  const getInitials = () => {
    if (profile?.full_name) {
      return profile.full_name
        .split(' ')
        .map((n: string) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
    }
    return user.email?.substring(0, 2).toUpperCase() || 'U';
  };

  return (
    <>
      <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
        <DropdownMenuTrigger asChild>
          <button
            className={cn(
              'relative touch-manipulation',
              'h-9 w-9 sm:h-10 sm:w-10 min-w-[36px] min-h-[36px] sm:min-w-[40px] sm:min-h-[40px]',
              'flex items-center justify-center',
              'rounded-full',
              'active:scale-95 transition-transform duration-150'
            )}
            aria-label="User profile"
          >
            <Avatar className="h-[30px] w-[30px] sm:h-[34px] sm:w-[34px] ring-2 ring-white/20 hover:ring-elec-yellow/40 transition-all">
              <AvatarImage src={profile?.avatar_url || ''} className="object-cover" />
              <AvatarFallback className="bg-gradient-to-br from-elec-yellow to-amber-500 text-elec-dark font-bold text-xs sm:text-sm">
                {getInitials()}
              </AvatarFallback>
            </Avatar>

            {/* Online status indicator */}
            <span className="absolute bottom-0.5 right-0.5 block h-2.5 w-2.5 rounded-full border-2 border-elec-dark bg-green-500" />

            {/* Notification badge */}
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
          className="w-72 p-0 bg-elec-dark/95 backdrop-blur-2xl border border-white/10 shadow-2xl shadow-black/50 rounded-2xl overflow-hidden"
          align="end"
          sideOffset={8}
          forceMount
        >
          {/* Profile header */}
          <div className="p-4 bg-gradient-to-br from-elec-yellow/[0.08] to-transparent">
            <div className="flex items-center gap-3">
              <div className="relative flex-shrink-0">
                <Avatar className="h-12 w-12 ring-2 ring-elec-yellow/30 ring-offset-2 ring-offset-elec-dark">
                  <AvatarImage src={profile?.avatar_url || ''} className="object-cover" />
                  <AvatarFallback className="bg-gradient-to-br from-elec-yellow to-amber-500 text-elec-dark font-bold">
                    {getInitials()}
                  </AvatarFallback>
                </Avatar>
                <span className="absolute -bottom-0.5 -right-0.5 block h-3 w-3 rounded-full border-2 border-elec-dark bg-green-500" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-white text-[15px] truncate">
                  {profile?.full_name || 'User'}
                </p>
                <p className="text-xs text-white truncate mt-0.5">{user.email}</p>
                <div className="inline-flex items-center gap-1 mt-1.5 px-2 py-0.5 rounded-full bg-elec-yellow/15 border border-elec-yellow/25">
                  <Sparkles className="h-2.5 w-2.5 text-elec-yellow" />
                  <span className="text-[10px] font-semibold text-elec-yellow">Pro Member</span>
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          {/* Menu items */}
          <div className="p-1.5">
            <DropdownMenuItem
              onClick={handleOpenNotifications}
              className="flex items-center justify-between px-3 py-3 rounded-xl cursor-pointer hover:bg-white/[0.06] focus:bg-white/[0.06] group touch-manipulation min-h-[44px]"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-red-500/10 text-red-400 group-hover:bg-red-500/15 transition-colors">
                  <Bell className="h-4 w-4" />
                </div>
                <span className="font-medium text-white text-sm">Notifications</span>
              </div>
              <div className="flex items-center gap-2">
                {bellBadgeCount > 0 && (
                  <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1.5 text-[10px] font-bold text-white">
                    {bellBadgeCount > 9 ? '9+' : bellBadgeCount}
                  </span>
                )}
                <ChevronRight className="h-4 w-4 text-white opacity-0 group-hover:opacity-50 transition-opacity" />
              </div>
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={handleOpenMessages}
              className="flex items-center justify-between px-3 py-3 rounded-xl cursor-pointer hover:bg-white/[0.06] focus:bg-white/[0.06] group touch-manipulation min-h-[44px]"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-elec-yellow/10 text-elec-yellow group-hover:bg-elec-yellow/15 transition-colors">
                  <MessageSquare className="h-4 w-4" />
                </div>
                <span className="font-medium text-white text-sm">Messages</span>
              </div>
              <div className="flex items-center gap-2">
                {messageUnread > 0 && (
                  <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-elec-yellow px-1.5 text-[10px] font-bold text-black">
                    {messageUnread > 9 ? '9+' : messageUnread}
                  </span>
                )}
                <ChevronRight className="h-4 w-4 text-white opacity-0 group-hover:opacity-50 transition-opacity" />
              </div>
            </DropdownMenuItem>
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mx-3" />

          {/* Sign out */}
          <div className="p-1.5">
            <DropdownMenuItem
              onClick={handleSignOut}
              className="flex items-center gap-3 px-3 py-3 rounded-xl cursor-pointer text-red-400 hover:bg-red-500/10 focus:bg-red-500/10 hover:text-red-400 focus:text-red-400 touch-manipulation min-h-[44px]"
            >
              <div className="p-2 rounded-xl bg-red-500/10">
                <LogOut className="h-4 w-4" />
              </div>
              <span className="font-medium text-sm">Sign out</span>
            </DropdownMenuItem>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Slide-out sheets */}
      <MessagesSheet open={messagesOpen} onOpenChange={setMessagesOpen} />
      <NotificationsSheet open={notificationsOpen} onOpenChange={setNotificationsOpen} />
    </>
  );
};

export default UserProfileDropdown;
