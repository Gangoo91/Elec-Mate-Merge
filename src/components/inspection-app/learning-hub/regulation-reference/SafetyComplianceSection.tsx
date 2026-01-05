
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Shield, AlertTriangle, CheckCircle, Zap, Home, Building, Car } from 'lucide-react';

const SafetyComplianceSection = () => {
  const [selectedLocation, setSelectedLocation] = useState('general');

  const safetyRequirements = {
    general: {
      title: 'General Safety Requirements',
      icon: Shield,
      color: 'text-blue-400',
      requirements: [
        {
          category: 'Shock Protection',
          regulation: '411.3.3',
          requirement: '30mA RCD protection for socket outlets ≤20A',
          criticality: 'mandatory',
          details: 'Additional protection against direct and indirect contact'
        },
        {
          category: 'Cable Protection',
          regulation: '522.6.202',
          requirement: '30mA RCD for cables buried <50mm in walls',
          criticality: 'mandatory',
          details: 'Protection against damage from nails, screws, etc.'
        },
        {
          category: 'Isolation',
          regulation: '537.2.1.1',
          requirement: 'Every circuit must be capable of isolation',
          criticality: 'mandatory',
          details: 'For maintenance and emergency switching'
        },
        {
          category: 'Earthing',
          regulation: '411.4.5',
          requirement: 'Zs must not exceed tabulated values',
          criticality: 'critical',
          details: 'Ensures protective device operates within required time'
        }
      ]
    },
    bathroom: {
      title: 'Bathroom & Wet Locations',
      icon: Home,
      color: 'text-cyan-400',
      requirements: [
        {
          category: 'Zone Classification',
          regulation: '701.32',
          requirement: 'Zones 0, 1, 2 classification system',
          criticality: 'critical',
          details: 'Determines what equipment can be installed where'
        },
        {
          category: 'RCD Protection',
          regulation: '701.411.3.3',
          requirement: '30mA RCD for all circuits in zones 1 & 2',
          criticality: 'mandatory',
          details: 'Essential for safety in wet conditions'
        },
        {
          category: 'IP Ratings',
          regulation: '701.512.2',
          requirement: 'Minimum IP ratings for each zone',
          criticality: 'mandatory',
          details: 'IPX4 minimum in zone 1, IPX1 in zone 2'
        },
        {
          category: 'Supplementary Bonding',
          regulation: '701.415.2',
          requirement: 'May be omitted if RCD protected',
          criticality: 'conditional',
          details: 'Required unless specific conditions are met'
        }
      ]
    },
    commercial: {
      title: 'Commercial & Industrial',
      icon: Building,
      color: 'text-purple-400',
      requirements: [
        {
          category: 'Emergency Lighting',
          regulation: '560.9',
          requirement: 'Separate supply or battery backup',
          criticality: 'mandatory',
          details: 'Essential safety system for evacuation'
        },
        {
          category: 'Fire Detection',
          regulation: '560.8',
          requirement: 'Fire-resistant cables where required',
          criticality: 'critical',
          details: 'Maintains circuit integrity during fire'
        },
        {
          category: 'Three-Phase Systems',
          regulation: '431.2.1',
          requirement: 'Phase sequence monitoring where required',
          criticality: 'conditional',
          details: 'Critical for motor protection'
        },
        {
          category: 'Discrimination',
          regulation: '536.1',
          requirement: 'Protective device coordination',
          criticality: 'mandatory',
          details: 'Prevents unnecessary supply interruption'
        }
      ]
    },
    ev: {
      title: 'EV Charging',
      icon: Car,
      color: 'text-green-400',
      requirements: [
        {
          category: 'RCD Protection',
          regulation: '722.531.2.101',
          requirement: 'Type A or Type B RCD required',
          criticality: 'mandatory',
          details: 'DC fault detection capability essential'
        },
        {
          category: 'Surge Protection',
          regulation: '722.534',
          requirement: 'SPD required at origin of installation',
          criticality: 'mandatory',
          details: 'Protection against transient overvoltages'
        },
        {
          category: 'Load Management',
          regulation: '722.311',
          requirement: 'Consider diversity and demand',
          criticality: 'planning',
          details: 'Prevent overloading of supply'
        },
        {
          category: 'PME Earthing',
          regulation: '722.411.4.1',
          requirement: 'Additional measures may be required',
          criticality: 'conditional',
          details: 'Depends on installation type and location'
        }
      ]
    }
  };

  const complianceChecklist = [
    { item: 'All circuits have appropriate overcurrent protection', regulation: '433.1', status: 'check' },
    { item: 'Socket outlets ≤20A have 30mA RCD protection', regulation: '411.3.3', status: 'check' },
    { item: 'All single-pole devices connected in line conductor', regulation: '132.14.1', status: 'check' },
    { item: 'Protective conductor continuity verified', regulation: '612.2.1', status: 'check' },
    { item: 'Insulation resistance ≥1MΩ achieved', regulation: '612.3.2', status: 'check' },
    { item: 'Earth fault loop impedance within limits', regulation: '411.4.5', status: 'check' },
    { item: 'RCD operation times within specification', regulation: '612.13.2', status: 'check' },
    { item: 'Installation complies with special location requirements', regulation: 'Part 7', status: 'check' }
  ];

  const currentLocation = safetyRequirements[selectedLocation as keyof typeof safetyRequirements];
  const IconComponent = currentLocation.icon;

  return (
    <div className="space-y-6">
      <div className="text-center px-2 sm:px-4">
        <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">Safety & Compliance</h2>
        <p className="text-sm sm:text-base text-white">Essential safety requirements and compliance checks</p>
      </div>

      {/* Location Selection */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Object.entries(safetyRequirements).map(([key, location]) => {
          const LocationIcon = location.icon;
          return (
            <Button
              key={key}
              variant={selectedLocation === key ? "default" : "outline"}
              className={`h-20 flex-col gap-2 ${
                selectedLocation === key 
                  ? 'bg-elec-yellow text-black' 
                  : 'border-border text-foreground hover:bg-muted'
              }`}
              onClick={() => setSelectedLocation(key)}
            >
              <LocationIcon className="h-6 w-6" />
              <span className="text-sm font-medium">{location.title}</span>
            </Button>
          );
        })}
      </div>

      {/* Selected Location Requirements */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className={`flex items-center gap-2 ${currentLocation.color}`}>
            <IconComponent className="h-6 w-6" />
            {currentLocation.title} Safety Requirements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentLocation.requirements.map((req, index) => (
              <div key={index} className="p-4 bg-muted rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium text-foreground">{req.category}</h4>
                  <Badge className={`text-xs ${
                    req.criticality === 'mandatory' ? 'bg-red-500/20 text-red-400' :
                    req.criticality === 'critical' ? 'bg-orange-500/20 text-orange-400' :
                    req.criticality === 'conditional' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-blue-500/20 text-blue-400'
                  }`}>
                    {req.criticality.toUpperCase()}
                  </Badge>
                </div>
                <p className="text-sm text-elec-yellow font-medium mb-2">{req.requirement}</p>
                <p className="text-xs text-white/80 mb-2">{req.details}</p>
                <Badge variant="secondary" className="text-xs">
                  {req.regulation}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Compliance Checklist */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-elec-yellow flex items-center gap-2">
            <CheckCircle className="h-5 w-5" />
            Essential Compliance Checklist
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {complianceChecklist.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div className="flex-1">
                  <p className="text-foreground font-medium mb-1">{item.item}</p>
                  <Badge variant="secondary" className="text-xs">
                    {item.regulation}
                  </Badge>
                </div>
                <div className="w-6 h-6 border-2 border-elec-yellow rounded flex items-center justify-center">
                  <CheckCircle className="h-4 w-4 text-elec-yellow" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Critical Safety Alerts */}
      <div className="space-y-4">
        <Alert className="border-red-500/50 bg-red-500/10">
          <AlertTriangle className="h-4 w-4 text-red-400" />
          <AlertDescription className="text-red-300">
            <strong>Critical Safety Reminder:</strong> Never work on live circuits. Always isolate, 
            lock off, test and prove dead before commencing work.
          </AlertDescription>
        </Alert>

        <Alert className="border-yellow-500/50 bg-yellow-500/10">
          <AlertTriangle className="h-4 w-4 text-yellow-400" />
          <AlertDescription className="text-yellow-300">
            <strong>RCD Protection:</strong> 30mA RCDs are mandatory for socket outlets ≤20A 
            and cables buried less than 50mm in walls (522.6.202).
          </AlertDescription>
        </Alert>

        <Alert className="border-blue-500/50 bg-blue-500/10">
          <Zap className="h-4 w-4 text-blue-400" />
          <AlertDescription className="text-blue-300">
            <strong>Testing Reminder:</strong> All safety systems must be tested during initial 
            verification and periodic inspection to ensure continued protection.
          </AlertDescription>
        </Alert>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-elec-yellow text-lg">Safety Documentation</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start border-border text-foreground hover:bg-muted">
              Download Safety Checklist
            </Button>
            <Button variant="outline" className="w-full justify-start border-border text-foreground hover:bg-muted">
              Special Location Guide
            </Button>
            <Button variant="outline" className="w-full justify-start border-border text-foreground hover:bg-muted">
              RCD Requirements Summary
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-elec-yellow text-lg">Emergency Contacts</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="p-3 bg-muted rounded text-center">
              <p className="text-foreground font-medium">Electrical Emergency</p>
              <p className="text-elec-yellow text-lg font-bold">999</p>
            </div>
            <div className="p-3 bg-muted rounded text-center">
              <p className="text-foreground font-medium">DNO Emergency</p>
              <p className="text-elec-yellow text-lg font-bold">105</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SafetyComplianceSection;
