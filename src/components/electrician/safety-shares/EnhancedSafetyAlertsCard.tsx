
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Star, Bookmark, Eye, ThumbsUp } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface SafetyAlert {
  id: string;
  title: string;
  summary: string;
  content: string;
  severity: string;
  category: string;
  date_published: string;
  view_count: number;
  average_rating: number;
  is_bookmarked?: boolean;
  user_rating?: number;
}

const EnhancedSafetyAlertsCard = () => {
  const [alerts, setAlerts] = useState<SafetyAlert[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAlert, setSelectedAlert] = useState<SafetyAlert | null>(null);

  useEffect(() => {
    fetchSafetyAlerts();
  }, []);

  const fetchSafetyAlerts = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      let query = supabase
        .from('safety_alerts')
        .select('*')
        .eq('is_active', true)
        .order('date_published', { ascending: false })
        .limit(10);

      const { data: alertsData, error } = await query;

      if (error) throw error;

      if (user) {
        // Fetch user bookmarks and ratings
        const alertIds = alertsData?.map(alert => alert.id) || [];
        
        const [bookmarksRes, ratingsRes] = await Promise.all([
          supabase
            .from('safety_bookmarks')
            .select('content_id')
            .eq('user_id', user.id)
            .eq('content_type', 'safety_alerts')
            .in('content_id', alertIds),
          supabase
            .from('safety_content_ratings')
            .select('content_id, rating')
            .eq('user_id', user.id)
            .eq('content_type', 'safety_alerts')
            .in('content_id', alertIds)
        ]);

        const bookmarks = new Set(bookmarksRes.data?.map(b => b.content_id) || []);
        const ratingsMap = new Map(ratingsRes.data?.map(r => [r.content_id, r.rating]) || []);

        const enrichedAlerts = alertsData?.map(alert => ({
          ...alert,
          is_bookmarked: bookmarks.has(alert.id),
          user_rating: ratingsMap.get(alert.id)
        })) || [];

        setAlerts(enrichedAlerts);
      } else {
        setAlerts(alertsData || []);
      }
    } catch (error) {
      console.error('Error fetching safety alerts:', error);
      toast.error('Failed to load safety alerts');
    } finally {
      setLoading(false);
    }
  };

  const trackView = async (alertId: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      await supabase
        .from('safety_content_views')
        .insert({
          user_id: user?.id || null,
          content_type: 'safety_alerts',
          content_id: alertId,
          session_id: Math.random().toString(36),
        });
    } catch (error) {
      console.error('Error tracking view:', error);
    }
  };

  const toggleBookmark = async (alertId: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error('Please sign in to bookmark content');
        return;
      }

      const alert = alerts.find(a => a.id === alertId);
      if (!alert) return;

      if (alert.is_bookmarked) {
        await supabase
          .from('safety_bookmarks')
          .delete()
          .eq('user_id', user.id)
          .eq('content_type', 'safety_alerts')
          .eq('content_id', alertId);
        
        toast.success('Bookmark removed');
      } else {
        await supabase
          .from('safety_bookmarks')
          .insert({
            user_id: user.id,
            content_type: 'safety_alerts',
            content_id: alertId
          });
        
        toast.success('Bookmarked successfully');
      }

      setAlerts(prev => prev.map(a => 
        a.id === alertId ? { ...a, is_bookmarked: !a.is_bookmarked } : a
      ));
    } catch (error) {
      console.error('Error toggling bookmark:', error);
      toast.error('Failed to update bookmark');
    }
  };

  const rateContent = async (alertId: string, rating: number) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error('Please sign in to rate content');
        return;
      }

      await supabase
        .from('safety_content_ratings')
        .upsert({
          user_id: user.id,
          content_type: 'safety_alerts',
          content_id: alertId,
          rating
        });

      setAlerts(prev => prev.map(a => 
        a.id === alertId ? { ...a, user_rating: rating } : a
      ));
      
      toast.success('Rating saved');
    } catch (error) {
      console.error('Error rating content:', error);
      toast.error('Failed to save rating');
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'critical': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const handleAlertClick = (alert: SafetyAlert) => {
    setSelectedAlert(alert);
    trackView(alert.id);
  };

  if (loading) {
    return (
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-20 bg-elec-yellow/10 rounded"></div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (selectedAlert) {
    return (
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full ${getSeverityColor(selectedAlert.severity)}`}></div>
              <Badge variant="outline" className="border-elec-yellow/40 text-elec-yellow">
                {selectedAlert.severity.toUpperCase()}
              </Badge>
              <Badge variant="outline" className="border-blue-400/40 text-blue-400">
                {selectedAlert.category}
              </Badge>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSelectedAlert(null)}
              className="border-elec-yellow/20 text-elec-yellow hover:bg-elec-yellow/10"
            >
              Back to List
            </Button>
          </div>
          <CardTitle className="text-xl text-white">{selectedAlert.title}</CardTitle>
          <CardDescription className="text-gray-300">
            Published: {new Date(selectedAlert.date_published).toLocaleDateString()}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4 text-sm text-gray-400">
            <div className="flex items-center gap-1">
              <Eye className="h-4 w-4" />
              {selectedAlert.view_count} views
            </div>
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4" />
              {selectedAlert.average_rating.toFixed(1)} average
            </div>
          </div>
          
          <div className="prose prose-invert max-w-none">
            <p className="text-gray-300 whitespace-pre-wrap">{selectedAlert.content}</p>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-elec-yellow/20">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-400">Rate this alert:</span>
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => rateContent(selectedAlert.id, star)}
                  className={`p-1 rounded ${
                    (selectedAlert.user_rating || 0) >= star
                      ? 'text-yellow-400'
                      : 'text-gray-600 hover:text-yellow-300'
                  }`}
                >
                  <Star className="h-4 w-4 fill-current" />
                </button>
              ))}
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => toggleBookmark(selectedAlert.id)}
              className={`border-elec-yellow/20 ${
                selectedAlert.is_bookmarked
                  ? 'bg-elec-yellow/20 text-elec-yellow'
                  : 'text-elec-yellow hover:bg-elec-yellow/10'
              }`}
            >
              <Bookmark className={`h-4 w-4 mr-2 ${selectedAlert.is_bookmarked ? 'fill-current' : ''}`} />
              {selectedAlert.is_bookmarked ? 'Bookmarked' : 'Bookmark'}
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-red-500 flex items-center justify-center">
            <AlertTriangle className="h-6 w-6 text-white" />
          </div>
          <div>
            <CardTitle className="text-xl text-white">Latest Safety Alerts</CardTitle>
            <CardDescription className="text-gray-300">
              Critical safety information for electrical professionals
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {alerts.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            <AlertTriangle className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No safety alerts available at the moment.</p>
          </div>
        ) : (
          alerts.map((alert) => (
            <div
              key={alert.id}
              className="p-4 rounded-lg border border-elec-yellow/20 bg-elec-dark/50 hover:bg-elec-dark/70 cursor-pointer transition-all"
              onClick={() => handleAlertClick(alert)}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${getSeverityColor(alert.severity)}`}></div>
                  <Badge variant="outline" className="border-elec-yellow/40 text-elec-yellow text-xs">
                    {alert.severity.toUpperCase()}
                  </Badge>
                  <Badge variant="outline" className="border-blue-400/40 text-blue-400 text-xs">
                    {alert.category}
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  {alert.is_bookmarked && (
                    <Bookmark className="h-4 w-4 text-elec-yellow fill-current" />
                  )}
                  <div className="flex items-center gap-1 text-xs text-gray-400">
                    <Eye className="h-3 w-3" />
                    {alert.view_count}
                  </div>
                </div>
              </div>
              
              <h3 className="font-semibold text-white mb-2">{alert.title}</h3>
              <p className="text-sm text-gray-400 mb-2 line-clamp-2">{alert.summary}</p>
              
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>{new Date(alert.date_published).toLocaleDateString()}</span>
                <div className="flex items-center gap-1">
                  <Star className="h-3 w-3" />
                  {alert.average_rating.toFixed(1)}
                </div>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
};

export default EnhancedSafetyAlertsCard;
