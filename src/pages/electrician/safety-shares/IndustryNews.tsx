
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, Library, CalendarDays } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useIsMobile } from "@/hooks/use-mobile";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const IndustryNews = () => {
  const isMobile = useIsMobile();
  
  const { data: industryNews, isLoading, error } = useQuery({
    queryKey: ['industry-news'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('industry_news')
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
      <div className="space-y-6 animate-fade-in px-2 md:px-0">
        <div className="flex justify-between items-center">
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight flex items-center gap-2">
            <Library className="h-5 w-5 sm:h-6 sm:w-6 text-blue-400" />
            Industry News
          </h1>
          <Link to="/electrician/safety-shares">
            <Button variant="outline" size={isMobile ? "sm" : "default"} className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" /> Back to Safety Hub
            </Button>
          </Link>
        </div>
        <Card className="border-blue-500/20">
          <CardContent className="p-6 text-center">
            <Library className="h-12 w-12 text-blue-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Unable to Load News</h2>
            <p className="text-muted-foreground">There was an error loading industry news. Please try again later.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in px-2 md:px-0">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight flex items-center gap-2">
            <Library className="h-5 w-5 sm:h-6 sm:w-6 text-blue-400" />
            Industry News
          </h1>
          <p className="text-sm text-muted-foreground">
            Latest electrical industry regulations and developments
          </p>
        </div>
        <Link to="/electrician/safety-shares">
          <Button variant="outline" size={isMobile ? "sm" : "default"} className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" /> Back to Safety Hub
          </Button>
        </Link>
      </div>

      {industryNews && industryNews.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {industryNews.map(update => (
            <Card key={update.id} className="overflow-hidden border-elec-yellow/20 bg-elec-gray/80 hover:bg-elec-gray transition-all duration-200">
              <div className="h-1 bg-blue-500" />
              <CardHeader className={`pb-2 ${isMobile ? 'p-4' : 'p-6'}`}>
                <div className="flex justify-between items-center mb-2">
                  <Badge className="bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 hover:text-blue-400">
                    {update.regulatory_body}
                  </Badge>
                  <div className="flex items-center text-xs sm:text-sm text-muted-foreground gap-1">
                    <CalendarDays className="h-3 w-3" />
                    {new Date(update.date_published).toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric'
                    })}
                  </div>
                </div>
                <CardTitle className="text-base sm:text-lg">{update.title}</CardTitle>
              </CardHeader>
              <CardContent className={`${isMobile ? 'px-4 py-2' : 'p-6 py-2'}`}>
                <p className="text-xs sm:text-sm text-muted-foreground">{update.summary}</p>
                <Badge variant="outline" className="mt-2 text-xs">{update.category}</Badge>
              </CardContent>
              <CardFooter className={`${isMobile ? 'p-4' : 'p-6 pt-3'}`}>
                <Link to={`/electrician/safety-shares/news/${update.id}`} className="w-full">
                  <Button size={isMobile ? "sm" : "default"} variant="outline" className="w-full text-xs sm:text-sm">View Update</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="border-elec-yellow/20">
          <CardContent className="p-6 text-center">
            <Library className="h-12 w-12 text-blue-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">No Industry News</h2>
            <p className="text-muted-foreground">There are currently no active industry news articles.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default IndustryNews;
