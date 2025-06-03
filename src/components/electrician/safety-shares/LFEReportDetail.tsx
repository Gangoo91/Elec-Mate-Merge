
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, FileText, Download, Share2, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useIsMobile } from "@/hooks/use-mobile";
import { toast } from "sonner";

const LFEReportDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const { data: report, isLoading, error } = useQuery({
    queryKey: ['lfe-report', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('lfe_reports')
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
        title: report?.title,
        text: report?.summary,
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

  if (error || !report) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            onClick={() => navigate('/electrician/safety-shares/lfe')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" /> Back to LFE Reports
          </Button>
        </div>
        <Card className="border-red-500/20">
          <CardContent className="p-6 text-center">
            <FileText className="h-12 w-12 text-amber-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Report Not Found</h2>
            <p className="text-muted-foreground">This LFE report may have been removed or doesn't exist.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <Button 
          variant="outline" 
          onClick={() => navigate('/electrician/safety-shares/lfe')}
          size={isMobile ? "sm" : "default"}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" /> Back to LFE Reports
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
            <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30">
              {report.incident_type}
            </Badge>
            <div className="flex items-center text-sm text-muted-foreground gap-1">
              <Calendar className="h-4 w-4" />
              {new Date(report.date_published).toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'short',
                year: 'numeric'
              })}
            </div>
          </div>
          
          <CardTitle className="text-xl sm:text-2xl">{report.title}</CardTitle>
          
          <div className="text-base text-muted-foreground mt-2">
            {report.summary}
          </div>
        </CardHeader>
        
        <CardContent className={isMobile ? 'p-4' : 'p-6'}>
          <div className="prose prose-invert max-w-none">
            <div className="whitespace-pre-wrap text-sm leading-relaxed">
              {report.content}
            </div>
          </div>
        </CardContent>
      </Card>

      {report.key_takeaways && report.key_takeaways.length > 0 && (
        <Card className="bg-amber-900/20 border-amber-500/30">
          <CardHeader className={isMobile ? 'p-4' : 'p-6'}>
            <CardTitle className="text-lg flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-amber-400" />
              Key Takeaways
            </CardTitle>
          </CardHeader>
          <CardContent className={isMobile ? 'p-4 pt-0' : 'p-6 pt-0'}>
            <ul className="space-y-2">
              {report.key_takeaways.map((takeaway: string, index: number) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-amber-400 mt-0.5 flex-shrink-0" />
                  {takeaway}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default LFEReportDetail;
