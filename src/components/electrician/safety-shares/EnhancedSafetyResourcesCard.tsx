
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Shield, Download, FileText, Video, BookOpen, Users, Calendar, Star, Search, Filter, Eye, ThumbsUp } from "lucide-react";

interface SafetyResource {
  id: string;
  title: string;
  description: string;
  type: "guide" | "video" | "template" | "checklist" | "training" | "toolbox-talk";
  category: string;
  downloadCount: number;
  rating: number;
  lastUpdated: string;
  duration?: string;
  fileSize?: string;
  views: number;
  likes: number;
  bookmarked: boolean;
}

const EnhancedSafetyResourcesCard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [resources, setResources] = useState<SafetyResource[]>([
    {
      id: "1",
      title: "Safe Isolation Procedures Guide",
      description: "Comprehensive guide to safe isolation procedures for electrical work, including step-by-step instructions and safety checks.",
      type: "guide",
      category: "Safe Working",
      downloadCount: 2341,
      rating: 4.8,
      lastUpdated: "2024-06-10",
      fileSize: "2.4 MB",
      views: 3456,
      likes: 89,
      bookmarked: true
    },
    {
      id: "2",
      title: "Arc Flash Risk Assessment Training",
      description: "Interactive video training module covering arc flash hazards, risk assessment, and protection measures.",
      type: "video",
      category: "Training",
      downloadCount: 1567,
      rating: 4.9,
      lastUpdated: "2024-06-08",
      duration: "45 min",
      views: 2134,
      likes: 67,
      bookmarked: false
    },
    {
      id: "3",
      title: "Daily Safety Checklist Template",
      description: "Customisable daily safety checklist for electrical contractors and site supervisors.",
      type: "template",
      category: "Documentation",
      downloadCount: 3422,
      rating: 4.7,
      lastUpdated: "2024-06-05",
      fileSize: "156 KB",
      views: 4789,
      likes: 123,
      bookmarked: false
    }
  ]);

  const getResourceIcon = (type: string) => {
    switch (type) {
      case "guide": return <BookOpen className="h-5 w-5" />;
      case "video": return <Video className="h-5 w-5" />;
      case "template": return <FileText className="h-5 w-5" />;
      case "checklist": return <FileText className="h-5 w-5" />;
      case "training": return <Users className="h-5 w-5" />;
      case "toolbox-talk": return <Users className="h-5 w-5" />;
      default: return <FileText className="h-5 w-5" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "guide": return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "video": return "bg-red-500/20 text-red-400 border-red-500/30";
      case "template": return "bg-green-500/20 text-green-400 border-green-500/30";
      case "checklist": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "training": return "bg-purple-500/20 text-purple-400 border-purple-500/30";
      case "toolbox-talk": return "bg-orange-500/20 text-orange-400 border-orange-500/30";
      default: return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  const handleDownload = (resourceId: string) => {
    setResources(prev => prev.map(resource => 
      resource.id === resourceId 
        ? { ...resource, downloadCount: resource.downloadCount + 1 }
        : resource
    ));
  };

  const handleLike = (resourceId: string) => {
    setResources(prev => prev.map(resource => 
      resource.id === resourceId 
        ? { ...resource, likes: resource.likes + 1 }
        : resource
    ));
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-3 w-3 ${
          i < Math.floor(rating)
            ? "text-yellow-400 fill-current"
            : "text-gray-600"
        }`}
      />
    ));
  };

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === "all" || resource.type === selectedType;
    const matchesCategory = selectedCategory === "all" || resource.category === selectedCategory;
    
    return matchesSearch && matchesType && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Enhanced Safety Resources</h2>
          <p className="text-muted-foreground">Interactive safety resources with ratings, bookmarks, and download tracking</p>
        </div>
        <Button className="bg-elec-yellow text-black hover:bg-elec-yellow/90">
          <Shield className="h-4 w-4 mr-2" />
          Request Resource
        </Button>
      </div>

      {/* Enhanced Filters */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search resources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-elec-dark/50 border-elec-yellow/30"
              />
            </div>
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="bg-elec-dark/50 border-elec-yellow/30">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="guide">Guides</SelectItem>
                <SelectItem value="video">Videos</SelectItem>
                <SelectItem value="template">Templates</SelectItem>
                <SelectItem value="checklist">Checklists</SelectItem>
                <SelectItem value="training">Training</SelectItem>
                <SelectItem value="toolbox-talk">Toolbox Talks</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="bg-elec-dark/50 border-elec-yellow/30">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Safe Working">Safe Working</SelectItem>
                <SelectItem value="Training">Training</SelectItem>
                <SelectItem value="Documentation">Documentation</SelectItem>
                <SelectItem value="PPE">PPE</SelectItem>
                <SelectItem value="Emergency">Emergency</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4">
        {filteredResources.map((resource) => (
          <Card key={resource.id} className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3 flex-1">
                  <div className="p-2 bg-elec-yellow/20 rounded-lg text-elec-yellow">
                    {getResourceIcon(resource.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className={getTypeColor(resource.type)}>
                        {resource.type.replace("-", " ").toUpperCase()}
                      </Badge>
                      <Badge variant="outline" className="border-elec-yellow/30 text-white">
                        {resource.category}
                      </Badge>
                      <div className="flex items-center gap-1">
                        {renderStars(resource.rating)}
                        <span className="text-xs text-muted-foreground ml-1">({resource.rating})</span>
                      </div>
                    </div>
                    <CardTitle className="text-white text-lg mb-2">
                      {resource.title}
                    </CardTitle>
                    <p className="text-gray-300 text-sm">
                      {resource.description}
                    </p>
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardContent className="pt-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Download className="h-4 w-4" />
                    <span>{resource.downloadCount.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye className="h-4 w-4" />
                    <span>{resource.views.toLocaleString()}</span>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleLike(resource.id)}
                    className="flex items-center gap-1 text-muted-foreground hover:text-elec-yellow p-0 h-auto"
                  >
                    <ThumbsUp className="h-4 w-4" />
                    <span>{resource.likes}</span>
                  </Button>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(resource.lastUpdated).toLocaleDateString()}</span>
                  </div>
                  {resource.duration && (
                    <span>{resource.duration}</span>
                  )}
                  {resource.fileSize && (
                    <span>{resource.fileSize}</span>
                  )}
                </div>
                <Button 
                  size="sm" 
                  className="bg-elec-yellow text-black hover:bg-elec-yellow/90"
                  onClick={() => handleDownload(resource.id)}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredResources.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          No resources found matching your search criteria.
        </div>
      )}

      <div className="text-center pt-4">
        <Button variant="outline" className="border-elec-yellow/30 text-white hover:bg-elec-yellow/10">
          Browse All Resources
        </Button>
      </div>
    </div>
  );
};

export default EnhancedSafetyResourcesCard;
