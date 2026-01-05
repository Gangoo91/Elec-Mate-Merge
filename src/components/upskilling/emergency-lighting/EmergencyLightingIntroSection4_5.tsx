import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Monitor } from 'lucide-react';

export const EmergencyLightingIntroSection4_5 = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Monitor className="h-5 w-5 text-elec-yellow" />
          Introduction
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-foreground">
          Testing and maintaining emergency lighting is a legal requirement, but in large or complex buildings, 
          manual testing can be time-consuming, costly, and prone to human error. Remote testing and monitoring 
          systems automate much of this process, providing real-time status reports and fault alerts.
        </p>
        
        <p className="text-foreground">
          These systems improve compliance with <span className="text-elec-yellow font-semibold">BS 5266-8 (EN 50172)</span> by 
          ensuring regular testing is carried out and documented. For electricians, understanding how these systems 
          work — and when to recommend them — is key to offering modern, efficient solutions.
        </p>

        <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg p-4">
          <h4 className="font-semibold text-elec-yellow mb-2">Why Remote Testing Matters</h4>
          <p className="text-foreground text-sm">
            Modern remote testing systems can reduce maintenance labour by up to 60% whilst improving compliance 
            and providing instant fault detection. In 2025, these systems are becoming the standard for medium 
            to large installations across the UK.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
