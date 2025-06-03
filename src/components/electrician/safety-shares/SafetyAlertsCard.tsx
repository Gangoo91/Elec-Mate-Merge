
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Clock, Filter, Search, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface SafetyAlert {
  id: string;
  title: string;
  summary: string;
  content: string;
  severity: string;
  category: string;
  date_published: string;
}

const SafetyAlertsCard = () => {
  const [alerts, setAlerts] = useState<SafetyAlert[]>([]);
  const [filteredAlerts, setFilteredAlerts] = useState<SafetyAlert[]>([]);
  const [selectedAlert, setSelectedAlert] = useState<SafetyAlert | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [severityFilter, setSeverityFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  useEffect(() => {
    fetchAlerts();
  }, []);

  useEffect(() => {
    filterAlerts();
  }, [alerts, searchTerm, severityFilter, categoryFilter]);

  const fetchAlerts = async () => {
    try {
      const { data, error } = await supabase
        .from('safety_alerts')
        .select('*')
        .eq('is_active', true)
        .order('date_published', { ascending: false });

      if (error) throw error;
      setAlerts(data || []);
    } catch (error) {
      console.error('Error fetching safety alerts:', error);
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

    setFilteredAlerts(filtered);
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
        {/* Filters Skeleton */}
        <div className="bg-elec-gray/50 rounded-lg p-4 space-y-4">
          <div className="h-4 bg-elec-gray-light/20 rounded animate-pulse w-24" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-10 bg-elec-gray-light/20 rounded animate-pulse" />
            ))}
          </div>
        </div>
        
        {/* Alerts Skeleton */}
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader>
            <div className="h-6 bg-elec-gray-light/20 rounded animate-pulse w-32" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-20 bg-elec-gray-light/20 rounded animate-pulse" />
              ))}
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
            Safety Alerts
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
                  onClick={() => setSelectedAlert(alert)}
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
                        <div className="flex items-center gap-1 text-xs text-gray-400 ml-auto">
                          <Clock className="h-3 w-3" />
                          {new Date(alert.date_published).toLocaleDateString()}
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
                    <div className="flex flex-wrap items-center gap-2">
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

export default SafetyAlertsCard;
