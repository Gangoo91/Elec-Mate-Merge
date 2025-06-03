
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, BookOpen, CalendarDays, Download } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useIsMobile } from "@/hooks/use-mobile";

const SafetyResources = () => {
  const isMobile = useIsMobile();

  const { data: resources, isLoading, error } = useQuery({
    queryKey: ['safety-resources'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('safety_resources')
        .select('*')
        .eq('is_active', true)
        .order('date_published', { ascending: false });
      
      if (error) throw error;
      return data;
    }
  });

  const resourceTypes = {
    PDF: "bg-red-500/20 text-red-400 hover:bg-red-500/30 hover:text-red-400",
    Excel: "bg-green-500/20 text-green-400 hover:bg-green-500/30 hover:text-green-400",
    Video: "bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 hover:text-blue-400"
  };

  if (isLoading) {
    return (
      <div className="space-y-6 animate-fade-in">
        <div className="flex justify-between items-center">
          <div className="h-8 bg-elec-gray/20 rounded w-48 animate-pulse"></div>
          <div className="h-10 bg-elec-gray/20 rounded w-32 animate-pulse"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-64 bg-elec-gray/20 rounded animate-pulse"></div>
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
            <BookOpen className="h-6 w-6 text-purple-400" />
            Safety Resources
          </h1>
          <Link to="/electrician/safety-shares">
            <Button variant="outline" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" /> Back to Safety Hub
            </Button>
          </Link>
        </div>
        <Card className="border-purple-500/20">
          <CardContent className="p-6 text-center">
            <BookOpen className="h-12 w-12 text-purple-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Unable to Load Resources</h2>
            <p className="text-muted-foreground">There was an error loading safety resources. Please try again later.</p>
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
            <BookOpen className="h-6 w-6 text-purple-400" />
            Safety Resources
          </h1>
          <p className="text-muted-foreground">
            Downloadable guides, toolbox talks and reference materials
          </p>
        </div>
        <Link to="/electrician/safety-shares">
          <Button variant="outline" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" /> Back to Safety Hub
          </Button>
        </Link>
      </div>

      {resources && resources.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {resources.map(resource => (
            <Card key={resource.id} className="overflow-hidden border-elec-yellow/20 bg-elec-gray/80 hover:bg-elec-gray transition-all duration-200">
              <div className="h-1 bg-purple-500" />
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center mb-2">
                  <Badge className={resourceTypes[resource.file_type as keyof typeof resourceTypes] || resourceTypes.PDF}>
                    {resource.file_type}
                  </Badge>
                  <div className="flex items-center text-sm text-muted-foreground gap-1">
                    <CalendarDays className="h-3 w-3" />
                    {new Date(resource.date_published).toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric'
                    })}
                  </div>
                </div>
                <CardTitle className="text-lg truncate">{resource.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm text-muted-foreground">{resource.summary}</p>
                <div className="text-xs text-muted-foreground">Size: {resource.file_size || 'N/A'}</div>
              </CardContent>
              <CardFooter>
                <Link to={`/electrician/safety-shares/resources/${resource.id}`} className="w-full">
                  <Button size="sm" variant="default" className="w-full flex items-center gap-2">
                    <Download className="h-4 w-4" />
                    View Resource
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="border-elec-yellow/20">
          <CardContent className="p-6 text-center">
            <BookOpen className="h-12 w-12 text-purple-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">No Resources Available</h2>
            <p className="text-muted-foreground">There are currently no active safety resources.</p>
          </CardContent>
        </Card>
      )}
      
      <Card className="border-elec-yellow/20 bg-elec-gray/50">
        <CardHeader>
          <CardTitle className="text-lg">Request Additional Resources</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Can't find what you're looking for? Let us know what safety resources would help you in your daily work.
          </p>
          <Button className="w-full sm:w-auto">Request Resources</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default SafetyResources;
