
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Download, Clock, Filter, Search, X, Eye } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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
}

const SafetyResourcesCard = () => {
  const [resources, setResources] = useState<SafetyResource[]>([]);
  const [filteredResources, setFilteredResources] = useState<SafetyResource[]>([]);
  const [selectedResource, setSelectedResource] = useState<SafetyResource | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [fileTypeFilter, setFileTypeFilter] = useState("all");

  useEffect(() => {
    fetchResources();
  }, []);

  useEffect(() => {
    filterResources();
  }, [resources, searchTerm, categoryFilter, fileTypeFilter]);

  const fetchResources = async () => {
    try {
      const { data, error } = await supabase
        .from('safety_resources')
        .select('*')
        .eq('is_active', true)
        .order('date_published', { ascending: false });

      if (error) throw error;
      setResources(data || []);
    } catch (error) {
      console.error('Error fetching safety resources:', error);
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

      // For demo purposes, show alert since we don't have actual files
      alert(`Downloading ${resource.title} (${resource.file_size})`);
      
      // Refresh the data to show updated download count
      fetchResources();
    } catch (error) {
      console.error('Error updating download count:', error);
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
        {/* Filters Skeleton */}
        <div className="bg-elec-gray/50 rounded-lg p-4 space-y-4">
          <div className="h-4 bg-elec-gray-light/20 rounded animate-pulse w-24" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-10 bg-elec-gray-light/20 rounded animate-pulse" />
            ))}
          </div>
        </div>
        
        {/* Resources Skeleton */}
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader>
            <div className="h-6 bg-elec-gray-light/20 rounded animate-pulse w-32" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-20 bg-elec-gray-light/20 rounded animate-pulse" />
              ))}
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
            Safety Resources
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
                  onClick={() => setSelectedResource(resource)}
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
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-xs text-gray-400">
                          <span>{resource.download_count} downloads</span>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {new Date(resource.date_published).toLocaleDateString()}
                          </div>
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
                            <Eye className="h-3 w-3" />
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
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <span>{selectedResource.download_count} downloads</span>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {new Date(selectedResource.date_published).toLocaleDateString()}
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

export default SafetyResourcesCard;
