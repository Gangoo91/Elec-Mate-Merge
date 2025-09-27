import React, { useState, useMemo, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Shield, Search, AlertTriangle, Star, Clock, Plus, 
  Filter, BookmarkPlus, Eye, ChevronDown, ChevronUp,
  Zap, HardHat, Building2, FlameKindling, Wind, Users, Hammer, Check,
  TrendingUp, Target, ArrowRight, Sparkles, CheckCircle2
} from 'lucide-react';
import { 
  MobileAccordion, 
  MobileAccordionContent, 
  MobileAccordionItem, 
  MobileAccordionTrigger 
} from '@/components/ui/mobile-accordion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { hazardCategories, enhancedRiskConsequences } from '@/data/hazards';
import { MobileGestureHandler } from '@/components/ui/mobile-gesture-handler';
import { useRAMS } from '../rams/RAMSContext';
import { toast } from '@/hooks/use-toast';

interface HazardItem {
  id: string;
  name: string;
  category: string;
  description: string;
  riskLevel: 'Low' | 'Medium' | 'High' | 'Very High';
  severity: number;
  likelihood: number;
  riskRating: number;
  controlMeasures: string[];
  regulations: string[];
  icon: any;
  isFavorite?: boolean;
  usage: number;
  lastUsed?: Date;
}

