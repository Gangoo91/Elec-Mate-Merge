import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2, AlertTriangle, CheckCircle, PoundSterling } from 'lucide-react';

export const EmergencyLightingRealWorldSection4_3 = () => {
  return (
    <Card className="bg-slate-200/20 border-slate-600">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Building2 className="h-5 w-5 text-elec-yellow" />
          Real-World Example
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-4">
        <div className="bg-blue-900/20 border border-blue-600/30 p-4 rounded-lg">
          <h3 className="text-blue-300 font-semibold mb-3 flex items-center gap-2">
            <Building2 className="h-4 w-4" />
            London Office Block Case Study
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-red-300 mb-2">The Problem:</h4>
                <p className="text-sm">
                  An office block in London installed self-contained emergency fittings with 1-hour batteries. 
                  A fire risk audit revealed evacuation could take up to 90 minutes due to building layout and 
                  the presence of disabled occupants requiring assisted evacuation.
                </p>
              </div>
            </div>

            <div className="bg-gray-800/50 rounded-lg p-3">
              <h4 className="font-semibold text-orange-300 mb-2">Initial Installation Specification:</h4>
              <ul className="text-sm space-y-1">
                <li>• 45 self-contained LED luminaires</li>
                <li>• 1-hour autonomy batteries (NiCd, 1.2Ah per unit)</li>
                <li>• Total installation cost: £8,500</li>
                <li>• Assumed rapid evacuation capability</li>
              </ul>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-green-300 mb-2">The Solution:</h4>
                <p className="text-sm mb-3">
                  The fittings had to be retrofitted with 3-hour batteries to meet the extended evacuation 
                  time requirements. This involved removing all existing luminaires, replacing battery packs, 
                  and re-testing the entire system.
                </p>
                <div className="bg-gray-800/50 rounded-lg p-3">
                  <h5 className="font-semibold text-green-300 mb-2 text-xs">Retrofit Specification:</h5>
                  <ul className="text-xs space-y-1">
                    <li>• Replace all 45 battery packs with 3-hour units</li>
                    <li>• Upgrade to NiMH 3.6Ah batteries</li>
                    <li>• Full system re-commissioning and testing</li>
                    <li>• Updated emergency lighting drawings</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-800/50 border border-gray-600/30 rounded-lg p-4">
          <h4 className="text-red-300 font-semibold mb-3 flex items-center gap-2">
            <PoundSterling className="h-4 w-4" />
            Financial and Time Impact
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="bg-red-900/20 border border-red-600/30 rounded p-3">
              <p className="text-xs text-foreground mb-1">Battery Replacement Cost</p>
              <p className="text-lg font-bold text-red-300">£3,600</p>
            </div>
            <div className="bg-red-900/20 border border-red-600/30 rounded p-3">
              <p className="text-xs text-foreground mb-1">Labour and Testing</p>
              <p className="text-lg font-bold text-red-300">£2,800</p>
            </div>
            <div className="bg-red-900/20 border border-red-600/30 rounded p-3">
              <p className="text-xs text-foreground mb-1">System Downtime</p>
              <p className="text-lg font-bold text-red-300">3 days</p>
            </div>
            <div className="bg-red-900/20 border border-red-600/30 rounded p-3">
              <p className="text-xs text-foreground mb-1">Total Additional Cost</p>
              <p className="text-lg font-bold text-red-300">£6,400</p>
            </div>
          </div>
          <p className="text-sm text-foreground mt-3">
            This represents a 75% increase over the original installation cost—all of which could have been 
            avoided with proper autonomy assessment during the design phase.
          </p>
        </div>

        <div className="bg-gray-800/50 border border-gray-600/30 rounded-lg p-4">
          <h4 className="text-elec-yellow font-semibold mb-3">Key Learning Points</h4>
          <ul className="text-sm space-y-2">
            <li className="flex items-start gap-2">
              <span className="text-elec-yellow mt-0.5">•</span>
              <span>
                Conduct thorough evacuation assessments before specifying battery autonomy duration
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-elec-yellow mt-0.5">•</span>
              <span>
                Consider building occupancy characteristics, including mobility-impaired occupants
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-elec-yellow mt-0.5">•</span>
              <span>
                Factor in building complexity, floor levels, and distance to final exit points
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-elec-yellow mt-0.5">•</span>
              <span>
                When in doubt, specify 3-hour batteries—the marginal cost difference is minimal compared 
                to retrofit costs
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-elec-yellow mt-0.5">•</span>
              <span>
                Engage with fire risk assessors and building managers during the design phase
              </span>
            </li>
          </ul>
        </div>

        <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg p-4">
          <p className="text-elec-yellow font-medium">
            <strong>Critical Lesson:</strong> Had the autonomy requirement been calculated correctly from the 
            outset based on a proper evacuation assessment, the issue—and the significant additional cost and 
            disruption—could have been completely avoided.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
