/**
 * RecentActivityFeed
 *
 * Shows last 10 activities from learning_activity_log with XP earned.
 */

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import {
  Activity, Layers, FileText, BookOpen, Video,
  PenLine, ClipboardCheck, GraduationCap
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { type ActivityType } from '@/data/xpConfig';

interface ActivityLogEntry {
  id: string;
  activity_type: ActivityType;
  source_title: string | null;
  xp_earned: number;
  created_at: string;
}

const ACTIVITY_ICONS: Record<string, typeof Activity> = {
  flashcard_session: Layers,
  quiz_completed: ClipboardCheck,
  site_diary_entry: PenLine,
  portfolio_evidence: FileText,
  mock_exam: GraduationCap,
  video_watched: Video,
  study_module: BookOpen,
};

const ACTIVITY_LABELS: Record<string, string> = {
  flashcard_session: 'Flashcards',
  quiz_completed: 'Quiz',
  site_diary_entry: 'Site Diary',
  portfolio_evidence: 'Portfolio',
  mock_exam: 'Mock Exam',
  video_watched: 'Video',
  study_module: 'Study Module',
};

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'Just now';
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days === 1) return 'Yesterday';
  if (days < 7) return `${days}d ago`;
  return `${Math.floor(days / 7)}w ago`;
}

export function RecentActivityFeed() {
  const { user } = useAuth();
  const [activities, setActivities] = useState<ActivityLogEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchActivities = async () => {
      try {
        const { data, error } = await supabase
          .from('learning_activity_log' as any)
          .select('id, activity_type, source_title, xp_earned, created_at')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(10);

        if (!error && data) {
          setActivities(data as any[]);
        }
      } catch {
        // Fail silently
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, [user]);

  return (
    <Card className="bg-gradient-to-br from-elec-gray to-elec-card border-white/[0.06]">
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <div className="p-1.5 rounded-lg bg-green-500/10">
            <Activity className="h-4 w-4 text-green-400" />
          </div>
          <h3 className="font-semibold text-white text-sm">Recent Activity</h3>
        </div>

        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-10 bg-white/[0.03] rounded-lg animate-pulse" />
            ))}
          </div>
        ) : activities.length === 0 ? (
          <div className="text-center py-6">
            <Activity className="h-8 w-8 text-white/20 mx-auto mb-2" />
            <p className="text-sm text-white/70">No activity yet</p>
            <p className="text-xs text-white/60 mt-1">Complete a quiz or study flashcards to get started</p>
          </div>
        ) : (
          <div className="space-y-1">
            {activities.map((activity) => {
              const Icon = ACTIVITY_ICONS[activity.activity_type] ?? Activity;
              const label = ACTIVITY_LABELS[activity.activity_type] ?? activity.activity_type;

              return (
                <div
                  key={activity.id}
                  className="flex items-center gap-3 px-2.5 py-3 min-h-[44px] rounded-lg hover:bg-white/[0.03] transition-colors touch-manipulation"
                >
                  <div className="p-1.5 rounded-lg bg-white/[0.04] flex-shrink-0">
                    <Icon className="h-4 w-4 text-white/70" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-white truncate">
                      {activity.source_title ?? label}
                    </p>
                    <p className="text-xs text-white/70">
                      {timeAgo(activity.created_at)}
                    </p>
                  </div>
                  <span className="text-sm font-semibold text-elec-yellow flex-shrink-0">
                    +{activity.xp_earned} XP
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default RecentActivityFeed;
