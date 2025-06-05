
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Clock, Eye, AlertTriangle, X, CheckCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";

interface LFEReport {
  id: string;
  title: string;
  summary: string;
  content: string;
  incident_type: string;
  key_takeaways: string[];
  date_published: string;
  view_count: number;
  average_rating: number;
}

const LearningFromExperienceCard = () => {
  const [reports, setReports] = useState<LFEReport[]>([]);
  const [selectedReport, setSelectedReport] = useState<LFEReport | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReports();
  }, []);

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

  const getIncidentTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'fatal accident': return 'bg-red-600 text-white';
      case 'serious injury': return 'bg-red-500 text-white';
      case 'near miss': return 'bg-yellow-500 text-black';
      case 'equipment failure': return 'bg-orange-500 text-white';
      case 'fire': return 'bg-red-700 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getIncidentIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'fatal accident': return '💀';
      case 'serious injury': return '🚨';
      case 'near miss': return '⚠️';
      case 'equipment failure': return '⚙️';
      case 'fire': return '🔥';
      default: return '📋';
    }
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

  if (selectedReport) {
    return (
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{getIncidentIcon(selectedReport.incident_type)}</span>
              <Badge className={`${getIncidentTypeColor(selectedReport.incident_type)} font-medium`}>
                {selectedReport.incident_type.toUpperCase()}
              </Badge>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSelectedReport(null)}
              className="border-elec-yellow/20 text-elec-yellow hover:bg-elec-yellow/10"
            >
              Back to List
            </Button>
          </div>
          <CardTitle className="text-xl text-white">{selectedReport.title}</CardTitle>
          <div className="flex items-center gap-4 text-sm text-gray-400">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {new Date(selectedReport.date_published).toLocaleDateString('en-GB')}
            </div>
            <div className="flex items-center gap-1">
              <Eye className="h-4 w-4" />
              {selectedReport.view_count} views
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="prose prose-invert max-w-none">
            <p className="text-gray-300 whitespace-pre-wrap leading-relaxed">
              {selectedReport.content}
            </p>
          </div>

          {selectedReport.key_takeaways && selectedReport.key_takeaways.length > 0 && (
            <div className="bg-elec-dark/50 rounded-lg p-4 border border-elec-yellow/20">
              <h3 className="text-lg font-semibold text-elec-yellow mb-3 flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                Key Takeaways
              </h3>
              <ul className="space-y-2">
                {selectedReport.key_takeaways.map((takeaway, index) => (
                  <li key={index} className="flex items-start gap-2 text-gray-300">
                    <span className="text-elec-yellow mt-1">•</span>
                    <span>{takeaway}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center">
            <BookOpen className="h-6 w-6 text-white" />
          </div>
          <div>
            <CardTitle className="text-xl text-white">Learning From Experience Reports</CardTitle>
            <p className="text-gray-300 text-sm">
              Real incidents and lessons learned from the electrical industry
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {reports.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            <BookOpen className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No LFE reports available at the moment.</p>
          </div>
        ) : (
          reports.map((report) => (
            <div
              key={report.id}
              className="p-4 rounded-lg border border-elec-yellow/20 bg-elec-dark/50 hover:bg-elec-dark/70 cursor-pointer transition-all"
              onClick={() => setSelectedReport(report)}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{getIncidentIcon(report.incident_type)}</span>
                  <Badge className={`${getIncidentTypeColor(report.incident_type)} text-xs font-medium`}>
                    {report.incident_type.toUpperCase()}
                  </Badge>
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-400">
                  <Eye className="h-3 w-3" />
                  {report.view_count}
                </div>
              </div>
              
              <h3 className="font-semibold text-white mb-2">{report.title}</h3>
              <p className="text-sm text-gray-400 mb-3 line-clamp-2">{report.summary}</p>
              
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>{new Date(report.date_published).toLocaleDateString('en-GB')}</span>
                <span className="flex items-center gap-1">
                  ⭐ {report.average_rating.toFixed(1)}
                </span>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
};

export default LearningFromExperienceCard;
