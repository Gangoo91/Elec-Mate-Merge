
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { RefreshCw, Search, ExternalLink, Building2, MapPin, PoundSterling, Calendar, Filter, X, Settings } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { FirecrawlService } from "@/utils/FirecrawlService";

const IndustryNewsCard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSource, setSelectedSource] = useState<string | null>(null);
  const [showBS7671Only, setShowBS7671Only] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<any>(null);
  const [showApiKeyInput, setShowApiKeyInput] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [refreshProgress, setRefreshProgress] = useState("");
  const [newsArticles, setNewsArticles] = useState<any[]>([]);
  const [newsLoading, setNewsLoading] = useState(false);
  const { toast } = useToast();

  // Load cached news on component mount
  useEffect(() => {
    const cachedNews = FirecrawlService.getCachedNews();
    if (cachedNews.length > 0) {
      setNewsArticles(cachedNews);
    }
  }, []);

  // Check for existing API key on mount
  useEffect(() => {
    const existingKey = FirecrawlService.getApiKey();
    if (!existingKey) {
      setShowApiKeyInput(true);
    }
  }, []);

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

  // Save API key
  const handleSaveApiKey = async () => {
    if (!apiKey.trim()) {
      toast({
        title: "Error",
        description: "Please enter a valid API key",
        variant: "destructive",
      });
      return;
    }

    FirecrawlService.saveApiKey(apiKey);
    setShowApiKeyInput(false);
    setApiKey("");
    toast({
      title: "Success",
      description: "API key saved successfully",
    });
  };

  // Fetch news from Firecrawl API
  const refreshNews = async () => {
    const existingKey = FirecrawlService.getApiKey();
    if (!existingKey) {
      setShowApiKeyInput(true);
      return;
    }

    setIsRefreshing(true);
    setRefreshProgress("");
    
    try {
      // Clear cache before fetching fresh data
      FirecrawlService.clearCache();
      
      const result = await FirecrawlService.fetchNewsDirectly(
        (message, current, total) => {
          setRefreshProgress(`${message} (${current}/${total})`);
        }
      );
      
      if (result.success && result.articles) {
        setNewsArticles(result.articles);
        toast({
          title: "Success",
          description: `Fetched ${result.articles.length} articles`,
        });
      } else {
        throw new Error(result.error || 'Failed to fetch news');
      }
    } catch (error) {
      console.error('Error fetching news:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to fetch news",
        variant: "destructive",
      });
    } finally {
      setIsRefreshing(false);
      setRefreshProgress("");
    }
  };

  // Filter articles
  const filteredArticles = newsArticles.filter(article => {
    const matchesSearch = !searchTerm || 
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (article.summary && article.summary.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesSource = !selectedSource || article.source === selectedSource;
    
    const matchesBS7671 = !showBS7671Only || 
      article.title.toLowerCase().includes('bs 7671') ||
      article.title.toLowerCase().includes('wiring regulations') ||
      article.source === 'BS7671';
    
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
            <div className="flex gap-2">
              <Button
                onClick={refreshNews}
                variant="outline"
                size="sm"
                disabled={isRefreshing}
                className="border-elec-yellow/30 text-white hover:bg-elec-yellow/10 disabled:opacity-50"
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
                {isRefreshing ? (refreshProgress || 'Fetching') : 'Refresh News'}
              </Button>
              <Button 
                onClick={() => setShowApiKeyInput(true)}
                variant="outline"
                size="sm"
                className="border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10"
              >
                <Settings className="h-4 w-4 mr-2" />
                API Settings
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
                           {article.source}
                         </Badge>
                         <span>•</span>
                         <span>{format(new Date(article.publishedDate), 'dd MMM yyyy')}</span>
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
                     {article.url ? (
                       <Button 
                         size="sm" 
                         className="bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90"
                         onClick={() => window.open(article.url, '_blank')}
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
                                 {selectedArticle?.source}
                               </Badge>
                               <span>Published: {selectedArticle && format(new Date(selectedArticle.publishedDate), 'dd MMM yyyy')}</span>
                               {selectedArticle?.url && (
                                 <Button
                                   variant="outline"
                                   size="sm"
                                   onClick={() => window.open(selectedArticle.url, '_blank')}
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

      {/* API Key Input Modal */}
      <Dialog open={showApiKeyInput} onOpenChange={setShowApiKeyInput}>
        <DialogContent className="bg-elec-gray border-elec-yellow/20">
          <DialogHeader>
            <DialogTitle className="text-elec-yellow">Configure Firecrawl API Key</DialogTitle>
            <DialogDescription className="text-gray-300">
              Enter your Firecrawl API key to fetch live industry news. Get your API key from{' '}
              <a 
                href="https://firecrawl.dev" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-elec-yellow hover:underline"
              >
                firecrawl.dev
              </a>
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              placeholder="fc-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="bg-elec-dark border-elec-yellow/20 text-white"
            />
            <div className="flex gap-2">
              <Button onClick={handleSaveApiKey} className="bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90">
                Save API Key
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setShowApiKeyInput(false)}
                className="border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10"
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

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
