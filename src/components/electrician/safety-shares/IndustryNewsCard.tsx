
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { RefreshCw, Search, ExternalLink, Building2, MapPin, PoundSterling, Calendar, Filter, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { Link } from "react-router-dom";

const IndustryNewsCard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSource, setSelectedSource] = useState<string | null>(null);
  const [showBS7671Only, setShowBS7671Only] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<any>(null);
  const { toast } = useToast();

  // Fetch industry news
  const { data: newsArticles = [], isLoading: newsLoading, refetch: refetchNews } = useQuery({
    queryKey: ['industry-news'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('industry_news')
        .select('*')
        .eq('is_active', true)
        .order('date_published', { ascending: false })
        .limit(20);
      
      if (error) throw error;
      return data || [];
    }
  });

  // Fetch major projects
  const { data: majorProjects = [], isLoading: projectsLoading } = useQuery({
    queryKey: ['major-projects-preview'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('major_projects')
        .select('*')
        .eq('is_active', true)
        .order('date_awarded', { ascending: false })
        .limit(5);
      
      if (error) throw error;
      return data || [];
    }
  });

  // Manual refresh function
  const handleManualRefresh = async () => {
    try {
      console.log('Calling fetch-industry-news function...');
      const { data, error } = await supabase.functions.invoke('fetch-industry-news', {
        body: {}
      });
      
      console.log('Response:', { data, error });
      
      if (error) {
        console.error('Edge function error:', error);
        toast({
          title: "Error",
          description: `Failed to fetch latest news: ${error.message}`,
          variant: "destructive",
        });
      } else {
        console.log('Success response:', data);
        toast({
          title: "Success",
          description: `Successfully updated with ${data?.inserted || 0} new articles`,
        });
      }
      
      // Always refetch from database after a delay
      setTimeout(async () => {
        await refetchNews();
      }, 1000);
    } catch (error) {
      console.error('Refresh error:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Filter articles
  const filteredArticles = newsArticles.filter(article => {
    const matchesSearch = !searchTerm || 
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (article.summary && article.summary.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesSource = !selectedSource || article.category === selectedSource || article.regulatory_body === selectedSource;
    
    const matchesBS7671 = !showBS7671Only || 
      article.title.toLowerCase().includes('bs 7671') ||
      article.title.toLowerCase().includes('wiring regulations') ||
      article.category === 'BS7671';
    
    return matchesSearch && matchesSource && matchesBS7671;
  });

  // Define filter categories as per requirements
  const filterCategories = ['HSE', 'BS7671', 'IET', 'Major Projects'];

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedSource(null);
    setShowBS7671Only(false);
  };

  return (
    <div className="space-y-6">
      {/* Search and Filter Controls */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader className="pb-4">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-elec-yellow" />
              <CardTitle className="text-lg">Filter News</CardTitle>
            </div>
            <Button
              onClick={handleManualRefresh}
              variant="outline"
              size="sm"
              className="border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh News
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-elec-dark border-elec-yellow/20 text-white"
            />
          </div>

          {/* Filter Chips */}
          <div className="flex flex-wrap gap-2">
            <div className="flex flex-wrap gap-2 shrink-0">
              {filterCategories.map((category) => (
                <Button
                  key={category}
                  variant={selectedSource === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedSource(selectedSource === category ? null : category)}
                  className={`shrink-0 ${
                    selectedSource === category
                      ? "bg-elec-yellow text-elec-dark hover:bg-elec-yellow/80"
                      : "border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10"
                  }`}
                >
                  {category}
                </Button>
              ))}
            </div>
            
            {/* BS 7671 toggle */}
            <Button
              variant={showBS7671Only ? "default" : "outline"}
              size="sm"
              onClick={() => setShowBS7671Only(!showBS7671Only)}
              className={showBS7671Only 
                ? "bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90" 
                : "border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10"
              }
            >
              BS 7671 Updates
            </Button>

            {/* Clear filters */}
            {(searchTerm || selectedSource || showBS7671Only) && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="text-gray-400 hover:text-white"
              >
                <X className="h-4 w-4 mr-1" />
                Clear
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* News Articles */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-white">
          Latest Updates ({filteredArticles.length})
        </h2>
        
        {newsLoading ? (
          <div className="text-center py-8">
            <div className="animate-spin h-8 w-8 border-2 border-elec-yellow border-t-transparent rounded-full mx-auto"></div>
            <p className="text-gray-400 mt-2">Loading latest news...</p>
          </div>
        ) : filteredArticles.length === 0 ? (
          <Card className="border-elec-yellow/20 bg-elec-gray">
            <CardContent className="text-center py-8">
              <p className="text-gray-400">No articles match your current filters.</p>
              <Button
                variant="outline"
                size="sm"
                onClick={clearFilters}
                className="mt-2 border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10"
              >
                Clear Filters
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {filteredArticles.map((article) => (
              <Card key={article.id} className="border-elec-yellow/20 bg-elec-gray hover:border-elec-yellow/40 transition-colors">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <CardTitle className="text-lg leading-tight mb-2">{article.title}</CardTitle>
                      <div className="flex flex-wrap items-center gap-2 text-sm text-gray-400">
                        <Badge variant="secondary" className="bg-elec-yellow/20 text-elec-yellow">
                          {article.category || article.regulatory_body}
                        </Badge>
                        <span>•</span>
                        <span>{format(new Date(article.date_published), 'dd MMM yyyy')}</span>
                        {article.view_count > 0 && (
                          <>
                            <span>•</span>
                            <span>{article.view_count} views</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  {article.summary && (
                    <CardDescription className="text-gray-300 line-clamp-2">
                      {article.summary}
                    </CardDescription>
                  )}
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex gap-2">
                    {(article as any).external_url ? (
                      <Button 
                        size="sm" 
                        className="bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90"
                        onClick={() => window.open((article as any).external_url, '_blank')}
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Read Article
                      </Button>
                    ) : (
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            size="sm" 
                            className="bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90"
                            onClick={() => setSelectedArticle(article)}
                          >
                            Read Article
                          </Button>
                        </DialogTrigger>
                      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto bg-elec-gray border-elec-yellow/20">
                        <DialogHeader>
                          <DialogTitle className="text-elec-yellow text-xl">{selectedArticle?.title}</DialogTitle>
                          <DialogDescription className="text-gray-300">
                            <div className="flex flex-wrap items-center gap-2 mt-2">
                              <Badge variant="secondary" className="bg-elec-yellow/20 text-elec-yellow">
                                {selectedArticle?.category || selectedArticle?.regulatory_body}
                              </Badge>
                              <span>Published: {selectedArticle && format(new Date(selectedArticle.date_published), 'dd MMM yyyy')}</span>
                              {(selectedArticle as any)?.external_url && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => window.open((selectedArticle as any).external_url, '_blank')}
                                  className="border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10"
                                >
                                  <ExternalLink className="h-4 w-4 mr-2" />
                                  View Original
                                </Button>
                              )}
                            </div>
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 text-white">
                          {selectedArticle?.content && (
                            <div className="prose prose-invert max-w-none">
                              <p className="whitespace-pre-wrap">{selectedArticle.content}</p>
                            </div>
                          )}
                        </div>
                      </DialogContent>
                    </Dialog>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Major Projects Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
              <Building2 className="h-4 w-4 text-white" />
            </div>
            <h2 className="text-xl font-semibold text-white">Major Projects Just Awarded</h2>
          </div>
          <Link to="/electrician/safety-shares/projects">
            <Button variant="outline" size="sm" className="border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10">
              View All Projects
            </Button>
          </Link>
        </div>

        {projectsLoading ? (
          <div className="text-center py-4">
            <div className="animate-spin h-6 w-6 border-2 border-elec-yellow border-t-transparent rounded-full mx-auto"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {majorProjects.slice(0, 3).map((project) => (
              <Card key={project.id} className="border-elec-yellow/20 bg-elec-gray/50 flex flex-col">
                <CardHeader className="pb-2">
                  <h3 className="font-medium text-white">{project.title}</h3>
                </CardHeader>
                <CardContent className="pt-0 space-y-2 flex-1">
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <MapPin className="h-4 w-4" />
                    {project.location}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <PoundSterling className="h-4 w-4" />
                    {project.project_value}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Calendar className="h-4 w-4" />
                    {format(new Date(project.date_awarded), 'MMM yyyy')}
                  </div>
                  <div className="text-sm text-gray-400">
                    Awarded to: <span className="text-white">{project.awarded_to}</span>
                  </div>
                </CardContent>
                <CardFooter className="pt-2">
                  <Button className="w-full border-gray-600 text-gray-500" variant="outline" disabled>
                    No Link Available
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}

        <Card className="border-elec-yellow/20 bg-elec-gray/30">
          <CardContent className="p-4 text-center">
            <p className="text-gray-400 text-sm mb-3">
              Stay ahead of the competition - be the first to know about major electrical contracts in the UK
            </p>
            <Link to="/electrician/safety-shares/projects">
              <Button className="bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90">
                <Building2 className="h-4 w-4 mr-2" />
                View All Major Projects
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default IndustryNewsCard;
