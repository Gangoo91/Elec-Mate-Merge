
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calculator, Clock } from 'lucide-react';
import { testingEquipment } from './TestingProcedureData';

const EquipmentInfoCard = () => {
  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-elec-yellow flex items-center gap-2">
          <Calculator className="h-5 w-5" />
          Professional Test Equipment
        </CardTitle>
        <CardDescription className="text-white">
          Essential instruments for electrical testing
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {testingEquipment.map((equipment, index) => (
            <div key={index} className="p-4 bg-muted rounded-lg">
              <h4 className="font-medium text-foreground mb-2">{equipment.name}</h4>
              <p className="text-sm text-white mb-3">{equipment.description}</p>
              
              <div className="space-y-2">
                <div>
                  <p className="text-xs text-white/80 mb-1">Tests:</p>
                  <div className="flex flex-wrap gap-1">
                    {equipment.tests.map((test, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {test}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center gap-2 text-xs text-white/80">
                  <Clock className="h-3 w-3" />
                  <span>{equipment.calibrationRequirement}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default EquipmentInfoCard;
