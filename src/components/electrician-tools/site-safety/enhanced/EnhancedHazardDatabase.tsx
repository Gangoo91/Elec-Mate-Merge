import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Shield, Search, AlertTriangle, Star, Clock, Plus, 
  Filter, BookmarkPlus, Eye, ChevronDown, ChevronUp,
  Zap, HardHat, Building2, FlameKindling, Wind, Users, Hammer
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
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedRiskLevel, setSelectedRiskLevel] = useState<string>('all');
  const [activeTab, setActiveTab] = useState('browse');
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [recentlyViewed, setRecentlyViewed] = useState<string[]>([]);
  const [expandedHazards, setExpandedHazards] = useState<Set<string>>(new Set());

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
              <div className="p-2 rounded-lg bg-primary/10 border border-primary/20 shrink-0">
                <IconComponent className="h-4 w-4 text-primary" />
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
                    <ChevronUp className="h-3.5 w-3.5 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
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
                  variant="outline" 
                  size="sm" 
                  className="h-6 text-xs px-2"
                  onClick={() => {/* Add to RAMS functionality */}}
                >
                  <Plus className="h-3 w-3 mr-1" />
                  Add to RAMS
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-4">
      {/* Header & Search */}
      <Card className="border-elec-yellow/20 bg-elec-gray/80 backdrop-blur-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-primary flex items-center gap-2 text-lg">
            <Shield className="h-5 w-5" />
            Enhanced Hazard Database
          </CardTitle>
          <p className="text-xs text-muted-foreground">
            Comprehensive electrical and workplace hazards with risk assessments
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search hazards, controls, regulations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-10 bg-background/50"
            />
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap gap-2">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="text-xs px-2 py-1 rounded border bg-background"
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
              className="text-xs px-2 py-1 rounded border bg-background"
            >
              <option value="all">All Risk Levels</option>
              <option value="Very High">Very High</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
        {[
          { label: 'Very High', count: transformedHazards.filter(h => h.riskLevel === 'Very High').length, color: 'text-destructive' },
          { label: 'High Risk', count: transformedHazards.filter(h => h.riskLevel === 'High').length, color: 'text-orange-400' },
          { label: 'Favorites', count: favorites.size, color: 'text-primary' },
          { label: 'Total', count: transformedHazards.length, color: 'text-foreground' }
        ].map((stat, index) => (
          <Card key={index} className="border-elec-yellow/30 bg-elec-gray/50 hover:bg-elec-gray/70 transition-colors">
            <CardContent className="p-3 text-center">
              <div className={`text-lg font-bold ${stat.color}`}>{stat.count}</div>
              <div className="text-xs text-muted-foreground">{stat.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tabbed Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 h-9">
          <TabsTrigger value="browse" className="text-xs">Browse</TabsTrigger>
          <TabsTrigger value="favorites" className="text-xs">
            Favorites ({favorites.size})
          </TabsTrigger>
          <TabsTrigger value="recent" className="text-xs">Recent</TabsTrigger>
          <TabsTrigger value="popular" className="text-xs">Popular</TabsTrigger>
        </TabsList>

        <TabsContent value="browse" className="space-y-3 mt-4">
          {filteredHazards.length > 0 ? (
            <div className="space-y-2">
              {filteredHazards.map((hazard) => (
                <MobileGestureHandler
                  key={hazard.id}
                  onTap={() => toggleHazardExpansion(hazard.id)}
                  onLongPress={() => toggleFavorite(hazard.id)}
                >
                  <HazardCard hazard={hazard} />
                </MobileGestureHandler>
              ))}
            </div>
          ) : (
            <Card className="border-dashed border-elec-yellow/50 bg-elec-gray/30">
              <CardContent className="p-6 text-center">
                <Shield className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground mb-1">No hazards found</p>
                <p className="text-xs text-muted-foreground">Try adjusting your search or filters</p>
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
                <Star className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
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
                <Clock className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
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
    </div>
  );
};

export default EnhancedHazardDatabase;