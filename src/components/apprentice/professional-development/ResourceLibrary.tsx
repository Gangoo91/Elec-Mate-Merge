
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BookOpen, Video, FileText, Link as LinkIcon, Download, Search, Filter, Star } from "lucide-react";
import { useState } from "react";

const ResourceLibrary = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", label: "All Resources", count: 156 },
    { id: "guides", label: "Study Guides", count: 45 },
    { id: "videos", label: "Video Tutorials", count: 38 },
    { id: "templates", label: "Templates", count: 23 },
    { id: "regulations", label: "Regulations", count: 28 },
    { id: "tools", label: "Tools & Apps", count: 22 }
  ];

  const resources = [
    {
      id: 1,
      title: "Complete Guide to BS 7671 18th Edition",
      type: "guide",
      format: "PDF",
      category: "Regulations",
      rating: 4.8,
      downloads: 2340,
      description: "Comprehensive overview of the latest wiring regulations with practical examples and case studies.",
      tags: ["18th Edition", "Wiring Regulations", "Compliance"],
      featured: true
    },
    {
      id: 2,
      title: "Cable Sizing Calculator Pro",
      type: "tool",
      format: "Web App",
      category: "Tools & Apps",
      rating: 4.9,
      downloads: 1856,
      description: "Advanced cable sizing calculator with voltage drop, current capacity, and protection calculations.",
      tags: ["Calculations", "Cable Sizing", "Design"],
      featured: true
    },
    {
      id: 3,
      title: "Electrical Testing Procedures Video Series",
      type: "video",
      format: "MP4",
      category: "Video Tutorials",
      rating: 4.7,
      downloads: 3102,
      description: "Step-by-step video guides for all electrical testing procedures including PAT testing.",
      tags: ["Testing", "Inspection", "Practical Skills"],
      featured: false
    },
    {
      id: 4,
      title: "Risk Assessment Template Pack",
      type: "template",
      format: "DOC/PDF",
      category: "Templates",
      rating: 4.6,
      downloads: 1423,
      description: "Ready-to-use risk assessment templates for electrical work environments.",
      tags: ["Health & Safety", "Risk Assessment", "Documentation"],
      featured: false
    },
    {
      id: 5,
      title: "Renewable Energy Systems Guide",
      type: "guide",
      format: "PDF",
      category: "Study Guides",
      rating: 4.8,
      downloads: 987,
      description: "Complete guide to solar PV, wind, and battery storage systems installation.",
      tags: ["Solar PV", "Renewable Energy", "Installation"],
      featured: true
    },
    {
      id: 6,
      title: "Electrical Symbols Reference Chart",
      type: "reference",
      format: "PDF",
      category: "Study Guides",
      rating: 4.5,
      downloads: 2156,
      description: "Comprehensive reference chart of electrical symbols used in UK installations.",
      tags: ["Symbols", "Reference", "Standards"],
      featured: false
    }
  ];

  const getResourceIcon = (type: string) => {
    switch (type) {
      case "video": return Video;
      case "guide": return BookOpen;
      case "template": return FileText;
      case "tool": return LinkIcon;
      default: return FileText;
    }
  };

  const filteredResources = resources.filter(resource => {
    const matchesSearch = searchQuery === "" || 
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === "all" || 
      resource.category.toLowerCase().replace(" & ", "").replace(" ", "") === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const featuredResources = resources.filter(resource => resource.featured);

  return (
    <div className="space-y-6">
      {/* Header with Search */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-elec-yellow" />
            Professional Development Resource Library
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search resources, guides, videos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-elec-dark border-elec-yellow/30"
              />
            </div>
            <Button variant="outline" className="border-elec-yellow/30">
              <Filter className="mr-2 h-4 w-4" />
              Advanced Filter
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Categories */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(category.id)}
            className={selectedCategory === category.id 
              ? "bg-elec-yellow text-black" 
              : "border-elec-yellow/30 hover:bg-elec-yellow/10"
            }
          >
            {category.label} ({category.count})
          </Button>
        ))}
      </div>

      {/* Featured Resources */}
      {selectedCategory === "all" && (
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5 text-elec-yellow" />
              Featured Resources
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {featuredResources.map((resource) => {
                const IconComponent = getResourceIcon(resource.type);
                return (
                  <Card key={resource.id} className="border-elec-yellow/10 bg-elec-dark/50">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="p-2 rounded bg-elec-yellow/10">
                          <IconComponent className="h-4 w-4 text-elec-yellow" />
                        </div>
                        <Badge className="bg-elec-yellow/20 text-elec-yellow border-elec-yellow/30 text-xs">
                          Featured
                        </Badge>
                      </div>
                      <h3 className="font-semibold text-white mb-2 line-clamp-2">{resource.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                        {resource.description}
                      </p>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 text-yellow-400 fill-current" />
                          <span className="text-xs text-muted-foreground">{resource.rating}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Download className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">{resource.downloads}</span>
                        </div>
                      </div>
                      <Button size="sm" className="w-full bg-elec-yellow/10 hover:bg-elec-yellow hover:text-black">
                        Access Resource
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* All Resources */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle>All Resources ({filteredResources.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filteredResources.map((resource) => {
              const IconComponent = getResourceIcon(resource.type);
              return (
                <div key={resource.id} className="flex items-center justify-between p-4 bg-elec-dark/50 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="p-2 rounded bg-elec-yellow/10">
                      <IconComponent className="h-5 w-5 text-elec-yellow" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium text-white">{resource.title}</h3>
                        {resource.featured && (
                          <Badge className="bg-elec-yellow/20 text-elec-yellow border-elec-yellow/30 text-xs">
                            Featured
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{resource.description}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>{resource.format}</span>
                        <span>★ {resource.rating}</span>
                        <span>{resource.downloads} downloads</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex flex-wrap gap-1">
                      {resource.tags.slice(0, 2).map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <Button size="sm" variant="outline" className="border-elec-yellow/30">
                      Access
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResourceLibrary;
