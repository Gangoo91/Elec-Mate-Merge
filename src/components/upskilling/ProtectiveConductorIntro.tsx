
import { ShieldCheck, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const ProtectiveConductorIntro = () => {
  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <ShieldCheck className="h-5 w-5 text-elec-yellow" />
          Introduction
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-foreground text-base sm:text-lg leading-relaxed">
          This section focuses on verifying the continuity of protective conductors (CPCs), which are 
          critical for ensuring the safety of any electrical installation during fault conditions.
        </p>
        
        <div className="bg-blue-600/10 border border-blue-600/20 rounded-lg p-4 sm:p-5">
          <h3 className="text-blue-200 font-medium mb-3 text-sm sm:text-base">What We'll Cover</h3>
          <ul className="space-y-2 sm:space-y-3 text-foreground text-xs sm:text-sm leading-relaxed">
            <li>• How to test continuity of protective conductors</li>
            <li>• Where and how continuity should be verified</li>
            <li>• Acceptable resistance values and test methods</li>
            <li>• Testing bonding conductors and documentation requirements</li>
          </ul>
        </div>

        <div className="bg-red-600/10 border border-red-600/20 rounded-lg p-4 sm:p-5">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="text-red-200 font-medium mb-2 text-sm sm:text-base">Critical Safety Function</h3>
              <p className="text-foreground text-xs sm:text-sm leading-relaxed">
                The CPC is your lifeline during fault conditions. Without proper continuity, protective 
                devices cannot operate correctly, potentially leaving exposed metalwork at dangerous potentials 
                and putting lives at risk.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
