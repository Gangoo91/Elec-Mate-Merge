
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Library, Download, Share2, FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useIsMobile } from "@/hooks/use-mobile";
import { toast } from "sonner";

const IndustryNewsDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const { data: news, isLoading, error } = useQuery({
    queryKey: ['industry-news', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('industry_news')
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
        title: news?.title,
        text: news?.summary,
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

  if (error || !news) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            onClick={() => navigate('/electrician/safety-shares/news')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Industry News
          </Button>
        </div>
        <Card className="border-red-500/20">
          <CardContent className="p-6 text-center">
            <Library className="h-12 w-12 text-blue-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">News Article Not Found</h2>
            <p className="text-muted-foreground">This news article may have been removed or doesn't exist.</p>
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
          onClick={() => navigate('/electrician/safety-shares/news')}
          size={isMobile ? "sm" : "default"}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Industry News
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
              <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                {news.regulatory_body}
              </Badge>
              <Badge variant="outline" className="text-xs">
                {news.category}
              </Badge>
            </div>
            <div className="flex items-center text-sm text-muted-foreground gap-1">
              <Calendar className="h-4 w-4" />
              {new Date(news.date_published).toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'short',
                year: 'numeric'
              })}
            </div>
          </div>
          
          <CardTitle className="text-xl sm:text-2xl">{news.title}</CardTitle>
          
          <div className="text-base text-muted-foreground mt-2">
            {news.summary}
          </div>
        </CardHeader>
        
        <CardContent className={isMobile ? 'p-4' : 'p-6'}>
          <div className="prose prose-invert max-w-none">
            <div className="whitespace-pre-wrap text-sm leading-relaxed">
              {news.content}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-blue-900/20 border-blue-500/30">
        <CardContent className={`${isMobile ? 'p-4' : 'p-6'}`}>
          <div className="flex items-start gap-3">
            <Library className="h-5 w-5 text-blue-400 mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-blue-400 mb-2">Industry Update</h3>
              <p className="text-sm text-white/90">
                Stay informed about the latest industry developments and regulatory changes. 
                Ensure your work practices remain compliant with current standards and regulations.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default IndustryNewsDetail;
