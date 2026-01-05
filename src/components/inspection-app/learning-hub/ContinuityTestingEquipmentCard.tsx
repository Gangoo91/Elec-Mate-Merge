
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Wrench, Calendar, Shield, CheckCircle2, Zap, Settings } from 'lucide-react';

interface Equipment {
  id: string;
  name: string;
  description: string;
  specifications: string[];
  required: boolean;
  category: 'primary' | 'accessories' | 'safety' | 'documentation';
  calibrationRequired: boolean;
  regulationRef?: string;
}

const ContinuityTestingEquipmentCard = () => {
  const [checkedItems, setCheckedItems] = useState<string[]>([]);

  const equipment: Equipment[] = [
    {
      id: 'low-resistance-ohmmeter',
      name: 'Low Resistance Ohmmeter',
      description: 'Primary instrument for continuity measurements',
      specifications: [
        'Test current: minimum 200mA DC for protective conductors',
        'Resolution: 0.01Ω or better',
        'Accuracy: ±2% of reading + 2 digits',
        'Open circuit voltage: 4V-24V DC'
      ],
      required: true,
      category: 'primary',
      calibrationRequired: true,
      regulationRef: 'BS 7671 Regulation 612.2.2'
    },
    {
      id: 'test-leads',
      name: 'Test Leads and Probes',
      description: 'High-quality test leads with low resistance',
      specifications: [
        'Low resistance (typically <0.01Ω per lead)',
        'Robust construction with secure connections',
        'Appropriate length for testing requirements',
        'Insulated to working voltage'
      ],
      required: true,
      category: 'accessories',
      calibrationRequired: false
    },
    {
      id: 'test-probes',
      name: 'Test Probes and Clips',
      description: 'Various probe types for different connection points',
      specifications: [
        'Sharp pointed probes for penetrating connections',
        'Crocodile clips for secure long-term connections',
        'Long-nose probes for confined spaces',
        'Magnetic probes for steel structures'
      ],
      required: true,
      category: 'accessories',
      calibrationRequired: false
    },
    {
      id: 'temporary-bonding',
      name: 'Temporary Bonding Leads',
      description: 'For establishing temporary connections during testing',
      specifications: [
        'Adequate current carrying capacity',
        'Secure connection methods',
        'Appropriate length and flexibility',
        'Clear identification markings'
      ],
      required: true,
      category: 'accessories',
      calibrationRequired: false
    },
    {
      id: 'ppe',
      name: 'Personal Protective Equipment',
      description: 'Safety equipment for testing operations',
      specifications: [
        'Safety glasses with side protection',
        'Insulated gloves (if required)',
        'Non-conductive footwear',
        'Appropriate work clothing'
      ],
      required: true,
      category: 'safety',
      calibrationRequired: false
    },
    {
      id: 'isolation-devices',
      name: 'Isolation and Locking Equipment',
      description: 'For securing circuits during testing',
      specifications: [
        'Safety padlocks with unique keys',
        'Warning labels and tags',
        'Lockout/tagout devices',
        'Circuit identification materials'
      ],
      required: true,
      category: 'safety',
      calibrationRequired: false
    },
    {
      id: 'documentation',
      name: 'Test Documentation',
      description: 'Forms and certificates for recording results',
      specifications: [
        'Test result schedules',
        'Certificate templates',
        'Calibration certificates',
        'Circuit identification records'
      ],
      required: true,
      category: 'documentation',
      calibrationRequired: false
    },
    {
      id: 'multimeter',
      name: 'Digital Multimeter (Backup)',
      description: 'Secondary instrument for verification',
      specifications: [
        'True RMS capability',
        'Low resistance measurement capability',
        'CAT III/IV safety rating',
        'Current calibration certificate'
      ],
      required: false,
      category: 'primary',
      calibrationRequired: true
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
      case 'primary': return <Zap className="h-4 w-4 text-blue-400" />;
      case 'accessories': return <Settings className="h-4 w-4 text-purple-400" />;
      case 'safety': return <Shield className="h-4 w-4 text-green-400" />;
      case 'documentation': return <CheckCircle2 className="h-4 w-4 text-orange-400" />;
      default: return <Wrench className="h-4 w-4 text-white/80" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'primary': return 'border-blue-500/20 bg-blue-500/5';
      case 'accessories': return 'border-purple-500/20 bg-purple-500/5';
      case 'safety': return 'border-green-500/20 bg-green-500/5';
      case 'documentation': return 'border-orange-500/20 bg-orange-500/5';
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
          Continuity Testing Equipment
        </CardTitle>
        <CardDescription className="text-white">
          Essential equipment for accurate and safe continuity measurements
        </CardDescription>
        <div className="mt-2 text-sm">
          <span className="text-foreground">Equipment Check: </span>
          <span className="text-elec-yellow font-medium">
            {checkedRequiredItems.length}/{requiredItems.length} required items ({completionPercentage}%)
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {equipment.map((item) => (
            <div key={item.id} className={`p-4 border rounded-lg ${getCategoryColor(item.category)}`}>
              <div className="flex items-start gap-3">
                <Checkbox
                  checked={checkedItems.includes(item.id)}
                  onCheckedChange={() => handleItemCheck(item.id)}
                  className="mt-1"
                />
                <div className="flex-grow">
                  <div className="flex items-center gap-2 mb-2">
                    {getCategoryIcon(item.category)}
                    <h4 className="font-medium text-foreground">
                      {item.name}
                      {item.required && (
                        <Badge variant="destructive" className="ml-2 bg-red-500/20 text-red-400 border-red-500/30">
                          Required
                        </Badge>
                      )}
                    </h4>
                  </div>
                  <p className="text-white text-sm mb-3">{item.description}</p>
                  
                  {/* Specifications */}
                  <div className="space-y-1 mb-3">
                    <h5 className="text-xs font-medium text-white/80 uppercase tracking-wide">Specifications</h5>
                    {item.specifications.map((spec, index) => (
                      <div key={index} className="text-xs text-white flex items-start gap-2">
                        <span className="text-blue-400 mt-1">•</span>
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center gap-4">
                    {item.calibrationRequired && (
                      <div className="flex items-center gap-1 text-xs text-yellow-400">
                        <Calendar className="h-3 w-3" />
                        <span>Calibration required</span>
                      </div>
                    )}
                    {item.regulationRef && (
                      <div className="text-xs text-blue-400 bg-blue-500/10 px-2 py-1 rounded">
                        {item.regulationRef}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Equipment Summary */}
        <div className="mt-6 p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-lg">
          <h4 className="font-medium text-blue-400 mb-2">Key Equipment Requirements</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-white">
            <div>• Minimum 200mA DC test current for protective conductors</div>
            <div>• 0.01Ω resolution for accurate low resistance measurement</div>
            <div>• Current calibration certificates for all instruments</div>
            <div>• Appropriate safety equipment and isolation devices</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContinuityTestingEquipmentCard;
