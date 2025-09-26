import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Shield, Search, Plus, AlertTriangle, X } from 'lucide-react';
import { useHazardDatabase } from '../../hooks/useHazardDatabase';
import { MethodStatementData } from '@/types/method-statement';

interface HazardIntegrationStepProps {
  data: MethodStatementData;
  onDataChange: (updates: Partial<MethodStatementData>) => void;
  linkedHazards: string[];
  onHazardLink: (hazardId: string) => void;
  onHazardUnlink: (hazardId: string) => void;
}

const HazardIntegrationStep: React.FC<HazardIntegrationStepProps> = ({
  data,
  onDataChange,
  linkedHazards,
  onHazardLink,
  onHazardUnlink
}) => {
  const {
    filteredHazards,
    categories,
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    getHazardById,
    getRiskColor
  } = useHazardDatabase();

  const linkedHazardObjects = linkedHazards.map(id => getHazardById(id)).filter(Boolean);

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/20 bg-elec-gray/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-elec-yellow flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Hazard Assessment
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Link relevant hazards from the database to your method statement
          </p>
        </CardHeader>
      </Card>

      {/* Linked Hazards */}
      {linkedHazardObjects.length > 0 && (
        <Card className="border-green-500/20 bg-elec-gray/60">
          <CardHeader>
            <CardTitle className="text-white text-lg">Linked Hazards ({linkedHazardObjects.length})</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {linkedHazardObjects.map((hazard) => {
              const IconComponent = hazard?.icon;
              return (
                <Card key={hazard?.id} className="border-elec-yellow/30 bg-elec-dark/20">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        {IconComponent && (
                          <div className="p-2 rounded-full bg-elec-yellow/20 flex-shrink-0">
                            <IconComponent className="h-4 w-4 text-elec-yellow" />
                          </div>
                        )}
                        <div className="flex-1">
                          <h4 className="font-medium text-white mb-1">{hazard?.name}</h4>
                          <p className="text-sm text-muted-foreground mb-2">{hazard?.description}</p>
                          <div className="flex flex-wrap gap-2">
                            <Badge variant="outline" className="border-elec-yellow/30 text-muted-foreground text-xs">
                              {hazard?.category}
                            </Badge>
                            <Badge className={`${getRiskColor(hazard?.riskLevel || '')} text-white text-xs`}>
                              {hazard?.riskLevel} Risk
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <Button
                        onClick={() => onHazardUnlink(hazard?.id || '')}
                        size="sm"
                        variant="outline"
                        className="border-red-500/30 text-red-400 hover:bg-red-500/10 ml-3"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </CardContent>
        </Card>
      )}

      {/* Hazard Database Browser */}
      <Card className="border-elec-yellow/20 bg-elec-gray/60">
        <CardHeader>
          <CardTitle className="text-white">Hazard Database</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search and Filter */}
          <div className="space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search hazards..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-elec-dark/50 border-elec-yellow/20 text-white"
              />
            </div>
            
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={selectedCategory === category 
                    ? "bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90" 
                    : "border-elec-yellow/30 text-muted-foreground hover:bg-elec-yellow/10 hover:text-elec-yellow"
                  }
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {/* Available Hazards */}
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {filteredHazards.map((hazard) => {
              const IconComponent = hazard.icon;
              const isLinked = linkedHazards.includes(hazard.id);
              
              return (
                <Card key={hazard.id} 
                      className={`border-border/50 hover:bg-muted/20 transition-colors cursor-pointer ${
                        isLinked ? 'bg-green-500/10 border-green-500/30' : ''
                      }`}
                      onClick={() => isLinked ? onHazardUnlink(hazard.id) : onHazardLink(hazard.id)}>
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      {/* Header Section */}
                      <div className="grid grid-cols-[auto_1fr_auto] gap-4 items-center">
                        <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
                          <IconComponent className="h-6 w-6 text-primary" />
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex items-center gap-3">
                            <h4 className="font-semibold text-white text-lg">{hazard.name}</h4>
                            <AlertTriangle className={`h-5 w-5 ${
                              hazard.riskLevel === "Very High" ? "text-red-500" :
                              hazard.riskLevel === "High" ? "text-orange-500" :
                              hazard.riskLevel === "Medium" ? "text-yellow-500" : "text-green-500"
                            }`} />
                          </div>
                          <div className="flex items-center gap-3">
                            <Badge variant="outline" className="text-xs border-primary/30 text-muted-foreground">
                              {hazard.category}
                            </Badge>
                            <Badge className={`${getRiskColor(hazard.riskLevel)} text-white text-xs`}>
                              {hazard.riskLevel}
                            </Badge>
                          </div>
                        </div>
                        
                        <Button size="lg" variant={isLinked ? "destructive" : "default"} className="h-12 w-12 rounded-full">
                          {isLinked ? <X className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
                        </Button>
                      </div>
                      
                      {/* Description */}
                      <p className="text-sm text-muted-foreground leading-relaxed">{hazard.description}</p>
                      
                      {/* Control Measures */}
                      <div className="pt-2 border-t border-border/20">
                        <p className="text-xs text-muted-foreground">
                          <span className="font-medium text-white">Control measures:</span> {hazard.commonControls.slice(0, 2).join(', ')}
                          {hazard.commonControls.length > 2 && '...'}
                        </p>
                      </div>
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
        </CardContent>
      </Card>
    </div>
  );
};

export default HazardIntegrationStep;