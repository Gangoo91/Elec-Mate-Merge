
import React, { useState } from 'react';
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { FormDescription, FormLabel } from '@/components/ui/form';
import { useNotifications } from '@/components/notifications/NotificationProvider';

const NotificationsTab = () => {
  const { addNotification } = useNotifications();
  
  const [notificationSettings, setNotificationSettings] = useState({
    emailUpdates: true,
    mentorMessages: true,
    courseCompletions: true,
    appUpdates: false
  });
  
  const handleNotificationChange = (key: keyof typeof notificationSettings) => {
    setNotificationSettings(prev => {
      const newSettings = { ...prev, [key]: !prev[key] };
      
      addNotification({
        title: 'Settings Updated',
        message: `${key} notifications ${newSettings[key] ? 'enabled' : 'disabled'}.`,
        type: 'success'
      });
      
      return newSettings;
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <FormLabel>Email Updates</FormLabel>
          <FormDescription className="text-xs text-muted-foreground">
            Receive important updates via email
          </FormDescription>
        </div>
        <Switch
          checked={notificationSettings.emailUpdates}
          onCheckedChange={() => handleNotificationChange('emailUpdates')}
        />
      </div>
      
      <Separator className="my-4" />
      
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <FormLabel>Mentor Messages</FormLabel>
          <FormDescription className="text-xs text-muted-foreground">
            Get notified when mentors send you messages
          </FormDescription>
        </div>
        <Switch
          checked={notificationSettings.mentorMessages}
          onCheckedChange={() => handleNotificationChange('mentorMessages')}
        />
      </div>
      
      <Separator className="my-4" />
      
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <FormLabel>Course Completions</FormLabel>
          <FormDescription className="text-xs text-muted-foreground">
            Notifications when you complete courses
          </FormDescription>
        </div>
        <Switch
          checked={notificationSettings.courseCompletions}
          onCheckedChange={() => handleNotificationChange('courseCompletions')}
        />
      </div>
      
      <Separator className="my-4" />
      
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <FormLabel>App Updates</FormLabel>
          <FormDescription className="text-xs text-muted-foreground">
            Information about new features and updates
          </FormDescription>
        </div>
        <Switch
          checked={notificationSettings.appUpdates}
          onCheckedChange={() => handleNotificationChange('appUpdates')}
        />
      </div>
    </div>
  );
};

export default NotificationsTab;
