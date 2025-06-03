
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, AlertTriangle, Shield, CalendarDays } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useIsMobile } from "@/hooks/use-mobile";

const SafetyAlerts = () => {
  const isMobile = useIsMobile();

  const { data: safetyAlerts, isLoading, error } = useQuery({
    queryKey: ['safety-alerts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('safety_alerts')
        .select('*')
        .eq('is_active', true)
        .order('date_published', { ascending: false });
      
      if (error) throw error;
      return data;
    }
  });

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'high': return 'bg-red-500/20 text-red-400 hover:bg-red-500/30 hover:text-red-400';
      case 'medium': return 'bg-amber-500/20 text-amber-400 hover:bg-amber-500/30 hover:text-amber-400';
      default: return 'bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 hover:text-blue-400';
    }
  };

  const getSeverityBorderColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-amber-500';
      default: return 'bg-blue-500';
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6 animate-fade-in">
        <div className="flex justify-between items-center">
          <div className="h-8 bg-elec-gray/20 rounded w-48 animate-pulse"></div>
          <div className="h-10 bg-elec-gray/20 rounded w-32 animate-pulse"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-48 bg-elec-gray/20 rounded animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6 animate-fade-in">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <AlertTriangle className="h-6 w-6 text-red-400" />
            Safety Alerts
          </h1>
          <Link to="/electrician/safety-shares">
            <Button variant="outline" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" /> Back to Safety Hub
            </Button>
          </Link>
        </div>
        <Card className="border-red-500/20">
          <CardContent className="p-6 text-center">
            <AlertTriangle className="h-12 w-12 text-red-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Unable to Load Alerts</h2>
            <p className="text-muted-foreground">There was an error loading safety alerts. Please try again later.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <AlertTriangle className="h-6 w-6 text-red-400" />
            Safety Alerts
          </h1>
          <p className="text-muted-foreground">
            Critical safety notifications and bulletins from industry regulators
          </p>
        </div>
        <Link to="/electrician/safety-shares">
          <Button variant="outline" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" /> Back to Safety Hub
          </Button>
        </Link>
      </div>

      <Card className="bg-gradient-to-r from-red-900/40 to-red-800/20 border-red-500/30">
        <CardContent className="p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="rounded-full bg-red-500/20 p-3">
            <Shield className="h-6 w-6 text-red-400" />
          </div>
          <div className="space-y-2 flex-1">
            <h2 className="text-lg font-semibold text-red-400">How to Use Safety Alerts</h2>
            <p className="text-sm text-white/90">
              Review all safety alerts during daily briefings. Document that team members have been informed of relevant alerts and implement required actions.
            </p>
          </div>
        </CardContent>
      </Card>

      {safetyAlerts && safetyAlerts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {safetyAlerts.map(item => (
            <Card key={item.id} className="overflow-hidden border-elec-yellow/20 bg-elec-gray/80 hover:bg-elec-gray transition-all duration-200">
              <div className={`h-1 ${getSeverityBorderColor(item.severity)}`} />
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center mb-2">
                  <Badge className={getSeverityColor(item.severity)}>
                    {item.severity === 'high' ? 'Critical' : 'Important'}
                  </Badge>
                  <div className="flex items-center text-sm text-muted-foreground gap-1">
                    <CalendarDays className="h-3 w-3" />
                    {new Date(item.date_published).toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric'
                    })}
                  </div>
                </div>
                <CardTitle className="text-lg">{item.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm text-muted-foreground">{item.summary}</p>
              </CardContent>
              <CardFooter>
                <Link to={`/electrician/safety-shares/alerts/${item.id}`} className="w-full">
                  <Button size="sm" className="w-full">Read Full Alert</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="border-elec-yellow/20">
          <CardContent className="p-6 text-center">
            <AlertTriangle className="h-12 w-12 text-amber-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">No Safety Alerts</h2>
            <p className="text-muted-foreground">There are currently no active safety alerts.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SafetyAlerts;
