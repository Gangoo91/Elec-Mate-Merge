import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle } from 'lucide-react';

export const EmergencyLightingIntroSection3_2 = () => {
  return (
    <Card className="bg-slate-200/20 border-slate-600">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <AlertCircle className="h-5 w-5 text-elec-yellow" />
          Introduction
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-4">
        <p>
          Escape route lighting is the backbone of any emergency lighting system. While Section 1 focused on the 
          lux levels and durations, this section explains how coverage is applied along designated escape paths. 
          Electricians must ensure that escape routes are lit in such a way that occupants can see changes in 
          direction, obstacles, and final exits clearly.
        </p>
        
        <p>
          BS 5266-1 sets out specific rules for spacing, placement, and coverage. Failure to follow these rules 
          can make a system non-compliant, even if lux levels are technically achieved. Understanding where to 
          position luminaires and how to integrate them with exit signage is essential for creating safe, 
          compliant systems.
        </p>

        <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg p-4 mt-4">
          <p className="text-elec-yellow font-medium">
            Key Focus: This section bridges technical requirements with practical installation, ensuring you 
            can design systems that provide continuous, safe guidance to occupants during emergencies.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};