
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BookOpen, FileText, Video, Download, ExternalLink, Search, Filter, Clock, Star, Building2, Shield, Zap } from "lucide-react";
import { useState, useMemo } from "react";
import { portfolioResources, getResourcesByCategory, getFeaturedResources, searchResources } from "@/data/portfolioResources";
import { PortfolioResourceService } from "@/services/portfolioResourceService";
import type { PortfolioResource } from "@/data/portfolioResources";

const PortfolioDocumentationContent = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedProvider, setSelectedProvider] = useState("all");
  const [selectedType, setSelectedType] = useState("all");

  const learningObjectives = [
    "Understand the purpose and structure of an apprenticeship portfolio",
    "Learn how to collect and organise evidence effectively",
    "Discover best practices for documenting your learning journey",
    "Prepare for portfolio-based assessments and reviews"
  ];

  const filteredResources = useMemo(() => {
    let resources = portfolioResources;

    // Apply search filter
    if (searchQuery.trim()) {
      resources = searchResources(searchQuery);
    }

    // Apply category filter
    if (selectedCategory !== "all") {
      resources = resources.filter(resource => resource.category === selectedCategory);
    }

    // Apply provider filter
    if (selectedProvider !== "all") {
      resources = resources.filter(resource => resource.provider === selectedProvider);
    }

    // Apply type filter
    if (selectedType !== "all") {
      resources = resources.filter(resource => resource.type === selectedType);
    }

    return resources;
  }, [searchQuery, selectedCategory, selectedProvider, selectedType]);

  const featuredResources = getFeaturedResources();

  const getResourceIcon = (resource: PortfolioResource) => {
    const iconMap = {
      guide: BookOpen,
      template: FileText,
      checklist: FileText,
      video: Video,
      standard: Building2,
      assessment: Building2
    };
    return iconMap[resource.type] || FileText;
  };

  const getCategoryIcon = (category: string) => {
    const iconMap = {
      building: BookOpen,
      evidence: FileText,
      assessment: Building2,
      standards: Building2,
      safety: Shield,
      electrical: Zap
    };
    return iconMap[category] || FileText;
  };

  const getDifficultyColor = (difficulty: string) => {
    const colors = {
      beginner: "bg-green-500/20 text-green-400 border-green-500/30",
      intermediate: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
      advanced: "bg-red-500/20 text-red-400 border-red-500/30"
    };
    return colors[difficulty] || colors.beginner;
  };

  const handleDownload = async (resource: PortfolioResource) => {
    PortfolioResourceService.trackResourceUsage(resource, 'download');
    await PortfolioResourceService.downloadResource(resource);
  };

  const handleOpen = (resource: PortfolioResource) => {
    PortfolioResourceService.trackResourceUsage(resource, 'open');
    PortfolioResourceService.openResource(resource);
  };

  return (
    <div className="space-y-4">
      {/* Getting Started Section */}
      <Card className="border-blue-500/30 bg-elec-gray">
        <CardHeader className="pb-3">
          <CardTitle className="text-blue-400 flex items-center gap-2 text-base sm:text-lg">
            <BookOpen className="h-4 w-4 sm:h-5 sm:w-5" />
            Portfolio Documentation Resources
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-3">
            <p className="text-muted-foreground text-xs sm:text-sm">
              Access industry-standard portfolio building resources from leading awarding bodies and professional organisations.
            </p>
            
            <div className="bg-black/20 rounded-lg p-3 border border-blue-500/20">
              <h4 className="font-medium text-white mb-2 text-sm">Learning Objectives</h4>
              <ul className="space-y-1">
                {learningObjectives.map((objective, index) => (
                  <li key={index} className="flex items-start gap-2 text-xs text-muted-foreground">
                    <div className="h-1.5 w-1.5 bg-blue-400 rounded-full mt-1.5 flex-shrink-0" />
                    {objective}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Featured Resources */}
      {featuredResources.length > 0 && (
        <Card className="border-elec-yellow/30 bg-elec-gray">
          <CardHeader className="pb-3">
            <CardTitle className="text-elec-yellow flex items-center gap-2 text-base sm:text-lg">
              <Star className="h-4 w-4 sm:h-5 sm:w-5" />
              Featured Resources
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {featuredResources.slice(0, 4).map((resource) => {
                const IconComponent = getResourceIcon(resource);
                return (
                  <div key={resource.id} className="bg-black/20 rounded-lg p-3 border border-elec-yellow/20">
                    <div className="flex items-start gap-2 mb-2">
                      <IconComponent className="h-4 w-4 text-elec-yellow mt-0.5" />
                      <div className="flex-1 min-w-0">
                        <h5 className="font-medium text-white text-sm truncate">{resource.title}</h5>
                        <p className="text-xs text-muted-foreground line-clamp-2">{resource.description}</p>
                      </div>
                      {resource.isNew && (
                        <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">
                          New
                        </Badge>
                      )}
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2 mt-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="border-elec-yellow/30 text-xs"
                        onClick={() => handleOpen(resource)}
                      >
                        <ExternalLink className="h-3 w-3 mr-1" />
                        View
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="border-elec-yellow/30 text-xs"
                        onClick={() => handleDownload(resource)}
                      >
                        <Download className="h-3 w-3 mr-1" />
                        Download
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Search and Filters */}
      <Card className="border-gray-500/30 bg-elec-gray">
        <CardHeader className="pb-3">
          <CardTitle className="text-white flex items-center gap-2 text-base sm:text-lg">
            <Search className="h-4 w-4 sm:h-5 sm:w-5" />
            Browse Resources
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-3">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search resources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-black/20 border-gray-500/30"
              />
            </div>

            {/* Filters */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="bg-black/20 border-gray-500/30">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="building">Portfolio Building</SelectItem>
                  <SelectItem value="evidence">Evidence Collection</SelectItem>
                  <SelectItem value="assessment">Assessment</SelectItem>
                  <SelectItem value="standards">Standards</SelectItem>
                  <SelectItem value="safety">Health & Safety</SelectItem>
                  <SelectItem value="electrical">Electrical</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedProvider} onValueChange={setSelectedProvider}>
                <SelectTrigger className="bg-black/20 border-gray-500/30">
                  <SelectValue placeholder="Provider" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Providers</SelectItem>
                  <SelectItem value="City & Guilds">City & Guilds</SelectItem>
                  <SelectItem value="EAL">EAL</SelectItem>
                  <SelectItem value="JTL">JTL</SelectItem>
                  <SelectItem value="NICEIC">NICEIC</SelectItem>
                  <SelectItem value="IET">IET</SelectItem>
                  <SelectItem value="HSE">HSE</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="bg-black/20 border-gray-500/30">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="guide">Guides</SelectItem>
                  <SelectItem value="template">Templates</SelectItem>
                  <SelectItem value="checklist">Checklists</SelectItem>
                  <SelectItem value="video">Videos</SelectItem>
                  <SelectItem value="standard">Standards</SelectItem>
                  <SelectItem value="assessment">Assessment</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Resource Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredResources.map((resource) => {
          const IconComponent = getResourceIcon(resource);
          return (
            <Card key={resource.id} className="border-gray-500/20 bg-elec-gray hover:border-gray-500/40 transition-colors">
              <CardHeader className="pb-3">
                <div className="flex flex-col gap-3">
                  {/* Header with icon and title */}
                  <div className="flex items-start gap-2">
                    <IconComponent className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-sm font-medium text-white leading-tight">
                        {resource.title}
                      </CardTitle>
                      <p className="text-xs text-muted-foreground mt-1">
                        {resource.provider}
                      </p>
                    </div>
                  </div>
                  
                  {/* Badges */}
                  <div className="flex flex-wrap gap-2">
                    {resource.isNew && (
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">
                        New
                      </Badge>
                    )}
                    <Badge className={`text-xs ${getDifficultyColor(resource.difficulty)}`}>
                      {resource.difficulty}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0 space-y-4">
                {/* Description */}
                <p className="text-muted-foreground text-xs leading-relaxed">
                  {resource.description}
                </p>
                
                {/* Time and size info */}
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3 flex-shrink-0" />
                  <span>{resource.estimatedTime}</span>
                  <span>•</span>
                  <span>{resource.fileSize}</span>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {resource.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs border-gray-500/30 px-2 py-0.5">
                      {tag}
                    </Badge>
                  ))}
                  {resource.tags.length > 3 && (
                    <Badge variant="outline" className="text-xs border-gray-500/30 px-2 py-0.5">
                      +{resource.tags.length - 3} more
                    </Badge>
                  )}
                </div>

                {/* Action buttons */}
                <div className="flex flex-col sm:flex-row gap-2 pt-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="border-elec-yellow/30 text-xs flex-1 h-8"
                    onClick={() => handleOpen(resource)}
                  >
                    <ExternalLink className="h-3 w-3 mr-2" />
                    View
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="border-elec-yellow/30 text-xs flex-1 h-8"
                    onClick={() => handleDownload(resource)}
                  >
                    <Download className="h-3 w-3 mr-2" />
                    Download
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredResources.length === 0 && (
        <Card className="border-gray-500/30 bg-elec-gray">
          <CardContent className="pt-6">
            <div className="text-center py-8">
              <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-white mb-2">No resources found</h3>
              <p className="text-muted-foreground text-sm">
                Try adjusting your search terms or filters to find what you're looking for.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Best Practices Card */}
      <Card className="border-green-500/30 bg-elec-gray">
        <CardHeader className="pb-3">
          <CardTitle className="text-green-400 text-base sm:text-lg">Portfolio Best Practices</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="bg-black/20 rounded-lg p-4 border border-green-500/20 h-full">
              <h4 className="font-medium text-white mb-3 text-sm">Documentation Tips</h4>
              <ul className="text-xs sm:text-sm text-muted-foreground space-y-2">
                <li className="flex items-start gap-2">
                  <div className="h-1.5 w-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0" />
                  Keep evidence current and relevant to BS 7671 18th Edition
                </li>
                <li className="flex items-start gap-2">
                  <div className="h-1.5 w-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0" />
                  Include clear photos and technical diagrams
                </li>
                <li className="flex items-start gap-2">
                  <div className="h-1.5 w-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0" />
                  Write detailed, reflective commentary
                </li>
                <li className="flex items-start gap-2">
                  <div className="h-1.5 w-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0" />
                  Cross-reference with assessment criteria
                </li>
                <li className="flex items-start gap-2">
                  <div className="h-1.5 w-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0" />
                  Document health and safety procedures
                </li>
              </ul>
            </div>
            <div className="bg-black/20 rounded-lg p-4 border border-green-500/20 h-full">
              <h4 className="font-medium text-white mb-3 text-sm">Organisation</h4>
              <ul className="text-xs sm:text-sm text-muted-foreground space-y-2">
                <li className="flex items-start gap-2">
                  <div className="h-1.5 w-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0" />
                  Use consistent file naming conventions
                </li>
                <li className="flex items-start gap-2">
                  <div className="h-1.5 w-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0" />
                  Create logical folder structures by category
                </li>
                <li className="flex items-start gap-2">
                  <div className="h-1.5 w-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0" />
                  Maintain regular backup copies
                </li>
                <li className="flex items-start gap-2">
                  <div className="h-1.5 w-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0" />
                  Keep physical and digital evidence aligned
                </li>
                <li className="flex items-start gap-2">
                  <div className="h-1.5 w-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0" />
                  Version control your portfolio updates
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PortfolioDocumentationContent;
