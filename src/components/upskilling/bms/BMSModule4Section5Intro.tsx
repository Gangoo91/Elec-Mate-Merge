import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Zap } from 'lucide-react';

export const BMSModule4Section5Intro = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Zap className="h-5 w-5 text-elec-yellow" />
          Introduction
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-4">
        <p>
          The greatest efficiency gains in a Building Management System (BMS) come when different subsystems work together. By integrating HVAC and lighting control, the BMS avoids wasted energy, reduces running costs, and maintains comfort more effectively than treating each system in isolation.
        </p>
        
        <p>
          For electricians, this means installing sensors, relays, and control circuits in a way that enables cross-system logic — so lighting and HVAC can "talk" to each other through the BMS.
        </p>

        <div className="bg-yellow-600/20 border border-yellow-600/40 rounded-lg p-4">
          <p className="text-yellow-100">
            <strong>Key Point:</strong> Combined HVAC and lighting control can achieve energy savings of 20-40% compared to independent system operation, while maintaining or improving occupant comfort levels.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};