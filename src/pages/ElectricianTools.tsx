
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calculator, Wrench, Brain, Settings, ArrowLeft, MapPin, TestTube, FileText, Shield, Search, Star, Clock, TrendingUp, Filter, Grid, List, User, Bookmark, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const ElectricianTools = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [favoriteTools, setFavoriteTools] = useState<string[]>([]);
  const { toast } = useToast();

  // Tool usage statistics (would normally come from backend)
  const [toolStats, setToolStats] = useState<Record<string, { usage: number; completion: number; lastUsed: string }>>({
    'site-safety': { usage: 89, completion: 75, lastUsed: '2 hours ago' },
    'eicr-reports': { usage: 92, completion: 88, lastUsed: '1 day ago' },
    'install-planner': { usage: 76, completion: 45, lastUsed: '3 days ago' },
    'inspection-testing': { usage: 85, completion: 92, lastUsed: '1 hour ago' },
    'project-management': { usage: 95, completion: 67, lastUsed: '30 mins ago' },
    'ai-tooling': { usage: 68, completion: 23, lastUsed: '1 week ago' },
    'calculations': { usage: 88, completion: 91, lastUsed: '4 hours ago' },
    'admin': { usage: 82, completion: 56, lastUsed: '2 days ago' }
  });

  // Main tool categories with enhanced metadata
  const toolCategories = [
    {
      id: "site-safety",
      title: "Site Safety & Risk Assessment",
      description: "RAMS generator, hazard assessment, and safety management tools",
      icon: <Shield className="h-10 w-10 text-elec-yellow" />,
      link: "/electrician-tools/site-safety",
      category: "safety",
      priority: "high",
      tags: ["RAMS", "Risk Assessment", "Safety", "Compliance"],
      estimatedTime: "15-30 min",
      difficulty: "intermediate"
    },
    {
      id: "eicr-reports",
      title: "EICR Reports & Management",
      description: "Create, manage, and export professional Electrical Installation Condition Reports",
      icon: <FileText className="h-10 w-10 text-elec-yellow" />,
      link: "/electrician-tools/eicr-reports",
      category: "reports",
      priority: "high",
      tags: ["EICR", "Reports", "Certification", "Compliance"],
      estimatedTime: "45-60 min",
      difficulty: "advanced"
    },
    {
      id: "install-planner",
      title: "Install Planner",
      description: "Plan electrical installations with professional guidance and calculations",
      icon: <MapPin className="h-10 w-10 text-elec-yellow" />,
      link: "/electrician-tools/install-planner",
      category: "planning",
      priority: "medium",
      tags: ["Installation", "Planning", "Load Calculations"],
      estimatedTime: "30-45 min",
      difficulty: "intermediate"
    },
    {
      id: "inspection-testing",
      title: "Inspection & Testing Walkthrough",
      description: "Step-by-step testing procedures with validation and automated reporting",
      icon: <TestTube className="h-10 w-10 text-elec-yellow" />,
      link: "/electrician-tools/inspection-testing",
      category: "testing",
      priority: "high",
      tags: ["Testing", "Inspection", "BS7671", "Validation"],
      estimatedTime: "60-90 min",
      difficulty: "advanced"
    },
    {
      id: "project-management",
      title: "Project Management",
      description: "Organise and track your electrical projects efficiently",
      icon: <Wrench className="h-10 w-10 text-elec-yellow" />,
      link: "/electrician-tools/project-management",
      category: "management",
      priority: "medium",
      tags: ["Projects", "Time Tracking", "Materials"],
      estimatedTime: "20-40 min",
      difficulty: "beginner"
    },
    {
      id: "ai-tooling",
      title: "AI Tooling",
      description: "Leverage AI to enhance your electrical work productivity",
      icon: <Brain className="h-10 w-10 text-elec-yellow" />,
      link: "/electrician-tools/ai-tooling",
      category: "ai",
      priority: "low",
      tags: ["AI", "Automation", "Productivity"],
      estimatedTime: "10-20 min",
      difficulty: "beginner"
    },
    {
      id: "calculations",
      title: "Calculations",
      description: "Essential calculators for electrical work and planning",
      icon: <Calculator className="h-10 w-10 text-elec-yellow" />,
      link: "/electrician-tools/calculations",
      category: "calculations",
      priority: "medium",
      tags: ["Calculations", "Cable Sizing", "Load"],
      estimatedTime: "5-15 min",
      difficulty: "intermediate"
    },
    {
      id: "admin",
      title: "Admin",
      description: "Manage your electrical business and documentation",
      icon: <Settings className="h-10 w-10 text-elec-yellow" />,
      link: "/electrician-tools/admin",
      category: "business",
      priority: "medium",
      tags: ["Business", "Admin", "Documents"],
      estimatedTime: "20-35 min",
      difficulty: "beginner"
    }
  ];

  const categories = [
    { id: 'all', label: 'All Tools', count: toolCategories.length },
    { id: 'safety', label: 'Safety & Compliance', count: toolCategories.filter(t => t.category === 'safety').length },
    { id: 'reports', label: 'Reports & Certification', count: toolCategories.filter(t => t.category === 'reports').length },
    { id: 'testing', label: 'Testing & Inspection', count: toolCategories.filter(t => t.category === 'testing').length },
    { id: 'management', label: 'Project Management', count: toolCategories.filter(t => t.category === 'management').length },
    { id: 'calculations', label: 'Calculations', count: toolCategories.filter(t => t.category === 'calculations').length }
  ];

  // Filter tools based on search and category
  const filteredTools = toolCategories.filter(tool => {
    const matchesSearch = tool.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tool.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tool.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || tool.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Get recommended tools based on usage patterns
  const getRecommendedTools = () => {
    return toolCategories
      .filter(tool => toolStats[tool.id]?.usage < 70)
      .sort((a, b) => (toolStats[b.id]?.usage || 0) - (toolStats[a.id]?.usage || 0))
      .slice(0, 3);
  };

  const toggleFavorite = (toolId: string) => {
    setFavoriteTools(prev => 
      prev.includes(toolId) 
        ? prev.filter(id => id !== toolId)
        : [...prev, toolId]
    );
    toast({
      title: favoriteTools.includes(toolId) ? "Removed from favorites" : "Added to favorites",
      description: "Your preferences have been updated",
    });
  };

  const getPriorityColor = (priority: string) => {
    switch(priority) {
      case 'high': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'low': return 'bg-green-500/20 text-green-400 border-green-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch(difficulty) {
      case 'beginner': return 'bg-green-500/20 text-green-400';
      case 'intermediate': return 'bg-yellow-500/20 text-yellow-400';
      case 'advanced': return 'bg-red-500/20 text-red-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Enhanced Header with User Stats */}
      <div className="relative bg-gradient-to-r from-elec-dark via-elec-gray to-elec-dark rounded-xl p-6 border border-elec-yellow/20">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-elec-yellow/20 rounded-full">
                <Wrench className="h-8 w-8 text-elec-yellow" />
              </div>
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Professional Electrician Tools</h1>
                <p className="text-muted-foreground">
                  Comprehensive suite of professional tools to enhance your electrical work efficiency
                </p>
              </div>
            </div>
            
            {/* Quick Stats */}
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 bg-elec-yellow/10 px-3 py-1 rounded-full">
                <TrendingUp className="h-4 w-4 text-elec-yellow" />
                <span className="text-sm">92% Avg. Tool Usage</span>
              </div>
              <div className="flex items-center gap-2 bg-blue-500/10 px-3 py-1 rounded-full">
                <Clock className="h-4 w-4 text-blue-400" />
                <span className="text-sm">45 mins saved daily</span>
              </div>
              <div className="flex items-center gap-2 bg-green-500/10 px-3 py-1 rounded-full">
                <Shield className="h-4 w-4 text-green-400" />
                <span className="text-sm">100% Compliance</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link to="/electrical-hub">
              <Button variant="outline" className="flex items-center gap-2 border-elec-yellow/30 hover:border-elec-yellow/50">
                <ArrowLeft className="h-4 w-4" /> Back to Hub
              </Button>
            </Link>
            <Button className="bg-elec-yellow text-black hover:bg-elec-yellow/90">
              <User className="h-4 w-4 mr-2" />
              My Dashboard
            </Button>
          </div>
        </div>
      </div>

      {/* Smart Recommendations */}
      {getRecommendedTools().length > 0 && (
        <Card className="border-blue-500/30 bg-blue-500/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-400">
              <Star className="h-5 w-5" />
              Recommended for You
            </CardTitle>
            <CardDescription>
              Tools that could boost your productivity based on your usage patterns
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {getRecommendedTools().map((tool) => (
                <Link key={tool.id} to={tool.link}>
                  <Card className="h-full border-elec-yellow/20 bg-elec-gray/50 hover:bg-elec-gray/80 transition-all cursor-pointer">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0">
                          {tool.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm truncate">{tool.title}</h4>
                          <p className="text-xs text-muted-foreground mt-1">{tool.estimatedTime}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <div className="flex-1 bg-elec-dark rounded-full h-1.5">
                              <div 
                                className="bg-blue-400 h-1.5 rounded-full transition-all"
                                style={{ width: `${toolStats[tool.id]?.usage || 0}%` }}
                              />
                            </div>
                            <span className="text-xs text-blue-400">{toolStats[tool.id]?.usage || 0}%</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Enhanced Search and Filter Controls */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search tools, features, or tags..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-elec-gray border-elec-yellow/20"
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'outline'}
              size="icon"
              onClick={() => setViewMode('grid')}
              className="border-elec-yellow/20"
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="icon"
              onClick={() => setViewMode('list')}
              className="border-elec-yellow/20"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Category Tabs */}
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 bg-elec-gray/50">
            {categories.map((category) => (
              <TabsTrigger
                key={category.id}
                value={category.id}
                className="flex flex-col items-center gap-1 py-3"
              >
                <span className="text-xs font-medium">{category.label}</span>
                <Badge variant="secondary" className="text-xs">
                  {category.count}
                </Badge>
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      {/* Results Summary */}
      {searchTerm && (
        <div className="flex items-center justify-between bg-elec-gray/30 rounded-lg p-4">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-elec-yellow" />
            <span className="text-sm">
              Found {filteredTools.length} tool{filteredTools.length !== 1 ? 's' : ''} matching "{searchTerm}"
            </span>
          </div>
          {searchTerm && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSearchTerm('')}
              className="text-xs"
            >
              Clear search
            </Button>
          )}
        </div>
      )}

      {/* Enhanced Tools Grid/List */}
      <div className={`grid gap-6 ${
        viewMode === 'grid' 
          ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3' 
          : 'grid-cols-1'
      }`}>
        {filteredTools.map((tool) => {
          const stats = toolStats[tool.id];
          const isFavorite = favoriteTools.includes(tool.id);
          
          return (
            <Card
              key={tool.id}
              className={`group relative border-elec-yellow/20 bg-elec-gray hover:border-elec-yellow/50 transition-all duration-300 hover:shadow-lg hover:shadow-elec-yellow/10 ${
                viewMode === 'list' ? 'flex flex-row items-center' : ''
              }`}
            >
              <div className={`${viewMode === 'list' ? 'flex-1' : ''}`}>
                <CardHeader className={`${viewMode === 'list' ? 'pb-2' : 'pb-3'}`}>
                  <div className="flex items-start justify-between">
                    <div className={`flex ${viewMode === 'list' ? 'flex-row items-center gap-4' : 'flex-col'}`}>
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-elec-yellow/10 rounded-lg group-hover:bg-elec-yellow/20 transition-colors">
                          {tool.icon}
                        </div>
                        {viewMode === 'list' && (
                          <div>
                            <CardTitle className="text-xl">{tool.title}</CardTitle>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge className={getPriorityColor(tool.priority)} variant="outline">
                                {tool.priority}
                              </Badge>
                              <Badge className={getDifficultyColor(tool.difficulty)} variant="outline">
                                {tool.difficulty}
                              </Badge>
                            </div>
                          </div>
                        )}
                      </div>
                      {viewMode === 'grid' && (
                        <div className="mt-3">
                          <CardTitle className="text-xl">{tool.title}</CardTitle>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge className={getPriorityColor(tool.priority)} variant="outline">
                              {tool.priority}
                            </Badge>
                            <Badge className={getDifficultyColor(tool.difficulty)} variant="outline">
                              {tool.difficulty}
                            </Badge>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.preventDefault();
                        toggleFavorite(tool.id);
                      }}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Star className={`h-4 w-4 ${isFavorite ? 'fill-elec-yellow text-elec-yellow' : 'text-muted-foreground'}`} />
                    </Button>
                  </div>
                </CardHeader>

                <CardContent className={`${viewMode === 'list' ? 'pt-0' : 'pt-2'}`}>
                  <CardDescription className="mb-4 line-clamp-2">
                    {tool.description}
                  </CardDescription>

                  {/* Tool Metadata */}
                  <div className={`space-y-3 ${viewMode === 'list' ? 'flex flex-row items-center gap-6 space-y-0' : ''}`}>
                    {/* Progress and Stats */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">Usage</span>
                        <span className="text-elec-yellow font-medium">{stats?.usage || 0}%</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-elec-dark overflow-hidden">
                        <div 
                          className="h-full bg-elec-yellow rounded-full transition-all duration-500"
                          style={{ width: `${stats?.usage || 0}%` }}
                        />
                      </div>
                    </div>

                    {/* Tags and Time */}
                    <div className={`flex ${viewMode === 'list' ? 'flex-col gap-1' : 'flex-wrap gap-1'}`}>
                      <div className="flex flex-wrap gap-1">
                        {tool.tags.slice(0, 3).map((tag, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>{tool.estimatedTime}</span>
                      </div>
                    </div>
                  </div>

                  {/* Last Used Info */}
                  {stats?.lastUsed && (
                    <div className="mt-3 text-xs text-muted-foreground flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      Last used {stats.lastUsed}
                    </div>
                  )}
                </CardContent>
              </div>

              {/* Action Button */}
              <div className={`${viewMode === 'list' ? 'p-6' : 'px-6 pb-6'}`}>
                <Link to={tool.link} className="block">
                  <Button className="w-full bg-elec-yellow text-black hover:bg-elec-yellow/90 group-hover:scale-105 transition-transform">
                    <span className="mr-2">Open Tool</span>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </Card>
          );
        })}
      </div>

      {/* No Results State */}
      {filteredTools.length === 0 && (
        <Card className="border-elec-yellow/20 bg-elec-gray/50">
          <CardContent className="text-center py-12">
            <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No tools found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search terms or selected category
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
              }}
              className="border-elec-yellow/30"
            >
              Clear all filters
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Enhanced Footer with Professional Tips */}
      <Card className="border-green-500/50 bg-gradient-to-r from-green-500/10 to-blue-500/10">
        <CardHeader>
          <CardTitle className="text-green-300 flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Professional Tips & Best Practices
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-sm">
            <div>
              <h4 className="font-medium text-green-300 mb-2 flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Safety First
              </h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Always complete risk assessments before starting</li>
                <li>• Use RAMS generator for consistent documentation</li>
                <li>• Regular safety equipment checks</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-blue-300 mb-2 flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Efficiency Tips
              </h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Batch similar tasks together</li>
                <li>• Use project management tools for tracking</li>
                <li>• Leverage AI tools for routine calculations</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-purple-300 mb-2 flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Documentation
              </h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Maintain comprehensive EICR records</li>
                <li>• Digital signatures for faster processing</li>
                <li>• Regular backups of all documentation</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ElectricianTools;
