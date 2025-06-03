
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, BookOpen, Download, Share2, FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useIsMobile } from "@/hooks/use-mobile";
import { toast } from "sonner";

const SafetyResourceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const { data: resource, isLoading, error } = useQuery({
    queryKey: ['safety-resource', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('safety_resources')
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
        title: resource?.title,
        text: resource?.summary,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard");
    }
  };

  const handleDownload = () => {
    if (resource?.file_url) {
      window.open(resource.file_url, '_blank');
    } else {
      toast.info("Download will be available soon");
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

  if (error || !resource) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            onClick={() => navigate('/electrician/safety-shares/resources')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Resources
          </Button>
        </div>
        <Card className="border-red-500/20">
          <CardContent className="p-6 text-center">
            <FileText className="h-12 w-12 text-purple-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Resource Not Found</h2>
            <p className="text-muted-foreground">This safety resource may have been removed or doesn't exist.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const getFileTypeColor = (fileType: string) => {
    switch (fileType.toLowerCase()) {
      case 'pdf': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'excel': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'video': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      default: return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <Button 
          variant="outline" 
          onClick={() => navigate('/electrician/safety-shares/resources')}
          size={isMobile ? "sm" : "default"}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Resources
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
            onClick={handleDownload}
            className="flex items-center gap-2"
          >
            <Download className="h-4 w-4" /> Download
          </Button>
        </div>
      </div>

      <Card className="border-elec-yellow/20">
        <CardHeader className={isMobile ? 'p-4' : 'p-6'}>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
            <div className="flex items-center gap-2">
              <Badge className={getFileTypeColor(resource.file_type)}>
                {resource.file_type}
              </Badge>
              <Badge variant="outline" className="text-xs">
                {resource.category}
              </Badge>
            </div>
            <div className="flex items-center text-sm text-muted-foreground gap-1">
              <Calendar className="h-4 w-4" />
              {new Date(resource.date_published).toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'short',
                year: 'numeric'
              })}
            </div>
          </div>
          
          <CardTitle className="text-xl sm:text-2xl">{resource.title}</CardTitle>
          
          <div className="text-base text-muted-foreground mt-2">
            {resource.summary}
          </div>
          
          {resource.file_size && (
            <div className="text-sm text-muted-foreground mt-2">
              File size: {resource.file_size}
            </div>
          )}
        </CardHeader>
      </Card>

      <Card className="bg-purple-900/20 border-purple-500/30">
        <CardContent className={`${isMobile ? 'p-4' : 'p-6'}`}>
          <div className="flex items-start gap-3">
            <BookOpen className="h-5 w-5 text-purple-400 mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-purple-400 mb-2">Resource Information</h3>
              <p className="text-sm text-white/90">
                This safety resource has been downloaded {resource.download_count || 0} times. 
                Make sure to share relevant resources with your team and implement any guidance provided.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SafetyResourceDetail;
