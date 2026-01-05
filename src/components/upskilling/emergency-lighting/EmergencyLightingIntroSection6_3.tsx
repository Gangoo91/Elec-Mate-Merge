import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, AlertTriangle } from 'lucide-react';

export const EmergencyLightingIntroSection6_3 = () => {
  return (
    <Card className="bg-gradient-to-br from-elec-gray to-[#1a1a1a] border border-gray-600 shadow-lg">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-elec-yellow drop-shadow-md" />
          Introduction: Emergency Lighting in Risk Assessments
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-4">
        <p className="text-lg leading-relaxed">
          Emergency lighting design doesn't start with the drawings — it starts with the fire risk assessment.
          Under the Regulatory Reform (Fire Safety) Order 2005, every building must have a written fire risk 
          assessment that identifies hazards and ensures occupants can safely escape during an emergency. 
          Emergency lighting forms a core part of that risk assessment.
        </p>

        <p className="leading-relaxed">
          The fire risk assessment determines where emergency lighting is needed, how long it should operate, 
          and how bright it must be. Electricians and designers must therefore use risk assessments as the 
          foundation for every system specification. BS 5266-1 provides guidance on how to interpret those 
          risks and apply the correct lighting solutions.
        </p>

        <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-4 mt-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-yellow-300 mb-2">Key Principle</h4>
              <p className="text-yellow-100">
                Every emergency lighting system must be tailored to the specific risks identified in the 
                building's fire risk assessment. Generic, one-size-fits-all designs are non-compliant and 
                potentially dangerous.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
