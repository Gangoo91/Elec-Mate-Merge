
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { BookOpen, FileText, Video, Download, Search, ExternalLink, Heart, Star } from "lucide-react";
import { useState } from "react";
import { useMentalHealth } from "@/contexts/MentalHealthContext";

const ResourcesLibraryTab = () => {
  const { favoriteResources, toggleFavoriteResource } = useMentalHealth();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const resourceCategories = [
    { id: "all", label: "All Resources", count: 24 },
    { id: "stress", label: "Stress Management", count: 8 },
    { id: "anxiety", label: "Anxiety Support", count: 6 },
    { id: "workplace", label: "Workplace Wellbeing", count: 5 },
    { id: "self-care", label: "Self-Care", count: 5 }
  ];

  const resources = [
    {
      id: "stress-guide",
      title: "Complete Guide to Stress Management for Electricians",
      description: "Comprehensive guide covering stress triggers in electrical work and proven management techniques",
      type: "document",
      category: "stress",
      url: "https://www.hse.gov.uk/stress/",
      downloadable: true,
      tags: ["stress", "workplace", "practical"]
    },
    {
      id: "anxiety-toolkit",
      title: "Anxiety Toolkit: Quick Techniques for On-Site Relief",
      description: "Practical anxiety management techniques that can be used during work breaks",
      type: "document",
      category: "anxiety",
      url: "https://www.mind.org.uk/information-support/types-of-mental-health-problems/anxiety-and-panic-attacks/",
      downloadable: true,
      tags: ["anxiety", "techniques", "quick-relief"]
    },
    {
      id: "mindfulness-video",
      title: "5-Minute Mindfulness for Construction Workers",
      description: "Short guided mindfulness exercises designed for busy tradespeople",
      type: "video",
      category: "self-care",
      url: "https://www.headspace.com/work",
      downloadable: false,
      tags: ["mindfulness", "video", "break-time"]
    },
    {
      id: "sleep-hygiene",
      title: "Sleep Better: A Guide for Shift Workers",
      description: "Strategies for maintaining healthy sleep patterns with irregular work schedules",
      type: "document",
      category: "self-care",
      url: "https://www.nhs.uk/mental-health/self-help/guides-tools-and-activities/tips-to-improve-your-mental-wellbeing/",
      downloadable: true,
      tags: ["sleep", "shift-work", "health"]
    },
    {
      id: "workplace-communication",
      title: "Communicating About Mental Health at Work",
      description: "How to discuss mental health with supervisors, colleagues, and HR departments",
      type: "document",
      category: "workplace",
      url: "https://www.mentalhealthatwork.org.uk/",
      downloadable: true,
      tags: ["communication", "workplace", "disclosure"]
    },
    {
      id: "breathing-exercises",
      title: "Quick Breathing Exercises for Stress Relief",
      description: "Simple breathing techniques that can be done anywhere, anytime",
      type: "video",
      category: "stress",
      url: "https://www.nhs.uk/mental-health/self-help/guides-tools-and-activities/breathing-exercises-for-stress/",
      downloadable: false,
      tags: ["breathing", "stress-relief", "quick"]
    }
  ];

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === "all" || resource.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return <Video className="h-4 w-4" />;
      case 'document': return <FileText className="h-4 w-4" />;
      default: return <BookOpen className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'video': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'document': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      default: return 'bg-green-500/20 text-green-400 border-green-500/30';
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-blue-500/20 bg-gradient-to-r from-blue-500/5 to-blue-500/10">
        <CardHeader>
          <div className="flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-blue-400" />
            <CardTitle className="text-blue-300">Mental Health Resources Library</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            Access a curated collection of mental health resources specifically chosen for electrical 
            industry professionals. All resources are evidence-based and practical for your needs.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <FileText className="h-6 w-6 text-blue-400 mx-auto mb-2" />
              <div className="text-sm font-medium text-white mb-1">Guides & Articles</div>
              <div className="text-xs text-muted-foreground">Evidence-based content</div>
            </div>
            <div className="text-center">
              <Video className="h-6 w-6 text-red-400 mx-auto mb-2" />
              <div className="text-sm font-medium text-white mb-1">Video Content</div>
              <div className="text-xs text-muted-foreground">Visual learning tools</div>
            </div>
            <div className="text-center">
              <Download className="h-6 w-6 text-green-400 mx-auto mb-2" />
              <div className="text-sm font-medium text-white mb-1">Downloadable</div>
              <div className="text-xs text-muted-foreground">Take them offline</div>
            </div>
            <div className="text-center">
              <Heart className="h-6 w-6 text-purple-400 mx-auto mb-2" />
              <div className="text-sm font-medium text-white mb-1">Favourites</div>
              <div className="text-xs text-muted-foreground">Save for later</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search resources..."
            className="pl-10"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {resourceCategories.map(category => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category.id)}
              className="text-xs"
            >
              {category.label} ({category.count})
            </Button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredResources.map((resource) => (
          <Card key={resource.id} className="border-gray-600/30 bg-gray-800/30 hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2 mb-2">
                  {getTypeIcon(resource.type)}
                  <Badge className={getTypeColor(resource.type)}>
                    {resource.type}
                  </Badge>
                  {resource.downloadable && (
                    <Badge variant="outline" className="text-xs">
                      <Download className="h-3 w-3 mr-1" />
                      PDF
                    </Badge>
                  )}
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => toggleFavoriteResource(resource.id)}
                  className="p-1 h-auto"
                >
                  <Star
                    className={`h-4 w-4 ${
                      favoriteResources.includes(resource.id)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-muted-foreground'
                    }`}
                  />
                </Button>
              </div>
              <CardTitle className="text-white text-base">{resource.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3">{resource.description}</p>
              
              <div className="flex flex-wrap gap-1 mb-3">
                {resource.tags.map(tag => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
              
              <div className="flex gap-2">
                <Button
                  size="sm"
                  className="flex-1"
                  asChild
                >
                  <a href={resource.url} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-3 w-3 mr-1" />
                    View Resource
                  </a>
                </Button>
                {resource.downloadable && (
                  <Button size="sm" variant="outline">
                    <Download className="h-3 w-3" />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredResources.length === 0 && (
        <Card className="border-gray-600/30 bg-gray-800/30">
          <CardContent className="text-center py-12">
            <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-semibold text-white mb-2">No resources found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search terms or category filters
            </p>
            <Button onClick={() => { setSearchTerm(""); setSelectedCategory("all"); }}>
              Clear Filters
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ResourcesLibraryTab;
