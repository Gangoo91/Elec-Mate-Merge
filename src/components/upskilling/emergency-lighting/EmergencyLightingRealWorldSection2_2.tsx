import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, Building2 } from 'lucide-react';

export const EmergencyLightingRealWorldSection2_2 = () => {
  return (
    <Card className="bg-gradient-to-br from-red-900/20 to-red-800/10 border-red-500/30">
      <CardHeader className="pb-4">
        <CardTitle className="text-foreground flex items-center gap-2">
          <Building2 className="h-5 w-5 text-red-400" />
          Real-World Example
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4">
          <div className="flex items-start gap-3 mb-3">
            <AlertTriangle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
            <h3 className="text-foreground font-semibold">London Call Centre Power Outage</h3>
          </div>
          <div className="space-y-3 text-foreground">
            <p>
              In a London call centre, a power outage occurred during evening operations. The anti-panic 
              lighting was incorrectly installed, with fittings only around the perimeter. The centre of 
              the office was left in near-darkness, causing staff to trip over furniture.
            </p>
            <p>
              Following an audit, the system was reconfigured with correct spacing to achieve the 0.5 lux 
              requirement. This highlights how poor design can compromise safety, even when a system is 
              technically installed.
            </p>
          </div>
        </div>
        
        <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg p-4">
          <h4 className="text-elec-yellow font-semibold mb-2">Key Learning Points:</h4>
          <ul className="space-y-2 text-foreground text-sm">
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></span>
              Perimeter-only lighting creates dangerous dark zones in the centre
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></span>
              Proper spacing calculations are essential for uniform coverage
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></span>
              Post-installation testing should include walking the space to identify blind spots
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></span>
              Technical compliance alone doesn't guarantee safety - design quality matters
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};