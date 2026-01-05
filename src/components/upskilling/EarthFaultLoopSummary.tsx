import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BookOpen, CheckCircle, AlertTriangle, Calculator } from 'lucide-react';

export const EarthFaultLoopSummary = () => {
  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <div className="flex items-center gap-3">
          <BookOpen className="h-6 w-6 text-elec-yellow" />
          <CardTitle className="text-foreground">Section Summary</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="text-foreground space-y-4 sm:space-y-6">
        {/* Key Concepts */}
        <div className="space-y-4">
          <h3 className="text-foreground font-semibold flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-400" />
            Key Concepts Mastered
          </h3>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-elec-dark p-4 rounded-lg border-l-4 border-blue-500">
              <h4 className="text-foreground font-medium mb-2">Earth Fault Loop Impedance Fundamentals</h4>
              <ul className="text-sm space-y-1">
                <li>• Zs represents total earth fault path impedance</li>
                <li>• Ze is external supply impedance only</li>
                <li>• Formula: Zs = Ze + R1 + R2</li>
                <li>• Critical for protective device operation</li>
              </ul>
            </div>
            
            <div className="bg-elec-dark p-4 rounded-lg border-l-4 border-green-500">
              <h4 className="text-foreground font-medium mb-2">Temperature Correction</h4>
              <ul className="text-sm space-y-1">
                <li>• Copper conductors: multiply by 1.25</li>
                <li>• Aluminium conductors: multiply by 1.28</li>
                <li>• Apply to (R1 + R2) component only</li>
                <li>• Accounts for maximum operating temperature</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Critical Safety Points */}
        <div className="space-y-4">
          <h3 className="text-foreground font-semibold flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-400" />
            Critical Safety Requirements
          </h3>
          
          <div className="bg-red-900/20 border border-red-600 p-4 rounded-lg">
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-medium text-red-300 mb-2">Maximum Disconnection Times:</p>
                <ul className="space-y-1">
                  <li>• Socket outlets: 0.4 seconds</li>
                  <li>• Fixed equipment: 5 seconds</li>
                  <li>• Special locations: 0.4 seconds</li>
                  <li>• Distribution circuits: 5 seconds</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-red-300 mb-2">Safety Implications:</p>
                <ul className="space-y-1">
                  <li>• High Zs = insufficient fault current</li>
                  <li>• Delayed disconnection = shock risk</li>
                  <li>• Touch voltages may persist</li>
                  <li>• Fire risk from arcing faults</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Practical Applications */}
        <div className="space-y-4">
          <h3 className="text-foreground font-semibold flex items-center gap-2">
            <Calculator className="h-5 w-5 text-blue-400" />
            Practical Application Guidelines
          </h3>
          
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-elec-dark p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary" className="bg-blue-600 text-foreground text-xs">Testing</Badge>
              </div>
              <ul className="text-sm space-y-1">
                <li>• Ze: main earthing conductor disconnected</li>
                <li>• Zs: at point of utilisation</li>
                <li>• Use appropriate test current</li>
                <li>• Check for parallel paths</li>
              </ul>
            </div>
            
            <div className="bg-elec-dark p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary" className="bg-orange-600 text-foreground text-xs">Analysis</Badge>
              </div>
              <ul className="text-sm space-y-1">
                <li>• Compare with BS 7671 limits</li>
                <li>• Apply temperature correction</li>
                <li>• Consider measurement uncertainty</li>
                <li>• Document all findings</li>
              </ul>
            </div>
            
            <div className="bg-elec-dark p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary" className="bg-green-600 text-foreground text-xs">Action</Badge>
              </div>
              <ul className="text-sm space-y-1">
                <li>• Investigate high readings</li>
                <li>• Check connections and continuity</li>
                <li>• Consider protective conductor upgrades</li>
                <li>• Verify remedial actions</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Regulatory Compliance */}
        <div className="bg-yellow-900/20 border border-yellow-600 p-4 rounded-lg">
          <h4 className="text-yellow-400 font-semibold mb-2">BS 7671 Compliance Summary</h4>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-medium mb-2">Testing Requirements:</p>
              <ul className="space-y-1">
                <li>• Regulation 411.4.9: Maximum Zs values</li>
                <li>• Regulation 643.10: Verification testing</li>
                <li>• Table 41.5: Maximum disconnection times</li>
                <li>• Appendix 2: Maximum Zs values for protective devices</li>
              </ul>
            </div>
            <div>
              <p className="font-medium mb-2">Documentation:</p>
              <ul className="space-y-1">
                <li>• Record measured values and test points</li>
                <li>• Note environmental conditions</li>
                <li>• Apply corrections where required</li>
                <li>• Schedule periodic retesting</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-elec-dark p-4 rounded-lg border border-gray-600">
          <h4 className="text-foreground font-semibold mb-3">Moving Forward</h4>
          <p className="text-sm mb-3">
            With a solid understanding of earth fault loop impedance principles, you're now ready 
            to explore testing Zs at various points throughout an installation.
          </p>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="border-elec-yellow text-elec-yellow">
              Testing Strategy
            </Badge>
            <Badge variant="outline" className="border-elec-yellow text-elec-yellow">
              Multiple Test Points
            </Badge>
            <Badge variant="outline" className="border-elec-yellow text-elec-yellow">
              Result Interpretation
            </Badge>
            <Badge variant="outline" className="border-elec-yellow text-elec-yellow">
              Troubleshooting
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};