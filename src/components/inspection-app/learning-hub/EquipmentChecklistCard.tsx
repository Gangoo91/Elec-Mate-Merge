import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Wrench, Calendar, Shield, CheckCircle2 } from 'lucide-react';

interface Equipment {
  id: string;
  name: string;
  description: string;
  required: boolean;
  category: 'testing' | 'safety' | 'isolation';
  calibrationRequired: boolean;
}

const EquipmentChecklistCard = () => {
  const [checkedItems, setCheckedItems] = useState<string[]>([]);

  const equipment: Equipment[] = [
    {
      id: 'voltage-indicator',
      name: 'Approved Voltage Indicator',
      description: 'GS38 compliant voltage detector with proving unit',
      required: true,
      category: 'testing',
      calibrationRequired: true
    },
    {
      id: 'test-probes',
      name: 'GS38 Test Probes',
      description: 'Shrouded probes with finger guards (4mm max exposure)',
      required: true,
      category: 'testing',
      calibrationRequired: false
    },
    {
      id: 'proving-unit',
      name: 'Proving Unit',
      description: 'Known voltage source for tester verification',
      required: true,
      category: 'testing',
      calibrationRequired: true
    },
    {
      id: 'isolation-lock',
      name: 'Safety Padlock',
      description: 'Unique padlock for securing isolation points',
      required: true,
      category: 'isolation',
      calibrationRequired: false
    },
    {
      id: 'warning-labels',
      name: 'Warning Labels',
      description: 'Caution labels for work in progress identification',
      required: true,
      category: 'isolation',
      calibrationRequired: false
    },
    {
      id: 'ppe',
      name: 'Personal Protective Equipment',
      description: 'Safety glasses, insulated gloves, appropriate clothing',
      required: true,
      category: 'safety',
      calibrationRequired: false
    },
    {
      id: 'multimeter',
      name: 'Digital Multimeter',
      description: 'Calibrated meter for accurate voltage measurements or test lamps',
      required: false,
      category: 'testing',
      calibrationRequired: true
    },
    {
      id: 'test-leads',
      name: 'Insulated Test Leads',
      description: 'Double-insulated leads rated for working voltage',
      required: true,
      category: 'testing',
      calibrationRequired: false
    }
  ];

  const handleItemCheck = (itemId: string) => {
    setCheckedItems(prev => 
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'testing': return <Wrench className="h-4 w-4 text-blue-400" />;
      case 'safety': return <Shield className="h-4 w-4 text-green-400" />;
      case 'isolation': return <CheckCircle2 className="h-4 w-4 text-orange-400" />;
      default: return <Wrench className="h-4 w-4 text-gray-400" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'testing': return 'border-blue-500/20 bg-blue-500/5';
      case 'safety': return 'border-green-500/20 bg-green-500/5';
      case 'isolation': return 'border-orange-500/20 bg-orange-500/5';
      default: return 'border-gray-500/20 bg-gray-500/5';
    }
  };

  const requiredItems = equipment.filter(item => item.required);
  const checkedRequiredItems = requiredItems.filter(item => checkedItems.includes(item.id));
  const completionPercentage = Math.round((checkedRequiredItems.length / requiredItems.length) * 100);

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-elec-yellow flex items-center gap-2">
          <Wrench className="h-5 w-5" />
          Equipment Checklist
        </CardTitle>
        <CardDescription className="text-gray-300">
          Verify all required equipment is available and in good condition
        </CardDescription>
        <div className="mt-2 text-sm">
          <span className="text-foreground">Progress: </span>
          <span className="text-elec-yellow font-medium">
            {checkedRequiredItems.length}/{requiredItems.length} required items ({completionPercentage}%)
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {equipment.map((item) => (
            <div key={item.id} className={`p-3 border rounded-lg ${getCategoryColor(item.category)}`}>
              <div className="flex items-start gap-3">
                <Checkbox
                  checked={checkedItems.includes(item.id)}
                  onCheckedChange={() => handleItemCheck(item.id)}
                  className="mt-1"
                />
                <div className="flex-grow">
                  <div className="flex items-center gap-2 mb-1">
                    {getCategoryIcon(item.category)}
                    <h4 className="font-medium text-foreground">
                      {item.name}
                      {item.required && (
                        <span className="text-xs ml-2 px-2 py-1 bg-red-500/20 text-red-400 rounded-full">
                          Required
                        </span>
                      )}
                    </h4>
                  </div>
                  <p className="text-gray-300 text-sm mb-2">{item.description}</p>
                  {item.calibrationRequired && (
                    <div className="flex items-center gap-1 text-xs text-yellow-400">
                      <Calendar className="h-3 w-3" />
                      <span>Calibration required</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default EquipmentChecklistCard;
