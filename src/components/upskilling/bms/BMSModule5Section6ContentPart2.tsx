import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GitBranch, TrendingDown, Shield, Plus } from 'lucide-react';

export const BMSModule5Section6ContentPart2 = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <GitBranch className="h-5 w-5 text-elec-yellow" />
          Network Segmentation
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-6">
        <p>
          Segmentation means breaking a large network into smaller, manageable sections. This approach provides multiple benefits for BMS performance and reliability. Understanding when and how to segment networks is crucial for professional BMS installations.
        </p>

        <h3 className="text-xl font-semibold text-foreground mb-4">The Science Behind Segmentation</h3>
        
        <div className="bg-elec-dark p-6 rounded-lg border border-gray-600 mb-6">
          <h4 className="font-semibold text-yellow-300 text-lg mb-4">Communication Theory Fundamentals</h4>
          <p className="text-gray-300 mb-4">
            Network performance follows predictable mathematical relationships. Understanding these helps you design better systems:
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded">
              <h5 className="font-medium text-yellow-200 mb-2">Token Passing Time (BACnet MSTP)</h5>
              <p className="font-mono text-yellow-100 text-sm">T = N × (Ttoken + Tdata + Tsilence)</p>
              <ul className="text-xs text-yellow-100 mt-2 space-y-1">
                <li>• N = Number of devices</li>
                <li>• Ttoken = Token passing time (~5ms)</li>
                <li>• Tdata = Data transmission time (variable)</li>
                <li>• Tsilence = Silent period (~40ms)</li>
              </ul>
            </div>
            
            <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded">
              <h5 className="font-medium text-blue-200 mb-2">Modbus Poll Time</h5>
              <p className="font-mono text-blue-100 text-sm">T = N × (Tpoll + Tresponse + Tgap)</p>
              <ul className="text-xs text-blue-100 mt-2 space-y-1">
                <li>• N = Number of slave devices</li>
                <li>• Tpoll = Query transmission (~10ms)</li>
                <li>• Tresponse = Device response (~20ms)</li>
                <li>• Tgap = Inter-frame gap (~3.5ms)</li>
              </ul>
            </div>
          </div>
        </div>

        <h3 className="text-xl font-semibold text-foreground mb-4">Performance Impact Analysis</h3>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Traffic Reduction Calculations */}
          <div className="bg-elec-dark p-5 rounded-lg border border-gray-600">
            <div className="flex items-center gap-3 mb-3">
              <TrendingDown className="h-6 w-6 text-green-400" />
              <h4 className="font-semibold text-green-300 text-lg">Traffic Reduction Calculations</h4>
            </div>
            <div className="space-y-4">
              <p className="text-sm text-gray-300">Let's calculate the performance difference with a real example:</p>
              
              <div className="p-3 bg-red-500/10 border border-red-500/20 rounded">
                <p className="font-medium text-red-200">Before Segmentation (100 BACnet devices):</p>
                <ul className="text-sm text-red-100 mt-2 space-y-1">
                  <li>• Token rotation time: 100 × 45ms = 4.5 seconds</li>
                  <li>• Each device waits 4.5s between communications</li>
                  <li>• Critical alarms delayed by up to 4.5 seconds</li>
                  <li>• System appears "sluggish" to users</li>
                </ul>
              </div>
              
              <div className="p-3 bg-green-500/10 border border-green-500/20 rounded">
                <p className="font-medium text-green-200">After Segmentation (4 × 25 devices):</p>
                <ul className="text-sm text-green-100 mt-2 space-y-1">
                  <li>• Token rotation per segment: 25 × 45ms = 1.125 seconds</li>
                  <li>• 4× faster response within each segment</li>
                  <li>• Alarms respond in ~1 second</li>
                  <li>• System feels responsive and reliable</li>
                </ul>
              </div>
              
              <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded">
                <p className="font-medium text-blue-200">Bandwidth Utilisation:</p>
                <ul className="text-sm text-blue-100 mt-2 space-y-1">
                  <li>• Single segment: 100% utilisation, high collision rate</li>
                  <li>• Four segments: 25% utilisation each, minimal collisions</li>
                  <li>• Effective throughput increased by 300%</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Reliability Analysis */}
          <div className="bg-elec-dark p-5 rounded-lg border border-gray-600">
            <div className="flex items-center gap-3 mb-3">
              <Shield className="h-6 w-6 text-blue-400" />
              <h4 className="font-semibold text-blue-300 text-lg">Reliability Mathematics</h4>
            </div>
            <div className="space-y-4">
              <p className="text-sm text-gray-300">Segmentation dramatically improves system availability:</p>
              
              <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded">
                <p className="font-medium text-yellow-200">Failure Impact Analysis:</p>
                <ul className="text-sm text-yellow-100 mt-2 space-y-1">
                  <li>• Single segment failure = 100% system down</li>
                  <li>• Four segment failure = 25% system down</li>
                  <li>• Critical systems remain operational</li>
                  <li>• Maintenance can be performed on live system</li>
                </ul>
              </div>
              
              <div className="p-3 bg-purple-500/10 border border-purple-500/20 rounded">
                <p className="font-medium text-purple-200">Fault Location Time:</p>
                <ul className="text-sm text-purple-100 mt-2 space-y-1">
                  <li>• Single segment: Check 100 devices (4-6 hours)</li>
                  <li>• Segmented: Identify segment first (15 minutes)</li>
                  <li>• Then check 25 devices (30-45 minutes)</li>
                  <li>• Total diagnostic time reduced by 85%</li>
                </ul>
              </div>
              
              <div className="p-3 bg-green-500/10 border border-green-500/20 rounded">
                <p className="font-medium text-green-200">System Availability:</p>
                <ul className="text-sm text-green-100 mt-2 space-y-1">
                  <li>• Single segment: 95% availability typical</li>
                  <li>• Segmented system: 99.2% availability</li>
                  <li>• Downtime reduced from 18 days/year to 3 days/year</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <h3 className="text-xl font-semibold text-foreground mb-4">Segmentation Strategies</h3>

        <div className="bg-elec-dark p-6 rounded-lg border border-gray-600 mb-6">
          <h4 className="font-semibold text-green-300 text-lg mb-4">Common Segmentation Approaches</h4>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded">
              <h5 className="font-medium text-blue-200 mb-2">Geographic Segmentation</h5>
              <ul className="text-sm text-blue-100 space-y-1">
                <li>• By floor or building zone</li>
                <li>• By plant room location</li>
                <li>• By building wing or area</li>
                <li>• Matches cable routing naturally</li>
              </ul>
              <p className="text-xs text-blue-100 mt-2 italic">Best for: Large buildings, campus sites</p>
            </div>
            
            <div className="p-4 bg-green-500/10 border border-green-500/20 rounded">
              <h5 className="font-medium text-green-200 mb-2">Functional Segmentation</h5>
              <ul className="text-sm text-green-100 space-y-1">
                <li>• By system type (AHU, VAV, FCU)</li>
                <li>• By service responsibility</li>
                <li>• By operational schedule</li>
                <li>• By criticality level</li>
              </ul>
              <p className="text-xs text-green-100 mt-2 italic">Best for: Complex HVAC systems</p>
            </div>
            
            <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded">
              <h5 className="font-medium text-purple-200 mb-2">Hybrid Segmentation</h5>
              <ul className="text-sm text-purple-100 space-y-1">
                <li>• Combines geographic and functional</li>
                <li>• Critical systems on dedicated segments</li>
                <li>• Load balancing across segments</li>
                <li>• Future expansion planning</li>
              </ul>
              <p className="text-xs text-purple-100 mt-2 italic">Best for: Most commercial installations</p>
            </div>
          </div>
        </div>

        <h3 className="text-xl font-semibold text-foreground mb-4">Step-by-Step Segmentation Process</h3>

        <div className="bg-elec-dark p-6 rounded-lg border border-gray-600 mb-6">
          <h4 className="font-semibold text-yellow-300 text-lg mb-4">Professional Segmentation Design Method</h4>
          
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="bg-yellow-500 text-yellow-900 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">1</div>
              <div className="flex-1">
                <h5 className="font-medium text-yellow-200 mb-2">Device Inventory and Analysis</h5>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>• Count total devices by type and location</li>
                  <li>• Identify communication requirements (polling frequency, data size)</li>
                  <li>• Map cable routes and distances</li>
                  <li>• Note any special requirements (isolation, redundancy)</li>
                </ul>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="bg-blue-500 text-blue-900 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">2</div>
              <div className="flex-1">
                <h5 className="font-medium text-blue-200 mb-2">Calculate Segment Loading</h5>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>• Apply 75% rule to maximum device counts</li>
                  <li>• Calculate communication cycle times</li>
                  <li>• Allow for future expansion (20% spare capacity)</li>
                  <li>• Consider peak loading scenarios</li>
                </ul>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="bg-green-500 text-green-900 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">3</div>
              <div className="flex-1">
                <h5 className="font-medium text-green-200 mb-2">Design Segment Topology</h5>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>• Group devices logically (geographic or functional)</li>
                  <li>• Plan cable routes for each segment</li>
                  <li>• Select router/gateway locations</li>
                  <li>• Design backbone network architecture</li>
                </ul>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="bg-purple-500 text-purple-900 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">4</div>
              <div className="flex-1">
                <h5 className="font-medium text-purple-200 mb-2">Validate and Document</h5>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>• Verify all segments meet performance requirements</li>
                  <li>• Create detailed network diagrams</li>
                  <li>• Document addressing schemes</li>
                  <li>• Plan commissioning and testing procedures</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-blue-600/20 border border-blue-600/40 rounded-lg p-6">
          <h4 className="font-semibold text-blue-200 mb-3">Real Example: Hospital BACnet MSTP</h4>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="font-medium text-blue-300 mb-2">Before Segmentation:</p>
              <ul className="text-sm text-blue-100 space-y-1">
                <li>• 200+ devices on single MSTP trunk</li>
                <li>• Response times: 15-30 seconds</li>
                <li>• Frequent communication timeouts</li>
                <li>• Difficult fault diagnosis</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-blue-300 mb-2">After Segmentation:</p>
              <ul className="text-sm text-blue-100 space-y-1">
                <li>• 4 segments: 50 devices each per floor</li>
                <li>• Response times: Under 1 second</li>
                <li>• Reliable communication</li>
                <li>• Easy maintenance and expansion</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-green-600/20 border border-green-600/40 rounded-lg p-4">
          <p className="text-green-100 font-medium">
            <strong>Best Practice:</strong> Plan segmentation during design phase. It's much more expensive to retrofit segmentation after installation than to implement it from the start.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};