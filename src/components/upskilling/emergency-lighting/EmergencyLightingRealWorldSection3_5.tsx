import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2, AlertTriangle } from 'lucide-react';

export const EmergencyLightingRealWorldSection3_5 = () => {
  return (
    <Card className="bg-slate-200/20 border-slate-600">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Building2 className="h-5 w-5 text-elec-yellow" />
          Real-World Example
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-4">
        <div className="bg-gray-800/50 border border-gray-600/30 p-4 rounded-lg">
          <div className="flex items-start gap-2">
            <AlertTriangle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-red-300 mb-2">Manchester Office Building Case Study</h4>
              <p className="text-sm text-foreground">
                During a fire risk audit of a 15-storey office building in Manchester, inspectors requested emergency lighting drawings as part of their compliance review. The building manager provided the original design plans from 2018, but no as-built updates had been maintained.
              </p>
            </div>
          </div>
        </div>
        
        <div className="space-y-3">
          <p className="text-foreground">
            The inspection revealed several critical issues: additional emergency lighting fittings had been installed during a 2021 refurbishment, escape routes had been modified following tenant changes, and new exit signage was added after a stairwell reconfiguration. None of these changes were documented on the drawings.
          </p>
          
          <p className="text-foreground">
            As a result, the building failed its audit and received a formal notice requiring immediate action. The building owner had to commission emergency surveys, new CAD drawings, and complete system verification before the building could operate normally.
          </p>
        </div>
        
        <div className="bg-gray-800/50 border border-gray-600/30 rounded-lg p-4">
          <h4 className="text-elec-yellow font-semibold mb-2">Financial and Operational Impact</h4>
          <ul className="text-foreground text-sm space-y-1">
            <li>• £12,000 emergency survey and drawing costs</li>
            <li>• 3-week delay in building occupancy certification</li>
            <li>• Potential insurance implications for fire safety compliance</li>
            <li>• Legal liability concerns for the building owner and managing agent</li>
          </ul>
        </div>
        
        <div className="bg-gray-800/50 border border-gray-600/30 rounded-lg p-4">
          <h4 className="text-green-300 font-semibold mb-2">Key Learning Points</h4>
          <ul className="text-foreground text-sm space-y-1">
            <li>• As-built drawings must be updated immediately after any modifications</li>
            <li>• Annual review procedures should verify drawing accuracy against physical installations</li>
            <li>• Building management teams need clear procedures for document control</li>
            <li>• Professional involvement is essential for maintaining compliance standards</li>
            <li>• Regular audits can prevent costly emergency corrections and legal issues</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};