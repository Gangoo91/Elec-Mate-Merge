import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Shield, Search, Plus, AlertTriangle } from 'lucide-react';
import { useRAMS } from '../rams/RAMSContext';
import { toast } from '@/hooks/use-toast';
import { hazardCategories, enhancedRiskConsequences } from '@/data/hazards';
import { getRiskLevel, getRiskColor } from '@/data/enhanced-hazard-database';

interface HazardSelectorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onHazardSelect: (hazard: any) => void;
  selectedTaskId?: string;
}

const HazardSelector: React.FC<HazardSelectorProps> = ({ 
  open, 
  onOpenChange, 
  onHazardSelect,
  selectedTaskId 
}) => {
  const { addRiskFromHazard, linkHazardToTask } = useRAMS();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Convert enhanced consequences to hazard format for compatibility
  const hazards = enhancedRiskConsequences.map(risk => {
    const category = hazardCategories.find(cat => 
      cat.hazards.includes(risk.hazardId)
    );
    
    return {
      id: risk.id,
      name: risk.hazardId,
      category: category?.name || "Other",
      description: risk.consequence,
      riskLevel: getRiskLevel(risk.riskRating),
      commonControls: [
        ...(risk.controlMeasures.elimination || []),
        ...(risk.controlMeasures.engineering || []),
        ...(risk.controlMeasures.administrative || []),
        ...(risk.controlMeasures.ppe || [])
      ].slice(0, 4),
      regulations: risk.bs7671References || [],
      icon: category?.icon || Shield,
      severity: risk.severity,
      likelihood: risk.likelihood,
      riskRating: risk.riskRating
    };
  });

  const categories = ["All", ...hazardCategories.map(cat => cat.name)];

  const filteredHazards = hazards.filter(hazard => {
    const matchesSearch = hazard.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         hazard.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || hazard.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getBadgeRiskColor = (level: string) => {
    switch (level) {
      case "Very Low": return "bg-green-500";
      case "Low": return "bg-blue-500";
      case "Medium": return "bg-yellow-500";
      case "High": return "bg-orange-500";
      case "Very High": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  const handleSelectHazard = (hazard: any) => {
    // Add risk assessment from hazard
    addRiskFromHazard(hazard, selectedTaskId);
    
    // Link hazard to task if task is selected
    if (selectedTaskId) {
      linkHazardToTask(selectedTaskId, hazard.id);
    }
    
    // Call the callback
    onHazardSelect(hazard);
    
    toast({
      title: 'Hazard Added',
      description: `${hazard.name} has been added to the risk assessment.`,
      variant: 'success'
    });
    
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Select Hazard from Database
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Search and Filter */}
          <div className="space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search hazards..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {/* Hazards List */}
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {filteredHazards.map((hazard) => {
              const IconComponent = hazard.icon;
              return (
                <Card key={hazard.id} className="border-border/50 hover:bg-muted/50 transition-colors cursor-pointer"
                      onClick={() => handleSelectHazard(hazard)}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-full bg-primary/20 flex-shrink-0">
                        <IconComponent className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-medium">{hazard.name}</h4>
                          <AlertTriangle className={`h-4 w-4 flex-shrink-0 ml-2 ${
                            hazard.riskLevel === "Very High" ? "text-red-500" :
                            hazard.riskLevel === "High" ? "text-orange-500" :
                            hazard.riskLevel === "Medium" ? "text-yellow-500" : "text-green-500"
                          }`} />
                        </div>
                        
                        <p className="text-sm text-muted-foreground mb-3">{hazard.description}</p>
                        
                        <div className="flex flex-wrap gap-2 mb-3">
                          <Badge variant="outline" className="text-xs">
                            {hazard.category}
                          </Badge>
                          <Badge className={`${getBadgeRiskColor(hazard.riskLevel)} text-white text-xs`}>
                            {hazard.riskLevel} Risk
                          </Badge>
                        </div>
                        
                        <div className="text-xs text-muted-foreground">
                          <strong>Control measures:</strong> {hazard.commonControls.slice(0, 2).join(', ')}
                          {hazard.commonControls.length > 2 && '...'}
                        </div>
                      </div>
                      <Button size="sm" className="ml-2">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {filteredHazards.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <Shield className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No hazards found matching your search criteria.</p>
              <p className="text-sm">Try adjusting your search terms or category filter.</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default HazardSelector;