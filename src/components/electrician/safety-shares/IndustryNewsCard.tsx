
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { RefreshCw, Search, ExternalLink, Building2, MapPin, PoundSterling, Calendar, Filter, X, Wifi, WifiOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { FirecrawlService } from "@/utils/FirecrawlService";
import { Progress } from "@/components/ui/progress";

const IndustryNewsCard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<any>(null);
  const [isLiveFetching, setIsLiveFetching] = useState(false);
  const [fetchProgress, setFetchProgress] = useState({ current: 0, total: 0, source: "" });
  const { toast } = useToast();

  // Fetch industry news directly from Supabase
  const { data: newsArticles = [], isLoading: newsLoading, refetch: refetchNews } = useQuery({
    queryKey: ['industry-news'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('industry_news')
        .select('*')
        .eq('is_active', true)
        .order('date_published', { ascending: false })
        .limit(50);
      
      if (error) {
        console.error('Error fetching industry news:', error);
        throw error;
      }
      
      return data || [];
    },
    refetchOnWindowFocus: false,
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

  // Live news fetching function - now calls Supabase edge function
  const handleLiveFetch = async () => {
    setIsLiveFetching(true);
    setFetchProgress({ current: 0, total: 4, source: "Initializing..." });

    try {
      const { data, error } = await supabase.functions.invoke('comprehensive-news-scraper', {
        body: { manual: true }
      });

      if (error) {
        throw error;
      }

      if (data?.success) {
        toast({
          title: "Live News Fetched",
          description: `Successfully fetched ${data.articlesInserted || 0} new articles from industry sources`,
        });
        
        // Refresh the news data
        await refetchNews();
      } else {
        toast({
          title: "Fetch Failed",
          description: data?.error || "Failed to fetch live news",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Live fetch error:', error);
      toast({
        title: "Fetch Error",
        description: "An error occurred while fetching live news",
        variant: "destructive",
      });
    } finally {
      setIsLiveFetching(false);
      setFetchProgress({ current: 0, total: 0, source: "" });
    }
  };

  // Remove unused handlers

  // Dynamic categories based on actual database data with electrical relevance indicators
  const categories = [
    { key: 'HSE', label: 'HSE Safety', color: 'bg-red-100 text-red-800 hover:bg-red-200' },
    { key: 'BS7671', label: 'BS7671 Regs', color: 'bg-blue-100 text-blue-800 hover:bg-blue-200' },
    { key: 'IET', label: 'IET Technical', color: 'bg-green-100 text-green-800 hover:bg-green-200' },
    { key: 'Safety', label: 'Safety Alerts', color: 'bg-orange-100 text-orange-800 hover:bg-orange-200' },
    { key: 'Major Projects', label: 'Major Projects', color: 'bg-purple-100 text-purple-800 hover:bg-purple-200' },
  ];

  // Check electrical relevance of articles
  const getElectricalRelevanceScore = (article: any): number => {
    const text = `${article.title} ${article.summary || ''} ${article.content || ''}`.toLowerCase();
    const electricalKeywords = [
      'electrical', 'electricity', 'wiring', 'cable', 'circuit', 'installation',
      'bs7671', 'regulation', 'safety', 'testing', 'inspection', 'electrician',
      'power', 'voltage', 'current', 'earthing', 'bonding', 'rcd', 'mcb'
    ];
    
    let score = 0;
    electricalKeywords.forEach(keyword => {
      if (text.includes(keyword)) score++;
    });
    
    return Math.min(score, 5); // Cap at 5 for display
  };

  // Filter articles
  const filteredArticles = newsArticles.filter(article => {
    const matchesSearch = !searchTerm || 
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (article.summary && article.summary.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = !selectedCategory || article.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Get article count per category
  const getCategoryCount = (categoryKey: string) => {
    return newsArticles.filter(article => article.category === categoryKey).length;
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory(null);
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
            <div className="flex gap-2">
              <Button
                onClick={handleLiveFetch}
                variant="outline"
                size="sm"
                disabled={isLiveFetching}
                className="border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10"
              >
                {isLiveFetching ? (
                  <>
                    <Wifi className="h-4 w-4 mr-2 animate-pulse" />
                    Fetching Live...
                  </>
                ) : (
                  <>
                    <Wifi className="h-4 w-4 mr-2" />
                    Fetch Live News
                  </>
                )}
              </Button>
            </div>
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

          {/* Static Category Filter Buttons */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => {
              const count = getCategoryCount(category.key);
              const isSelected = selectedCategory === category.key;
              
              return (
                <Button
                  key={category.key}
                  variant={isSelected ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(isSelected ? null : category.key)}
                  className={`shrink-0 ${
                    isSelected
                      ? "bg-elec-yellow text-elec-dark hover:bg-elec-yellow/80"
                      : "border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10"
                  }`}
                  disabled={count === 0}
                >
                  {category.label} ({count})
                </Button>
              );
            })}

            {/* Clear filters */}
            {(searchTerm || selectedCategory) && (
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
          
          {/* Live Fetch Progress */}
          {isLiveFetching && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Fetching from: {fetchProgress.source}</span>
                <span className="text-elec-yellow">{fetchProgress.current}/{fetchProgress.total}</span>
              </div>
              <Progress 
                value={(fetchProgress.current / Math.max(fetchProgress.total, 1)) * 100} 
                className="h-2"
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* API key dialog and handlers removed - now automatic */}

      {/* Data Status Indicator */}
      {newsArticles.length > 0 && (
        <div className="flex items-center justify-between text-sm text-gray-400 bg-elec-gray/50 px-4 py-2 rounded-lg border border-elec-yellow/10">
          <div className="flex items-center gap-2">
            <Wifi className="h-4 w-4 text-green-400" />
            <span>Live data from industry sources</span>
          </div>
          <span>
            {newsArticles.length} articles available
          </span>
        </div>
      )}

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
                            {article.category}
                          </Badge>
                          {/* Electrical relevance indicator */}
                          {(() => {
                            const relevanceScore = getElectricalRelevanceScore(article);
                            if (relevanceScore >= 3) {
                              return (
                                <Badge variant="outline" className="border-green-500/50 text-green-400 bg-green-500/10">
                                  High Electrical Relevance
                                </Badge>
                              );
                            } else if (relevanceScore >= 1) {
                              return (
                                <Badge variant="outline" className="border-yellow-500/50 text-yellow-400 bg-yellow-500/10">
                                  Electrical Related
                                </Badge>
                              );
                            }
                            return null;
                          })()}
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
                                    {selectedArticle?.category}
                                  </Badge>
                                 <span>Published: {selectedArticle && format(new Date(selectedArticle.date_published), 'dd MMM yyyy')}</span>
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
                       
                          {(article.external_url || article.source_url) && (
                            <Button
                              size="sm"
                              variant="outline"
                              className="bg-transparent border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10"
                              onClick={async () => {
                                const url = article.external_url || article.source_url;
                                
                                if (!url) {
                                  toast({
                                    title: "No link available",
                                    description: "This article doesn't have an associated link.",
                                    variant: "destructive"
                                  });
                                  return;
                                }

                                // Validate URL format
                                if (!url.startsWith('http://') && !url.startsWith('https://')) {
                                  toast({
                                    title: "Invalid link format",
                                    description: "The article link is not properly formatted.",
                                    variant: "destructive"
                                  });
                                  return;
                                }

                                try {
                                  // For ContractsFinder links, provide better user experience
                                  if (url.includes('contractsfinder.service.gov.uk/Notice/')) {
                                    toast({
                                      title: "Opening ContractsFinder",
                                      description: "Note: Contract links may expire after the tender period ends.",
                                    });
                                  }
                                  
                                  // Open the link
                                  window.open(url, '_blank', 'noopener,noreferrer');
                                  
                                } catch (error) {
                                  console.error('Failed to open link:', error);
                                  toast({
                                    title: "Unable to open link",
                                    description: "The article link appears to be invalid or expired. Try visiting the source website instead.",
                                    variant: "destructive"
                                  });
                                  
                                  // Fallback: try opening the source URL if different
                                  if (article.source_url && article.source_url !== url) {
                                    setTimeout(() => {
                                      window.open(article.source_url, '_blank', 'noopener,noreferrer');
                                    }, 1000);
                                  }
                                }
                              }}
                              title={article.external_url ? 
                                "Read the full article" : 
                                "Visit the source website"}
                            >
                              <ExternalLink className="w-4 h-4 mr-2" />
                              {article.external_url ? 
                                "Read Article" : 
                                "View Source"}
                            </Button>
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
