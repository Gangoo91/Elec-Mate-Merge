import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, Building, CheckCircle, XCircle, Lightbulb } from 'lucide-react';

export const BMSModule7Section1RealWorld = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Building className="h-5 w-5 text-elec-yellow" />
          Real World Examples
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-6">
        <div>
          <h4 className="text-elec-yellow font-semibold mb-3">Real World Example: University Project Delay</h4>
          
          <div className="bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/20 rounded-lg p-4 mb-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
              <div>
                <h5 className="text-red-400 font-semibold mb-2">The Problem: Missing CO₂ Sensors</h5>
                <div className="text-sm text-foreground space-y-3">
                  <p>
                    <strong>Location:</strong> New university lecture theatre complex
                  </p>
                  <p>
                    <strong>Issue:</strong> On a university project, an incomplete IO list led to 15 CO₂ sensors being 
                    missed from the original design. Electricians installed the cabling based on architectural drawings, 
                    but no controller points were allocated for these sensors in the BMS design.
                  </p>
                  <p>
                    <strong>Discovery:</strong> The problem was only discovered during commissioning when the controls 
                    engineer tried to configure the CO₂-based demand controlled ventilation.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 mb-4">
            <h5 className="text-yellow-400 font-semibold mb-2">The Consequences</h5>
            <div className="text-sm text-foreground space-y-2">
              <ul className="ml-4 space-y-1">
                <li>• Additional I/O modules had to be procured and installed</li>
                <li>• Control panel modifications required</li>
                <li>• BMS software had to be reprogrammed</li>
                <li>• Additional cabling and termination work needed</li>
                <li>• Project delayed by 3 weeks</li>
                <li>• Significant cost overrun for variations</li>
              </ul>
            </div>
          </div>
          
          <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
              <div>
                <h5 className="text-green-400 font-semibold mb-2">The Solution & New Process</h5>
                <div className="text-sm text-foreground space-y-2">
                  <p><strong>Immediate fix:</strong> Emergency procurement of additional I/O capacity</p>
                  <p className="mt-2"><strong>Process improvement:</strong> The design team introduced a new rule:</p>
                  <ul className="ml-4 space-y-1">
                    <li>• IO lists must be signed off by both electrical and commissioning teams before procurement</li>
                    <li>• Cross-referencing between architectural drawings and BMS schematics mandatory</li>
                    <li>• 20% spare I/O capacity included in all future projects</li>
                    <li>• Regular design review meetings during design development</li>
                  </ul>
                  <p className="mt-2"><strong>Result:</strong> No similar issues on subsequent projects</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Lightbulb className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="text-blue-400 font-semibold mb-2">Key Learning Points</h4>
              <div className="text-sm text-foreground space-y-2">
                <p className="mb-2">These real-world examples demonstrate that:</p>
                <ul className="space-y-1 ml-4">
                  <li>• <strong>Prevention is better than cure:</strong> Proper installation saves costly remedial work</li>
                  <li>• <strong>Standards exist for good reasons:</strong> BS 7671 segregation requirements prevent real problems</li>
                  <li>• <strong>Power quality matters:</strong> Undersized or poor-quality supplies cause equipment failures</li>
                  <li>• <strong>Documentation is crucial:</strong> Good records enable effective troubleshooting</li>
                  <li>• <strong>Consider the bigger picture:</strong> BMS failures can have serious consequences for building occupants</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};