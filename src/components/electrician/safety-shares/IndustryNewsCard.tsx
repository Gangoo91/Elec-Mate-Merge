import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Calendar, Eye, Wifi, Database } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";

interface NewsItem {
  id: string;
  title: string;
  content: string;
  source: string;
  url?: string;
  external_url?: string;
  source_url?: string;
  date_published: string;
  category: string;
  view_count: number;
}

interface LiveNewsItem {
  title: string;
  snippet: string;
  url: string;
  source?: string;
  date?: string;
}

const IndustryNewsCard = () => {
  const [activeTab, setActiveTab] = useState("database");

  const { data: newsItems, isLoading, error } = useQuery({
    queryKey: ["industry-news"],
    queryFn: async () => {
      console.log("Fetching industry news...");
      const { data, error } = await supabase
        .from("industry_news")
        .select("*")
        .order("date_published", { ascending: false })
        .limit(50);

      if (error) {
        console.error("Error fetching industry news:", error);
        throw error;
      }

      console.log("Industry news data:", data);
      return data as any[];
    },
  });

  const { data: liveNews, isLoading: liveLoading, error: liveError, refetch: refetchLiveNews } = useQuery({
    queryKey: ["live-news"],
    queryFn: async () => {
      console.log("Fetching live news...");
      const { data, error } = await supabase.functions.invoke('fetch-live-news');
      
      if (error) {
        console.error("Error fetching live news:", error);
        throw error;
      }
      
      console.log("Live news response:", data);
      return data.data as LiveNewsItem[];
    },
    enabled: false, // Only fetch when tab is active
  });

  const handleViewArticle = async (article: NewsItem) => {
    try {
      // Record the view
      await supabase
        .from("safety_content_views")
        .insert({
          content_type: "industry_news",
          content_id: article.id,
          user_id: null, // Anonymous for now
        });

      // Open the article
      const url = article.url || article.external_url || article.source_url;
      if (url) {
        window.open(url, "_blank");
      }
    } catch (error) {
      console.error("Error recording view:", error);
      // Still open the article even if view recording fails
      const url = article.url || article.external_url || article.source_url;
      if (url) {
        window.open(url, "_blank");
      }
    }
  };

  const handleViewLiveArticle = (article: LiveNewsItem) => {
    window.open(article.url, "_blank");
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    if (value === "live" && !liveNews) {
      refetchLiveNews();
    }
  };

  const handleRefreshLiveNews = () => {
    refetchLiveNews();
    toast({
      title: "Refreshing Live News",
      description: "Fetching latest industry updates...",
    });
  };

  const renderLoadingState = (title: string) => (
    <div className="flex items-center justify-center p-8">
      <div className="text-muted-foreground">Loading {title}...</div>
    </div>
  );

  const renderErrorState = (title: string) => (
    <div className="text-center p-8">
      <div className="text-destructive mb-2">Error loading {title}</div>
      <div className="text-sm text-muted-foreground">Please try again later</div>
    </div>
  );

  return (
    <Card className="w-full bg-elec-dark border-elec-yellow/20">
      <CardHeader>
        <CardTitle className="text-elec-yellow flex items-center gap-2">
          Industry News & Updates
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-elec-dark border-elec-yellow/20">
            <TabsTrigger 
              value="database" 
              className="data-[state=active]:bg-elec-yellow/10 data-[state=active]:text-elec-yellow flex items-center gap-2"
            >
              <Database className="h-4 w-4" />
              Saved News
              <Badge variant="secondary" className="bg-elec-yellow/10 text-elec-yellow border-elec-yellow/30 ml-1">
                {newsItems?.length || 0}
              </Badge>
            </TabsTrigger>
            <TabsTrigger 
              value="live" 
              className="data-[state=active]:bg-elec-yellow/10 data-[state=active]:text-elec-yellow flex items-center gap-2"
            >
              <Wifi className="h-4 w-4" />
              Live News
              {liveNews && (
                <Badge variant="secondary" className="bg-elec-yellow/10 text-elec-yellow border-elec-yellow/30 ml-1">
                  {liveNews.length}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="database" className="mt-4">
            {isLoading ? renderLoadingState("saved news") : error ? renderErrorState("saved news") : (
              <div className="space-y-4">
                {newsItems && newsItems.length > 0 ? (
                  newsItems.map((item) => (
                    <Card key={item.id} className="bg-elec-dark border-elec-yellow/10 hover:border-elec-yellow/30 transition-all duration-200">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <Badge 
                            variant="outline" 
                            className="bg-elec-yellow/10 text-elec-yellow border-elec-yellow/30 text-xs"
                          >
                            {item.source}
                          </Badge>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Calendar className="h-3 w-3" />
                            {format(new Date(item.date_published), "dd MMM yyyy")}
                          </div>
                        </div>
                        
                        <h3 className="font-medium text-white mb-2 line-clamp-2 leading-tight">
                          {item.title}
                        </h3>
                        
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                          {item.content?.substring(0, 150)}...
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Eye className="h-3 w-3" />
                            {item.view_count} views
                          </div>
                          
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleViewArticle(item)}
                            className="border-elec-yellow/20 text-elec-yellow hover:bg-elec-yellow/10 hover:border-elec-yellow/40 bg-transparent"
                          >
                            <ExternalLink className="h-3 w-3 mr-1" />
                            Read More
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="text-center p-8">
                    <div className="text-muted-foreground mb-2">No saved news articles found</div>
                    <div className="text-sm text-muted-foreground">
                      Check back later for updates
                    </div>
                  </div>
                )}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="live" className="mt-4">
            <div className="flex justify-between items-center mb-4">
              <p className="text-sm text-muted-foreground">
                Real-time news from industry sources
              </p>
              <Button
                size="sm"
                variant="outline"
                onClick={handleRefreshLiveNews}
                disabled={liveLoading}
                className="border-elec-yellow/20 text-elec-yellow hover:bg-elec-yellow/10 hover:border-elec-yellow/40 bg-transparent"
              >
                <Wifi className="h-3 w-3 mr-1" />
                {liveLoading ? "Fetching..." : "Refresh"}
              </Button>
            </div>
            
            {liveLoading ? renderLoadingState("live news") : liveError ? renderErrorState("live news") : (
              <div className="space-y-4">
                {liveNews && liveNews.length > 0 ? (
                  liveNews.map((item, index) => (
                    <Card key={index} className="bg-elec-dark border-elec-yellow/10 hover:border-elec-yellow/30 transition-all duration-200">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <Badge 
                            variant="outline" 
                            className="bg-green-500/10 text-green-400 border-green-500/30 text-xs"
                          >
                            LIVE • {item.source || 'Industry News'}
                          </Badge>
                          {item.date && (
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <Calendar className="h-3 w-3" />
                              {format(new Date(item.date), "dd MMM yyyy")}
                            </div>
                          )}
                        </div>
                        
                        <h3 className="font-medium text-white mb-2 line-clamp-2 leading-tight">
                          {item.title}
                        </h3>
                        
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                          {item.snippet}
                        </p>
                        
                        <div className="flex items-center justify-end">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleViewLiveArticle(item)}
                            className="border-elec-yellow/20 text-elec-yellow hover:bg-elec-yellow/10 hover:border-elec-yellow/40 bg-transparent"
                          >
                            <ExternalLink className="h-3 w-3 mr-1" />
                            Read More
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="text-center p-8">
                    <div className="text-muted-foreground mb-2">No live news found</div>
                    <div className="text-sm text-muted-foreground">
                      Try refreshing to fetch latest updates
                    </div>
                  </div>
                )}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default IndustryNewsCard;