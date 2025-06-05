
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Clock, Filter, Search, X, Star, Bookmark, Eye } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

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
}

interface BookmarkStatus {
  [key: string]: boolean;
}

interface UserRating {
  [key: string]: number;
}

const EnhancedSafetyAlertsCard = () => {
  const [alerts, setAlerts] = useState<SafetyAlert[]>([]);
  const [filteredAlerts, setFilteredAlerts] = useState<SafetyAlert[]>([]);
  const [selectedAlert, setSelectedAlert] = useState<SafetyAlert | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [severityFilter, setSeverityFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [bookmarks, setBookmarks] = useState<BookmarkStatus>({});
  const [userRatings, setUserRatings] = useState<UserRating>({});
  const { toast } = useToast();

  useEffect(() => {
    console.log('EnhancedSafetyAlertsCard: Component mounted, fetching alerts...');
    fetchAlerts();
  }, []);

  useEffect(() => {
    console.log('EnhancedSafetyAlertsCard: Filtering alerts with:', { searchTerm, severityFilter, categoryFilter });
    filterAlerts();
  }, [alerts, searchTerm, severityFilter, categoryFilter]);

  const fetchAlerts = async () => {
    try {
      console.log('EnhancedSafetyAlertsCard: Starting to fetch safety alerts...');
      setError(null);
      
      const { data, error: fetchError } = await supabase
        .from('safety_alerts')
        .select('*')
        .eq('is_active', true)
        .order('date_published', { ascending: false });

      console.log('EnhancedSafetyAlertsCard: Supabase response:', { data, error: fetchError });

      if (fetchError) {
        console.error('EnhancedSafetyAlertsCard: Error fetching safety alerts:', fetchError);
        setError(`Failed to fetch alerts: ${fetchError.message}`);
        return;
      }

      const alertsData = data || [];
      console.log('EnhancedSafetyAlertsCard: Fetched alerts:', alertsData.length);
      setAlerts(alertsData);
      
      if (alertsData.length === 0) {
        console.log('EnhancedSafetyAlertsCard: No alerts found in database');
        setError('No safety alerts found');
      }
    } catch (error) {
      console.error('EnhancedSafetyAlertsCard: Exception during fetch:', error);
      setError(`Unexpected error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  const filterAlerts = () => {
    let filtered = alerts;

    if (searchTerm) {
      filtered = filtered.filter(alert =>
        alert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        alert.summary.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (severityFilter !== "all") {
      filtered = filtered.filter(alert => alert.severity === severityFilter);
    }

    if (categoryFilter !== "all") {
      filtered = filtered.filter(alert => alert.category === categoryFilter);
    }

    console.log('EnhancedSafetyAlertsCard: Filtered alerts:', filtered.length);
    setFilteredAlerts(filtered);
  };

  const handleBookmark = async (alert: SafetyAlert) => {
    try {
      const isBookmarked = bookmarks[alert.id];
      
      if (isBookmarked) {
        await supabase
          .from('safety_bookmarks')
          .delete()
          .eq('content_id', alert.id)
          .eq('content_type', 'safety_alerts');
      } else {
        await supabase
          .from('safety_bookmarks')
          .insert({
            content_id: alert.id,
            content_type: 'safety_alerts',
            user_id: (await supabase.auth.getUser()).data.user?.id
          });
      }

      setBookmarks(prev => ({ ...prev, [alert.id]: !isBookmarked }));
      toast({
        title: isBookmarked ? "Bookmark removed" : "Bookmark added",
        description: `Alert "${alert.title}" ${isBookmarked ? 'removed from' : 'added to'} bookmarks`
      });
    } catch (error) {
      console.error('Error managing bookmark:', error);
      toast({
        title: "Error",
        description: "Failed to update bookmark",
        variant: "destructive"
      });
    }
  };

  const handleRating = async (alert: SafetyAlert, rating: number) => {
    try {
      const user = (await supabase.auth.getUser()).data.user;
      if (!user) return;

      await supabase
        .from('safety_content_ratings')
        .upsert({
          content_id: alert.id,
          content_type: 'safety_alerts',
          user_id: user.id,
          rating
        });

      setUserRatings(prev => ({ ...prev, [alert.id]: rating }));
      toast({
        title: "Rating submitted",
        description: `You rated this alert ${rating} stars`
      });
    } catch (error) {
      console.error('Error submitting rating:', error);
      toast({
        title: "Error",
        description: "Failed to submit rating",
        variant: "destructive"
      });
    }
  };

  const trackView = async (alert: SafetyAlert) => {
    try {
      const user = (await supabase.auth.getUser()).data.user;
      await supabase
        .from('safety_content_views')
        .insert({
          content_id: alert.id,
          content_type: 'safety_alerts',
          user_id: user?.id,
          session_id: 'web-session'
        });
    } catch (error) {
      console.error('Error tracking view:', error);
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-500 hover:bg-red-600';
      case 'high': return 'bg-orange-500 hover:bg-orange-600';
      case 'medium': return 'bg-yellow-500 hover:bg-yellow-600';
      case 'low': return 'bg-blue-500 hover:bg-blue-600';
      default: return 'bg-gray-500 hover:bg-gray-600';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical': return '🚨';
      case 'high': return '⚠️';
      case 'medium': return '⚡';
      case 'low': return 'ℹ️';
      default: return '📢';
    }
  };

  const getUniqueCategories = () => {
    return [...new Set(alerts.map(alert => alert.category))];
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardContent className="p-6">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-elec-yellow mx-auto mb-4"></div>
              <p className="text-gray-300">Loading safety alerts...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <Card className="border-red-500/20 bg-elec-gray">
          <CardContent className="p-6">
            <div className="text-center">
              <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-red-400 mb-2">Error Loading Alerts</h3>
              <p className="text-gray-300 mb-4">{error}</p>
              <Button 
                onClick={fetchAlerts}
                className="bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90"
              >
                Try Again
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filters Section */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Filter className="h-5 w-5 text-elec-yellow" />
            Filter Alerts
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search alerts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-elec-gray-light border-elec-yellow/30 text-white placeholder-gray-400"
              />
            </div>
            
            <Select value={severityFilter} onValueChange={setSeverityFilter}>
              <SelectTrigger className="bg-elec-gray-light border-elec-yellow/30 text-white">
                <SelectValue placeholder="Filter by severity" />
              </SelectTrigger>
              <SelectContent className="bg-elec-gray border-elec-yellow/30">
                <SelectItem value="all" className="text-white hover:bg-elec-gray-light">All Severities</SelectItem>
                <SelectItem value="critical" className="text-white hover:bg-elec-gray-light">Critical</SelectItem>
                <SelectItem value="high" className="text-white hover:bg-elec-gray-light">High</SelectItem>
                <SelectItem value="medium" className="text-white hover:bg-elec-gray-light">Medium</SelectItem>
                <SelectItem value="low" className="text-white hover:bg-elec-gray-light">Low</SelectItem>
              </SelectContent>
            </Select>

            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="bg-elec-gray-light border-elec-yellow/30 text-white">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent className="bg-elec-gray border-elec-yellow/30">
                <SelectItem value="all" className="text-white hover:bg-elec-gray-light">All Categories</SelectItem>
                {getUniqueCategories().map(category => (
                  <SelectItem key={category} value={category} className="text-white hover:bg-elec-gray-light">
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {(searchTerm || severityFilter !== "all" || categoryFilter !== "all") && (
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <span>Showing {filteredAlerts.length} of {alerts.length} alerts</span>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => {
                  setSearchTerm("");
                  setSeverityFilter("all");
                  setCategoryFilter("all");
                }}
                className="h-6 px-2 text-gray-400 hover:text-white"
              >
                Clear filters
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Alerts List */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-400" />
            Enhanced Safety Alerts
            <Badge className="bg-elec-yellow/20 text-elec-yellow">
              {filteredAlerts.length}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {filteredAlerts.length === 0 ? (
            <div className="text-center py-8">
              <AlertTriangle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-400">No alerts found matching your criteria.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className="p-4 bg-elec-gray-light/10 rounded-lg border border-elec-yellow/10 hover:border-elec-yellow/30 transition-all duration-300 cursor-pointer group"
                  onClick={() => {
                    setSelectedAlert(alert);
                    trackView(alert);
                  }}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start gap-3 mb-2">
                        <span className="text-lg flex-shrink-0 mt-1">
                          {getSeverityIcon(alert.severity)}
                        </span>
                        <div className="min-w-0 flex-1">
                          <h3 className="font-medium text-white group-hover:text-elec-yellow transition-colors line-clamp-2">
                            {alert.title}
                          </h3>
                          <p className="text-sm text-gray-300 mt-1 line-clamp-2 sm:line-clamp-3">
                            {alert.summary}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-2 mt-3">
                        <Badge className={`${getSeverityColor(alert.severity)} text-white capitalize text-xs`}>
                          {alert.severity}
                        </Badge>
                        <span className="bg-elec-yellow/20 text-elec-yellow px-2 py-1 rounded text-xs">
                          {alert.category}
                        </span>
                        <div className="flex items-center gap-4 ml-auto">
                          <div className="flex items-center gap-1 text-xs text-gray-400">
                            <Eye className="h-3 w-3" />
                            {alert.view_count}
                          </div>
                          <div className="flex items-center gap-1 text-xs text-gray-400">
                            <Star className="h-3 w-3" />
                            {alert.average_rating.toFixed(1)}
                          </div>
                          <div className="flex items-center gap-1 text-xs text-gray-400">
                            <Clock className="h-3 w-3" />
                            {new Date(alert.date_published).toLocaleDateString()}
                          </div>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleBookmark(alert);
                            }}
                            className={`h-6 w-6 p-0 ${bookmarks[alert.id] ? 'text-elec-yellow' : 'text-gray-400'} hover:text-elec-yellow`}
                          >
                            <Bookmark className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Alert Detail Modal */}
      {selectedAlert && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-elec-gray border border-elec-yellow/20 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            <div className="p-6 border-b border-elec-yellow/10">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3 min-w-0 flex-1">
                  <span className="text-2xl flex-shrink-0">
                    {getSeverityIcon(selectedAlert.severity)}
                  </span>
                  <div className="min-w-0 flex-1">
                    <h2 className="text-xl font-bold text-white mb-2">{selectedAlert.title}</h2>
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <Badge className={`${getSeverityColor(selectedAlert.severity)} text-white capitalize`}>
                        {selectedAlert.severity}
                      </Badge>
                      <span className="bg-elec-yellow/20 text-elec-yellow px-2 py-1 rounded text-sm">
                        {selectedAlert.category}
                      </span>
                      <div className="flex items-center gap-1 text-sm text-gray-400">
                        <Clock className="h-4 w-4" />
                        {new Date(selectedAlert.date_published).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleBookmark(selectedAlert)}
                        className={`border-elec-yellow/30 ${bookmarks[selectedAlert.id] ? 'text-elec-yellow bg-elec-yellow/10' : 'text-elec-yellow'} hover:bg-elec-yellow/10`}
                      >
                        <Bookmark className="h-4 w-4 mr-2" />
                        {bookmarks[selectedAlert.id] ? 'Bookmarked' : 'Bookmark'}
                      </Button>
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((rating) => (
                          <Button
                            key={rating}
                            size="sm"
                            variant="ghost"
                            onClick={() => handleRating(selectedAlert, rating)}
                            className={`h-6 w-6 p-0 ${userRatings[selectedAlert.id] >= rating ? 'text-elec-yellow' : 'text-gray-400'} hover:text-elec-yellow`}
                          >
                            <Star className="h-3 w-3" />
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedAlert(null)}
                  className="flex-shrink-0 hover:bg-elec-gray-light"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6">
              <div className="prose prose-invert max-w-none">
                <p className="text-gray-300 whitespace-pre-wrap leading-relaxed">
                  {selectedAlert.content}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnhancedSafetyAlertsCard;
