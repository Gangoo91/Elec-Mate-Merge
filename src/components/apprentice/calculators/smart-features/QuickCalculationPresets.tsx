
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Zap, Home, Building, Factory, Wrench } from "lucide-react";

interface PresetScenario {
  id: string;
  name: string;
  description: string;
  category: 'domestic' | 'commercial' | 'industrial' | 'common';
  icon: React.ReactNode;
  inputs: { [key: string]: string };
  explanation: string;
}

interface QuickCalculationPresetsProps {
  calculatorType: string;
  onPresetSelect: (preset: PresetScenario) => void;
}

const QuickCalculationPresets: React.FC<QuickCalculationPresetsProps> = ({
  calculatorType,
  onPresetSelect
}) => {
  const getPresetsForCalculator = (type: string): PresetScenario[] => {
    switch (type) {
      case 'three-phase-load':
        return [
          {
            id: 'industrial-motor',
            name: 'Industrial Motor 15kW',
            description: '15kW three-phase induction motor',
            category: 'industrial',
            icon: <Factory className="h-4 w-4" />,
            inputs: { power: '15', voltage: '400', powerFactor: '0.85', efficiency: '0.9' },
            explanation: 'Typical 15kW industrial motor with standard efficiency'
          },
          {
            id: 'hvac-system',
            name: 'HVAC System 25kW',
            description: 'Commercial HVAC compressor load',
            category: 'commercial',
            icon: <Building className="h-4 w-4" />,
            inputs: { power: '25', voltage: '415', powerFactor: '0.82', efficiency: '0.88' },
            explanation: 'Large commercial HVAC system with variable load'
          },
          {
            id: 'pump-station',
            name: 'Pump Station 7.5kW',
            description: 'Water pump installation',
            category: 'industrial',
            icon: <Factory className="h-4 w-4" />,
            inputs: { power: '7.5', voltage: '400', powerFactor: '0.87', efficiency: '0.91' },
            explanation: 'Centrifugal pump with high efficiency motor'
          }
        ];
        
      case 'ohms-law':
        return [
          {
            id: 'led-strip',
            name: 'LED Strip Lighting',
            description: '12V LED strip power calculation',
            category: 'domestic',
            icon: <Home className="h-4 w-4" />,
            inputs: { voltage: '12', current: '1.5' },
            explanation: 'Common 12V LED strip drawing 1.5A'
          },
          {
            id: 'socket-outlet',
            name: 'Socket Outlet',
            description: '230V socket with 13A load',
            category: 'domestic',
            icon: <Home className="h-4 w-4" />,
            inputs: { voltage: '230', current: '13' },
            explanation: 'Maximum load on UK domestic socket'
          },
          {
            id: 'industrial-motor',
            name: 'Industrial Motor',
            description: '400V three-phase motor',
            category: 'industrial',
            icon: <Factory className="h-4 w-4" />,
            inputs: { voltage: '400', power: '5500' },
            explanation: '5.5kW industrial motor on 400V supply'
          }
        ];
      
      case 'cable-size':
        return [
          {
            id: 'lighting-circuit',
            name: 'Lighting Circuit',
            description: 'Domestic lighting circuit',
            category: 'domestic',
            icon: <Home className="h-4 w-4" />,
            inputs: { current: '6', length: '15', voltage: '230', voltageDrop: '3' },
            explanation: '6A lighting circuit, 15m run, 3% voltage drop limit'
          },
          {
            id: 'socket-circuit',
            name: 'Socket Circuit',
            description: 'Ring final circuit',
            category: 'domestic',
            icon: <Home className="h-4 w-4" />,
            inputs: { current: '32', length: '50', voltage: '230', voltageDrop: '5' },
            explanation: '32A ring final, 50m total length'
          },
          {
            id: 'submain-feed',
            name: 'Sub-main Feed',
            description: 'Distribution board feed',
            category: 'commercial',
            icon: <Building className="h-4 w-4" />,
            inputs: { current: '63', length: '25', voltage: '400', voltageDrop: '5' },
            explanation: '63A three-phase sub-main, 25m run'
          }
        ];
      
      case 'power-factor':
        return [
          {
            id: 'fluorescent-lighting',
            name: 'Fluorescent Lighting',
            description: 'Office fluorescent lights',
            category: 'commercial',
            icon: <Building className="h-4 w-4" />,
            inputs: { activePower: '2000', apparentPower: '2500' },
            explanation: 'Typical fluorescent lighting with magnetic ballasts'
          },
          {
            id: 'electric-motor',
            name: 'Electric Motor',
            description: 'Induction motor load',
            category: 'industrial',
            icon: <Factory className="h-4 w-4" />,
            inputs: { voltage: '400', current: '10', activePower: '5500' },
            explanation: 'Three-phase induction motor at full load'
          },
          {
            id: 'mixed-commercial',
            name: 'Mixed Commercial Load',
            description: 'Office building mixed load',
            category: 'commercial',
            icon: <Building className="h-4 w-4" />,
            inputs: { activePower: '15000', apparentPower: '18000' },
            explanation: 'Typical office building with mixed loads'
          }
        ];
      
      case 'voltage-drop':
        return [
          {
            id: 'long-garden-run',
            name: 'Garden Outbuilding',
            description: 'SWA cable to garden building',
            category: 'domestic',
            icon: <Home className="h-4 w-4" />,
            inputs: { current: '20', length: '40', cableSize: '4', voltage: '230' },
            explanation: '20A supply to garden office, 40m SWA run'
          },
          {
            id: 'street-lighting',
            name: 'Street Lighting',
            description: 'Highway lighting circuit',
            category: 'commercial',
            icon: <Building className="h-4 w-4" />,
            inputs: { current: '10', length: '100', cableSize: '6', voltage: '230' },
            explanation: 'Street lighting circuit, 100m cable run'
          }
        ];
      
      default:
        return [];
    }
  };

  const presets = getPresetsForCalculator(calculatorType);
  
  if (presets.length === 0) return null;

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'domestic':
        return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'commercial':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'industrial':
        return 'bg-orange-500/20 text-orange-300 border-orange-500/30';
      default:
        return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-sm">
          <Wrench className="h-4 w-4" />
          Quick Start Scenarios
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3">
          {presets.map((preset) => (
            <div
              key={preset.id}
              className="p-3 rounded border border-elec-yellow/10 bg-elec-dark/30 hover:bg-elec-dark/50 transition-colors cursor-pointer"
              onClick={() => onPresetSelect(preset)}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  {preset.icon}
                  <h4 className="font-medium text-sm">{preset.name}</h4>
                </div>
                <Badge className={getCategoryColor(preset.category)}>
                  {preset.category}
                </Badge>
              </div>
              
              <p className="text-xs text-muted-foreground mb-2">
                {preset.description}
              </p>
              
              <div className="flex items-center justify-between">
                <div className="flex gap-1 flex-wrap">
                  {Object.entries(preset.inputs).slice(0, 3).map(([key, value]) => (
                    <Badge key={key} variant="outline" className="text-xs">
                      {key}: {value}
                    </Badge>
                  ))}
                </div>
                <Button variant="ghost" size="sm" className="h-6 px-2">
                  <Zap className="h-3 w-3" />
                </Button>
              </div>
              
              <p className="text-xs text-blue-300 mt-2 italic">
                {preset.explanation}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickCalculationPresets;
export type { PresetScenario };
