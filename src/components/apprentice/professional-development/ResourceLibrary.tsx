
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  BookOpen, 
  FileText, 
  Video, 
  Download, 
  ExternalLink, 
  Search,
  Filter,
  Star,
  Clock
} from "lucide-react";
import { useState } from "react";

const ResourceLibrary = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const resourceCategories = [
    { id: "all", label: "All Resources", count: 24 },
    { id: "guides", label: "Guides", count: 8 },
    { id: "templates", label: "Templates", count: 6 },
    { id: "videos", label: "Videos", count: 5 },
    { id: "tools", label: "Tools", count: 5 }
  ];

  const resources = [
    {
      id: 1,
      title: "Apprentice Portfolio Building Guide",
      description: "Comprehensive guide to creating a professional electrical apprentice portfolio",
      category: "guides",
      type: "PDF",
      downloadCount: 1250,
      rating: 4.8,
      size: "2.4 MB",
      lastUpdated: "2 weeks ago",
      featured: true,
      icon: FileText
    },
    {
      id: 2,
      title: "CV Template for Electrical Apprentices",
      description: "Professional CV template specifically designed for electrical apprentices",
      category: "templates",
      type: "DOCX",
      downloadCount: 980,
      rating: 4.6,
      size: "156 KB",
      lastUpdated: "1 month ago",
      featured: false,
      icon: FileText
    },
    {
      id: 3,
      title: "Industry Interview Preparation",
      description: "Video series covering common electrical industry interview questions",
      category: "videos",
      type: "Video",
      downloadCount: 750,
      rating: 4.9,
      size: "45 mins",
      lastUpdated: "3 weeks ago",
      featured: true,
      icon: Video
    },
    {
      id: 4,
      title: "Professional Development Plan Template",
      description: "Structured template for planning your electrical career progression",
      category: "templates",
      type: "PDF",
      downloadCount: 650,
      rating: 4.5,
      size: "1.2 MB",
      lastUpdated: "1 week ago",
      featured: false,
      icon: FileText
    },
    {
      id: 5,
      title: "Networking Event Preparation Guide",
      description: "Tips and strategies for making the most of industry networking events",
      category: "guides",
      type: "PDF",
      downloadCount: 420,
      rating: 4.7,
      size: "800 KB",
      lastUpdated: "2 weeks ago",
      featured: false,
      icon: BookOpen
    },
    {
      id: 6,
      title: "Salary Negotiation Toolkit",
      description: "Resources and scripts for negotiating your electrical apprentice wages",
      category: "tools",
      type: "PDF",
      downloadCount: 890,
      rating: 4.4,
      size: "1.8 MB",
      lastUpdated: "1 month ago",
      featured: false,
      icon: FileText
    }
  ];

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || resource.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredResources = resources.filter(resource => resource.featured);

  return (
    <div className="space-y-6">
      {/* Featured Resources */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5 text-elec-yellow" />
            Featured Resources
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {featuredResources.map((resource) => (
              <Card key={resource.id} className="border-elec-yellow/10 bg-elec-dark/50">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded bg-elec-yellow/10">
                      <resource.icon className="h-5 w-5 text-elec-yellow" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-white mb-1">{resource.title}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{resource.description}</p>
                      <div className="flex items-center gap-2 mb-3">
                        <Badge variant="outline" className="text-xs">
                          {resource.type}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {resource.downloadCount} downloads
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 text-yellow-400 fill-current" />
                          <span className="text-xs text-muted-foreground">{resource.rating}</span>
                        </div>
                        <Button size="sm" className="h-7">
                          <Download className="h-3 w-3 mr-1" />
                          Download
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Search and Filter */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle>Resource Library</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search resources..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto">
              {resourceCategories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                  className="whitespace-nowrap"
                >
                  {category.label} ({category.count})
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {filteredResources.map((resource) => (
              <Card key={resource.id} className="border-elec-yellow/10 bg-elec-dark/30">
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded bg-elec-yellow/10">
                      <resource.icon className="h-6 w-6 text-elec-yellow" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-white">{resource.title}</h3>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 text-yellow-400 fill-current" />
                            <span className="text-sm text-muted-foreground">{resource.rating}</span>
                          </div>
                          <Button size="sm" variant="outline">
                            <Download className="h-4 w-4 mr-1" />
                            Download
                          </Button>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{resource.description}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <FileText className="h-3 w-3" />
                          {resource.type} • {resource.size}
                        </div>
                        <div className="flex items-center gap-1">
                          <Download className="h-3 w-3" />
                          {resource.downloadCount} downloads
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          Updated {resource.lastUpdated}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredResources.length === 0 && (
            <div className="text-center py-8">
              <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No resources found matching your search.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ResourceLibrary;
