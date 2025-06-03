
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, AlertTriangle, Download, Share2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useIsMobile } from "@/hooks/use-mobile";
import { toast } from "sonner";

const SafetyAlertDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const { data: alert, isLoading, error } = useQuery({
    queryKey: ['safety-alert', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('safety_alerts')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      return data;
    },
    enabled: !!id
  });

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: alert?.title,
        text: alert?.summary,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard");
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-8 bg-elec-gray/20 rounded w-1/3"></div>
        <div className="h-64 bg-elec-gray/20 rounded"></div>
      </div>
    );
  }

  if (error || !alert) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            onClick={() => navigate('/electrician/safety-shares/alerts')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Alerts
          </Button>
        </div>
        <Card className="border-red-500/20">
          <CardContent className="p-6 text-center">
            <AlertTriangle className="h-12 w-12 text-red-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Alert Not Found</h2>
            <p className="text-muted-foreground">This safety alert may have been removed or doesn't exist.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'high': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'medium': return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      default: return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <Button 
          variant="outline" 
          onClick={() => navigate('/electrician/safety-shares/alerts')}
          size={isMobile ? "sm" : "default"}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Alerts
        </Button>
        
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size={isMobile ? "sm" : "default"}
            onClick={handleShare}
            className="flex items-center gap-2"
          >
            <Share2 className="h-4 w-4" /> Share
          </Button>
          <Button 
            size={isMobile ? "sm" : "default"}
            className="flex items-center gap-2"
          >
            <Download className="h-4 w-4" /> Download PDF
          </Button>
        </div>
      </div>

      <Card className="border-elec-yellow/20">
        <CardHeader className={isMobile ? 'p-4' : 'p-6'}>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
            <div className="flex items-center gap-2">
              <Badge className={getSeverityColor(alert.severity)}>
                {alert.severity === 'high' ? 'Critical' : 'Important'}
              </Badge>
              <Badge variant="outline" className="text-xs">
                {alert.category}
              </Badge>
            </div>
            <div className="flex items-center text-sm text-muted-foreground gap-1">
              <Calendar className="h-4 w-4" />
              {new Date(alert.date_published).toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'short',
                year: 'numeric'
              })}
            </div>
          </div>
          
          <CardTitle className="text-xl sm:text-2xl">{alert.title}</CardTitle>
          
          <div className="text-base text-muted-foreground mt-2">
            {alert.summary}
          </div>
        </CardHeader>
        
        <CardContent className={isMobile ? 'p-4' : 'p-6'}>
          <div className="prose prose-invert max-w-none">
            <div className="whitespace-pre-wrap text-sm leading-relaxed">
              {alert.content}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-red-900/20 border-red-500/30">
        <CardContent className={`${isMobile ? 'p-4' : 'p-6'}`}>
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-red-400 mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-red-400 mb-2">Action Required</h3>
              <p className="text-sm text-white/90">
                Ensure all team members are briefed on this safety alert. Document acknowledgment 
                and implement any required changes to working practices immediately.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SafetyAlertDetail;
