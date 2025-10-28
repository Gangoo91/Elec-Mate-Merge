import { useEffect, useState } from 'react';
import { toast } from '@/hooks/use-toast';

export interface RAMSNotificationOptions {
  jobId: string;
  projectName?: string;
  onNotificationClick?: () => void;
}

export const useRAMSNotifications = () => {
  const [permission, setPermission] = useState<NotificationPermission>('default');

  useEffect(() => {
    if ('Notification' in window) {
      setPermission(Notification.permission);
    }
  }, []);

  const requestPermission = async (): Promise<boolean> => {
    if (!('Notification' in window)) {
      console.log('Browser does not support notifications');
      return false;
    }

    if (Notification.permission === 'granted') {
      return true;
    }

    if (Notification.permission === 'denied') {
      return false;
    }

    try {
      const result = await Notification.requestPermission();
      setPermission(result);
      return result === 'granted';
    } catch (error) {
      console.error('Failed to request notification permission:', error);
      return false;
    }
  };

  const showCompletionNotification = ({ jobId, projectName, onNotificationClick }: RAMSNotificationOptions) => {
    const title = '✅ Your RAMS Document is Ready';
    const body = projectName 
      ? `Risk assessment and method statement for "${projectName}" completed successfully`
      : 'Your risk assessment and method statement completed successfully';

    // Try browser notification first
    if ('Notification' in window && Notification.permission === 'granted') {
      try {
        const notification = new Notification(title, {
          body,
          icon: '/favicon.ico',
          badge: '/favicon.ico',
          tag: `rams-${jobId}`,
          requireInteraction: false,
          silent: false
        });

        notification.onclick = () => {
          window.focus();
          onNotificationClick?.();
          notification.close();
        };

        // Auto-close after 10 seconds
        setTimeout(() => notification.close(), 10000);
        
        return;
      } catch (error) {
        console.error('Failed to show notification:', error);
      }
    }

    // Fallback to in-app toast
    toast({
      title,
      description: body,
      variant: 'success',
      duration: 8000
    });
  };

  const showErrorNotification = ({ jobId, projectName }: Omit<RAMSNotificationOptions, 'onNotificationClick'>) => {
    const title = '⚠️ RAMS Generation Failed';
    const body = projectName 
      ? `Failed to generate RAMS for "${projectName}". Please try again.`
      : 'Failed to generate RAMS document. Please try again.';

    // Always use toast for errors (more visible)
    toast({
      title,
      description: body,
      variant: 'destructive',
      duration: 10000
    });
  };

  return {
    permission,
    requestPermission,
    showCompletionNotification,
    showErrorNotification
  };
};
