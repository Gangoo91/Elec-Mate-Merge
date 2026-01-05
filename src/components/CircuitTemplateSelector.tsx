
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Zap, Home, Utensils, Droplets, Car, Flame } from 'lucide-react';

interface CircuitTemplate {
  id: string;
  name: string;
  icon: React.ReactNode;
  circuits: Array<{
    circuitNumber: string;
    cableSize: string;
    cableType: string;
    protectiveDeviceRating: string;
    circuitDescription: string;
  }>;
}

interface CircuitTemplateSelectorProps {
  onSelectTemplate: (circuits: any[]) => void;
  onClose: () => void;
}

const CircuitTemplateSelector = ({ onSelectTemplate, onClose }: CircuitTemplateSelectorProps) => {
  const templates: CircuitTemplate[] = [
    {
      id: 'domestic-basic',
      name: 'Domestic Basic',
      icon: <Home className="h-5 w-5" />,
      circuits: [
        { circuitNumber: '1', cableSize: '6.0mm', cableType: 'pvc-twin-earth', protectiveDeviceRating: '32A MCB', circuitDescription: 'Ring Final - Sockets' },
        { circuitNumber: '2', cableSize: '1.5mm', cableType: 'pvc-twin-earth', protectiveDeviceRating: '6A MCB', circuitDescription: 'Lighting - Ground Floor' },
        { circuitNumber: '3', cableSize: '1.5mm', cableType: 'pvc-twin-earth', protectiveDeviceRating: '6A MCB', circuitDescription: 'Lighting - First Floor' },
        { circuitNumber: '4', cableSize: '2.5mm', cableType: 'pvc-twin-earth', protectiveDeviceRating: '20A MCB', circuitDescription: 'Immersion Heater' },
      ]
    },
    {
      id: 'domestic-full',
      name: 'Domestic Full House',
      icon: <Home className="h-5 w-5" />,
      circuits: [
        { circuitNumber: '1', cableSize: '2.5mm', cableType: 'pvc-twin-earth', protectiveDeviceRating: '32A MCB', circuitDescription: 'Ring Final - Ground Floor' },
        { circuitNumber: '2', cableSize: '2.5mm', cableType: 'pvc-twin-earth', protectiveDeviceRating: '32A MCB', circuitDescription: 'Ring Final - First Floor' },
        { circuitNumber: '3', cableSize: '1.5mm', cableType: 'pvc-twin-earth', protectiveDeviceRating: '6A MCB', circuitDescription: 'Lighting - Ground Floor' },
        { circuitNumber: '4', cableSize: '1.5mm', cableType: 'pvc-twin-earth', protectiveDeviceRating: '6A MCB', circuitDescription: 'Lighting - First Floor' },
        { circuitNumber: '5', cableSize: '6.0mm', cableType: 'pvc-twin-earth', protectiveDeviceRating: '32A MCB', circuitDescription: 'Cooker' },
        { circuitNumber: '6', cableSize: '10mm', cableType: 'pvc-twin-earth', protectiveDeviceRating: '40A MCB', circuitDescription: 'Electric Shower' },
        { circuitNumber: '7', cableSize: '2.5mm', cableType: 'pvc-twin-earth', protectiveDeviceRating: '20A MCB', circuitDescription: 'Immersion Heater' },
        { circuitNumber: '8', cableSize: '2.5mm', cableType: 'pvc-twin-earth', protectiveDeviceRating: '16A MCB', circuitDescription: 'Central Heating' },
      ]
    },
    {
      id: 'commercial-office',
      name: 'Commercial Office',
      icon: <Zap className="h-5 w-5" />,
      circuits: [
        { circuitNumber: '1', cableSize: '2.5mm', cableType: 'pvc-twin-earth', protectiveDeviceRating: '32A MCB', circuitDescription: 'General Sockets - Zone 1' },
        { circuitNumber: '2', cableSize: '2.5mm', cableType: 'pvc-twin-earth', protectiveDeviceRating: '32A MCB', circuitDescription: 'General Sockets - Zone 2' },
        { circuitNumber: '3', cableSize: '1.5mm', cableType: 'pvc-twin-earth', protectiveDeviceRating: '10A MCB', circuitDescription: 'Lighting - General' },
        { circuitNumber: '4', cableSize: '1.5mm', cableType: 'pvc-twin-earth', protectiveDeviceRating: '6A MCB', circuitDescription: 'Emergency Lighting' },
        { circuitNumber: '5', cableSize: '4.0mm', cableType: 'pvc-twin-earth', protectiveDeviceRating: '20A MCB', circuitDescription: 'Air Conditioning' },
        { circuitNumber: '6', cableSize: '1.5mm', cableType: 'pvc-twin-earth', protectiveDeviceRating: '6A MCB', circuitDescription: 'Fire Alarm System' },
      ]
    },
    {
      id: 'restaurant',
      name: 'Restaurant/Kitchen',
      icon: <Utensils className="h-5 w-5" />,
      circuits: [
        { circuitNumber: '1', cableSize: '6.0mm', cableType: 'pvc-twin-earth', protectiveDeviceRating: '32A MCB', circuitDescription: 'Commercial Oven' },
        { circuitNumber: '2', cableSize: '4.0mm', cableType: 'pvc-twin-earth', protectiveDeviceRating: '25A MCB', circuitDescription: 'Extraction Fan' },
        { circuitNumber: '3', cableSize: '2.5mm', cableType: 'pvc-twin-earth', protectiveDeviceRating: '20A MCB', circuitDescription: 'Dishwasher' },
        { circuitNumber: '4', cableSize: '2.5mm', cableType: 'pvc-twin-earth', protectiveDeviceRating: '16A MCB', circuitDescription: 'Refrigeration' },
        { circuitNumber: '5', cableSize: '2.5mm', cableType: 'pvc-twin-earth', protectiveDeviceRating: '32A MCB', circuitDescription: 'General Sockets' },
        { circuitNumber: '6', cableSize: '1.5mm', cableType: 'pvc-twin-earth', protectiveDeviceRating: '10A MCB', circuitDescription: 'Lighting' },
      ]
    }
  ];

  const handleSelectTemplate = (template: CircuitTemplate) => {
    const circuitsWithIds = template.circuits.map((circuit, index) => ({
      ...circuit,
      id: Date.now() + index
    }));
    onSelectTemplate(circuitsWithIds);
    onClose();
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {templates.map((template) => (
          <Card key={template.id} className="hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                {template.icon}
                {template.name}
                <Badge variant="secondary" className="ml-auto">
                  {template.circuits.length} circuits
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-1">
                {template.circuits.slice(0, 3).map((circuit, index) => (
                  <div key={index} className="text-xs text-muted-foreground">
                    {circuit.circuitNumber}. {circuit.circuitDescription} - {circuit.protectiveDeviceRating}
                  </div>
                ))}
                {template.circuits.length > 3 && (
                  <div className="text-xs text-muted-foreground">
                    +{template.circuits.length - 3} more circuits...
                  </div>
                )}
              </div>
              <Button 
                onClick={() => handleSelectTemplate(template)}
                className="w-full"
                size="sm"
              >
                Use Template
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="flex justify-end">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default CircuitTemplateSelector;
