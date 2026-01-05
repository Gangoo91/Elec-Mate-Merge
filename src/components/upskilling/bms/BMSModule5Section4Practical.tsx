import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Wrench, Cable, CheckCircle, AlertTriangle, Search, Gauge } from 'lucide-react';

export const BMSModule5Section4Practical = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Wrench className="h-5 w-5 text-elec-yellow" />
          Practical Guidance
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-8">
        {/* Installation Guidelines */}
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-lg p-6">
            <h4 className="text-foreground font-semibold flex items-center gap-2 mb-4 text-lg">
              <Cable className="h-5 w-5 text-elec-yellow" />
              Installing KNX Bus Cabling
            </h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-foreground">Use certified KNX cable (typically green-sheathed twisted pair)</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-foreground">Polarity matters — red/positive to red/positive connections</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-foreground">No loops — use line, tree, or star topology only</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-foreground">Segregate from mains voltage unless properly separated</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-foreground">Maximum 1000m total bus cable length</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20 rounded-lg p-6">
            <h4 className="text-foreground font-semibold flex items-center gap-2 mb-4 text-lg">
              <Cable className="h-5 w-5 text-elec-yellow" />
              Installing KNX Devices
            </h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-foreground">Mount devices in panels or wall boxes per manufacturer specs</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-foreground">Use only KNX-certified power supplies with integrated choke</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-foreground">Verify bus voltage (~30V DC) before commissioning</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-foreground">Document physical addresses for commissioning team</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-foreground">Calculate total current consumption vs supply capacity</span>
              </div>
            </div>
          </div>
        </div>

        {/* Troubleshooting Section */}
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/20 rounded-lg p-6">
            <h4 className="text-foreground font-semibold flex items-center gap-2 mb-4 text-lg">
              <AlertTriangle className="h-5 w-5 text-red-400" />
              Common Installation Mistakes
            </h4>
            <div className="space-y-2 text-sm">
              <p className="text-foreground">• Incorrect polarity connections (most common issue)</p>
              <p className="text-foreground">• Creating loops in bus topology</p>
              <p className="text-foreground">• Using non-KNX certified cable or power supplies</p>
              <p className="text-foreground">• Exceeding maximum cable lengths or device counts</p>
              <p className="text-foreground">• Insufficient separation from mains voltage cables</p>
              <p className="text-foreground">• Poor cable management causing physical damage</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-lg p-6">
            <h4 className="text-foreground font-semibold flex items-center gap-2 mb-4 text-lg">
              <Search className="h-5 w-5 text-elec-yellow" />
              Quick Troubleshooting Guide
            </h4>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-foreground font-medium text-red-300">Device unresponsive:</p>
                <p className="text-foreground pl-2">Check polarity and bus voltage first</p>
              </div>
              <div>
                <p className="text-foreground font-medium text-red-300">Multiple devices failing:</p>
                <p className="text-foreground pl-2">Check if power supply is overloaded</p>
              </div>
              <div>
                <p className="text-foreground font-medium text-red-300">Intermittent faults:</p>
                <p className="text-foreground pl-2">Inspect for illegal loop wiring</p>
              </div>
              <div>
                <p className="text-foreground font-medium text-red-300">System instability:</p>
                <p className="text-foreground pl-2">Check cable quality and terminations</p>
              </div>
            </div>
          </div>
        </div>

        {/* Documentation and Testing */}
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-lg p-6">
            <h4 className="text-foreground font-semibold mb-4 text-lg">Installation Documentation</h4>
            <div className="space-y-2 text-sm">
              <p className="text-foreground">• Record bus line layouts and topology diagrams</p>
              <p className="text-foreground">• Document device locations and mounting details</p>
              <p className="text-foreground">• Note cable routes and junction box locations</p>
              <p className="text-foreground">• Record power supply locations and capacities</p>
              <p className="text-foreground">• Provide clear labelling for commissioning team</p>
              <p className="text-foreground">• Maintain as-built drawings for future maintenance</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-indigo-500/10 to-blue-500/10 border border-indigo-500/20 rounded-lg p-6">
            <h4 className="text-foreground font-semibold mb-4 text-lg">Pre-Commissioning Checks</h4>
            <div className="space-y-2 text-sm">
              <p className="text-foreground">• Verify correct bus voltage at all device locations</p>
              <p className="text-foreground">• Check polarity at every connection point</p>
              <p className="text-foreground">• Confirm no loops exist in the topology</p>
              <p className="text-foreground">• Test isolation between bus and mains circuits</p>
              <p className="text-foreground">• Verify power supply current capacity vs load</p>
              <p className="text-foreground">• Check cable integrity and termination quality</p>
            </div>
          </div>
        </div>

        {/* Advanced Installation Techniques */}
        <div className="bg-gradient-to-r from-teal-500/10 to-cyan-500/10 border border-teal-500/20 rounded-lg p-6">
          <h4 className="text-foreground font-semibold mb-6 text-lg">Advanced Installation Techniques</h4>
          <div className="grid lg:grid-cols-2 gap-8 text-sm">
            <div className="space-y-4">
              <div>
                <p className="text-foreground font-medium mb-3 text-cyan-300">Cable Installation Best Practices:</p>
                <div className="space-y-2 pl-4 border-l-2 border-cyan-500/30">
                  <p className="text-foreground">• Use cable pulling techniques to avoid damage</p>
                  <p className="text-foreground">• Maintain minimum bend radius (4x cable diameter)</p>
                  <p className="text-foreground">• Install spare capacity for future expansion</p>
                  <p className="text-foreground">• Use proper cable management and support systems</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-foreground font-medium mb-3 text-blue-300">Power Supply Planning:</p>
                <div className="space-y-2 pl-4 border-l-2 border-blue-500/30">
                  <p className="text-foreground">• Calculate total device current consumption accurately</p>
                  <p className="text-foreground">• Allow 20% safety margin for power supply sizing</p>
                  <p className="text-foreground">• Consider voltage drop over long cable runs</p>
                  <p className="text-foreground">• Plan for redundant power supplies in critical systems</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Testing Tools and Equipment */}
        <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-lg p-6">
          <h4 className="text-foreground font-semibold flex items-center gap-2 mb-4 text-lg">
            <Gauge className="h-5 w-5 text-elec-yellow" />
            Essential Testing Equipment
          </h4>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div>
              <p className="text-foreground font-medium text-green-400">Basic Tools:</p>
              <p className="text-foreground">• Digital multimeter for voltage checks</p>
              <p className="text-foreground">• Polarity tester for bus connections</p>
              <p className="text-foreground">• Cable tester for continuity</p>
            </div>
            <div>
              <p className="text-foreground font-medium text-yellow-400">Advanced Tools:</p>
              <p className="text-foreground">• KNX bus monitor for traffic analysis</p>
              <p className="text-foreground">• Current clamp meter for load measurement</p>
              <p className="text-foreground">• Insulation tester for safety checks</p>
            </div>
            <div>
              <p className="text-foreground font-medium text-blue-400">Software Tools:</p>
              <p className="text-foreground">• ETS software for system diagnosis</p>
              <p className="text-foreground">• Bus monitoring applications</p>
              <p className="text-foreground">• Network analysis tools</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};