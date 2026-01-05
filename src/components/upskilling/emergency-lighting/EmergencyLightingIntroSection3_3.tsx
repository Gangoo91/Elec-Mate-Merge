import { Camera, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const EmergencyLightingIntroSection3_3 = () => {
  return (
    <Card className="bg-gradient-to-br from-elec-gray to-[#1a1a1a] border border-gray-600 shadow-lg">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Camera className="h-5 w-5 text-elec-yellow drop-shadow-md" />
          Introduction: Mounting Heights and Photometric Considerations
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-4">
        <p>
          Meeting lux levels and coverage rules in theory is one thing — achieving them in practice depends heavily on where and how luminaires are installed. Mounting height, beam spread, and photometric performance determine whether the lighting system delivers adequate illumination at floor level.
        </p>
        
        <div className="bg-amber-600/20 border border-amber-500/40 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="h-4 w-4 text-amber-400" />
            <span className="text-amber-300 font-semibold">Critical Understanding</span>
          </div>
          <p className="text-foreground text-sm">
            Misjudging mounting heights, beam spread, or photometric data can result in dark patches, glare, or wasted fittings. For electricians, understanding mounting rules and how to interpret manufacturer photometric data is critical to designing a compliant and efficient system.
          </p>
        </div>
        
        <p>
          This section provides the technical knowledge needed to properly apply photometric principles in real-world emergency lighting installations, ensuring both compliance and cost-effectiveness.
        </p>
      </CardContent>
    </Card>
  );
};