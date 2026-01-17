
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Shield, CheckCircle, AlertTriangle, Search } from 'lucide-react';
import { cn } from '@/lib/utils';

const RcdRequirementsTab = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const rcdRequirements = [
    {
      location: 'Socket outlets ≤20A',
      requirement: 'Required',
      regulation: '411.3.3',
      rating: '30mA',
      reasoning: 'Additional protection against direct contact',
      category: 'mandatory'
    },
    {
      location: 'Bathroom circuits',
      requirement: 'Required',
      regulation: '701.411.3.3',
      rating: '30mA',
      reasoning: 'Enhanced safety in locations with increased shock risk',
      category: 'mandatory'
    },
    {
      location: 'Outdoor circuits',
      requirement: 'Required',
      regulation: '411.3.3',
      rating: '30mA',
      reasoning: 'Protection in potentially damp conditions',
      category: 'mandatory'
    },
    {
      location: 'Portable equipment outdoors',
      requirement: 'Required',
      regulation: '411.3.3',
      rating: '30mA',
      reasoning: 'Mobile equipment with higher risk of damage',
      category: 'mandatory'
    },
    {
      location: 'Swimming pools (Zone 1)',
      requirement: 'Required',
      regulation: '702.411.3.3',
      rating: '30mA',
      reasoning: 'Water and electricity safety requirements',
      category: 'mandatory'
    },
    {
      location: 'Cooker circuits',
      requirement: 'Not typically required',
      regulation: '411.3.3',
      rating: 'N/A',
      reasoning: 'Fixed appliance, lower risk of direct contact',
      category: 'optional'
    },
    {
      location: 'Lighting circuits',
      requirement: 'Not typically required',
      regulation: '411.3.3',
      rating: 'N/A',
      reasoning: 'Fixed installation, adequate basic protection',
      category: 'optional'
    },
    {
      location: 'Immersion heater',
      requirement: 'Not typically required',
      regulation: '411.3.3',
      rating: 'N/A',
      reasoning: 'Fixed appliance with adequate protection',
      category: 'optional'
    }
  ];

  const filteredRequirements = rcdRequirements.filter(req =>
    req.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    req.regulation.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Shield className="h-6 w-6 text-green-400" />
          RCD Protection Requirements
        </CardTitle>
        <CardDescription>
          When RCD protection is required under BS7671
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Search */}
        <div className="max-w-md">
          <div className="relative">
            {!searchTerm && (
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/70 pointer-events-none" />
            )}
            <Input
              type="text"
              placeholder="Search locations or regulations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={cn("bg-muted border-border text-foreground placeholder-white/70", !searchTerm && "pl-10")}
            />
          </div>
        </div>

        {/* Requirements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredRequirements.map((req, index) => (
            <Card 
              key={index} 
              className={`bg-muted border-2 ${
                req.category === 'mandatory' 
                  ? 'border-green-500/30 bg-green-500/5' 
                  : 'border-white/20 bg-white/5'
              }`}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-foreground text-base">{req.location}</CardTitle>
                  {req.category === 'mandatory' ? (
                    <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />
                  ) : (
                    <AlertTriangle className="h-5 w-5 text-white/70 flex-shrink-0" />
                  )}
                </div>
                <Badge 
                  className={
                    req.category === 'mandatory'
                      ? 'bg-green-500 text-foreground w-fit'
                      : 'bg-white/20 text-foreground w-fit'
                  }
                >
                  {req.requirement}
                </Badge>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-white/70">Regulation:</span>
                  <span className="text-elec-yellow font-semibold">{req.regulation}</span>
                </div>
                
                {req.rating !== 'N/A' && (
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-white/70">Rating:</span>
                    <span className="text-green-400 font-semibold">{req.rating}</span>
                  </div>
                )}
                
                <div className="pt-2 border-t border-border">
                  <p className="text-sm text-white/80">{req.reasoning}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RcdRequirementsTab;
