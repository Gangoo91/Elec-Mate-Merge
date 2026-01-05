import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen } from 'lucide-react';

export const BMSModule4Section4Intro = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-elec-yellow" />
          Introduction
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-4">
        <p>
          Modern buildings use much more than HVAC and lighting to control comfort. Shading systems, blinds, and façade automation help manage solar heat gain, glare, and daylight. When integrated into a Building Management System (BMS), these elements reduce cooling loads, improve natural light use, and enhance occupant comfort.
        </p>
        
        <p>
          For electricians, shading and façade systems involve installing motors, actuators, control relays, and sensors. The challenge is ensuring smooth integration with HVAC and lighting so systems work together, not against each other.
        </p>
        
        <div className="bg-orange-600/20 border border-orange-600/40 rounded-lg p-4">
          <p className="text-orange-100 font-medium">
            <strong>Integration Challenge:</strong> Shading systems must coordinate with multiple building services to maximise energy efficiency while maintaining occupant comfort and visual quality.
          </p>
        </div>
        
        <p>
          Advanced façade automation can reduce building energy consumption by up to 30% through intelligent solar control, while simultaneously improving workplace productivity through optimised daylighting and glare control.
        </p>
      </CardContent>
    </Card>
  );
};