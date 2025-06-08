
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Download, ExternalLink, FileText, Video, Headphones, Users } from "lucide-react";

interface Resource {
  id: number;
  title: string;
  description: string;
  type: 'guide' | 'video' | 'audio' | 'worksheet' | 'external';
  category: 'stress' | 'anxiety' | 'depression' | 'workplace' | 'general';
  tags: string[];
  url?: string;
  downloadable?: boolean;
  duration?: string;
}

const resources: Resource[] = [
  {
    id: 1,
    title: "Apprentice Mental Health Toolkit",
    description: "Comprehensive guide covering stress management, anxiety, and workplace wellbeing specifically for electrical apprentices",
    type: 'guide',
    category: 'general',
    tags: ['apprentices', 'comprehensive', 'workplace'],
    downloadable: true
  },
  {
    id: 2,
    title: "Managing First Day Nerves",
    description: "Practical strategies for handling anxiety when starting at a new workplace or training centre",
    type: 'video',
    category: 'anxiety',
    tags: ['first day', 'anxiety', 'workplace'],
    duration: '12 minutes',
    url: 'https://example.com/video1'
  },
  {
    id: 3,
    title: "Site Safety Stress Management",
    description: "How to maintain mental clarity and calm in high-pressure electrical work environments",
    type: 'guide',
    category: 'stress',
    tags: ['safety', 'pressure', 'site work'],
    downloadable: true
  },
  {
    id: 4,
    title: "Sleep Better After Shift Work",
    description: "Guided meditation and techniques for improving sleep quality after demanding work days",
    type: 'audio',
    category: 'stress',
    tags: ['sleep', 'recovery', 'meditation'],
    duration: '20 minutes',
    url: 'https://example.com/audio1'
  },
  {
    id: 5,
    title: "Dealing with Workplace Criticism",
    description: "Interactive worksheet to help process feedback and criticism constructively",
    type: 'worksheet',
    category: 'workplace',
    tags: ['feedback', 'resilience', 'growth'],
    downloadable: true
  },
  {
    id: 6,
    title: "Mind - Young People's Mental Health",
    description: "External resource with specific information for young people entering the workforce",
    type: 'external',
    category: 'general',
    tags: ['young people', 'external', 'comprehensive'],
    url: 'https://www.mind.org.uk/information-support/for-children-and-young-people/'
  },
  {
    id: 7,
    title: "Financial Stress on Apprentice Wages",
    description: "Practical advice for managing financial pressures during your apprenticeship",
    type: 'guide',
    category: 'stress',
    tags: ['finance', 'budgeting', 'apprentice wage'],
    downloadable: true
  },
  {
    id: 8,
    title: "Building Confidence on Site",
    description: "Video series covering how to build confidence when working with experienced professionals",
    type: 'video',
    category: 'workplace',
    tags: ['confidence', 'experience', 'professional development'],
    duration: '25 minutes',
    url: 'https://example.com/video2'
  }
];

const ResourcesLibrary = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedType, setSelectedType] = useState<string>("all");

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === "all" || resource.category === selectedCategory;
    const matchesType = selectedType === "all" || resource.type === selectedType;
    
    return matchesSearch && matchesCategory && matchesType;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return Video;
      case 'audio': return Headphones;
      case 'worksheet': return FileText;
      case 'external': return ExternalLink;
      default: return FileText;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'video': return 'text-blue-400 border-blue-400';
      case 'audio': return 'text-purple-400 border-purple-400';
      case 'worksheet': return 'text-green-400 border-green-400';
      case 'external': return 'text-orange-400 border-orange-400';
      default: return 'text-elec-yellow border-elec-yellow';
    }
  };

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'general', label: 'General Wellbeing' },
    { value: 'stress', label: 'Stress Management' },
    { value: 'anxiety', label: 'Anxiety Support' },
    { value: 'workplace', label: 'Workplace Issues' }
  ];

  const types = [
    { value: 'all', label: 'All Types' },
    { value: 'guide', label: 'Guides' },
    { value: 'video', label: 'Videos' },
    { value: 'audio', label: 'Audio' },
    { value: 'worksheet', label: 'Worksheets' },
    { value: 'external', label: 'External Links' }
  ];

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-elec-yellow">Find Resources</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search resources..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-white mb-2 block">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 border border-elec-yellow/20 rounded-md bg-elec-gray text-white"
              >
                {categories.map(cat => (
                  <option key={cat.value} value={cat.value}>{cat.label}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="text-sm font-medium text-white mb-2 block">Type</label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full px-3 py-2 border border-elec-yellow/20 rounded-md bg-elec-gray text-white"
              >
                {types.map(type => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white">
            {filteredResources.length} resource{filteredResources.length !== 1 ? 's' : ''} found
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredResources.map((resource) => {
            const TypeIcon = getTypeIcon(resource.type);
            
            return (
              <Card key={resource.id} className="border-elec-yellow/20 bg-elec-gray">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <TypeIcon className={`h-5 w-5 mt-1 ${getTypeColor(resource.type).split(' ')[0]}`} />
                      <div>
                        <CardTitle className="text-base text-white">{resource.title}</CardTitle>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge 
                            variant="outline" 
                            className={`text-xs ${getTypeColor(resource.type)}`}
                          >
                            {resource.type}
                          </Badge>
                          {resource.duration && (
                            <span className="text-xs text-muted-foreground">
                              {resource.duration}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">{resource.description}</p>
                  
                  <div className="flex flex-wrap gap-1">
                    {resource.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs border-elec-yellow/30">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex gap-2">
                    {resource.downloadable && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="border-elec-yellow/20 hover:bg-elec-yellow/10"
                      >
                        <Download className="h-3 w-3 mr-1" />
                        Download
                      </Button>
                    )}
                    
                    {resource.url && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="border-elec-yellow/20 hover:bg-elec-yellow/10"
                        onClick={() => window.open(resource.url, '_blank')}
                      >
                        <ExternalLink className="h-3 w-3 mr-1" />
                        {resource.type === 'external' ? 'Visit' : 'View'}
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {filteredResources.length === 0 && (
          <Card className="border-elec-yellow/20 bg-elec-gray">
            <CardContent className="text-center py-8">
              <p className="text-muted-foreground mb-2">No resources found matching your criteria</p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("all");
                  setSelectedType("all");
                }}
                className="border-elec-yellow/20 hover:bg-elec-yellow/10"
              >
                Clear Filters
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ResourcesLibrary;
