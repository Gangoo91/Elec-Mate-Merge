
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { LogOut, User, Settings, MessageSquare, ChevronRight, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

const UserProfileDropdown = () => {
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();

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
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            "relative group transition-all duration-300",
            "rounded-xl p-0.5",
            "bg-gradient-to-br from-elec-yellow/50 via-amber-500/50 to-orange-500/50",
            "hover:from-elec-yellow via-amber-500 hover:to-orange-500",
            "hover:shadow-lg hover:shadow-elec-yellow/25",
            "active:scale-95"
          )}
          aria-label="User profile"
        >
          {/* Inner container with dark background */}
          <div className="relative rounded-[10px] bg-elec-dark p-0.5">
            <Avatar className="h-9 w-9 transition-transform group-hover:scale-105">
              <AvatarImage src={profile?.avatar_url || ''} className="object-cover" />
              <AvatarFallback className="bg-gradient-to-br from-elec-yellow to-amber-500 text-elec-dark font-bold text-sm">
                {getInitials()}
              </AvatarFallback>
            </Avatar>

            {/* Online status indicator */}
            <span className="absolute -bottom-0.5 -right-0.5 block h-3 w-3 rounded-full border-2 border-elec-dark bg-green-500 shadow-lg shadow-green-500/50" />
          </div>
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
            onClick={() => navigate('/profile')}
            className="flex items-center justify-between px-3 py-2.5 rounded-lg cursor-pointer hover:bg-elec-yellow/10 focus:bg-elec-yellow/10 group"
          >
            <div className="flex items-center gap-3">
              <div className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400 group-hover:bg-blue-500/20 transition-colors">
                <User className="h-4 w-4" />
              </div>
              <span className="font-medium">Profile</span>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => navigate('/messages')}
            className="flex items-center justify-between px-3 py-2.5 rounded-lg cursor-pointer hover:bg-elec-yellow/10 focus:bg-elec-yellow/10 group"
          >
            <div className="flex items-center gap-3">
              <div className="p-1.5 rounded-lg bg-purple-500/10 text-purple-400 group-hover:bg-purple-500/20 transition-colors">
                <MessageSquare className="h-4 w-4" />
              </div>
              <span className="font-medium">Messages</span>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => navigate('/settings')}
            className="flex items-center justify-between px-3 py-2.5 rounded-lg cursor-pointer hover:bg-elec-yellow/10 focus:bg-elec-yellow/10 group"
          >
            <div className="flex items-center gap-3">
              <div className="p-1.5 rounded-lg bg-slate-500/10 text-slate-400 group-hover:bg-slate-500/20 transition-colors">
                <Settings className="h-4 w-4" />
              </div>
              <span className="font-medium">Settings</span>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
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
  );
};

export default UserProfileDropdown;
