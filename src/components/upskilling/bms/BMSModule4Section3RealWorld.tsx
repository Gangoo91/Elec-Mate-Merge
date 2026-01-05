import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building, AlertTriangle, CheckCircle } from 'lucide-react';

export const BMSModule4Section3RealWorld = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Building className="h-5 w-5 text-elec-yellow" />
          Real World Example
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-6">
        <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 border border-blue-600/40 rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4 text-blue-300">Commercial Office Access Control Installation</h3>
          
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-4 bg-red-900/40 rounded-lg border border-red-500/40">
                  <AlertTriangle className="h-6 w-6 text-red-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-2 text-red-400">The Problem</h4>
                    <p className="text-sm text-gray-300">
                      In a commercial office, electricians installed maglocks on main doors but forgot to integrate them with the fire alarm system. During testing, doors remained locked when the alarm was triggered — a major safety hazard.
                    </p>
                  </div>
                </div>
                
                <div className="bg-gray-800/60 rounded-lg p-4">
                  <h4 className="font-semibold mb-3 text-gray-300">Installation Details:</h4>
                  <ul className="space-y-2 text-sm text-gray-400">
                    <li>• 4 x 300kg maglocks on main entry doors</li>
                    <li>• Card readers at 1.2m height</li>
                    <li>• 12V DC power supplies with battery backup</li>
                    <li>• Door position monitoring switches</li>
                    <li>• Emergency release buttons</li>
                  </ul>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-4 bg-green-900/40 rounded-lg border border-green-500/40">
                  <CheckCircle className="h-6 w-6 text-green-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-2 text-green-400">The Solution</h4>
                    <p className="text-sm text-gray-300">
                      After re-wiring the relays to the fire alarm panel, the system released doors automatically during alarms, ensuring compliance with fire regulations.
                    </p>
                  </div>
                </div>
                
                <div className="bg-gray-800/60 rounded-lg p-4">
                  <h4 className="font-semibold mb-3 text-gray-300">Corrective Actions:</h4>
                  <ul className="space-y-2 text-sm text-gray-400">
                    <li>• Connected maglock relays to fire alarm panel</li>
                    <li>• Programmed fail-safe operation on alarm</li>
                    <li>• Added override relays for emergency services</li>
                    <li>• Updated as-built drawings and documentation</li>
                    <li>• Tested with fire brigade during handover</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="bg-yellow-900/30 border border-yellow-600/40 rounded-lg p-4">
              <h4 className="font-semibold mb-2 text-yellow-400">Key Learning Points</h4>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h5 className="font-medium mb-2 text-yellow-300">Technical:</h5>
                  <ul className="space-y-1 text-gray-300">
                    <li>• Fire alarm integration is mandatory, not optional</li>
                    <li>• Test all safety functions during commissioning</li>
                    <li>• Document all integration points clearly</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium mb-2 text-yellow-300">Compliance:</h5>
                  <ul className="space-y-1 text-gray-300">
                    <li>• BS 7273 requires automatic door release</li>
                    <li>• Building control approval needed for modifications</li>
                    <li>• Fire risk assessment must be updated</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};