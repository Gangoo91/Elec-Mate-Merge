import React, { useState, useMemo } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Task } from '@/types/enhanced-rams';
import { useEnhancedRAMS } from '@/hooks/useEnhancedRAMS';
import { 
  Search, 
  Link, 
  X, 
  AlertTriangle, 
  CheckCircle,
  Star,
  TrendingUp
} from 'lucide-react';

interface HazardLinkingPanelProps {
  task: Task;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const HazardLinkingPanel: React.FC<HazardLinkingPanelProps> = ({ task, open, onOpenChange }) => {
  const { 
    hazards, 
    customHazards, 
    linkHazardToTask, 
    getHazardSuggestions,
    updateTask
  } = useEnhancedRAMS();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Get all hazards (default + custom)
  const allHazards = useMemo(() => {
    const defaultHazards = hazards.map(h => ({
      id: h.hazard_id,
      name: h.hazard_name,
      category: h.category,
      frequency: h.frequency,
      is_custom: false
    }));
    
    const customHazardsList = customHazards.map(ch => ({
      id: ch.id,
      name: ch.name,
      category: ch.category,
      frequency: 0,
      is_custom: true
    }));
    
    return [...defaultHazards, ...customHazardsList];
  }, [hazards, customHazards]);

  // Filter hazards
  const filteredHazards = useMemo(() => {
    return allHazards.filter(hazard => {
      const matchesSearch = hazard.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           hazard.category.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || hazard.category === selectedCategory;
      const notAlreadyLinked = !task.linked_hazards.includes(hazard.id);
      
      return matchesSearch && matchesCategory && notAlreadyLinked;
    });
  }, [allHazards, searchTerm, selectedCategory, task.linked_hazards]);

  // Get suggestions
  const suggestions = getHazardSuggestions(task);

  // Get categories
  const categories = useMemo(() => {
    return Array.from(new Set(allHazards.map(h => h.category)));
  }, [allHazards]);

  // Get currently linked hazards with details
  const linkedHazardDetails = useMemo(() => {
    return task.linked_hazards.map(hazardId => {
      const hazard = allHazards.find(h => h.id === hazardId);
      return hazard || { id: hazardId, name: hazardId, category: 'Unknown', frequency: 0, is_custom: false };
    });
  }, [task.linked_hazards, allHazards]);

  // Handle hazard linking
  const handleLinkHazard = async (hazardId: string) => {
    try {
      await linkHazardToTask(task.id, hazardId);
    } catch (error) {
      console.error('Failed to link hazard:', error);
    }
  };

  // Handle hazard unlinking
  const handleUnlinkHazard = async (hazardId: string) => {
    try {
      const updatedHazards = task.linked_hazards.filter(id => id !== hazardId);
      await updateTask(task.id, { linked_hazards: updatedHazards });
    } catch (error) {
      console.error('Failed to unlink hazard:', error);
    }
  };

  const HazardCard: React.FC<{ 
    hazard: { id: string; name: string; category: string; frequency: number; is_custom: boolean };
    showLinkButton?: boolean;
    showUnlinkButton?: boolean;
  }> = ({ hazard, showLinkButton = false, showUnlinkButton = false }) => (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h4 className="font-medium mb-1">{hazard.name}</h4>
            <p className="text-sm text-muted-foreground mb-2">{hazard.category}</p>
            <div className="flex gap-2">
              {hazard.is_custom && (
                <Badge variant="secondary" className="text-xs">Custom</Badge>
              )}
              {hazard.frequency > 0 && (
                <Badge variant="outline" className="text-xs">
                  Used {hazard.frequency}x
                </Badge>
              )}
            </div>
          </div>
          
          {showLinkButton && (
            <Button
              size="sm"
              onClick={() => handleLinkHazard(hazard.id)}
              className="ml-2"
            >
              <Link className="w-3 h-3 mr-1" />
              Link
            </Button>
          )}
          
          {showUnlinkButton && (
            <Button
              size="sm"
              variant="destructive"
              onClick={() => handleUnlinkHazard(hazard.id)}
              className="ml-2"
            >
              <X className="w-3 h-3 mr-1" />
              Unlink
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Link className="w-5 h-5" />
            Link Hazards to: {task.title}
          </DialogTitle>
        </DialogHeader>

        {/* Currently linked hazards */}
        {linkedHazardDetails.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                Currently Linked Hazards ({linkedHazardDetails.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {linkedHazardDetails.map(hazard => (
                  <HazardCard 
                    key={hazard.id} 
                    hazard={hazard} 
                    showUnlinkButton={true}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Hazard browser */}
        <Tabs defaultValue="suggestions" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="suggestions">Suggestions</TabsTrigger>
            <TabsTrigger value="browse">Browse All</TabsTrigger>
            <TabsTrigger value="frequent">Most Used</TabsTrigger>
          </TabsList>

          {/* Suggestions tab */}
          <TabsContent value="suggestions">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-amber-500" />
                  Suggested Hazards for {task.category}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {suggestions.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {suggestions.slice(0, 6).map(suggestion => {
                      const hazard = allHazards.find(h => h.id === suggestion.id);
                      if (!hazard) return null;
                      
                      return (
                        <HazardCard 
                          key={hazard.id} 
                          hazard={hazard} 
                          showLinkButton={true}
                        />
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <AlertTriangle className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-lg font-semibold mb-2">No suggestions available</h3>
                    <p className="text-muted-foreground">
                      Browse all hazards to find relevant ones for this task
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Browse all tab */}
          <TabsContent value="browse">
            <Card>
              <CardHeader>
                <CardTitle>Browse All Hazards</CardTitle>
                <div className="flex gap-4">
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
              </CardHeader>
              <CardContent>
                {filteredHazards.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-96 overflow-y-auto">
                    {filteredHazards.map(hazard => (
                      <HazardCard 
                        key={hazard.id} 
                        hazard={hazard} 
                        showLinkButton={true}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Search className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-lg font-semibold mb-2">No hazards found</h3>
                    <p className="text-muted-foreground">
                      Try adjusting your search or category filter
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Most used tab */}
          <TabsContent value="frequent">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Most Frequently Used Hazards
                </CardTitle>
              </CardHeader>
              <CardContent>
                {(() => {
                  const frequentHazards = allHazards
                    .filter(h => h.frequency > 0 && !task.linked_hazards.includes(h.id))
                    .sort((a, b) => b.frequency - a.frequency)
                    .slice(0, 10);

                  return frequentHazards.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {frequentHazards.map(hazard => (
                        <HazardCard 
                          key={hazard.id} 
                          hazard={hazard} 
                          showLinkButton={true}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <TrendingUp className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                      <h3 className="text-lg font-semibold mb-2">No usage data yet</h3>
                      <p className="text-muted-foreground">
                        Hazards you use frequently will appear here
                      </p>
                    </div>
                  );
                })()}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end pt-4">
          <Button onClick={() => onOpenChange(false)}>
            Done
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default HazardLinkingPanel;