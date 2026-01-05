import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, AlertTriangle } from 'lucide-react';

export const EmergencyLightingRealWorldSection2_6 = () => {
  return (
    <Card className="bg-slate-200/20 border-elec-yellow/20">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <MapPin className="h-6 w-6 text-elec-yellow" />
          Real-World Example
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-4">
        <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4">
          <div className="flex items-start gap-3 mb-3">
            <AlertTriangle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-red-300 mb-2">Case Study: Liverpool Shopping Centre</h4>
              <p className="text-foreground mb-3">
                A shopping centre in Liverpool failed a fire safety audit because their emergency 
                lighting logbook was incomplete. While most luminaires were operational, there was no 
                written evidence of annual duration tests.
              </p>
              
              <p className="text-foreground mb-3">
                The centre was fined and required to undergo a full re-inspection. After introducing 
                strict logbook procedures, they passed subsequent audits without issue.
              </p>
              
              <div className="bg-yellow-900/30 border border-yellow-500/30 rounded-lg p-3">
                <p className="text-yellow-200 font-medium">
                  Key Learning: This shows how missing paperwork — not failed fittings — can cause 
                  compliance failures.
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};