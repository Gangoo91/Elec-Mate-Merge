import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Battery, AlertTriangle } from 'lucide-react';

export const EmergencyLightingIntroSection4_3 = () => {
  return (
    <Card className="bg-slate-200/20 border-slate-600">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Battery className="h-5 w-5 text-elec-yellow" />
          Introduction
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-4">
        <p className="leading-relaxed">
          The reliability of an emergency lighting system depends heavily on the performance of its batteries. 
          Whether in self-contained units or central battery banks, the batteries must be correctly sized to 
          supply power for the full rated duration, typically 1 or 3 hours depending on building use.
        </p>
        
        <div className="bg-red-900/20 border border-red-600/30 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-red-300 mb-2">Critical Safety Consideration</h4>
              <p className="text-sm">
                Undersized or poorly maintained batteries risk leaving occupants in darkness before evacuation 
                is complete. This can lead to panic, injuries, and potentially fatal consequences during emergency 
                situations.
              </p>
            </div>
          </div>
        </div>

        <p className="leading-relaxed">
          Electricians must therefore understand how to calculate autonomy duration, factor in battery efficiency 
          and ageing, and apply the correct standards from <span className="text-elec-yellow font-semibold">BS 5266-1</span> and{' '}
          <span className="text-elec-yellow font-semibold">BS EN 50171</span>.
        </p>

        <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg p-4">
          <p className="text-elec-yellow font-medium">
            This section provides the technical knowledge and calculation methods required to correctly size 
            battery systems for emergency lighting installations, ensuring compliance and safety.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
