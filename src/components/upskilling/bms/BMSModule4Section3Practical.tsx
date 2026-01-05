import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Wrench, AlertTriangle, CheckCircle2 } from 'lucide-react';

export const BMSModule4Section3Practical = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Wrench className="h-5 w-5 text-elec-yellow" />
          Practical Guidance
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-6">
        
        {/* Installing Door Relays and Locks */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-elec-yellow">Installing Door Relays and Locks</h3>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-gray-800 rounded-lg">
                <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold mb-1">Check Specifications</h4>
                  <p className="text-sm text-gray-300">Confirm whether the door requires fail-safe or fail-secure operation.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-3 bg-gray-800 rounded-lg">
                <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold mb-1">Wire Correctly</h4>
                  <p className="text-sm text-gray-300">Use relays rated for the lock's voltage/current. Keep control wiring separate from power feeds.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-3 bg-gray-800 rounded-lg">
                <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold mb-1">Test Unlocking</h4>
                  <p className="text-sm text-gray-300">Ensure locks release immediately when a valid card is presented or fire alarm is triggered.</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-gray-800 rounded-lg">
                <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold mb-1">Provide Manual Override</h4>
                  <p className="text-sm text-gray-300">Fit break-glass units or emergency release buttons near locked doors.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-3 bg-gray-800 rounded-lg">
                <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold mb-1">Label Wiring</h4>
                  <p className="text-sm text-gray-300">Clearly mark lock circuits, especially if multiple locks are fed from one controller.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reader and Device Installation */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-elec-yellow">Reader and Device Installation</h3>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-600 text-sm">
              <thead>
                <tr className="bg-gray-800">
                  <th className="border border-gray-600 px-4 py-3 text-left font-semibold">Installation Task</th>
                  <th className="border border-gray-600 px-4 py-3 text-left font-semibold">Specification</th>
                  <th className="border border-gray-600 px-4 py-3 text-left font-semibold">Best Practice</th>
                  <th className="border border-gray-600 px-4 py-3 text-left font-semibold">Testing Method</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-600 px-4 py-2"><strong>Reader Height</strong></td>
                  <td className="border border-gray-600 px-4 py-2">1.2m for card readers</td>
                  <td className="border border-gray-600 px-4 py-2">Consider wheelchair access</td>
                  <td className="border border-gray-600 px-4 py-2">Measure from finished floor</td>
                </tr>
                <tr className="bg-gray-800/50">
                  <td className="border border-gray-600 px-4 py-2"><strong>Cable Routing</strong></td>
                  <td className="border border-gray-600 px-4 py-2">Separate from mains circuits</td>
                  <td className="border border-gray-600 px-4 py-2">Use dedicated containment</td>
                  <td className="border border-gray-600 px-4 py-2">IR test at 500V DC</td>
                </tr>
                <tr>
                  <td className="border border-gray-600 px-4 py-2"><strong>Cable Protection</strong></td>
                  <td className="border border-gray-600 px-4 py-2">Screened cable for data</td>
                  <td className="border border-gray-600 px-4 py-2">Earth screen at one end only</td>
                  <td className="border border-gray-600 px-4 py-2">Check for interference</td>
                </tr>
                <tr className="bg-gray-800/50">
                  <td className="border border-gray-600 px-4 py-2"><strong>Communication Test</strong></td>
                  <td className="border border-gray-600 px-4 py-2">Verify reader signals</td>
                  <td className="border border-gray-600 px-4 py-2">Test before final fixing</td>
                  <td className="border border-gray-600 px-4 py-2">End-to-end system test</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Safety and Compliance */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-elec-yellow">Safety and Compliance</h3>
          
          <div className="grid md:grid-cols-1 gap-4">
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-4 bg-red-900/30 rounded-lg border border-red-600/40">
                <AlertTriangle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold mb-2 text-red-400">Fire Door Safety</h4>
                  <p className="text-sm text-gray-300">Fire doors must always default to safe egress. Never install a lock that prevents exit during a fire alarm.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-4 bg-blue-900/30 rounded-lg border border-blue-600/40">
                <CheckCircle2 className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold mb-2 text-blue-400">Power Supply Backup</h4>
                  <p className="text-sm text-gray-300">Ensure power supplies for access systems are backed up (UPS or battery) so locks operate during outages.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-4 bg-green-900/30 rounded-lg border border-green-600/40">
                <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold mb-2 text-green-400">Documentation</h4>
                  <p className="text-sm text-gray-300">Document which locks are fail-safe vs fail-secure in as-built drawings.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};