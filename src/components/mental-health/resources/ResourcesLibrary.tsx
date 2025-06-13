
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, FileText, Video, Headphones, Download, ExternalLink, Search } from "lucide-react";
import { useState } from "react";

const ResourcesLibrary = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

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
      title: "Mental Health First Aid for Electricians",
      category: "guides",
      type: "Guide",
      description: "Comprehensive guide on recognising and responding to mental health issues in the workplace",
      duration: "20 min read",
      difficulty: "Beginner",
      rating: 4.8,
      downloads: 1250
    },
    {
      title: "Stress Management Techniques",
      category: "videos",
      type: "Video Series",
      description: "5-part video series covering practical stress management techniques for trade workers",
      duration: "45 mins total",
      difficulty: "All Levels",
      rating: 4.9,
      downloads: 890
    },
    {
      title: "Mindfulness for Busy Professionals",
      category: "audio",
      type: "Podcast",
      description: "Weekly podcast featuring mindfulness practices designed for busy electrical professionals",
      duration: "30 mins per episode",
      difficulty: "Beginner",
      rating: 4.7,
      downloads: 2100
    },
    {
      title: "Mental Health Self-Assessment Tool",
      category: "tools",
      type: "Interactive Tool",
      description: "Evidence-based self-assessment to help you understand your current mental health status",
      duration: "10 mins",
      difficulty: "All Levels",
      rating: 4.6,
      downloads: 1800
    }
  ];

  const filteredResources = featuredResources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || resource.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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

      {/* Featured Resources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredResources.map((resource, index) => (
          <Card key={index} className="border-elec-yellow/20 bg-elec-gray hover:border-elec-yellow/40 transition-all">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" className="border-elec-yellow/40 text-elec-yellow">
                      {resource.type}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{resource.duration}</span>
                  </div>
                  <CardTitle className="text-lg mb-2">{resource.title}</CardTitle>
                </div>
                <div className="text-right">
                  <div className="text-sm text-elec-yellow">★ {resource.rating}</div>
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
                  <Button size="sm" variant="outline">
                    <ExternalLink className="h-3 w-3 mr-1" />
                    View
                  </Button>
                  <Button size="sm" className="bg-elec-yellow text-elec-dark hover:bg-elec-yellow/80">
                    <Download className="h-3 w-3 mr-1" />
                    Access
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

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
            <Button variant="outline" className="h-auto p-4 justify-start">
              <div className="text-left">
                <div className="font-semibold">Crisis Resources</div>
                <div className="text-sm text-muted-foreground">Immediate help and emergency contacts</div>
              </div>
            </Button>
            <Button variant="outline" className="h-auto p-4 justify-start">
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

export default ResourcesLibrary;
