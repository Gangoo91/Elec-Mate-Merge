import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen } from 'lucide-react';

export const EmergencyLightingIntroSection3_5 = () => {
  return (
    <Card className="bg-slate-200/20 border-slate-600">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-elec-yellow" />
          Introduction
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-4">
        <p>
          Even the best-designed emergency lighting system is of little value if it cannot be communicated clearly. Emergency lighting layout drawings are the bridge between the design intent and on-site installation. They provide a visual map showing luminaire types, mounting positions, escape routes, and testing points.
        </p>
        
        <p>
          These drawings are also essential for compliance, as they form part of the building's fire safety documentation. For electricians, the ability to interpret, create, and update layout drawings is a professional requirement under BS 5266-1.
        </p>
      </CardContent>
    </Card>
  );
};