import { Factory, Zap, CheckCircle, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const CableShieldingScenario = () => {
  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Factory className="h-5 w-5 text-elec-yellow" />
          Real-World Scenario: Manufacturing Facility Network
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="rounded-lg border p-6 bg-background">
          <h3 className="mb-4 text-lg font-semibold text-elec-yellow">The Challenge</h3>
          <div className="space-y-3 text-muted-foreground">
            <p>
              <strong>Client:</strong> Automotive parts manufacturer with mixed office and production areas
            </p>
            <p>
              <strong>Environment:</strong> Office areas, workshop with welding equipment, automated production line with VFDs
            </p>
            <p>
              <strong>Problem:</strong> Existing UTP network experiencing intermittent failures, slow speeds in production areas
            </p>
            <p>
              <strong>Requirements:</strong> Reliable network for production monitoring, office connectivity, future automation systems
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-elec-yellow">EMI Assessment Results</h3>
          
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-lg border p-4 bg-background">
              <h4 className="mb-3 flex items-center gap-2 font-semibold">
                <CheckCircle className="h-4 w-4 text-green-600" />
                Office Areas
              </h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><strong>EMI Level:</strong> Low</li>
                <li><strong>Sources:</strong> Computers, printers, LED lighting</li>
                <li><strong>Decision:</strong> Cat6 UTP sufficient</li>
                <li><strong>Reasoning:</strong> Cost-effective, easy installation</li>
              </ul>
            </div>

            <div className="rounded-lg border p-4 bg-background">
              <h4 className="mb-3 flex items-center gap-2 font-semibold">
                <AlertTriangle className="h-4 w-4 text-yellow-600" />
                Workshop Areas
              </h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><strong>EMI Level:</strong> Medium-High</li>
                <li><strong>Sources:</strong> Welding equipment, power tools</li>
                <li><strong>Decision:</strong> Cat6A FTP with careful routing</li>
                <li><strong>Reasoning:</strong> Good protection, manageable cost</li>
              </ul>
            </div>

            <div className="rounded-lg border p-4 bg-background">
              <h4 className="mb-3 flex items-center gap-2 font-semibold">
                <Zap className="h-4 w-4 text-red-600" />
                Production Line
              </h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><strong>EMI Level:</strong> Very High</li>
                <li><strong>Sources:</strong> VFDs, servo motors, switching power supplies</li>
                <li><strong>Decision:</strong> Cat6A STP with comprehensive grounding</li>
                <li><strong>Reasoning:</strong> Maximum protection required</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-elec-yellow">Implementation Strategy</h3>
          
          <div className="space-y-4">
            <div className="rounded-lg border p-4 bg-background">
              <h4 className="mb-3 font-semibold">Zone-Based Approach</h4>
              <div className="grid gap-4 text-sm text-muted-foreground md:grid-cols-2">
                <div>
                  <h5 className="mb-2 font-medium text-elec-yellow">Clean Zones (Offices)</h5>
                  <ul className="space-y-1">
                    <li>• Standard Cat6 UTP installation</li>
                    <li>• Regular patch panels and outlets</li>
                    <li>• Standard separation from power (300mm)</li>
                    <li>• Cost: £8,000 for 120 outlets</li>
                  </ul>
                </div>
                <div>
                  <h5 className="mb-2 font-medium text-elec-yellow">Transition Zones (Workshop)</h5>
                  <ul className="space-y-1">
                    <li>• Cat6A FTP with shielded components</li>
                    <li>• Increased separation from EMI sources</li>
                    <li>• Single-point grounding at main panel</li>
                    <li>• Cost: £12,000 for 40 outlets</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="rounded-lg border p-4 bg-background">
              <h4 className="mb-3 font-semibold">High-EMI Zone (Production)</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p><strong>Solution:</strong> Cat6A STP with comprehensive shielding strategy</p>
                <p><strong>Special Requirements:</strong></p>
                <ul className="ml-4 space-y-1">
                  <li>• Metallic conduit for additional protection</li>
                  <li>• Dedicated grounding infrastructure</li>
                  <li>• Shielded patch panels with 360° termination</li>
                  <li>• Isolation from VFD circuits (minimum 600mm separation)</li>
                </ul>
                <p><strong>Cost:</strong> £18,000 for 25 critical connections</p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-elec-yellow">Results After Implementation</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center">
              <CheckCircle className="mx-auto mb-2 h-8 w-8 text-green-600" />
              <h4 className="font-semibold">Network Reliability</h4>
              <p className="text-sm text-muted-foreground">Zero EMI-related outages in 12 months</p>
            </div>
            <div className="text-center">
              <CheckCircle className="mx-auto mb-2 h-8 w-8 text-green-600" />
              <h4 className="font-semibold">Performance</h4>
              <p className="text-sm text-muted-foreground">Full Gigabit speeds throughout facility</p>
            </div>
            <div className="text-center">
              <CheckCircle className="mx-auto mb-2 h-8 w-8 text-green-600" />
              <h4 className="font-semibold">Cost Effectiveness</h4>
              <p className="text-sm text-muted-foreground">Targeted approach saved £15,000 vs all-STP solution</p>
            </div>
          </div>
        </div>

        <div className="rounded-lg border p-4 bg-background">
          <h4 className="mb-2 font-semibold">Key Success Factors</h4>
          <ul className="space-y-1 text-sm text-muted-foreground">
            <li>• Proper EMI assessment before cable selection</li>
            <li>• Zone-based approach optimised cost and performance</li>
            <li>• Expert installation with proper grounding techniques</li>
            <li>• Comprehensive testing validated all shield connections</li>
            <li>• Training provided to maintenance staff on shielded systems</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};