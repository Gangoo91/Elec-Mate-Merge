
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Construction, Share2, MapPin, Award, Building } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useIsMobile } from "@/hooks/use-mobile";
import { toast } from "sonner";

const MajorProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const { data: project, isLoading, error } = useQuery({
    queryKey: ['major-project', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('major_projects')
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
        title: project?.title,
        text: project?.summary,
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

  if (error || !project) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            onClick={() => navigate('/electrician/safety-shares/projects')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Major Projects
          </Button>
        </div>
        <Card className="border-red-500/20">
          <CardContent className="p-6 text-center">
            <Construction className="h-12 w-12 text-green-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Project Not Found</h2>
            <p className="text-muted-foreground">This project may have been removed or doesn't exist.</p>
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
          onClick={() => navigate('/electrician/safety-shares/projects')}
          size={isMobile ? "sm" : "default"}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Major Projects
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
        </div>
      </div>

      <Card className="border-elec-yellow/20">
        <CardHeader className={isMobile ? 'p-4' : 'p-6'}>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
            <div className="flex items-center gap-2">
              <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                {project.project_value}
              </Badge>
              <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                <Award className="h-3 w-3 mr-1" />
                {project.status}
              </Badge>
            </div>
            <div className="flex items-center text-sm text-muted-foreground gap-1">
              <Calendar className="h-4 w-4" />
              {new Date(project.date_awarded).toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'short',
                year: 'numeric'
              })}
            </div>
          </div>
          
          <CardTitle className="text-xl sm:text-2xl">{project.title}</CardTitle>
          
          <div className="text-base text-muted-foreground mt-2">
            {project.summary}
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <div className="flex items-center gap-2 text-sm">
              <Building className="h-4 w-4 text-green-400" />
              <span className="text-muted-foreground">Awarded to:</span>
              <span className="text-green-400 font-medium">{project.awarded_to}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="h-4 w-4 text-green-400" />
              <span className="text-muted-foreground">Location:</span>
              <span className="text-green-400 font-medium">{project.location}</span>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className={isMobile ? 'p-4' : 'p-6'}>
          <div className="prose prose-invert max-w-none">
            <div className="whitespace-pre-wrap text-sm leading-relaxed">
              {project.content}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-green-900/20 border-green-500/30">
        <CardContent className={`${isMobile ? 'p-4' : 'p-6'}`}>
          <div className="flex items-start gap-3">
            <Construction className="h-5 w-5 text-green-400 mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-green-400 mb-2">Project Opportunities</h3>
              <p className="text-sm text-white/90">
                Major projects like this create opportunities for electricians at all levels. 
                Consider how similar projects in your area might provide career development opportunities.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MajorProjectDetail;
