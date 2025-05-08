
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';

interface UseGoogleAnalyticsProps {
  analyticsId?: string;
  enabled?: boolean;
}

export function useGoogleAnalytics({ analyticsId, enabled = true }: UseGoogleAnalyticsProps = {}) {
  const [isInitialized, setIsInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  const { toast } = useToast();

  // Initialize Google Analytics
  const initialize = async (id: string) => {
    if (!id || !enabled) return;
    
    setIsLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase.functions.invoke('google-analytics-init', {
        body: { analyticsId: id }
      });

      if (error) {
        throw new Error(error.message);
      }

      if (data?.success) {
        setIsInitialized(true);
        return true;
      }
    } catch (err: any) {
      setError(err.message);
      toast({
        title: "Analytics Error",
        description: `Failed to initialize Google Analytics: ${err.message}`,
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Track event
  const trackEvent = async (eventName: string, eventParams?: Record<string, any>) => {
    if (!analyticsId || !enabled || !isInitialized) return;

    try {
      await supabase.functions.invoke('google-analytics-init', {
        body: {
          analyticsId,
          eventName,
          eventParams: eventParams || {}
        }
      });
    } catch (err: any) {
      console.error('Error tracking event:', err);
    }
  };

  // Initialize on mount if analyticsId provided
  useEffect(() => {
    if (analyticsId && enabled && !isInitialized) {
      initialize(analyticsId);
    }
  }, [analyticsId, enabled]);

  // Track page view when route changes
  const trackPageView = (pagePath: string, pageTitle: string) => {
    if (!isInitialized) return;

    trackEvent('page_view', {
      page_path: pagePath,
      page_title: pageTitle,
      user_id: user?.id || 'anonymous'
    });
  };

  return {
    isInitialized,
    isLoading,
    error,
    initialize,
    trackEvent,
    trackPageView,
  };
}
