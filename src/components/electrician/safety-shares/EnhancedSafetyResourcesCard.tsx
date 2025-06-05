
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Download, Clock, Filter, Search, X, Eye, Star, Bookmark } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface SafetyResource {
  id: string;
  title: string;
  summary: string;
  file_type: string;
  file_url: string | null;
  file_size: string;
  category: string;
  date_published: string;
  download_count: number;
  view_count: number;
  average_rating: number;
}

interface BookmarkStatus {
  [key: string]: boolean;
}

interface UserRating {
  [key: string]: number;
}

const EnhancedSafetyResourcesCard = () => {
  const [resources, setResources] = useState<SafetyResource[]>([]);
  const [filteredResources, setFilteredResources] = useState<SafetyResource[]>([]);
  const [selectedResource, setSelectedResource] = useState<SafetyResource | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [fileTypeFilter, setFileTypeFilter] = useState("all");
  const [bookmarks, setBookmarks] = useState<BookmarkStatus>({});
  const [userRatings, setUserRatings] = useState<UserRating>({});
  const { toast } = useToast();

  useEffect(() => {
    console.log('EnhancedSafetyResourcesCard: Component mounted, fetching resources...');
    fetchResources();
  }, []);

  useEffect(() => {
    console.log('EnhancedSafetyResourcesCard: Filtering resources with:', { searchTerm, categoryFilter, fileTypeFilter });
    filterResources();
  }, [resources, searchTerm, categoryFilter, fileTypeFilter]);

  const fetchResources = async () => {
    try {
      console.log('EnhancedSafetyResourcesCard: Starting to fetch safety resources...');
      setError(null);
      
      const { data, error: fetchError } = await supabase
        .from('safety_resources')
        .select('*')
        .eq('is_active', true)
        .order('date_published', { ascending: false });

      console.log('EnhancedSafetyResourcesCard: Supabase response:', { data, error: fetchError });

      if (fetchError) {
        console.error('EnhancedSafetyResourcesCard: Error fetching safety resources:', fetchError);
        setError(`Failed to fetch resources: ${fetchError.message}`);
        return;
      }

      const resourcesData = data || [];
      console.log('EnhancedSafetyResourcesCard: Fetched resources:', resourcesData.length);
      setResources(resourcesData);
      
      if (resourcesData.length === 0) {
        console.log('EnhancedSafetyResourcesCard: No resources found in database');
        setError('No safety resources found');
      }
    } catch (error) {
      console.error('EnhancedSafetyResourcesCard: Exception during fetch:', error);
      setError(`Unexpected error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  const filterResources = () => {
    let filtered = resources;

    if (searchTerm) {
      filtered = filtered.filter(resource =>
        resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.summary.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (categoryFilter !== "all") {
      filtered = filtered.filter(resource => resource.category === categoryFilter);
    }

    if (fileTypeFilter !== "all") {
      filtered = filtered.filter(resource => resource.file_type === fileTypeFilter);
    }

    console.log('EnhancedSafetyResourcesCard: Filtered resources:', filtered.length);
    setFilteredResources(filtered);
  };

  const handleDownload = async (resource: SafetyResource, event: React.MouseEvent) => {
    event.stopPropagation();
    try {
      // Update download count
      await supabase
        .from('safety_resources')
        .update({ download_count: resource.download_count + 1 })
        .eq('id', resource.id);

      // Track download
      const user = (await supabase.auth.getUser()).data.user;
      await supabase
        .from('safety_content_views')
        .insert({
          content_id: resource.id,
          content_type: 'safety_resources',
          user_id: user?.id,
          session_id: 'download-session'
        });

      // For demo purposes, show alert since we don't have actual files
      toast({
        title: "Download started",
        description: `Downloading ${resource.title} (${resource.file_size})`
      });
      
      // Refresh the data to show updated download count
      fetchResources();
    } catch (error) {
      console.error('Error updating download count:', error);
      toast({
        title: "Error",
        description: "Failed to start download",
        variant: "destructive"
      });
    }
  };

  const handleBookmark = async (resource: SafetyResource) => {
    try {
      const isBookmarked = bookmarks[resource.id];
      
      if (isBookmarked) {
        await supabase
          .from('safety_bookmarks')
          .delete()
          .eq('content_id', resource.id)
          .eq('content_type', 'safety_resources');
      } else {
        await supabase
          .from('safety_bookmarks')
          .insert({
            content_id: resource.id,
            content_type: 'safety_resources',
            user_id: (await supabase.auth.getUser()).data.user?.id
          });
      }

      setBookmarks(prev => ({ ...prev, [resource.id]: !isBookmarked }));
      toast({
        title: isBookmarked ? "Bookmark removed" : "Bookmark added",
        description: `Resource "${resource.title}" ${isBookmarked ? 'removed from' : 'added to'} bookmarks`
      });
    } catch (error) {
      console.error('Error managing bookmark:', error);
      toast({
        title: "Error",
        description: "Failed to update bookmark",
        variant: "destructive"
      });
    }
  };

  const handleRating = async (resource: SafetyResource, rating: number) => {
    try {
      const user = (await supabase.auth.getUser()).data.user;
      if (!user) return;

      await supabase
        .from('safety_content_ratings')
        .upsert({
          content_id: resource.id,
          content_type: 'safety_resources',
          user_id: user.id,
          rating
        });

      setUserRatings(prev => ({ ...prev, [resource.id]: rating }));
      toast({
        title: "Rating submitted",
        description: `You rated this resource ${rating} stars`
      });
    } catch (error) {
      console.error('Error submitting rating:', error);
      toast({
        title: "Error",
        description: "Failed to submit rating",
        variant: "destructive"
      });
    }
  };

  const trackView = async (resource: SafetyResource) => {
    try {
      const user = (await supabase.auth.getUser()).data.user;
      await supabase
        .from('safety_content_views')
        .insert({
          content_id: resource.id,
          content_type: 'safety_resources',
          user_id: user?.id,
          session_id: 'web-session'
        });
    } catch (error) {
      console.error('Error tracking view:', error);
    }
  };

  const getFileTypeColor = (type: string) => {
    switch (type.toUpperCase()) {
      case 'PDF': return 'bg-red-500 hover:bg-red-600';
      case 'DOC': case 'DOCX': return 'bg-blue-500 hover:bg-blue-600';
      case 'XLS': case 'XLSX': return 'bg-green-500 hover:bg-green-600';
      case 'PPT': case 'PPTX': return 'bg-orange-500 hover:bg-orange-600';
      case 'VIDEO': return 'bg-purple-500 hover:bg-purple-600';
      default: return 'bg-gray-500 hover:bg-gray-600';
    }
  };

  const getFileTypeIcon = (type: string) => {
    switch (type.toUpperCase()) {
      case 'PDF': return '📄';
      case 'DOC': case 'DOCX': return '📝';
      case 'XLS': case 'XLSX': return '📊';
      case 'PPT': case 'PPTX': return '📽️';
      case 'VIDEO': return '🎥';
      default: return '📁';
    }
  };

  const getUniqueCategories = () => {
    return [...new Set(resources.map(resource => resource.category))];
  };

  const getUniqueFileTypes = () => {
    return [...new Set(resources.map(resource => resource.file_type))];
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardContent className="p-6">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-elec-yellow mx-auto mb-4"></div>
              <p className="text-gray-300">Loading safety resources...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <Card className="border-red-500/20 bg-elec-gray">
          <CardContent className="p-6">
            <div className="text-center">
              <FileText className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-red-400 mb-2">Error Loading Resources</h3>
              <p className="text-gray-300 mb-4">{error}</p>
              <Button 
                onClick={fetchResources}
                className="bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90"
              >
                Try Again
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filters Section */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Filter className="h-5 w-5 text-elec-yellow" />
            Filter Resources
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search resources..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-elec-gray-light border-elec-yellow/30 text-white placeholder-gray-400"
              />
            </div>
            
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="bg-elec-gray-light border-elec-yellow/30 text-white">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent className="bg-elec-gray border-elec-yellow/30">
                <SelectItem value="all" className="text-white hover:bg-elec-gray-light">All Categories</SelectItem>
                {getUniqueCategories().map(category => (
                  <SelectItem key={category} value={category} className="text-white hover:bg-elec-gray-light">
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={fileTypeFilter} onValueChange={setFileTypeFilter}>
              <SelectTrigger className="bg-elec-gray-light border-elec-yellow/30 text-white">
                <SelectValue placeholder="Filter by file type" />
              </SelectTrigger>
              <SelectContent className="bg-elec-gray border-elec-yellow/30">
                <SelectItem value="all" className="text-white hover:bg-elec-gray-light">All Types</SelectItem>
                {getUniqueFileTypes().map(type => (
                  <SelectItem key={type} value={type} className="text-white hover:bg-elec-gray-light">
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {(searchTerm || categoryFilter !== "all" || fileTypeFilter !== "all") && (
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <span>Showing {filteredResources.length} of {resources.length} resources</span>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => {
                  setSearchTerm("");
                  setCategoryFilter("all");
                  setFileTypeFilter("all");
                }}
                className="h-6 px-2 text-gray-400 hover:text-white"
              >
                Clear filters
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Resources List */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-purple-400" />
            Enhanced Safety Resources
            <Badge className="bg-elec-yellow/20 text-elec-yellow">
              {filteredResources.length}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {filteredResources.length === 0 ? (
            <div className="text-center py-8">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-400">No resources found matching your criteria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {filteredResources.map((resource) => (
                <div
                  key={resource.id}
                  className="p-4 bg-elec-gray-light/10 rounded-lg border border-elec-yellow/10 hover:border-elec-yellow/30 transition-all duration-300 cursor-pointer group"
                  onClick={() => {
                    setSelectedResource(resource);
                    trackView(resource);
                  }}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl flex-shrink-0 mt-1">
                      {getFileTypeIcon(resource.file_type)}
                    </span>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-medium text-white group-hover:text-elec-yellow transition-colors line-clamp-2 mb-2">
                        {resource.title}
                      </h3>
                      <p className="text-sm text-gray-300 line-clamp-2 mb-3">
                        {resource.summary}
                      </p>
                      
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <Badge className={`${getFileTypeColor(resource.file_type)} text-white text-xs`}>
                          {resource.file_type}
                        </Badge>
                        <span className="bg-elec-yellow/20 text-elec-yellow px-2 py-1 rounded text-xs">
                          {resource.category}
                        </span>
                        <span className="text-xs text-gray-400">{resource.file_size}</span>
                      </div>
                      
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-4 text-xs text-gray-400">
                          <div className="flex items-center gap-1">
                            <Download className="h-3 w-3" />
                            {resource.download_count}
                          </div>
                          <div className="flex items-center gap-1">
                            <Eye className="h-3 w-3" />
                            {resource.view_count}
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3" />
                            {resource.average_rating.toFixed(1)}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {new Date(resource.date_published).toLocaleDateString()}
                          </div>
                        </div>
                        
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleBookmark(resource);
                          }}
                          className={`h-6 w-6 p-0 ${bookmarks[resource.id] ? 'text-elec-yellow' : 'text-gray-400'} hover:text-elec-yellow`}
                        >
                          <Bookmark className="h-3 w-3" />
                        </Button>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedResource(resource);
                          }}
                          className="h-8 px-2 text-gray-400 hover:text-white hover:bg-elec-gray-light"
                        >
                          <Eye className="h-3 w-3 mr-1" />
                          View
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={(e) => handleDownload(resource, e)}
                          className="h-8 px-3 border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10"
                        >
                          <Download className="h-3 w-3 mr-1" />
                          Download
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Resource Detail Modal */}
      {selectedResource && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-elec-gray border border-elec-yellow/20 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            <div className="p-6 border-b border-elec-yellow/10">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3 min-w-0 flex-1">
                  <span className="text-2xl flex-shrink-0">
                    {getFileTypeIcon(selectedResource.file_type)}
                  </span>
                  <div className="min-w-0 flex-1">
                    <h2 className="text-xl font-bold text-white mb-2">{selectedResource.title}</h2>
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <Badge className={`${getFileTypeColor(selectedResource.file_type)} text-white`}>
                        {selectedResource.file_type}
                      </Badge>
                      <span className="bg-elec-yellow/20 text-elec-yellow px-2 py-1 rounded text-sm">
                        {selectedResource.category}
                      </span>
                      <span className="text-sm text-gray-400">{selectedResource.file_size}</span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                      <span>{selectedResource.download_count} downloads</span>
                      <span>{selectedResource.view_count} views</span>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {new Date(selectedResource.date_published).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleBookmark(selectedResource)}
                        className={`border-elec-yellow/30 ${bookmarks[selectedResource.id] ? 'text-elec-yellow bg-elec-yellow/10' : 'text-elec-yellow'} hover:bg-elec-yellow/10`}
                      >
                        <Bookmark className="h-4 w-4 mr-2" />
                        {bookmarks[selectedResource.id] ? 'Bookmarked' : 'Bookmark'}
                      </Button>
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((rating) => (
                          <Button
                            key={rating}
                            size="sm"
                            variant="ghost"
                            onClick={() => handleRating(selectedResource, rating)}
                            className={`h-6 w-6 p-0 ${userRatings[selectedResource.id] >= rating ? 'text-elec-yellow' : 'text-gray-400'} hover:text-elec-yellow`}
                          >
                            <Star className="h-3 w-3" />
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={(e) => handleDownload(selectedResource, e)}
                    className="border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedResource(null)}
                    className="hover:bg-elec-gray-light"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6">
              <div className="prose prose-invert max-w-none">
                <p className="text-gray-300 leading-relaxed">
                  {selectedResource.summary}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnhancedSafetyResourcesCard;
