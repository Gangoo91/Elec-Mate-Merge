// Enhanced Hazard Database Component
// Provides tabbed interface for comprehensive hazard management

import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search, 
  Plus, 
  Zap, 
  HardHat, 
  AlertTriangle, 
  Hammer, 
  FlameKindling, 
  Wind,
  Building2,
  Users,
  Star,
  Clock,
  TrendingUp
} from 'lucide-react';
import { useEnhancedRAMS } from '@/hooks/useEnhancedRAMS';
import { hazardCategories } from '@/data/hazards';
import { EnhancedHazard } from '@/types/enhanced-rams';
import CustomHazardDialog from './CustomHazardDialog';
import HazardDetailsPanel from './HazardDetailsPanel';

// Icon mapping for hazard categories
const categoryIcons = {
  'Electrical Hazards': Zap,
  'Working at Height': HardHat,
  'Asbestos & Hazardous Materials': AlertTriangle,
  'Manual Handling': Hammer,
  'Fire & Explosion': FlameKindling,
  'Environmental': Wind,
  'Tools & Equipment': Building2,
  'Human Factors': Users
};

const HazardDatabase: React.FC = () => {
  const {
    hazards,
    customHazards,
    loading,
    createCustomHazard,
    trackUsage
  } = useEnhancedRAMS();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [selectedHazard, setSelectedHazard] = useState<EnhancedHazard | null>(null);
  const [activeTab, setActiveTab] = useState('browse');

  // Get all hazards (default + custom)
  const allHazards = useMemo(() => {
    return [...hazards, ...customHazards.map(ch => ({
      id: ch.id,
      user_id: ch.user_id,
      hazard_id: ch.id,
      hazard_name: ch.name,
      category: ch.category,
      linked_tasks: [],
      linked_risks: [],
      linked_method_statements: [],
      frequency: 0,
      last_used: ch.created_at,
      custom_controls: ch.default_controls,
      is_custom: true,
      created_at: ch.created_at,
      updated_at: ch.updated_at
    } as EnhancedHazard))];
  }, [hazards, customHazards]);

  // Filter hazards based on search and category
  const filteredHazards = useMemo(() => {
    return allHazards.filter(hazard => {
      const matchesSearch = hazard.hazard_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           hazard.category.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || hazard.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [allHazards, searchTerm, selectedCategory]);

  // Group hazards by category
  const hazardsByCategory = useMemo(() => {
    const grouped: Record<string, EnhancedHazard[]> = {};
    
    filteredHazards.forEach(hazard => {
      if (!grouped[hazard.category]) {
        grouped[hazard.category] = [];
      }
      grouped[hazard.category].push(hazard);
    });

    // Sort hazards within each category by frequency
    Object.keys(grouped).forEach(category => {
      grouped[category].sort((a, b) => b.frequency - a.frequency);
    });

    return grouped;
  }, [filteredHazards]);

  // Get most frequently used hazards
  const frequentHazards = useMemo(() => {
    return allHazards
      .filter(h => h.frequency > 0)
      .sort((a, b) => b.frequency - a.frequency)
      .slice(0, 10);
  }, [allHazards]);

  // Get recently used hazards
  const recentHazards = useMemo(() => {
    return allHazards
      .sort((a, b) => new Date(b.last_used).getTime() - new Date(a.last_used).getTime())
      .slice(0, 10);
  }, [allHazards]);

  // Get unique categories for filter
  const categories = useMemo(() => {
    return Array.from(new Set(allHazards.map(h => h.category)));
  }, [allHazards]);

  // Handle hazard selection and tracking
  const handleHazardSelect = async (hazard: EnhancedHazard) => {
    setSelectedHazard(hazard);
    await trackUsage('hazard', hazard.hazard_id, 'view', {
      category: hazard.category,
      source: 'database'
    });
  };

  const HazardCard: React.FC<{ 
    hazard: EnhancedHazard; 
    showCategory?: boolean;
    showUsage?: boolean;
  }> = ({ 
    hazard, 
    showCategory = false,
    showUsage = false 
  }) => {
    const IconComponent = categoryIcons[hazard.category as keyof typeof categoryIcons] || AlertTriangle;

    return (
      <Card 
        className="cursor-pointer hover:shadow-md transition-shadow border-l-4 border-l-primary/20 hover:border-l-primary"
        onClick={() => handleHazardSelect(hazard)}
      >
        <CardContent className="p-4">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2">
              <IconComponent className="w-5 h-5 text-primary" />
              <h3 className="font-medium leading-tight">{hazard.hazard_name}</h3>
            </div>
            
            <div className="flex items-center gap-2">
              {hazard.is_custom && (
                <Badge variant="secondary" className="text-xs">Custom</Badge>
              )}
              {showUsage && hazard.frequency > 0 && (
                <Badge variant="outline" className="text-xs">
                  Used {hazard.frequency}x
                </Badge>
              )}
            </div>
          </div>

          {showCategory && (
            <p className="text-sm text-muted-foreground mb-2">{hazard.category}</p>
          )}

          {/* Linked items summary */}
          {(hazard.linked_tasks.length > 0 || hazard.linked_risks.length > 0) && (
            <div className="flex gap-4 text-xs text-muted-foreground">
              {hazard.linked_tasks.length > 0 && (
                <span>{hazard.linked_tasks.length} task(s)</span>
              )}
              {hazard.linked_risks.length > 0 && (
                <span>{hazard.linked_risks.length} risk(s)</span>
              )}
            </div>
          )}

          {/* Custom controls preview */}
          {hazard.custom_controls && hazard.custom_controls.length > 0 && (
            <div className="mt-2">
              <p className="text-xs text-muted-foreground">
                {hazard.custom_controls.length} custom control(s)
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <Clock className="w-8 h-8 animate-spin mx-auto mb-2" />
          <p>Loading hazard database...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Hazard Database</h2>
          <p className="text-muted-foreground">
            Comprehensive hazard library with intelligent categorization
          </p>
        </div>
        <Button onClick={() => setShowCreateDialog(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Custom Hazard
        </Button>
      </div>

      {/* Search and filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search hazards..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-input rounded-md bg-background text-sm"
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Hazard content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="browse">Browse All</TabsTrigger>
          <TabsTrigger value="frequent">Most Used</TabsTrigger>
          <TabsTrigger value="recent">Recently Used</TabsTrigger>
          <TabsTrigger value="custom">Custom Hazards</TabsTrigger>
        </TabsList>

        {/* Browse all hazards by category */}
        <TabsContent value="browse" className="mt-6">
          <div className="space-y-6">
            {Object.entries(hazardsByCategory).map(([category, categoryHazards]) => {
              const IconComponent = categoryIcons[category as keyof typeof categoryIcons] || AlertTriangle;
              
              return (
                <Card key={category}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <IconComponent className="w-5 h-5" />
                      {category}
                      <Badge variant="outline">{categoryHazards.length}</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {categoryHazards.map(hazard => (
                        <HazardCard 
                          key={hazard.hazard_id} 
                          hazard={hazard} 
                          showUsage={true}
                        />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        {/* Most frequently used hazards */}
        <TabsContent value="frequent" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Most Frequently Used Hazards
              </CardTitle>
            </CardHeader>
            <CardContent>
              {frequentHazards.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {frequentHazards.map(hazard => (
                    <HazardCard 
                      key={hazard.hazard_id} 
                      hazard={hazard} 
                      showCategory={true}
                      showUsage={true}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <TrendingUp className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-semibold mb-2">No usage data yet</h3>
                  <p className="text-muted-foreground">
                    Start using hazards in your tasks to see frequency data here
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Recently used hazards */}
        <TabsContent value="recent" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Recently Used Hazards
              </CardTitle>
            </CardHeader>
            <CardContent>
              {recentHazards.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {recentHazards.map(hazard => (
                    <HazardCard 
                      key={hazard.hazard_id} 
                      hazard={hazard} 
                      showCategory={true}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Clock className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-semibold mb-2">No recent usage</h3>
                  <p className="text-muted-foreground">
                    Hazards you use will appear here for quick access
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Custom hazards */}
        <TabsContent value="custom" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="w-5 h-5" />
                Your Custom Hazards
              </CardTitle>
            </CardHeader>
            <CardContent>
              {customHazards.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {customHazards.map(hazard => (
                    <HazardCard 
                      key={hazard.id} 
                      hazard={{
                        id: hazard.id,
                        user_id: hazard.user_id,
                        hazard_id: hazard.id,
                        hazard_name: hazard.name,
                        category: hazard.category,
                        linked_tasks: [],
                        linked_risks: [],
                        linked_method_statements: [],
                        frequency: 0,
                        last_used: hazard.created_at,
                        custom_controls: hazard.default_controls,
                        is_custom: true,
                        created_at: hazard.created_at,
                        updated_at: hazard.updated_at
                      }}
                      showCategory={true}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Star className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-semibold mb-2">No custom hazards yet</h3>
                  <p className="text-muted-foreground mb-4">
                    Create custom hazards specific to your work environment
                  </p>
                  <Button onClick={() => setShowCreateDialog(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Create Custom Hazard
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Dialogs */}
      <CustomHazardDialog
        open={showCreateDialog}
        onOpenChange={setShowCreateDialog}
      />
      
      {selectedHazard && (
        <HazardDetailsPanel
          hazard={selectedHazard}
          open={!!selectedHazard}
          onOpenChange={(open) => !open && setSelectedHazard(null)}
        />
      )}
    </div>
  );
};

export default HazardDatabase;