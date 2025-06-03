
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Clock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";

interface SafetyAlert {
  id: string;
  title: string;
  summary: string;
  content: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  category: string;
  date_published: string;
}

const SafetyAlertsCard = () => {
  const [alerts, setAlerts] = useState<SafetyAlert[]>([]);
  const [selectedAlert, setSelectedAlert] = useState<SafetyAlert | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAlerts();
  }, []);

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

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  if (loading) {
    return (
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-400" />
            Safety Alerts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-20 bg-elec-gray-light/20 rounded animate-pulse" />
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
          <AlertTriangle className="h-5 w-5 text-red-400" />
          Safety Alerts
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className="p-4 bg-elec-gray-light/10 rounded-lg border border-elec-yellow/10 hover:border-elec-yellow/30 transition-colors cursor-pointer"
              onClick={() => setSelectedAlert(alert)}
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-medium text-white">{alert.title}</h3>
                <Badge className={`${getSeverityColor(alert.severity)} text-white capitalize`}>
                  {alert.severity}
                </Badge>
              </div>
              <p className="text-sm text-gray-300 mb-2">{alert.summary}</p>
              <div className="flex items-center justify-between text-xs text-gray-400">
                <span className="bg-elec-yellow/20 text-elec-yellow px-2 py-1 rounded">
                  {alert.category}
                </span>
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {new Date(alert.date_published).toLocaleDateString()}
                </div>
              </div>
            </div>
          ))}
        </div>

        {selectedAlert && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-elec-gray border border-elec-yellow/20 rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <h2 className="text-xl font-bold text-white">{selectedAlert.title}</h2>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedAlert(null)}
                  >
                    Close
                  </Button>
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <Badge className={`${getSeverityColor(selectedAlert.severity)} text-white capitalize`}>
                    {selectedAlert.severity}
                  </Badge>
                  <span className="bg-elec-yellow/20 text-elec-yellow px-2 py-1 rounded text-sm">
                    {selectedAlert.category}
                  </span>
                </div>
                <div className="prose prose-invert max-w-none">
                  <p className="text-gray-300 whitespace-pre-wrap">{selectedAlert.content}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SafetyAlertsCard;
