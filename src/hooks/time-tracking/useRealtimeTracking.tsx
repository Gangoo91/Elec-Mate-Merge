import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

export interface TrackingSession {
  id: string;
  user_id: string;
  start_time: string;
  end_time?: string;
  duration?: number;
  activity_type: string;
  course_slug?: string;
  unit_code?: string;
  is_active: boolean;
  location?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export const useRealtimeTracking = () => {
  const [activeSession, setActiveSession] = useState<TrackingSession | null>(null);
  const [sessions, setSessions] = useState<TrackingSession[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchActiveSessions = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          setIsLoading(false);
          return;
        }

        // Get active session
        const { data: activeData } = await supabase
          .from('time_tracking_sessions')
          .select('*')
          .eq('user_id', user.id)
          .eq('is_active', true)
          .single();

        if (activeData) {
          setActiveSession(activeData);
        }

        // Get recent sessions
        const { data: sessionsData } = await supabase
          .from('time_tracking_sessions')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(10);

        if (sessionsData) {
          setSessions(sessionsData);
        }
      } catch (error) {
        console.error('Error fetching sessions:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchActiveSessions();

    // Set up realtime subscription
    const channel = supabase
      .channel('time-tracking-sessions')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'time_tracking_sessions'
        },
        (payload) => {
          console.log('Realtime update:', payload);
          if (payload.eventType === 'INSERT' || payload.eventType === 'UPDATE') {
            const session = payload.new as TrackingSession;
            if (session.is_active) {
              setActiveSession(session);
            } else if (activeSession?.id === session.id) {
              setActiveSession(null);
            }
            
            setSessions(prev => {
              const filtered = prev.filter(s => s.id !== session.id);
              return [session, ...filtered].slice(0, 10);
            });
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [activeSession?.id]);

  const startSession = async (activityType: string, courseSlug?: string, unitCode?: string, location?: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      // End any existing active session first
      if (activeSession) {
        await endSession(activeSession.id);
      }

      const { data, error } = await supabase
        .from('time_tracking_sessions')
        .insert({
          user_id: user.id,
          activity_type: activityType,
          course_slug: courseSlug,
          unit_code: unitCode,
          location: location,
          is_active: true
        })
        .select()
        .single();

      if (error) throw error;

      setActiveSession(data);
      toast({
        title: "Session Started",
        description: `Started tracking ${activityType}`,
      });

      return data;
    } catch (error) {
      console.error('Error starting session:', error);
      toast({
        title: "Error",
        description: "Failed to start tracking session",
        variant: "destructive"
      });
    }
  };

  const endSession = async (sessionId?: string, notes?: string) => {
    try {
      const targetId = sessionId || activeSession?.id;
      if (!targetId) return;

      const endTime = new Date().toISOString();
      const session = sessions.find(s => s.id === targetId) || activeSession;
      const duration = session ? Math.round((new Date(endTime).getTime() - new Date(session.start_time).getTime()) / (1000 * 60)) : 0;

      const { data, error } = await supabase
        .from('time_tracking_sessions')
        .update({
          end_time: endTime,
          duration: duration,
          is_active: false,
          notes: notes
        })
        .eq('id', targetId)
        .select()
        .single();

      if (error) throw error;

      if (targetId === activeSession?.id) {
        setActiveSession(null);
      }

      // Create time entry for the completed session
      await supabase
        .from('time_entries')
        .insert({
          user_id: data.user_id,
          date: new Date(data.start_time).toISOString().split('T')[0],
          duration: duration,
          activity: data.activity_type + (data.course_slug ? ` - ${data.course_slug}` : ''),
          notes: notes || `Auto-tracked session: ${data.activity_type}`,
          is_automatic: true,
          session_id: data.id
        });

      toast({
        title: "Session Ended",
        description: `Logged ${duration} minutes of ${data.activity_type}`,
      });

      return data;
    } catch (error) {
      console.error('Error ending session:', error);
      toast({
        title: "Error",
        description: "Failed to end tracking session",
        variant: "destructive"
      });
    }
  };

  const pauseSession = async () => {
    if (!activeSession) return;
    
    // For now, we'll implement pause as ending the current session
    // and allowing the user to start a new one later
    await endSession(activeSession.id, "Session paused");
  };

  return {
    activeSession,
    sessions,
    isLoading,
    startSession,
    endSession,
    pauseSession
  };
};