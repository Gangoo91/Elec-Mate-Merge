
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { BookOpen, ExternalLink, Calculator, FileText, Video, Globe, Wrench, Search, Download, Star } from "lucide-react";
import { 
  referenceMaterials, 
  quickLinks, 
  emergencyContacts, 
  getReferencesByCategory,
  getPopularReferences,
  searchReferences,
  ReferenceDocument 
} from "@/data/bs7671-testing/referenceMaterials";

const ResourcesTab = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = [
    { name: "Official Standards", icon: BookOpen, count: getReferencesByCategory("Official Standards").length },
    { name: "Online Tools", icon: Calculator, count: getReferencesByCategory("Online Tools").length },
    { name: "Video Tutorials", icon: Video, count: getReferencesByCategory("Video Tutorials").length },
    { name: "Reference Materials", icon: FileText, count: getReferencesByCategory("Reference Materials").length }
  ];

  const getDisplayedReferences = (): ReferenceDocument[] => {
    if (searchQuery) {
      return searchReferences(searchQuery);
    }
    if (selectedCategory) {
      return getReferencesByCategory(selectedCategory);
    }
    return getPopularReferences(8);
  };

  const displayedReferences = getDisplayedReferences();

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Standard': return 'bg-red-500/10 text-red-400 border-red-500/20';
      case 'Guide': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'Calculator': return 'bg-green-500/10 text-green-400 border-green-500/20';
      case 'Video': return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
      case 'Database': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
      case 'Chart': return 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20';
      case 'Examples': return 'bg-pink-500/10 text-pink-400 border-pink-500/20';
      default: return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
    }
  };

  const handleResourceAccess = (resource: ReferenceDocument) => {
    if (resource.isExternal) {
      window.open(resource.url, '_blank', 'noopener,noreferrer');
    } else {
      // Handle internal resources (could be downloads or navigation)
      if (resource.downloadable) {
        // Trigger download
        const link = document.createElement('a');
        link.href = resource.url;
        link.download = resource.title;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        // Navigate to internal page
        window.location.href = resource.url;
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Search and Filter Section */}
      <Card className="border-elec-yellow/20 bg-gradient-to-r from-elec-gray to-elec-dark/50">
        <CardHeader>
          <CardTitle className="text-elec-yellow flex items-center gap-2">
            <Search className="h-5 w-5" />
            Resource Library
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search resources, guides, tools..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedCategory === null ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(null)}
            >
              All Resources
            </Button>
            {categories.map((category) => (
              <Button
                key={category.name}
                variant={selectedCategory === category.name ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.name)}
                className="flex items-center gap-2"
              >
                <category.icon className="h-3 w-3" />
                {category.name} ({category.count})
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Links */}
      <Card className="border-elec-yellow/20 bg-gradient-to-r from-elec-gray to-elec-dark/50">
        <CardHeader>
          <CardTitle className="text-elec-yellow flex items-center gap-2">
            <ExternalLink className="h-5 w-5" />
            Quick Links
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickLinks.map((link, index) => (
              <Button 
                key={index} 
                variant="outline" 
                className="h-auto p-4 flex flex-col items-center gap-2"
                onClick={() => window.open(link.url, '_blank', 'noopener,noreferrer')}
              >
                <Globe className="h-6 w-6 text-elec-yellow" />
                <span className="text-sm text-center">{link.name}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Resources Grid */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-elec-yellow">
            {searchQuery ? `Search Results (${displayedReferences.length})` :
             selectedCategory ? `${selectedCategory} (${displayedReferences.length})` :
             `Popular Resources (${displayedReferences.length})`}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {displayedReferences.map((resource) => (
              <div key={resource.id} className="border border-elec-yellow/20 rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-medium text-white text-sm">{resource.title}</h4>
                      {resource.popularity > 85 && (
                        <Star className="h-3 w-3 text-yellow-400 fill-current" />
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mb-3">{resource.description}</p>
                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant="outline" className={getTypeColor(resource.type)}>
                        {resource.type}
                      </Badge>
                      {resource.fileSize && (
                        <Badge variant="outline" className="border-gray-500/40 text-gray-400 text-xs">
                          {resource.fileSize}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
                <Button 
                  size="sm" 
                  className="w-full"
                  onClick={() => handleResourceAccess(resource)}
                >
                  {resource.isExternal ? (
                    <>
                      <ExternalLink className="h-3 w-3 mr-1" />
                      Open
                    </>
                  ) : resource.downloadable ? (
                    <>
                      <Download className="h-3 w-3 mr-1" />
                      Download
                    </>
                  ) : (
                    <>
                      <Globe className="h-3 w-3 mr-1" />
                      Access
                    </>
                  )}
                </Button>
              </div>
            ))}
          </div>
          
          {displayedReferences.length === 0 && (
            <div className="text-center py-8">
              <Search className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h4 className="font-medium text-white mb-2">No resources found</h4>
              <p className="text-sm text-muted-foreground">
                Try adjusting your search terms or browse by category
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Emergency Contacts */}
      <Card className="border-red-500/30 bg-red-500/10">
        <CardHeader>
          <CardTitle className="text-red-400 flex items-center gap-2">
            <Wrench className="h-5 w-5" />
            Emergency Contacts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {emergencyContacts.map((contact, index) => (
              <div key={index} className="border border-red-500/20 rounded-lg p-4 text-center">
                <h4 className="font-medium text-white mb-1">{contact.service}</h4>
                <p className="text-xl font-bold text-red-400 mb-2">{contact.number}</p>
                <p className="text-xs text-muted-foreground mb-2">{contact.description}</p>
                <Badge variant="outline" className="border-red-500/40 text-red-400">
                  {contact.type}
                </Badge>
                <div className="text-xs text-muted-foreground mt-2">{contact.availability}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Study Tips */}
      <Card className="border-green-500/30 bg-green-500/10">
        <CardHeader>
          <CardTitle className="text-green-400 flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Study & Practice Tips
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3 text-green-300">Best Practices</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Practice with actual MFT equipment</li>
                <li>• Review failed EICRs for learning</li>
                <li>• Study real-world installation examples</li>
                <li>• Join professional forums and discussions</li>
                <li>• Bookmark frequently used resources</li>
                <li>• Keep offline copies of essential documents</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-green-300">Common Mistakes</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Skipping visual inspection steps</li>
                <li>• Incorrect test sequence order</li>
                <li>• Poor documentation practices</li>
                <li>• Inadequate safe isolation procedures</li>
                <li>• Not updating reference materials</li>
                <li>• Ignoring manufacturer's instructions</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResourcesTab;
