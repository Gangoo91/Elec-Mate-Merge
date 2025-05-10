
import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNotifications } from '@/components/notifications/NotificationProvider';
import { format } from 'date-fns';
import { Bell, Check, CheckCheck } from 'lucide-react';
import { Badge } from "@/components/ui/badge";

const NotificationsPage = () => {
  const { notifications, markAsRead, markAllAsRead } = useNotifications();

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold flex items-center">
          <Bell className="mr-2 h-5 w-5 text-elec-yellow" /> 
          Notifications
        </h1>
        <Button 
          variant="outline" 
          size="sm" 
          className="border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10"
          onClick={markAllAsRead}
        >
          <CheckCheck className="mr-2 h-4 w-4" />
          Mark all as read
        </Button>
      </div>

      {notifications.length === 0 ? (
        <Card className="p-6 text-center bg-elec-gray border-elec-yellow/20">
          <div className="flex flex-col items-center gap-2">
            <Bell className="h-12 w-12 text-muted-foreground opacity-50" />
            <h2 className="text-xl font-medium mt-2">No notifications</h2>
            <p className="text-muted-foreground">
              You don't have any notifications yet. They will appear here when you receive them.
            </p>
          </div>
        </Card>
      ) : (
        <div className="space-y-4">
          {notifications.map((notification) => (
            <Card 
              key={notification.id}
              className={`border-elec-yellow/20 hover:border-elec-yellow/40 transition-colors ${
                notification.read ? 'bg-elec-gray' : 'bg-elec-gray-dark'
              }`}
            >
              <div className="p-4 flex items-start gap-3">
                <div className="flex-shrink-0 mt-1">
                  {notification.read ? (
                    <span className="text-muted-foreground">
                      <Bell className="h-5 w-5" />
                    </span>
                  ) : (
                    <span className="text-elec-yellow">
                      <Bell className="h-5 w-5" />
                    </span>
                  )}
                </div>
                <div className="flex-grow">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">{notification.title}</h3>
                    {!notification.read && (
                      <Badge className="bg-elec-yellow text-elec-dark">New</Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-muted-foreground">
                      {format(new Date(notification.createdAt), 'MMM d, yyyy h:mm a')}
                    </span>
                    {!notification.read && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 text-xs hover:text-elec-yellow"
                        onClick={() => markAsRead(notification.id)}
                      >
                        <Check className="mr-1 h-3 w-3" /> Mark as read
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default NotificationsPage;
