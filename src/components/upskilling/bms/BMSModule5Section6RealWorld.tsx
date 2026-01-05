import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

export const BMSModule5Section6RealWorld = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Building className="h-5 w-5 text-elec-yellow" />
          Real World Example
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-6">
        <div className="bg-blue-600/20 border border-blue-600/40 rounded-lg p-6">
          <h4 className="font-semibold text-blue-200 mb-4 text-xl">Large Shopping Centre Project</h4>
          <p className="text-blue-100 mb-4">
            A major retail development with over 150 HVAC controllers experienced severe communication problems 
            that threatened the project handover date and posed potential safety risks.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* The Problem */}
          <div className="bg-elec-dark p-5 rounded-lg border border-red-600/30">
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="h-6 w-6 text-red-400" />
              <h4 className="font-semibold text-red-300 text-lg">The Problem</h4>
            </div>
            <div className="space-y-4">
              <div className="p-3 bg-red-500/10 border border-red-500/20 rounded">
                <p className="font-medium text-red-200">Initial Installation:</p>
                <ul className="text-sm text-red-100 mt-2 space-y-1">
                  <li>• All 150+ devices on single BACnet MSTP loop</li>
                  <li>• 2.5km total cable run exceeding recommendations</li>
                  <li>• No network segmentation or planning</li>
                  <li>• Devices distributed across 3 floors and 4 buildings</li>
                </ul>
              </div>
              
              <div className="p-3 bg-orange-500/10 border border-orange-500/20 rounded">
                <p className="font-medium text-orange-200">Symptoms:</p>
                <ul className="text-sm text-orange-100 mt-2 space-y-1">
                  <li>• Communication extremely slow (20-30 seconds)</li>
                  <li>• Frequent timeout errors and lost connections</li>
                  <li>• Fire alarm integration unreliable</li>
                  <li>• HVAC systems not responding to schedules</li>
                </ul>
              </div>
              
              <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded">
                <p className="font-medium text-yellow-200">Impact:</p>
                <ul className="text-sm text-yellow-100 mt-2 space-y-1">
                  <li>• Project handover delayed by 6 weeks</li>
                  <li>• Significant costs in diagnostics and rework</li>
                  <li>• Client confidence severely damaged</li>
                  <li>• Safety systems not fully operational</li>
                </ul>
              </div>
            </div>
          </div>

          {/* The Solution */}
          <div className="bg-elec-dark p-5 rounded-lg border border-green-600/30">
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle className="h-6 w-6 text-green-400" />
              <h4 className="font-semibold text-green-300 text-lg">The Solution</h4>
            </div>
            <div className="space-y-4">
              <div className="p-3 bg-green-500/10 border border-green-500/20 rounded">
                <p className="font-medium text-green-200">Network Redesign:</p>
                <ul className="text-sm text-green-100 mt-2 space-y-1">
                  <li>• Split into 5 segments: 30 devices each maximum</li>
                  <li>• One segment per building/floor section</li>
                  <li>• BACnet/IP routers connecting segments</li>
                  <li>• Proper 120Ω termination on each segment</li>
                </ul>
              </div>
              
              <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded">
                <p className="font-medium text-blue-200">Installation Changes:</p>
                <ul className="text-sm text-blue-100 mt-2 space-y-1">
                  <li>• New shielded twisted pair cabling</li>
                  <li>• Dedicated panels for each segment</li>
                  <li>• Clear labelling and documentation</li>
                  <li>• Proper cable separation from power circuits</li>
                </ul>
              </div>
              
              <div className="p-3 bg-purple-500/10 border border-purple-500/20 rounded">
                <p className="font-medium text-purple-200">Results:</p>
                <ul className="text-sm text-purple-100 mt-2 space-y-1">
                  <li>• Latency reduced to under 1 second</li>
                  <li>• 100% reliable communication achieved</li>
                  <li>• All safety systems fully operational</li>
                  <li>• Easy troubleshooting and maintenance</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-elec-dark p-5 rounded-lg border border-gray-600">
          <div className="flex items-center gap-3 mb-4">
            <Clock className="h-6 w-6 text-yellow-400" />
            <h4 className="font-semibold text-yellow-300 text-lg">Performance Comparison</h4>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-600">
                  <th className="text-left py-2 text-gray-300">Metric</th>
                  <th className="text-left py-2 text-red-300">Before Segmentation</th>
                  <th className="text-left py-2 text-green-300">After Segmentation</th>
                </tr>
              </thead>
              <tbody className="space-y-2">
                <tr className="border-b border-gray-700">
                  <td className="py-2 text-gray-300">Response Time</td>
                  <td className="py-2 text-red-200">20-30 seconds</td>
                  <td className="py-2 text-green-200">Under 1 second</td>
                </tr>
                <tr className="border-b border-gray-700">
                  <td className="py-2 text-gray-300">Communication Reliability</td>
                  <td className="py-2 text-red-200">60% success rate</td>
                  <td className="py-2 text-green-200">100% success rate</td>
                </tr>
                <tr className="border-b border-gray-700">
                  <td className="py-2 text-gray-300">Fault Diagnosis Time</td>
                  <td className="py-2 text-red-200">4-6 hours</td>
                  <td className="py-2 text-green-200">15-30 minutes</td>
                </tr>
                <tr>
                  <td className="py-2 text-gray-300">System Availability</td>
                  <td className="py-2 text-red-200">75% uptime</td>
                  <td className="py-2 text-green-200">99.8% uptime</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-orange-600/20 border border-orange-600/40 rounded-lg p-4">
            <p className="text-orange-100 font-medium">
              <strong>Key Lesson:</strong> Network planning must happen during the design phase. Retrofitting segmentation after installation cost 3x more than doing it right from the start.
            </p>
          </div>
          
          <div className="bg-green-600/20 border border-green-600/40 rounded-lg p-4">
            <p className="text-green-100 font-medium">
              <strong>Success Factor:</strong> Close collaboration between electricians and IT engineers was essential for the successful network redesign and commissioning.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};