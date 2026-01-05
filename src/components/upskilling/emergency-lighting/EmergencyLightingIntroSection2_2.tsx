import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Info } from 'lucide-react';

export const EmergencyLightingIntroSection2_2 = () => {
  return (
    <Card className="bg-slate-200/20 border-elec-yellow/20">
      <CardHeader className="pb-4">
        <CardTitle className="text-foreground flex items-center gap-2">
          <Info className="h-5 w-5 text-elec-yellow" />
          Introduction to Open Area (Anti-Panic) Lighting
        </CardTitle>
      </CardHeader>
      <CardContent className="text-gray-300 space-y-4">
        <p className="text-foreground">
          Open areas in a building — such as large offices, halls, foyers, or workshops — can quickly 
          become chaotic in the event of a power failure or fire alarm activation. If normal lighting 
          fails, people may panic, trip, or become disorientated.
        </p>
        <p className="text-foreground">
          Open Area (Anti-Panic) Lighting is specifically designed to reduce confusion and allow safe 
          movement towards designated escape routes. For electricians, this section focuses on the legal 
          requirements, technical standards, and practical considerations when installing and maintaining 
          these systems in accordance with BS 5266-1.
        </p>
        <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg p-4 mt-4">
          <p className="text-elec-yellow font-medium">
            <strong>Key Focus:</strong> This section explores the technical requirements, coverage 
            calculations, and practical applications of anti-panic lighting in various environments 
            following BS 5266-1 standards.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};