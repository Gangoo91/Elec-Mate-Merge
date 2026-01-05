import { Shield, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const EmergencyLightingIntroSection3_4 = () => {
  return (
    <Card className="bg-gradient-to-br from-elec-gray to-[#1a1a1a] border border-gray-600 shadow-lg">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Shield className="h-5 w-5 text-elec-yellow drop-shadow-md" />
          Introduction: Risk-Based Design Adjustments
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-4">
        <p>
          Emergency lighting design is not just about ticking boxes for lux levels and durations — it must also respond to the specific risks of the building and its occupants. A hospital ward requires different considerations compared to a warehouse, and a cinema differs from an office.
        </p>
        
        <div className="bg-amber-600/20 border border-amber-500/40 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="h-4 w-4 text-amber-400" />
            <span className="text-amber-300 font-semibold">Critical Approach</span>
          </div>
          <p className="text-foreground text-sm">
            Risk-based design adjustments ensure that emergency lighting supports safe evacuation for all people, including vulnerable occupants, and accounts for hazards unique to each building. Electricians must understand how to interpret risk assessments and adapt their designs accordingly.
          </p>
        </div>
        
        <p>
          This section explores how to move beyond minimum standards to create emergency lighting systems that truly serve the safety needs of each specific building and its occupants.
        </p>
      </CardContent>
    </Card>
  );
};