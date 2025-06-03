
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Clock, Filter, Search, X, Lightbulb } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface LFEReport {
  id: string;
  title: string;
  summary: string;
  content: string;
  incident_type: string;
  key_takeaways: string[];
  date_published: string;
}

const LearningFromExperienceCard = () => {
  const [reports, setReports] = useState<LFEReport[]>([]);
  const [filteredReports, setFilteredReports] = useState<LFEReport[]>([]);
  const [selectedReport, setSelectedReport] = useState<LFEReport | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [incidentTypeFilter, setIncidentTypeFilter] = useState("all");

  useEffect(() => {
    fetchReports();
  }, []);

  useEffect(() => {
    filterReports();
  }, [reports, searchTerm, incidentTypeFilter]);

  const fetchReports = async () => {
    try {
      const { data, error } = await supabase
        .from('lfe_reports')
        .select('*')
        .eq('is_active', true)
        .order('date_published', { ascending: false });

      if (error) throw error;
      setReports(data || []);
    } catch (error) {
      console.error('Error fetching LFE reports:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterReports = () => {
    let filtered = reports;

    if (searchTerm) {
      filtered = filtered.filter(report =>
        report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.summary.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (incidentTypeFilter !== "all") {
      filtered = filtered.filter(report => report.incident_type === incidentTypeFilter);
    }

    setFilteredReports(filtered);
  };

  const getIncidentTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'electrical shock': return 'bg-red-500 hover:bg-red-600';
      case 'fire': return 'bg-orange-500 hover:bg-orange-600';
      case 'near miss': return 'bg-yellow-500 hover:bg-yellow-600';
      case 'equipment failure': return 'bg-blue-500 hover:bg-blue-600';
      case 'procedural': return 'bg-purple-500 hover:bg-purple-600';
      default: return 'bg-gray-500 hover:bg-gray-600';
    }
  };

  const getIncidentTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'electrical shock': return '⚡';
      case 'fire': return '🔥';
      case 'near miss': return '⚠️';
      case 'equipment failure': return '🔧';
      case 'procedural': return '📋';
      default: return '📢';
    }
  };

  const getUniqueIncidentTypes = () => {
    return [...new Set(reports.map(report => report.incident_type))];
  };

  if (loading) {
    return (
      <div className="space-y-6">
        {/* Filters Skeleton */}
        <div className="bg-elec-gray/50 rounded-lg p-4 space-y-4">
          <div className="h-4 bg-elec-gray-light/20 rounded animate-pulse w-24" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2].map((i) => (
              <div key={i} className="h-10 bg-elec-gray-light/20 rounded animate-pulse" />
            ))}
          </div>
        </div>
        
        {/* Reports Skeleton */}
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader>
            <div className="h-6 bg-elec-gray-light/20 rounded animate-pulse w-40" />
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
            Filter Reports
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search reports..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-elec-gray-light border-elec-yellow/30 text-white placeholder-gray-400"
              />
            </div>
            
            <Select value={incidentTypeFilter} onValueChange={setIncidentTypeFilter}>
              <SelectTrigger className="bg-elec-gray-light border-elec-yellow/30 text-white">
                <SelectValue placeholder="Filter by incident type" />
              </SelectTrigger>
              <SelectContent className="bg-elec-gray border-elec-yellow/30">
                <SelectItem value="all" className="text-white hover:bg-elec-gray-light">All Types</SelectItem>
                {getUniqueIncidentTypes().map(type => (
                  <SelectItem key={type} value={type} className="text-white hover:bg-elec-gray-light">
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {(searchTerm || incidentTypeFilter !== "all") && (
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <span>Showing {filteredReports.length} of {reports.length} reports</span>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => {
                  setSearchTerm("");
                  setIncidentTypeFilter("all");
                }}
                className="h-6 px-2 text-gray-400 hover:text-white"
              >
                Clear filters
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Reports List */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-yellow-400" />
            Learning From Experience
            <Badge className="bg-elec-yellow/20 text-elec-yellow">
              {filteredReports.length}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {filteredReports.length === 0 ? (
            <div className="text-center py-8">
              <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-400">No reports found matching your criteria.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredReports.map((report) => (
                <div
                  key={report.id}
                  className="p-4 bg-elec-gray-light/10 rounded-lg border border-elec-yellow/10 hover:border-elec-yellow/30 transition-all duration-300 cursor-pointer group"
                  onClick={() => setSelectedReport(report)}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start gap-3 mb-2">
                        <span className="text-lg flex-shrink-0 mt-1">
                          {getIncidentTypeIcon(report.incident_type)}
                        </span>
                        <div className="min-w-0 flex-1">
                          <h3 className="font-medium text-white group-hover:text-elec-yellow transition-colors line-clamp-2">
                            {report.title}
                          </h3>
                          <p className="text-sm text-gray-300 mt-1 line-clamp-2 sm:line-clamp-3">
                            {report.summary}
                          </p>
                        </div>
                      </div>
                      
                      {report.key_takeaways && report.key_takeaways.length > 0 && (
                        <div className="flex items-center gap-2 mb-3">
                          <Lightbulb className="h-4 w-4 text-yellow-400 flex-shrink-0" />
                          <span className="text-sm text-yellow-300">
                            {report.key_takeaways.length} key takeaway{report.key_takeaways.length !== 1 ? 's' : ''}
                          </span>
                        </div>
                      )}
                      
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge className={`${getIncidentTypeColor(report.incident_type)} text-white text-xs`}>
                          {report.incident_type}
                        </Badge>
                        <div className="flex items-center gap-1 text-xs text-gray-400 ml-auto">
                          <Clock className="h-3 w-3" />
                          {new Date(report.date_published).toLocaleDateString()}
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

      {/* Report Detail Modal */}
      {selectedReport && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-elec-gray border border-elec-yellow/20 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            <div className="p-6 border-b border-elec-yellow/10">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3 min-w-0 flex-1">
                  <span className="text-2xl flex-shrink-0">
                    {getIncidentTypeIcon(selectedReport.incident_type)}
                  </span>
                  <div className="min-w-0 flex-1">
                    <h2 className="text-xl font-bold text-white mb-2">{selectedReport.title}</h2>
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge className={`${getIncidentTypeColor(selectedReport.incident_type)} text-white`}>
                        {selectedReport.incident_type}
                      </Badge>
                      <div className="flex items-center gap-1 text-sm text-gray-400">
                        <Clock className="h-4 w-4" />
                        {new Date(selectedReport.date_published).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedReport(null)}
                  className="flex-shrink-0 hover:bg-elec-gray-light"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              <div className="prose prose-invert max-w-none">
                <p className="text-gray-300 whitespace-pre-wrap leading-relaxed">
                  {selectedReport.content}
                </p>
              </div>

              {selectedReport.key_takeaways && selectedReport.key_takeaways.length > 0 && (
                <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Lightbulb className="h-5 w-5 text-yellow-400" />
                    <h3 className="text-lg font-semibold text-yellow-300">Key Takeaways</h3>
                  </div>
                  <ul className="space-y-2">
                    {selectedReport.key_takeaways.map((takeaway, index) => (
                      <li key={index} className="flex items-start gap-2 text-gray-300">
                        <span className="text-yellow-400 flex-shrink-0 mt-1">•</span>
                        <span>{takeaway}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LearningFromExperienceCard;
