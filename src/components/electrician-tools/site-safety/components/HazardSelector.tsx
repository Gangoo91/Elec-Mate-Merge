import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Shield, Search, Plus, AlertTriangle, Zap, HardHat, Flame, Droplets, Wind } from 'lucide-react';
import { useRAMS } from '../rams/RAMSContext';
import { toast } from '@/hooks/use-toast';

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

  const hazards = [
    {
      id: "1",
      name: "Electric Shock",
      category: "Electrical",
      description: "Contact with live electrical parts causing injury or death",
      riskLevel: "Very High",
      commonControls: [
        "Isolation and lock-off procedures",
        "Prove dead testing",
        "Appropriate PPE",
        "Safe systems of work"
      ],
      regulations: ["BS 7671", "CDM Regulations", "HASAWA"],
      icon: Zap
    },
    {
      id: "2", 
      name: "Arc Flash",
      category: "Electrical",
      description: "Explosive release of energy from electrical equipment",
      riskLevel: "Very High",
      commonControls: [
        "Arc flash PPE",
        "Remote operation where possible",
        "De-energise equipment",
        "Proper working distances"
      ],
      regulations: ["BS 7671", "IEC 61482"],
      icon: Flame
    },
    {
      id: "3",
      name: "Falls from Height",
      category: "Physical",
      description: "Risk of falling when working at elevated positions",
      riskLevel: "High",
      commonControls: [
        "Edge protection systems",
        "Safety harnesses",
        "Proper ladder use",
        "Mobile elevated work platforms"
      ],
      regulations: ["Work at Height Regulations", "CDM Regulations"],
      icon: HardHat
    },
    {
      id: "4",
      name: "Chemical Exposure", 
      category: "Chemical",
      description: "Exposure to hazardous substances and chemicals",
      riskLevel: "Medium",
      commonControls: [
        "Appropriate PPE",
        "Proper ventilation",
        "COSHH assessments",
        "Safe storage procedures"
      ],
      regulations: ["COSHH Regulations", "REACH"],
      icon: Droplets
    },
    {
      id: "5",
      name: "Confined Spaces",
      category: "Environmental",
      description: "Working in spaces with restricted entry/exit",
      riskLevel: "High",
      commonControls: [
        "Atmospheric testing",
        "Emergency rescue plans",
        "Continuous monitoring",
        "Permit to work systems"
      ],
      regulations: ["Confined Spaces Regulations", "CDM Regulations"],
      icon: Wind
    }
  ];

  const categories = ["All", "Electrical", "Physical", "Chemical", "Environmental"];

  const filteredHazards = hazards.filter(hazard => {
    const matchesSearch = hazard.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         hazard.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || hazard.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getRiskColor = (level: string) => {
    switch (level) {
      case "Low": return "bg-green-500";
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
                          <Badge className={`${getRiskColor(hazard.riskLevel)} text-white text-xs`}>
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