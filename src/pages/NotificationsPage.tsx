import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNotifications } from '@/components/notifications/NotificationProvider';
import { format } from 'date-fns';
import { Bell, Check, CheckCheck, Trash2, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { motion, AnimatePresence } from 'framer-motion';

const NotificationsPage = () => {
  const { notifications, markAsRead, markAllAsRead, deleteNotification, clearAllNotifications } =
    useNotifications();

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold flex items-center">
          <Bell className="mr-2 h-5 w-5 text-elec-yellow" />
          Notifications
        </h1>
        {notifications.length > 0 && (
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10 touch-manipulation"
              onClick={markAllAsRead}
            >
              <CheckCheck className="mr-2 h-4 w-4" />
              Mark all read
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="border-red-500/30 text-red-400 hover:bg-red-500/10 touch-manipulation"
              onClick={clearAllNotifications}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Clear all
            </Button>
          </div>
        )}
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
          <AnimatePresence>
            {notifications.map((notification) => (
              <motion.div
                key={notification.id}
                layout
                exit={{ opacity: 0, x: 80, height: 0, marginBottom: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Card
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
                    <div className="flex-grow min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="font-medium text-white">{notification.title}</h3>
                        <div className="flex items-center gap-2 shrink-0">
                          {!notification.read && (
                            <Badge className="bg-elec-yellow text-elec-dark">New</Badge>
                          )}
                          <button
                            onClick={() => deleteNotification(notification.id)}
                            className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-red-500/15 transition-colors touch-manipulation"
                            aria-label="Delete notification"
                          >
                            <X className="h-4 w-4 text-white hover:text-red-400 transition-colors" />
                          </button>
                        </div>
                      </div>
                      <p className="text-sm text-white mt-1">{notification.message}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-white">
                          {format(new Date(notification.createdAt), 'MMM d, yyyy h:mm a')}
                        </span>
                        {!notification.read && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 text-xs hover:text-elec-yellow touch-manipulation"
                            onClick={() => markAsRead(notification.id)}
                          >
                            <Check className="mr-1 h-3 w-3" /> Mark as read
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default NotificationsPage;
