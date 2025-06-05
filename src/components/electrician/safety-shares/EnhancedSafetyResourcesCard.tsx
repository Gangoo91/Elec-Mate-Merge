
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Shield, Download, Star, Bookmark, Eye, FileText, File } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface SafetyResource {
  id: string;
  title: string;
  summary: string;
  category: string;
  file_type: string;
  file_url?: string;
  file_path?: string;
  file_size?: string;
  date_published: string;
  download_count: number;
  view_count: number;
  average_rating: number;
  is_bookmarked?: boolean;
  user_rating?: number;
}

const EnhancedSafetyResourcesCard = () => {
  const [resources, setResources] = useState<SafetyResource[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    fetchSafetyResources();
  }, []);

  const fetchSafetyResources = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      let query = supabase
        .from('safety_resources')
        .select('*')
        .eq('is_active', true)
        .order('date_published', { ascending: false })
        .limit(20);

      const { data: resourcesData, error } = await query;

      if (error) throw error;

      if (user) {
        // Fetch user bookmarks and ratings
        const resourceIds = resourcesData?.map(resource => resource.id) || [];
        
        const [bookmarksRes, ratingsRes] = await Promise.all([
          supabase
            .from('safety_bookmarks')
            .select('content_id')
            .eq('user_id', user.id)
            .eq('content_type', 'safety_resources')
            .in('content_id', resourceIds),
          supabase
            .from('safety_content_ratings')
            .select('content_id, rating')
            .eq('user_id', user.id)
            .eq('content_type', 'safety_resources')
            .in('content_id', resourceIds)
        ]);

        const bookmarks = new Set(bookmarksRes.data?.map(b => b.content_id) || []);
        const ratingsMap = new Map(ratingsRes.data?.map(r => [r.content_id, r.rating]) || []);

        const enrichedResources = resourcesData?.map(resource => ({
          ...resource,
          is_bookmarked: bookmarks.has(resource.id),
          user_rating: ratingsMap.get(resource.id)
        })) || [];

        setResources(enrichedResources);
      } else {
        setResources(resourcesData || []);
      }
    } catch (error) {
      console.error('Error fetching safety resources:', error);
      toast.error('Failed to load safety resources');
    } finally {
      setLoading(false);
    }
  };

  const trackView = async (resourceId: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      await supabase
        .from('safety_content_views')
        .insert({
          user_id: user?.id || null,
          content_type: 'safety_resources',
          content_id: resourceId,
          session_id: Math.random().toString(36),
        });
    } catch (error) {
      console.error('Error tracking view:', error);
    }
  };

  const handleDownload = async (resource: SafetyResource) => {
    try {
      trackView(resource.id);
      
      // Update download count
      await supabase
        .from('safety_resources')
        .update({ download_count: resource.download_count + 1 })
        .eq('id', resource.id);

      setResources(prev => prev.map(r => 
        r.id === resource.id ? { ...r, download_count: r.download_count + 1 } : r
      ));

      if (resource.file_path) {
        const { data } = await supabase.storage
          .from('safety-resources')
          .createSignedUrl(resource.file_path, 60);
        
        if (data) {
          window.open(data.signedUrl, '_blank');
        }
      } else if (resource.file_url) {
        window.open(resource.file_url, '_blank');
      }
      
      toast.success('Download started');
    } catch (error) {
      console.error('Error downloading resource:', error);
      toast.error('Failed to download resource');
    }
  };

  const toggleBookmark = async (resourceId: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error('Please sign in to bookmark content');
        return;
      }

      const resource = resources.find(r => r.id === resourceId);
      if (!resource) return;

      if (resource.is_bookmarked) {
        await supabase
          .from('safety_bookmarks')
          .delete()
          .eq('user_id', user.id)
          .eq('content_type', 'safety_resources')
          .eq('content_id', resourceId);
        
        toast.success('Bookmark removed');
      } else {
        await supabase
          .from('safety_bookmarks')
          .insert({
            user_id: user.id,
            content_type: 'safety_resources',
            content_id: resourceId
          });
        
        toast.success('Bookmarked successfully');
      }

      setResources(prev => prev.map(r => 
        r.id === resourceId ? { ...r, is_bookmarked: !r.is_bookmarked } : r
      ));
    } catch (error) {
      console.error('Error toggling bookmark:', error);
      toast.error('Failed to update bookmark');
    }
  };

  const rateContent = async (resourceId: string, rating: number) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error('Please sign in to rate content');
        return;
      }

      await supabase
        .from('safety_content_ratings')
        .upsert({
          user_id: user.id,
          content_type: 'safety_resources',
          content_id: resourceId,
          rating
        });

      setResources(prev => prev.map(r => 
        r.id === resourceId ? { ...r, user_rating: rating } : r
      ));
      
      toast.success('Rating saved');
    } catch (error) {
      console.error('Error rating content:', error);
      toast.error('Failed to save rating');
    }
  };

  const getFileIcon = (fileType: string) => {
    if (fileType.toLowerCase().includes('pdf')) return FileText;
    if (fileType.toLowerCase().includes('doc')) return FileText;
    return File;
  };

  const categories = [...new Set(resources.map(r => r.category))];
  const filteredResources = filter === 'all' ? resources : resources.filter(r => r.category === filter);

  if (loading) {
    return (
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-20 bg-elec-yellow/10 rounded"></div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-elec-yellow flex items-center justify-center">
            <Shield className="h-6 w-6 text-elec-dark" />
          </div>
          <div>
            <CardTitle className="text-xl text-white">Safety Resources</CardTitle>
            <CardDescription className="text-gray-300">
              Essential safety guides, toolbox talks, and training materials
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            <Button
              variant={filter === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('all')}
              className="text-xs"
            >
              All Categories
            </Button>
            {categories.map((category) => (
              <Button
                key={category}
                variant={filter === category ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter(category)}
                className="text-xs"
              >
                {category}
              </Button>
            ))}
          </div>
        )}

        {filteredResources.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            <Shield className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No safety resources available at the moment.</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {filteredResources.map((resource) => {
              const FileIcon = getFileIcon(resource.file_type);
              return (
                <div
                  key={resource.id}
                  className="p-4 rounded-lg border border-elec-yellow/20 bg-elec-dark/50 hover:bg-elec-dark/70 transition-all"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-elec-yellow/20 flex items-center justify-center">
                        <FileIcon className="h-5 w-5 text-elec-yellow" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">{resource.title}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="border-elec-yellow/40 text-elec-yellow text-xs">
                            {resource.category}
                          </Badge>
                          <Badge variant="outline" className="border-blue-400/40 text-blue-400 text-xs">
                            {resource.file_type}
                          </Badge>
                          {resource.file_size && (
                            <span className="text-xs text-gray-500">{resource.file_size}</span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {resource.is_bookmarked && (
                        <Bookmark className="h-4 w-4 text-elec-yellow fill-current" />
                      )}
                      <div className="flex items-center gap-1 text-xs text-gray-400">
                        <Download className="h-3 w-3" />
                        {resource.download_count}
                      </div>
                      <div className="flex items-center gap-1 text-xs text-gray-400">
                        <Eye className="h-3 w-3" />
                        {resource.view_count}
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-gray-400 mb-3 line-clamp-2">{resource.summary}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <span>{new Date(resource.date_published).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 text-gray-500" />
                        <span className="text-xs text-gray-500">{resource.average_rating.toFixed(1)}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            onClick={() => rateContent(resource.id, star)}
                            className={`p-0.5 rounded ${
                              (resource.user_rating || 0) >= star
                                ? 'text-yellow-400'
                                : 'text-gray-600 hover:text-yellow-300'
                            }`}
                          >
                            <Star className="h-3 w-3 fill-current" />
                          </button>
                        ))}
                      </div>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => toggleBookmark(resource.id)}
                        className={`border-elec-yellow/20 p-2 ${
                          resource.is_bookmarked
                            ? 'bg-elec-yellow/20 text-elec-yellow'
                            : 'text-elec-yellow hover:bg-elec-yellow/10'
                        }`}
                      >
                        <Bookmark className={`h-3 w-3 ${resource.is_bookmarked ? 'fill-current' : ''}`} />
                      </Button>

                      <Button
                        variant="default"
                        size="sm"
                        onClick={() => handleDownload(resource)}
                        className="bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90"
                      >
                        <Download className="h-3 w-3 mr-1" />
                        Download
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EnhancedSafetyResourcesCard;
