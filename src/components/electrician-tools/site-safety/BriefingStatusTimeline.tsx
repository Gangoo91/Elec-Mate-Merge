import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { Clock, User, FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface StatusHistory {
  id: string;
  old_status: string;
  new_status: string;
  reason: string | null;
  created_at: string;
  changed_by: string | null;
}

interface BriefingStatusTimelineProps {
  briefingId: string;
}

export const BriefingStatusTimeline = ({ briefingId }: BriefingStatusTimelineProps) => {
  const [history, setHistory] = useState<StatusHistory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHistory();
  }, [briefingId]);

  const fetchHistory = async () => {
    try {
      const { data, error } = await supabase
        .from('briefing_status_history')
        .select('*')
        .eq('briefing_id', briefingId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setHistory(data || []);
    } catch (error) {
      console.error('Error fetching status history:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'draft': 'bg-gray-500/20 text-white',
      'scheduled': 'bg-blue-500/20 text-blue-400',
      'in_progress': 'bg-yellow-500/20 text-yellow-400',
      'completed': 'bg-green-500/20 text-green-400',
      'cancelled': 'bg-red-500/20 text-red-400',
      'postponed': 'bg-orange-500/20 text-orange-400',
    };
    return colors[status] || 'bg-gray-500/20 text-white';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-GB', {
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <Card className="bg-card/50 border-primary/20">
        <CardContent className="p-6">
          <div className="animate-pulse space-y-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-16 bg-primary/10 rounded" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (history.length === 0) {
    return (
      <Card className="bg-card/50 border-primary/20">
        <CardHeader>
          <CardTitle className="text-elec-light flex items-center gap-2">
            <Clock className="h-5 w-5 text-elec-yellow" />
            Status History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-white text-center py-6">
            No status changes yet
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-card/50 border-primary/20">
      <CardHeader>
        <CardTitle className="text-elec-light flex items-center gap-2">
          <Clock className="h-5 w-5 text-elec-yellow" />
          Status History
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {history.map((item, index) => (
            <div
              key={item.id}
              className="relative pl-6 pb-4 border-l-2 border-primary/20 last:border-0 last:pb-0"
            >
              <div className="absolute left-0 top-0 w-3 h-3 bg-elec-yellow rounded-full -translate-x-[7px]" />
              
              <div className="space-y-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge className={getStatusColor(item.old_status || 'draft')}>
                    {item.old_status || 'draft'}
                  </Badge>
                  <span className="text-white">→</span>
                  <Badge className={getStatusColor(item.new_status)}>
                    {item.new_status}
                  </Badge>
                </div>

                <div className="text-sm text-white flex items-center gap-2">
                  <Clock className="h-3 w-3" />
                  <span>{formatDate(item.created_at)}</span>
                </div>

                {item.reason && (
                  <div className="text-sm text-white flex items-start gap-2 mt-2">
                    <FileText className="h-3 w-3 mt-0.5" />
                    <span className="italic">{item.reason}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
