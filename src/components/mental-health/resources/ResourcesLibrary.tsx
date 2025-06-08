
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Search, ExternalLink, Download, Heart, Brain, Users, Shield } from "lucide-react";

interface Resource {
  id: string;
  title: string;
  description: string;
  category: 'guides' | 'articles' | 'tools' | 'helplines';
  type: 'pdf' | 'website' | 'article' | 'tool';
  url: string;
  tags: string[];
  featured?: boolean;
}

const ResourcesLibrary = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const resources: Resource[] = [
    {
      id: '1',
      title: 'Understanding Work-Related Stress',
      description: 'Comprehensive guide to recognising and managing workplace stress in the electrical industry',
      category: 'guides',
      type: 'pdf',
      url: 'https://www.hse.gov.uk/stress/',
      tags: ['stress', 'workplace', 'management'],
      featured: true
    },
    {
      id: '2',
      title: 'Mental Health First Aid Toolkit',
      description: 'Essential skills for supporting colleagues experiencing mental health challenges',
      category: 'tools',
      type: 'tool',
      url: 'https://www.mentalhealthfirstaid.org/',
      tags: ['first aid', 'support', 'colleagues']
    },
    {
      id: '3',
      title: 'Mindfulness for Construction Workers',
      description: 'Practical mindfulness techniques adapted for physical work environments',
      category: 'articles',
      type: 'article',
      url: 'https://www.mind.org.uk/information-support/tips-for-everyday-living/mindfulness/',
      tags: ['mindfulness', 'techniques', 'practical'],
      featured: true
    },
    {
      id: '4',
      title: 'Samaritans Helpline',
      description: 'Free, confidential support 24/7 for anyone in emotional distress',
      category: 'helplines',
      type: 'website',
      url: 'tel:116123',
      tags: ['emergency', 'support', '24/7']
    },
    {
      id: '5',
      title: 'Building Resilience in Trades',
      description: 'Strategies for developing emotional resilience in demanding work environments',
      category: 'guides',
      type: 'pdf',
      url: 'https://www.matesinmind.org/',
      tags: ['resilience', 'emotional', 'trades']
    },
    {
      id: '6',
      title: 'Sleep Hygiene for Shift Workers',
      description: 'Tips for maintaining healthy sleep patterns with irregular work schedules',
      category: 'articles',
      type: 'article',
      url: 'https://www.nhs.uk/live-well/sleep/',
      tags: ['sleep', 'shift work', 'health']
    },
    {
      id: '7',
      title: 'Mental Health Self-Assessment',
      description: 'Confidential tool to check your mental wellbeing and get personalised advice',
      category: 'tools',
      type: 'tool',
      url: 'https://www.nhs.uk/mental-health/self-help/',
      tags: ['assessment', 'self-help', 'personalised']
    },
    {
      id: '8',
      title: 'Construction Industry Helpline',
      description: 'Specialist support for construction workers and their families',
      category: 'helplines',
      type: 'website',
      url: 'tel:03456051956',
      tags: ['construction', 'specialist', 'families']
    }
  ];

  const categories = [
    { id: 'all', label: 'All Resources', icon: <BookOpen className="h-4 w-4" /> },
    { id: 'guides', label: 'Guides', icon: <Brain className="h-4 w-4" /> },
    { id: 'articles', label: 'Articles', icon: <Heart className="h-4 w-4" /> },
    { id: 'tools', label: 'Tools', icon: <Users className="h-4 w-4" /> },
    { id: 'helplines', label: 'Helplines', icon: <Shield className="h-4 w-4" /> }
  ];

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const featuredResources = resources.filter(r => r.featured);

  const getTypeIcon = (type: Resource['type']) => {
    switch (type) {
      case 'pdf': return <Download className="h-4 w-4" />;
      case 'website': return <ExternalLink className="h-4 w-4" />;
      case 'article': return <BookOpen className="h-4 w-4" />;
      case 'tool': return <Users className="h-4 w-4" />;
    }
  };

  const getCategoryColor = (category: Resource['category']) => {
    switch (category) {
      case 'guides': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'articles': return 'bg-green-500/10 text-green-400 border-green-500/20';
      case 'tools': return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
      case 'helplines': return 'bg-red-500/10 text-red-400 border-red-500/20';
    }
  };

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-elec-yellow" />
            Mental Health Resources Library
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search resources, topics, or tags..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-elec-dark border-elec-yellow/30"
            />
          </div>
          
          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className="flex items-center gap-1"
              >
                {category.icon}
                <span>{category.label}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Featured Resources */}
      {selectedCategory === 'all' && searchTerm === '' && (
        <div className="space-y-3">
          <h3 className="text-lg font-semibold">Featured Resources</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {featuredResources.map((resource) => (
              <Card key={resource.id} className="border-elec-yellow/30 bg-elec-gray">
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <h4 className="font-medium text-sm">{resource.title}</h4>
                      <Badge className="bg-elec-yellow text-elec-dark">Featured</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{resource.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex gap-1">
                        {resource.tags.slice(0, 2).map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <Button size="sm" asChild>
                        <a href={resource.url} target="_blank" rel="noopener noreferrer">
                          {getTypeIcon(resource.type)}
                          <span className="ml-1">Access</span>
                        </a>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* All Resources */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">
            {selectedCategory === 'all' ? 'All Resources' : categories.find(c => c.id === selectedCategory)?.label}
          </h3>
          <span className="text-sm text-muted-foreground">
            {filteredResources.length} resource{filteredResources.length !== 1 ? 's' : ''}
          </span>
        </div>
        
        <div className="grid grid-cols-1 gap-3">
          {filteredResources.map((resource) => (
            <Card key={resource.id} className="border-elec-yellow/20 bg-elec-gray hover:border-elec-yellow/30 transition-colors">
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium text-sm">{resource.title}</h4>
                      <Badge className={getCategoryColor(resource.category)}>
                        {resource.category}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{resource.description}</p>
                    <div className="flex gap-1">
                      {resource.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <Button size="sm" asChild>
                    <a href={resource.url} target="_blank" rel="noopener noreferrer">
                      {getTypeIcon(resource.type)}
                      <span className="ml-1">Access</span>
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {filteredResources.length === 0 && (
          <Card className="border-elec-yellow/20 bg-elec-gray">
            <CardContent className="p-8 text-center">
              <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No resources found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search terms or category filter.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ResourcesLibrary;
