
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

  // Check if already initialized
  useEffect(() => {
    const gaInitialized = localStorage.getItem('elecmate-ga-initialized') === 'true';
    const gaEnabled = localStorage.getItem('elecmate-ga-enabled') === 'true';
    
    if (gaInitialized && gaEnabled) {
      setIsInitialized(true);
    }
  }, []);

  // Initialize Google Analytics
  const initialize = async (id: string) => {
    if (!id || !enabled) return false;
    
    setIsLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase.functions.invoke('google-analytics-init', {
        body: { 
          analyticsId: id,
          activate: true 
        }
      });

      if (error) {
        throw new Error(error.message);
      }

      if (data?.success) {
        setIsInitialized(true);
        localStorage.setItem('elecmate-ga-initialized', 'true');
        return true;
      }
      return false;
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
    if (!analyticsId && !localStorage.getItem('elecmate-ga-id')) return;
    
    const eventAnalyticsId = analyticsId || localStorage.getItem('elecmate-ga-id');
    const gaEnabled = localStorage.getItem('elecmate-ga-enabled') === 'true';
    const gaInitialized = localStorage.getItem('elecmate-ga-initialized') === 'true';
    
    if (!gaEnabled || !gaInitialized) return;

    try {
      const response = await supabase.functions.invoke('google-analytics-init', {
        body: {
          analyticsId: eventAnalyticsId,
          eventName,
          eventParams: {
            ...eventParams || {},
            user_id: user?.id || 'anonymous',
            timestamp: new Date().toISOString()
          }
        }
      });
      
      return response;
    } catch (err: any) {
      console.error('Error tracking event:', err);
    }
  };

  // Initialize on mount if analyticsId provided and not already initialized
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
