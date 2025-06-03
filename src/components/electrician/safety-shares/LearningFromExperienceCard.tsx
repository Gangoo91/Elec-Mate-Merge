
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Clock, CheckCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";

interface LFEReport {
  id: string;
  title: string;
  summary: string;
  content: string;
  incident_type: string;
  date_published: string;
  key_takeaways: string[];
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
      case 'accident': return 'bg-red-500';
      case 'near miss': return 'bg-orange-500';
      case 'good practice': return 'bg-green-500';
      default: return 'bg-blue-500';
    }
  };

  if (loading) {
    return (
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-elec-yellow" />
            Learning From Experience
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2].map((i) => (
              <div key={i} className="h-24 bg-elec-gray-light/20 rounded animate-pulse" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-elec-yellow" />
          Learning From Experience
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {reports.map((report) => (
            <div
              key={report.id}
              className="p-4 bg-elec-gray-light/10 rounded-lg border border-elec-yellow/10 hover:border-elec-yellow/30 transition-colors cursor-pointer"
              onClick={() => setSelectedReport(report)}
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-medium text-white">{report.title}</h3>
                <Badge className={`${getIncidentTypeColor(report.incident_type)} text-white`}>
                  {report.incident_type}
                </Badge>
              </div>
              <p className="text-sm text-gray-300 mb-2">{report.summary}</p>
              <div className="flex items-center justify-between text-xs text-gray-400">
                <span className="text-elec-yellow">
                  {report.key_takeaways?.length || 0} Key Takeaways
                </span>
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {new Date(report.date_published).toLocaleDateString()}
                </div>
              </div>
            </div>
          ))}
        </div>

        {selectedReport && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-elec-gray border border-elec-yellow/20 rounded-lg max-w-3xl w-full max-h-[80vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <h2 className="text-xl font-bold text-white">{selectedReport.title}</h2>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedReport(null)}
                  >
                    Close
                  </Button>
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <Badge className={`${getIncidentTypeColor(selectedReport.incident_type)} text-white`}>
                    {selectedReport.incident_type}
                  </Badge>
                  <div className="flex items-center gap-1 text-xs text-gray-400">
                    <Clock className="h-3 w-3" />
                    {new Date(selectedReport.date_published).toLocaleDateString()}
                  </div>
                </div>
                <div className="prose prose-invert max-w-none mb-6">
                  <p className="text-gray-300 whitespace-pre-wrap">{selectedReport.content}</p>
                </div>
                {selectedReport.key_takeaways && selectedReport.key_takeaways.length > 0 && (
                  <div className="bg-elec-yellow/10 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-elec-yellow mb-3 flex items-center gap-2">
                      <CheckCircle className="h-5 w-5" />
                      Key Takeaways
                    </h3>
                    <ul className="space-y-2">
                      {selectedReport.key_takeaways.map((takeaway, index) => (
                        <li key={index} className="flex items-start gap-2 text-gray-300">
                          <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                          {takeaway}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default LearningFromExperienceCard;
