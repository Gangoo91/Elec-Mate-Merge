
import React from 'react';
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useNotifications, Notification } from './NotificationProvider';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

const NotificationItem = ({ notification, onRead }: { notification: Notification; onRead: () => void }) => {
  return (
    <DropdownMenuItem 
      className={cn(
        "flex flex-col items-start p-3 cursor-pointer",
        !notification.read && "bg-elec-yellow/5"
      )}
      onClick={onRead}
    >
      <div className="flex items-center gap-2 w-full">
        <span className="font-medium text-sm">{notification.title}</span>
        {!notification.read && (
          <span className="ml-auto">
            <Badge className="bg-elec-yellow text-elec-dark h-2 w-2 rounded-full p-0" />
          </span>
        )}
      </div>
      <p className="text-xs text-muted-foreground mt-1">{notification.message}</p>
      <span className="text-xs text-muted-foreground mt-2">
        {format(new Date(notification.createdAt), 'MMM d, h:mm a')}
      </span>
    </DropdownMenuItem>
  );
};

const NotificationDropdown = () => {
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications();
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge 
              className="absolute -top-1 -right-1 bg-elec-yellow text-elec-dark text-xs"
              variant="outline"
            >
              {unreadCount > 99 ? '99+' : unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80" align="end">
        <DropdownMenuLabel className="flex items-center justify-between">
          <span>Notifications</span>
          {unreadCount > 0 && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-xs text-muted-foreground hover:text-foreground"
              onClick={markAllAsRead}
            >
              Mark all as read
            </Button>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup className="max-h-80 overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="py-6 text-center text-sm text-muted-foreground">
              No notifications yet
            </div>
          ) : (
            notifications.map(notification => (
              <React.Fragment key={notification.id}>
                <NotificationItem 
                  notification={notification} 
                  onRead={() => markAsRead(notification.id)} 
                />
                <DropdownMenuSeparator />
              </React.Fragment>
            ))
          )}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild className="cursor-pointer justify-center">
          <Link to="/notifications" className="text-sm font-medium w-full text-center py-2">
            View all notifications
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationDropdown;
