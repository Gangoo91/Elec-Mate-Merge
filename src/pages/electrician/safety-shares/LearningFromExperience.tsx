
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, FileText, CalendarDays } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useIsMobile } from "@/hooks/use-mobile";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const LearningFromExperience = () => {
  const isMobile = useIsMobile();
  
  const { data: lfeItems, isLoading, error } = useQuery({
    queryKey: ['lfe-reports'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('lfe_reports')
        .select('*')
        .eq('is_active', true)
        .order('date_published', { ascending: false });
      
      if (error) throw error;
      return data;
    }
  });

  if (isLoading) {
    return (
      <div className="space-y-6 animate-fade-in px-2 md:px-0">
        <div className="flex justify-between items-center">
          <div className="h-8 bg-elec-gray/20 rounded w-64 animate-pulse"></div>
          <div className="h-10 bg-elec-gray/20 rounded w-32 animate-pulse"></div>
        </div>
        <div className="grid grid-cols-1 gap-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-56 bg-elec-gray/20 rounded animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6 animate-fade-in px-2 md:px-0">
        <div className="flex justify-between items-center">
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight flex items-center gap-2">
            <FileText className="h-5 w-5 sm:h-6 sm:w-6 text-amber-400" />
            Learning From Experience
          </h1>
          <Link to="/electrician/safety-shares">
            <Button variant="outline" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" /> Back to Safety Hub
            </Button>
          </Link>
        </div>
        <Card className="border-amber-500/20">
          <CardContent className="p-6 text-center">
            <FileText className="h-12 w-12 text-amber-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Unable to Load Reports</h2>
            <p className="text-muted-foreground">There was an error loading LFE reports. Please try again later.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in px-2 md:px-0">
      <div className="flex flex-col justify-between gap-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight flex items-center gap-2">
              <FileText className="h-5 w-5 sm:h-6 sm:w-6 text-amber-400" />
              Learning From Experience
            </h1>
            <p className="text-sm text-muted-foreground">
              Real-world incidents and valuable lessons for electricians
            </p>
          </div>
          <Link to="/electrician/safety-shares">
            <Button variant="outline" size={isMobile ? "sm" : "default"} className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" /> Back to Safety Hub
            </Button>
          </Link>
        </div>
      </div>

      {lfeItems && lfeItems.length > 0 ? (
        <div className="grid grid-cols-1 gap-4">
          {lfeItems.map(item => (
            <Card key={item.id} className="overflow-hidden border-elec-yellow/20 bg-elec-gray/80 hover:bg-elec-gray transition-all duration-200">
              <CardHeader className={`pb-2 ${isMobile ? 'p-4' : 'p-6'}`}>
                <div className="flex justify-between items-center mb-2">
                  <Badge className="bg-amber-500/20 text-amber-400 hover:bg-amber-500/30 hover:text-amber-400">
                    {item.incident_type}
                  </Badge>
                  <div className="flex items-center text-xs sm:text-sm text-muted-foreground gap-1">
                    <CalendarDays className="h-3 w-3" />
                    {new Date(item.date_published).toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric'
                    })}
                  </div>
                </div>
                <CardTitle className="text-base sm:text-lg">{item.title}</CardTitle>
              </CardHeader>
              <CardContent className={`${isMobile ? 'px-4 py-2' : 'p-6 py-2'}`}>
                <p className="text-xs sm:text-sm text-muted-foreground">{item.summary}</p>
              </CardContent>
              <CardFooter className={`${isMobile ? 'p-4' : 'p-6 pt-4'} flex flex-col sm:flex-row w-full gap-2`}>
                <Link to={`/electrician/safety-shares/lfe/${item.id}`} className="w-full">
                  <Button size={isMobile ? "sm" : "default"} variant="outline" className="w-full text-xs sm:text-sm">Key Takeaways</Button>
                </Link>
                <Link to={`/electrician/safety-shares/lfe/${item.id}`} className="w-full">
                  <Button size={isMobile ? "sm" : "default"} className="w-full bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90 text-xs sm:text-sm">Read Full Report</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="border-elec-yellow/20">
          <CardContent className="p-6 text-center">
            <FileText className="h-12 w-12 text-amber-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">No LFE Reports</h2>
            <p className="text-muted-foreground">There are currently no active learning from experience reports.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default LearningFromExperience;
