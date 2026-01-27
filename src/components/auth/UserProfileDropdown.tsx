import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
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

  // Get notification count safely
  let notificationUnread = 0;
  try {
    const { unreadCount } = useNotifications();
    notificationUnread = unreadCount;
  } catch (e) {
    // NotificationProvider not available
  }

  // Get combined unread counts
  const { messageUnread, hasUnread } = useCombinedUnreadWithNotifications(notificationUnread);

  // Total unread for badge display
  const totalUnread = notificationUnread + messageUnread;

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
          "px-4 py-2 rounded-xl font-medium text-sm transition-all duration-300",
          "bg-gradient-to-r from-elec-yellow to-amber-500",
          "text-elec-dark",
          "hover:shadow-lg hover:shadow-elec-yellow/25",
          "hover:scale-105 active:scale-95",
          "border border-elec-yellow/50"
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
            "relative touch-manipulation",
            "rounded-full",
            "active:scale-95 transition-transform duration-150"
          )}
          aria-label="User profile"
        >
          <Avatar className="h-10 w-10 border-2 border-white/20 hover:border-elec-yellow/50 transition-colors">
            <AvatarImage src={profile?.avatar_url || ''} className="object-cover" />
            <AvatarFallback className="bg-gradient-to-br from-elec-yellow to-amber-500 text-elec-dark font-bold text-sm">
              {getInitials()}
            </AvatarFallback>
          </Avatar>

          {/* Online status indicator */}
          <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full border-2 border-elec-dark bg-green-500" />

          {/* Notification badge - positioned to not overflow */}
          {hasUnread && totalUnread > 0 && (
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
        className="w-64 p-0 bg-card/95 backdrop-blur-xl border-border/50 shadow-2xl"
        align="end"
        sideOffset={8}
        forceMount
      >
        {/* Profile header */}
        <div className="p-4 bg-gradient-to-br from-elec-yellow/10 to-transparent border-b border-border/50">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Avatar className="h-12 w-12 border-2 border-elec-yellow/30">
                <AvatarImage src={profile?.avatar_url || ''} />
                <AvatarFallback className="bg-gradient-to-br from-elec-yellow to-amber-500 text-elec-dark font-bold">
                  {getInitials()}
                </AvatarFallback>
              </Avatar>
              <span className="absolute -bottom-0.5 -right-0.5 block h-3.5 w-3.5 rounded-full border-2 border-card bg-green-500" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-foreground truncate">{profile?.full_name || 'User'}</p>
              <p className="text-xs text-muted-foreground truncate">{user.email}</p>
              <div className="flex items-center gap-1 mt-1">
                <Sparkles className="h-3 w-3 text-elec-yellow" />
                <span className="text-[10px] font-medium text-elec-yellow">Pro Member</span>
              </div>
            </div>
          </div>
        </div>

        {/* Menu items */}
        <div className="p-2">
          <DropdownMenuItem
            onClick={handleOpenNotifications}
            className="flex items-center justify-between px-3 py-2.5 rounded-lg cursor-pointer hover:bg-elec-yellow/10 focus:bg-elec-yellow/10 group"
          >
            <div className="flex items-center gap-3">
              <div className="p-1.5 rounded-lg bg-red-500/10 text-red-400 group-hover:bg-red-500/20 transition-colors">
                <Bell className="h-4 w-4" />
              </div>
              <span className="font-medium">Notifications</span>
            </div>
            <div className="flex items-center gap-2">
              {notificationUnread > 0 && (
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1.5 text-[10px] font-bold text-white">
                  {notificationUnread > 9 ? '9+' : notificationUnread}
                </span>
              )}
              <ChevronRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={handleOpenMessages}
            className="flex items-center justify-between px-3 py-2.5 rounded-lg cursor-pointer hover:bg-elec-yellow/10 focus:bg-elec-yellow/10 group"
          >
            <div className="flex items-center gap-3">
              <div className="p-1.5 rounded-lg bg-elec-yellow/10 text-elec-yellow group-hover:bg-elec-yellow/20 transition-colors">
                <MessageSquare className="h-4 w-4" />
              </div>
              <span className="font-medium">Messages</span>
            </div>
            <div className="flex items-center gap-2">
              {messageUnread > 0 && (
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-elec-yellow px-1.5 text-[10px] font-bold text-black">
                  {messageUnread > 9 ? '9+' : messageUnread}
                </span>
              )}
              <ChevronRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </DropdownMenuItem>

        </div>

        <DropdownMenuSeparator className="bg-border/50" />

        {/* Sign out */}
        <div className="p-2">
          <DropdownMenuItem
            onClick={handleSignOut}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer text-red-400 hover:bg-red-500/10 focus:bg-red-500/10 hover:text-red-400 focus:text-red-400"
          >
            <div className="p-1.5 rounded-lg bg-red-500/10">
              <LogOut className="h-4 w-4" />
            </div>
            <span className="font-medium">Sign out</span>
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
