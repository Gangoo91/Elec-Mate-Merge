import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Wrench, CheckCircle, AlertTriangle, Gauge } from 'lucide-react';

export const EmergencyLightingPracticalSection3_1 = () => {
  return (
    <Card className="bg-slate-200/20 border-elec-yellow/20">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Wrench className="h-6 w-6 text-elec-yellow" />
          Practical Guidance
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
              <h4 className="font-semibold text-blue-400 mb-3 flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                Design Best Practices
              </h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Always use manufacturer photometric data when designing to ensure lux levels can be achieved</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Choose 3-hour fittings as standard in most commercial and public buildings to future-proof compliance</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Plan for battery replacement cycles and specify quality components from reputable manufacturers</span>
                </li>
              </ul>
            </div>

            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
              <h4 className="font-semibold text-green-400 mb-3 flex items-center gap-2">
                <Gauge className="h-4 w-4" />
                Testing Requirements
              </h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>When testing, measure lux at floor level to check real performance, not just fitting brightness</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Test both initial performance and after simulated battery ageing conditions</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Document all measurements with calibrated lux meters and maintain test certificates</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4">
              <h4 className="font-semibold text-orange-400 mb-3 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                Maintenance Considerations
              </h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Remember that dirty lenses and poor maintenance reduce effective lux output</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Schedule regular cleaning and inspection programmes to maintain performance</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Plan battery replacement before performance degrades below compliance levels</span>
                </li>
              </ul>
            </div>

            <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
              <h4 className="font-semibold text-purple-400 mb-3">Installation Tips</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Position luminaires to minimise shadows from furniture and equipment</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Consider building changes that might affect light distribution patterns</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Install test switches and indicators in accessible locations</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-elec-dark/60 p-4 rounded-lg border border-gray-600">
          <h4 className="text-elec-yellow font-semibold mb-3">Professional Responsibility</h4>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <h5 className="text-red-400 font-medium text-sm mb-2">Safety Critical</h5>
              <p className="text-xs">
                Emergency lighting failures can contribute to injuries and fatalities. 
                Always err on the side of caution when specifying performance levels.
              </p>
            </div>
            <div>
              <h5 className="text-blue-400 font-medium text-sm mb-2">Legal Compliance</h5>
              <p className="text-xs">
                BS 5266 compliance is often a legal requirement. Maintain detailed 
                documentation to demonstrate adherence to all standards.
              </p>
            </div>
            <div>
              <h5 className="text-green-400 font-medium text-sm mb-2">Future-Proofing</h5>
              <p className="text-xs">
                Consider building changes, occupancy increases, and evolving standards 
                when designing systems for long-term reliability.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};