const EnhancedHazardDatabase: React.FC = () => {
  const { addRiskFromTemplate } = useRAMS();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedRiskLevel, setSelectedRiskLevel] = useState<string>('all');
  const [activeTab, setActiveTab] = useState('browse');
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [recentlyViewed, setRecentlyViewed] = useState<string[]>([]);
  const [expandedHazards, setExpandedHazards] = useState<Set<string>>(new Set());
  const [addedHazards, setAddedHazards] = useState<Set<string>>(new Set());

  // Load favorites and recent items from localStorage on mount
  useEffect(() => {
    try {
      const savedFavorites = localStorage.getItem('hazard-favorites');
      if (savedFavorites) {
        setFavorites(new Set(JSON.parse(savedFavorites)));
      }

      const savedRecent = localStorage.getItem('hazard-recent');
      if (savedRecent) {
        setRecentlyViewed(JSON.parse(savedRecent));
      }
    } catch (error) {
      console.warn('Failed to load saved hazard data:', error);
    }
  }, []);

  // Save favorites to localStorage whenever favorites change
  useEffect(() => {
    try {
      localStorage.setItem('hazard-favorites', JSON.stringify(Array.from(favorites)));
    } catch (error) {
      console.warn('Failed to save favorites:', error);
    }
  }, [favorites]);

  // Save recent items to localStorage whenever recent items change
  useEffect(() => {
    try {
      localStorage.setItem('hazard-recent', JSON.stringify(recentlyViewed));
    } catch (error) {
      console.warn('Failed to save recent items:', error);
    }
  }, [recentlyViewed]);

  // Transform enhanced data into UI-friendly format
  const transformedHazards: HazardItem[] = useMemo(() => {
    const categoryIconMap = {
      electrical: Zap,
      height: HardHat,
      structural: Building2,
      fire: FlameKindling,
      environmental: Wind,
      'manual-handling': Users,
      tools: Hammer,
      'hazardous-materials': AlertTriangle,
      'confined-space': Building2
    };

    return enhancedRiskConsequences.map((item, index) => {
      const riskLevel = 
        item.riskRating >= 15 ? 'Very High' :
        item.riskRating >= 12 ? 'High' :
        item.riskRating >= 6 ? 'Medium' : 'Low';

      const allControls = [
        ...(item.controlMeasures.elimination || []),
        ...(item.controlMeasures.engineering || []),
        ...(item.controlMeasures.administrative || []),
        ...(item.controlMeasures.ppe || [])
      ];

      return {
        id: item.id,
        name: item.hazard,
        category: item.category,
        description: item.consequence,
        riskLevel: riskLevel as 'Low' | 'Medium' | 'High' | 'Very High',
        severity: item.severity,
        likelihood: item.likelihood,
        riskRating: item.riskRating,
        controlMeasures: allControls,
        regulations: item.bs7671References || ['BS 7671', 'CDM Regulations'],
        icon: categoryIconMap[item.category as keyof typeof categoryIconMap] || AlertTriangle,
        isFavorite: favorites.has(item.id),
        usage: Math.floor(Math.random() * 50),
        lastUsed: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000)
      };
    });
  }, [favorites]);

  // Filtering logic
  const filteredHazards = useMemo(() => {
    return transformedHazards.filter(hazard => {
      const matchesSearch = searchTerm === '' || 
        hazard.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        hazard.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        hazard.controlMeasures.some(control => 
          control.toLowerCase().includes(searchTerm.toLowerCase())
        );

      const matchesCategory = selectedCategory === 'all' || hazard.category === selectedCategory;
      const matchesRiskLevel = selectedRiskLevel === 'all' || hazard.riskLevel === selectedRiskLevel;

      return matchesSearch && matchesCategory && matchesRiskLevel;
    });
  }, [transformedHazards, searchTerm, selectedCategory, selectedRiskLevel]);

  // Tab-specific data
  const favoriteHazards = transformedHazards.filter(h => favorites.has(h.id));
  const mostUsedHazards = [...transformedHazards].sort((a, b) => b.usage - a.usage).slice(0, 10);
  const recentHazards = transformedHazards.filter(h => recentlyViewed.includes(h.id));

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'Low': return 'bg-success/20 text-success border-success/30';
      case 'Medium': return 'bg-warning/20 text-warning border-warning/30';
      case 'High': return 'bg-orange-500/20 text-orange-300 border-orange-500/30';
      case 'Very High': return 'bg-destructive/20 text-destructive border-destructive/30';
      default: return 'bg-muted/20 text-muted-foreground border-muted/30';
    }
  };

  const toggleFavorite = (hazardId: string) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(hazardId)) {
      newFavorites.delete(hazardId);
    } else {
      newFavorites.add(hazardId);
    }
    setFavorites(newFavorites);
  };

  const viewHazardDetails = (hazardId: string) => {
    const newRecent = [hazardId, ...recentlyViewed.filter(id => id !== hazardId)].slice(0, 10);
    setRecentlyViewed(newRecent);
  };

  const toggleHazardExpansion = (hazardId: string) => {
    const newExpanded = new Set(expandedHazards);
    if (newExpanded.has(hazardId)) {
      newExpanded.delete(hazardId);
    } else {
      newExpanded.add(hazardId);
    }
    setExpandedHazards(newExpanded);
  };

  const handleAddToRAMS = (hazard: HazardItem) => {
    // Convert hazard to RAMS template format
    const ramsTemplate = {
      id: hazard.id,
      specificActivity: hazard.name,
      hazard: hazard.description,
      category: hazard.category,
      likelihood: hazard.likelihood,
      severity: hazard.severity,
      riskLevel: hazard.likelihood * hazard.severity,
      detailedControls: hazard.controlMeasures || [],
      ppe: ['Safety helmet', 'Safety gloves', 'High-vis vest'], // Default PPE
      regulations: hazard.regulations || [],
      icon: 'AlertTriangle'
    };

    addRiskFromTemplate(ramsTemplate);
    
    // Add to added hazards set for visual feedback
    setAddedHazards(prev => new Set([...prev, hazard.id]));
    
    // Remove from added state after 3 seconds
    setTimeout(() => {
      setAddedHazards(prev => {
        const newSet = new Set(prev);
        newSet.delete(hazard.id);
        return newSet;
      });
    }, 3000);

    toast({
      title: 'Added to RAMS',
      description: `${hazard.name} has been added to your Risk Assessment.`,
      variant: 'success'
    });
  };

  const HazardCard: React.FC<{ hazard: HazardItem; showQuickActions?: boolean }> = ({ 
    hazard, 
    showQuickActions = true 
  }) => {
    const IconComponent = hazard.icon;
    const isExpanded = expandedHazards.has(hazard.id);

    return (
      <Card className="border-elec-yellow/20 bg-elec-gray/80 backdrop-blur-sm transition-all duration-200">
        <CardContent className="p-4">
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex items-start gap-3 flex-1">
              <div className="p-2 rounded-lg bg-elec-yellow/10 border border-elec-yellow/20 shrink-0">
                <IconComponent className="h-4 w-4 text-elec-yellow" />
              </div>
              
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-sm text-foreground mb-1 line-clamp-2">
                  {hazard.name}
                </h3>
                <div className="flex flex-wrap items-center gap-1.5 mb-2">
                  <Badge variant="outline" className="text-xs px-1.5 py-0.5">
                    {hazard.category}
                  </Badge>
                  <Badge className={`${getRiskColor(hazard.riskLevel)} text-xs px-1.5 py-0.5 border`}>
                    {hazard.riskLevel}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    Risk: {hazard.riskRating}
                  </span>
                </div>
              </div>
            </div>

            {showQuickActions && (
              <div className="flex items-center gap-1 shrink-0">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(hazard.id);
                  }}
                >
                  <Star 
                    className={`h-3.5 w-3.5 ${
                      favorites.has(hazard.id) ? 'fill-primary text-primary' : 'text-muted-foreground'
                    }`} 
                  />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={() => {
                    viewHazardDetails(hazard.id);
                    toggleHazardExpansion(hazard.id);
                  }}
                >
                  {isExpanded ? (
                    <ChevronUp className="h-3.5 w-3.5 text-elec-yellow" />
                  ) : (
                    <ChevronDown className="h-3.5 w-3.5 text-elec-yellow" />
                  )}
                </Button>
              </div>
            )}
          </div>

          <p className="text-xs text-muted-foreground leading-relaxed mb-3 line-clamp-2">
            {hazard.description}
          </p>

          {isExpanded && (
            <div className="space-y-3 pt-3 border-t border-border/50">
              <div>
                <h4 className="font-medium text-xs text-foreground mb-2">Control Measures</h4>
                <div className="space-y-1">
                  {hazard.controlMeasures.slice(0, 4).map((control, index) => (
                    <div key={index} className="flex items-start gap-2 text-xs text-muted-foreground">
                      <span className="text-primary mt-0.5 text-xs">•</span>
                      <span className="leading-relaxed">{control}</span>
                    </div>
                  ))}
                  {hazard.controlMeasures.length > 4 && (
                    <p className="text-xs text-muted-foreground italic">
                      +{hazard.controlMeasures.length - 4} more controls...
                    </p>
                  )}
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-xs text-foreground mb-2">Regulations</h4>
                <div className="flex flex-wrap gap-1">
                  {hazard.regulations.map((regulation, index) => (
                    <Badge key={index} variant="outline" className="text-xs px-1.5 py-0.5">
                      {regulation}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-border/50">
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span>Severity: {hazard.severity}/5</span>
                  <span>Likelihood: {hazard.likelihood}/5</span>
                </div>
                <Button 
                  variant={addedHazards.has(hazard.id) ? "default" : "outline"}
                  size="sm" 
                  className={`h-6 text-xs px-3 py-1.5 transition-all duration-300 hover-scale ${
                    addedHazards.has(hazard.id) 
                      ? 'bg-elec-yellow text-elec-dark border-elec-yellow animate-scale-in' 
                      : 'border-elec-yellow/50 text-elec-yellow hover:bg-elec-yellow hover:text-elec-dark hover:border-elec-yellow'
                  }`}
                  onClick={() => handleAddToRAMS(hazard)}
                  disabled={addedHazards.has(hazard.id)}
                >
                  {addedHazards.has(hazard.id) ? (
                    <>
                      <Check className="h-3 w-3 mr-1 animate-scale-in" />
                      Added
                    </>
                  ) : (
                    <>
                      <Plus className="h-3 w-3 mr-1" />
                      Add to RAMS
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      {/* Enhanced Header & Search */}
      <Card className="border-elec-yellow/30 bg-gradient-to-br from-elec-gray/90 to-elec-gray/70 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-elec-yellow/20 border border-elec-yellow/30">
                <Shield className="h-6 w-6 text-elec-yellow" />
              </div>
              <div>
                <CardTitle className="text-elec-yellow flex items-center gap-2 text-xl font-bold">
                  Enhanced Hazard Database
                  <Sparkles className="h-5 w-5 text-elec-yellow/70 animate-pulse" />
                </CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  Comprehensive safety database with intelligent risk assessments
                </p>
              </div>
            </div>
            <div className="hidden lg:flex items-center gap-2 text-xs text-muted-foreground">
              <div className="flex items-center gap-1 px-2 py-1 bg-success/10 rounded-full border border-success/30">
                <CheckCircle2 className="h-3 w-3 text-success" />
                <span className="text-success font-medium">BS 7671:2018 Compliant</span>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Enhanced Search */}
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-elec-yellow group-focus-within:text-elec-yellow transition-colors" />
            <Input
              placeholder="Search hazards, controls, regulations... (e.g. 'electrical shock', 'working at height')"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 pr-4 h-12 bg-background/70 border-2 border-elec-yellow/30 focus:border-elec-yellow/50 focus:bg-background text-base placeholder:text-muted-foreground/70 rounded-xl transition-all duration-200"
            />
            {searchTerm && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <Badge variant="secondary" className="text-xs bg-elec-yellow/20 text-elec-yellow border-elec-yellow/30">
                  {filteredHazards.length} found
                </Badge>
              </div>
            )}
          </div>

          {/* Enhanced Quick Filters */}
          <div className="flex flex-wrap gap-3">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-elec-yellow" />
              <span className="text-sm font-medium text-foreground">Quick Filters:</span>
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="text-sm px-4 py-2 rounded-lg border-2 border-elec-yellow/30 bg-background hover:border-elec-yellow/50 focus:border-elec-yellow focus:outline-none transition-all duration-200 cursor-pointer"
            >
              <option value="all">All Categories</option>
              <option value="electrical">Electrical</option>
              <option value="height">Height</option>
              <option value="fire">Fire</option>
              <option value="tools">Tools</option>
              <option value="environmental">Environmental</option>
            </select>

            <select
              value={selectedRiskLevel}
              onChange={(e) => setSelectedRiskLevel(e.target.value)}
              className="text-sm px-4 py-2 rounded-lg border-2 border-border/50 bg-background hover:border-elec-yellow/50 focus:border-elec-yellow focus:outline-none transition-all duration-200 cursor-pointer"
            >
              <option value="all">📊 All Risk Levels</option>
              <option value="Very High">🔴 Very High Risk</option>
              <option value="High">🟠 High Risk</option>
              <option value="Medium">🟡 Medium Risk</option>
              <option value="Low">🟢 Low Risk</option>
            </select>
          </div>

          {/* Quick Action Bar */}
          <div className="flex items-center justify-between p-3 bg-elec-yellow/10 rounded-lg border border-elec-yellow/20">
            <div className="flex items-center gap-2 text-sm text-elec-yellow">
              <Target className="h-4 w-4" />
              <span className="font-medium">Quick Actions:</span>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setActiveTab('favorites')}
                className="text-xs text-elec-yellow hover:bg-elec-yellow/20 hover:text-elec-yellow"
              >
                <Star className="h-3 w-3 mr-1" />
                View Favorites ({favorites.size})
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setActiveTab('popular')}
                className="text-xs text-elec-yellow hover:bg-elec-yellow/20 hover:text-elec-yellow"
              >
                <TrendingUp className="h-3 w-3 mr-1" />
                Most Used
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { 
            label: 'Critical Risks', 
            count: transformedHazards.filter(h => h.riskLevel === 'Very High').length, 
            color: 'text-red-400',
            bgColor: 'bg-red-500/10',
            borderColor: 'border-red-500/30',
            icon: AlertTriangle
          },
          { 
            label: 'High Priority', 
            count: transformedHazards.filter(h => h.riskLevel === 'High').length, 
            color: 'text-orange-400',
            bgColor: 'bg-orange-500/10',
            borderColor: 'border-orange-500/30',
            icon: Target
          },
          { 
            label: 'Your Favorites', 
            count: favorites.size, 
            color: 'text-elec-yellow',
            bgColor: 'bg-elec-yellow/10',
            borderColor: 'border-elec-yellow/30',
            icon: Star
          },
          { 
            label: 'Total Database', 
            count: transformedHazards.length, 
            color: 'text-primary',
            bgColor: 'bg-primary/10',
            borderColor: 'border-primary/30',
            icon: Shield
          }
        ].map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <Card key={index} className={`${stat.borderColor} ${stat.bgColor} hover:shadow-md transition-all duration-300 hover:scale-105 cursor-pointer group`}>
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center mb-2">
                  <div className={`p-2 rounded-lg ${stat.bgColor} ${stat.borderColor} border group-hover:scale-110 transition-transform duration-200`}>
                    <IconComponent className={`h-5 w-5 ${stat.color}`} />
                  </div>
                </div>
                <div className={`text-2xl font-bold ${stat.color} mb-1`}>{stat.count}</div>
                <div className="text-xs text-muted-foreground font-medium">{stat.label}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Enhanced Tabbed Content */}
      <Card className="border-elec-yellow/30 bg-gradient-to-br from-elec-gray/90 to-elec-gray/70 backdrop-blur-sm shadow-xl">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg text-foreground flex items-center gap-2">
              <Eye className="h-5 w-5 text-elec-yellow" />
              Hazard Explorer
            </CardTitle>
            <Badge variant="outline" className="text-xs bg-elec-yellow/10 text-elec-yellow border-elec-yellow/30">
              {filteredHazards.length} hazards available
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 h-auto p-2 bg-elec-gray/60 backdrop-blur-sm border border-elec-yellow/20 rounded-xl shadow-sm gap-1">
              <TabsTrigger 
                value="browse" 
                className="text-sm py-3 px-4 rounded-lg font-medium transition-all duration-200 data-[state=active]:bg-elec-yellow data-[state=active]:text-elec-dark data-[state=active]:shadow-md hover:bg-elec-yellow/20"
              >
                <Search className="h-4 w-4 mr-2" />
                Browse All
              </TabsTrigger>
              <TabsTrigger 
                value="favorites" 
                className="text-sm py-3 px-4 rounded-lg font-medium transition-all duration-200 data-[state=active]:bg-elec-yellow data-[state=active]:text-elec-dark data-[state=active]:shadow-md hover:bg-elec-yellow/20"
              >
                <Star className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Favorites</span> ({favorites.size})
              </TabsTrigger>
              <TabsTrigger 
                value="recent" 
                className="text-sm py-3 px-4 rounded-lg font-medium transition-all duration-200 data-[state=active]:bg-elec-yellow data-[state=active]:text-elec-dark data-[state=active]:shadow-md hover:bg-elec-yellow/20"
              >
                <Clock className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Recent</span>
              </TabsTrigger>
              <TabsTrigger 
                value="popular" 
                className="text-sm py-3 px-4 rounded-lg font-medium transition-all duration-200 data-[state=active]:bg-elec-yellow data-[state=active]:text-elec-dark data-[state=active]:shadow-md hover:bg-elec-yellow/20"
              >
                <TrendingUp className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Popular</span>
              </TabsTrigger>
            </TabsList>

        <TabsContent value="browse" className="space-y-4 mt-6">
          {searchTerm && (
            <div className="flex items-center gap-2 p-3 bg-elec-yellow/10 rounded-lg border border-elec-yellow/20">
              <Search className="h-4 w-4 text-elec-yellow" />
              <span className="text-sm text-elec-yellow font-medium">
                Showing {filteredHazards.length} results for "{searchTerm}"
              </span>
              {filteredHazards.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSearchTerm('')}
                  className="ml-auto text-xs text-elec-yellow hover:bg-elec-yellow/20"
                >
                  Clear search
                </Button>
              )}
            </div>
          )}
          {filteredHazards.length > 0 ? (
            <div className="space-y-3">
              {filteredHazards.map((hazard, index) => (
                <div key={hazard.id} className="animate-fade-in" style={{ animationDelay: `${index * 50}ms` }}>
                  <MobileGestureHandler
                    onTap={() => toggleHazardExpansion(hazard.id)}
                    onLongPress={() => toggleFavorite(hazard.id)}
                  >
                    <HazardCard hazard={hazard} />
                  </MobileGestureHandler>
                </div>
              ))}
            </div>
          ) : (
            <Card className="border-dashed border-elec-yellow/50 bg-elec-gray/30 hover:bg-elec-gray/40 transition-colors">
              <CardContent className="p-8 text-center">
                <div className="flex flex-col items-center gap-4">
                  <div className="p-4 rounded-full bg-elec-yellow/10 border border-elec-yellow/30">
                    <Search className="h-8 w-8 text-elec-yellow" />
                  </div>
                  <div>
                    <p className="text-lg font-medium text-foreground mb-2">No hazards found</p>
                    <p className="text-sm text-muted-foreground mb-4">
                      Try adjusting your search terms or filters to find relevant hazards
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSearchTerm('');
                        setSelectedCategory('all');
                        setSelectedRiskLevel('all');
                      }}
                      className="text-xs border-elec-yellow/50 text-elec-yellow hover:bg-elec-yellow hover:text-elec-dark"
                    >
                      <ArrowRight className="h-3 w-3 mr-1" />
                      Reset filters
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="favorites" className="space-y-3 mt-4">
          {favoriteHazards.length > 0 ? (
            <div className="space-y-2">
              {favoriteHazards.map((hazard) => (
                <HazardCard key={hazard.id} hazard={hazard} />
              ))}
            </div>
          ) : (
            <Card className="border-dashed border-elec-yellow/50 bg-elec-gray/30">
              <CardContent className="p-6 text-center">
                <Star className="h-8 w-8 text-elec-yellow mx-auto mb-2" />
                <p className="text-sm text-muted-foreground mb-1">No favorites yet</p>
                <p className="text-xs text-muted-foreground">Star hazards to add them to favorites</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="recent" className="space-y-3 mt-4">
          {recentHazards.length > 0 ? (
            <div className="space-y-2">
              {recentHazards.map((hazard) => (
                <HazardCard key={hazard.id} hazard={hazard} />
              ))}
            </div>
          ) : (
            <Card className="border-dashed border-elec-yellow/50 bg-elec-gray/30">
              <CardContent className="p-6 text-center">
                <Clock className="h-8 w-8 text-elec-yellow mx-auto mb-2" />
                <p className="text-sm text-muted-foreground mb-1">No recent hazards</p>
                <p className="text-xs text-muted-foreground">View hazards to see them here</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="popular" className="space-y-3 mt-4">
          <div className="space-y-2">
            {mostUsedHazards.map((hazard, index) => (
              <div key={hazard.id} className="relative">
                <div className="absolute left-2 top-2 z-10">
                  <Badge variant="secondary" className="text-xs h-5 w-5 rounded-full p-0 flex items-center justify-center">
                    {index + 1}
                  </Badge>
                </div>
                <HazardCard hazard={hazard} />
              </div>
            ))}
          </div>
        </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default EnhancedHazardDatabase;