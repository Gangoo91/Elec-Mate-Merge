
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, FileText, Video, Headphones, Download, ExternalLink, Search, Heart, Star } from "lucide-react";
import { useState } from "react";
import { useMentalHealth } from "@/contexts/MentalHealthContext";
import { toast } from "sonner";

const ResourcesLibraryTab = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const { favoriteResources, toggleFavoriteResource } = useMentalHealth();

  const categories = [
    { id: "all", name: "All Resources", count: 55 },
    { id: "guides", name: "Guides & Articles", count: 20 },
    { id: "videos", name: "Videos", count: 12 },
    { id: "audio", name: "Audio Content", count: 8 },
    { id: "tools", name: "Interactive Tools", count: 10 },
    { id: "downloads", name: "Downloads", count: 5 }
  ];

  const featuredResources = [
    {
      id: "mental-health-first-aid",
      title: "Mental Health First Aid for Electricians",
      category: "guides",
      type: "Guide",
      description: "Comprehensive guide on recognising and responding to mental health issues in the workplace",
      duration: "20 min read",
      difficulty: "Beginner",
      rating: 4.8,
      downloads: 1250,
      url: "https://www.mind.org.uk/information-support/types-of-mental-health-problems/mental-health-first-aid/"
    },
    {
      id: "stress-management-techniques",
      title: "Stress Management Techniques",
      category: "videos",
      type: "Video Series",
      description: "5-part video series covering practical stress management techniques for trade workers",
      duration: "45 mins total",
      difficulty: "All Levels",
      rating: 4.9,
      downloads: 890,
      url: "https://www.nhs.uk/mental-health/self-help/guides-tools-and-activities/tips-to-reduce-stress/"
    },
    {
      id: "mindfulness-professionals",
      title: "Mindfulness for Busy Professionals",
      category: "audio",
      type: "Podcast",
      description: "Weekly podcast featuring mindfulness practices designed for busy electrical professionals",
      duration: "30 mins per episode",
      difficulty: "Beginner",
      rating: 4.7,
      downloads: 2100,
      url: "https://www.headspace.com/work-life-balance"
    },
    {
      id: "mental-health-assessment",
      title: "Mental Health Self-Assessment Tool",
      category: "tools",
      type: "Interactive Tool",
      description: "Evidence-based self-assessment to help you understand your current mental health status",
      duration: "10 mins",
      difficulty: "All Levels",
      rating: 4.6,
      downloads: 1800,
      url: "#mental-health-mates"
    },
    {
      id: "workplace-wellbeing-guide",
      title: "Workplace Wellbeing Guide",
      category: "downloads",
      type: "PDF Guide",
      description: "Complete guide to maintaining mental health in electrical work environments",
      duration: "30 min read",
      difficulty: "Intermediate",
      rating: 4.5,
      downloads: 950,
      url: "https://www.hse.gov.uk/stress/standards/"
    },
    {
      id: "crisis-support-handbook",
      title: "Crisis Support Handbook",
      category: "guides",
      type: "Emergency Guide",
      description: "Essential information for crisis situations and immediate support resources",
      duration: "15 min read",
      difficulty: "All Levels",
      rating: 4.9,
      downloads: 1500,
      url: "https://www.samaritans.org/how-we-can-help/contact-samaritan/"
    }
  ];

  const filteredResources = featuredResources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || resource.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleResourceAccess = (resource: typeof featuredResources[0]) => {
    if (resource.url.startsWith('#')) {
      // Internal link - scroll to element
      const element = document.querySelector(resource.url);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        toast.success("Navigated to " + resource.title);
      }
    } else {
      // External link
      window.open(resource.url, '_blank');
      toast.success("Opened " + resource.title);
    }
  };

  const handleFavoriteToggle = (resourceId: string) => {
    toggleFavoriteResource(resourceId);
    const isFavorite = favoriteResources.includes(resourceId);
    toast.success(isFavorite ? "Removed from favorites" : "Added to favorites");
  };

  return (
    <div className="space-y-6">
      {/* Search and Filter Section */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-elec-yellow flex items-center gap-2">
            <Search className="h-5 w-5" />
            Search Resources
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search for resources..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-elec-yellow/20 bg-elec-dark text-white placeholder-gray-400 focus:outline-none focus:border-elec-yellow"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                  className={selectedCategory === category.id ? "bg-elec-yellow text-elec-dark" : ""}
                >
                  {category.name} ({category.count})
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Favorites Section */}
      {favoriteResources.length > 0 && (
        <Card className="border-pink-500/20 bg-pink-500/5">
          <CardHeader>
            <CardTitle className="text-pink-400 flex items-center gap-2">
              <Heart className="h-5 w-5" />
              Your Favorites ({favoriteResources.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {featuredResources
                .filter(resource => favoriteResources.includes(resource.id))
                .slice(0, 4)
                .map((resource) => (
                  <div key={resource.id} className="border border-pink-500/20 rounded-lg p-3">
                    <h4 className="font-medium text-white mb-1">{resource.title}</h4>
                    <p className="text-xs text-muted-foreground">{resource.type} • {resource.duration}</p>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Featured Resources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredResources.map((resource) => (
          <Card key={resource.id} className="border-elec-yellow/20 bg-elec-gray hover:border-elec-yellow/40 transition-all">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" className="border-elec-yellow/40 text-elec-yellow">
                      {resource.type}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{resource.duration}</span>
                  </div>
                  <CardTitle className="text-lg mb-2 flex items-center gap-2">
                    {resource.title}
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleFavoriteToggle(resource.id)}
                      className={`h-6 w-6 p-0 ${favoriteResources.includes(resource.id) ? 'text-pink-400' : 'text-gray-400'}`}
                    >
                      <Heart className={`h-4 w-4 ${favoriteResources.includes(resource.id) ? 'fill-current' : ''}`} />
                    </Button>
                  </CardTitle>
                </div>
                <div className="text-right">
                  <div className="text-sm text-elec-yellow flex items-center gap-1">
                    <Star className="h-3 w-3 fill-current" />
                    {resource.rating}
                  </div>
                  <div className="text-xs text-muted-foreground">{resource.downloads} downloads</div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">{resource.description}</p>
              <div className="flex items-center justify-between">
                <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/40">
                  {resource.difficulty}
                </Badge>
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    className="bg-elec-yellow text-elec-dark hover:bg-elec-yellow/80"
                    onClick={() => handleResourceAccess(resource)}
                  >
                    <ExternalLink className="h-3 w-3 mr-1" />
                    Access
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredResources.length === 0 && (
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardContent className="text-center py-8">
            <Search className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
            <h3 className="text-lg font-medium text-white mb-2">No resources found</h3>
            <p className="text-muted-foreground">Try adjusting your search terms or filters</p>
          </CardContent>
        </Card>
      )}

      {/* Resource Categories Overview */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-elec-yellow">Resource Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border border-elec-yellow/20 rounded-lg p-4 text-center">
              <FileText className="h-8 w-8 text-blue-400 mx-auto mb-3" />
              <h4 className="font-semibold text-white mb-2">Guides & Articles</h4>
              <p className="text-sm text-muted-foreground mb-3">
                In-depth written resources covering all aspects of mental health
              </p>
              <div className="text-2xl font-bold text-elec-yellow">20</div>
            </div>
            
            <div className="border border-elec-yellow/20 rounded-lg p-4 text-center">
              <Video className="h-8 w-8 text-green-400 mx-auto mb-3" />
              <h4 className="font-semibold text-white mb-2">Video Content</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Educational videos and demonstrations for visual learners
              </p>
              <div className="text-2xl font-bold text-elec-yellow">12</div>
            </div>
            
            <div className="border border-elec-yellow/20 rounded-lg p-4 text-center">
              <Headphones className="h-8 w-8 text-purple-400 mx-auto mb-3" />
              <h4 className="font-semibold text-white mb-2">Audio Resources</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Podcasts and guided meditations for on-the-go learning
              </p>
              <div className="text-2xl font-bold text-elec-yellow">8</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Access Links */}
      <Card className="border-green-500/20 bg-green-500/5">
        <CardHeader>
          <CardTitle className="text-green-400">Quick Access</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button 
              variant="outline" 
              className="h-auto p-4 justify-start"
              onClick={() => {
                const tabTrigger = document.querySelector('[value="crisis"]');
                if (tabTrigger instanceof HTMLElement) {
                  tabTrigger.click();
                  toast.success("Switched to Crisis Resources");
                }
              }}
            >
              <div className="text-left">
                <div className="font-semibold">Crisis Resources</div>
                <div className="text-sm text-muted-foreground">Immediate help and emergency contacts</div>
              </div>
            </Button>
            <Button 
              variant="outline" 
              className="h-auto p-4 justify-start"
              onClick={() => {
                const tabTrigger = document.querySelector('[value="tools"]');
                if (tabTrigger instanceof HTMLElement) {
                  tabTrigger.click();
                  toast.success("Switched to Interactive Tools");
                }
              }}
            >
              <div className="text-left">
                <div className="font-semibold">Interactive Tools</div>
                <div className="text-sm text-muted-foreground">Mood trackers and self-assessment tools</div>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResourcesLibraryTab;
