import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Wrench, Tag, CheckCircle2, FileText } from 'lucide-react';

export const BMSModule7Section4Practical = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Wrench className="h-5 w-5 text-elec-yellow" />
          Practical Guidance
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-6">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Tag className="h-5 w-5 text-blue-400" />
            <h3 className="text-xl font-semibold text-foreground">Best Practices for Supporting Upload</h3>
          </div>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
              <div>
                <span className="font-semibold text-blue-300">Confirm Stable Power:</span>
                <p className="text-foreground text-sm mt-1">Verify all controllers have correct, stable power before engineers connect. Check voltage levels, test under load, and ensure UPS systems are operational for critical controllers.</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
              <div>
                <span className="font-semibold text-blue-300">Verify Communication Infrastructure:</span>
                <p className="text-foreground text-sm mt-1">Check termination resistors are fitted where RS-485 buses end. Test cable continuity, verify polarity, and ensure network switches are powered and configured correctly.</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
              <div>
                <span className="font-semibold text-blue-300">Clear Device Labelling:</span>
                <p className="text-foreground text-sm mt-1">Label each controller with device ID and panel location using permanent labels. Include communication method and any special access requirements.</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
              <div>
                <span className="font-semibold text-blue-300">Accessible Connections:</span>
                <p className="text-foreground text-sm mt-1">Keep a laptop connection point accessible in every panel. Ensure USB ports are clean, Ethernet jacks are functional, and programming cables are available.</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
              <div>
                <span className="font-semibold text-blue-300">Environmental Conditions:</span>
                <p className="text-foreground text-sm mt-1">Ensure panels are protected from moisture, dust, and extreme temperatures. Clean any contamination that could affect connections or cooling.</p>
              </div>
            </li>
          </ul>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-4">
            <FileText className="h-5 w-5 text-green-400" />
            <h3 className="text-xl font-semibold text-foreground">Best Practices for Controller Setup</h3>
          </div>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
              <div>
                <span className="font-semibold text-green-300">Document All Settings:</span>
                <p className="text-foreground text-sm mt-1">Record IP addresses and device IDs in commissioning logs and O&M manuals. Include network settings, communication parameters, and any special configurations.</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
              <div>
                <span className="font-semibold text-green-300">Time Synchronisation:</span>
                <p className="text-foreground text-sm mt-1">Ensure all controllers are time-synchronised with the BMS server. Set up automatic synchronisation schedules and verify daylight saving time handling.</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
              <div>
                <span className="font-semibold text-green-300">I/O Point Verification:</span>
                <p className="text-foreground text-sm mt-1">Verify each I/O point responds correctly after upload. Test inputs by changing field conditions and outputs by commanding equipment operation from the BMS.</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
              <div>
                <span className="font-semibold text-green-300">Safety Function Testing:</span>
                <p className="text-foreground text-sm mt-1">Test fail-safe logic including fire alarm triggers, emergency stops, and high/low limit responses. Verify equipment shuts down correctly during safety events.</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
              <div>
                <span className="font-semibold text-green-300">Parameter Validation:</span>
                <p className="text-foreground text-sm mt-1">Confirm default setpoints and operating parameters match design specifications. Check temperature ranges, timing parameters, and alarm limits before enabling automatic control.</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
              <div>
                <span className="font-semibold text-green-300">Network Performance:</span>
                <p className="text-foreground text-sm mt-1">Test network performance under full load conditions. Verify communication speeds, check for packet loss, and confirm data integrity across all network segments.</p>
              </div>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-foreground mb-4">Upload Support Workflow</h3>
          
          <div className="bg-gradient-to-r from-blue-500/10 to-green-500/10 border border-blue-500/20 rounded-lg p-4">
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div className="bg-gray-700 rounded-lg p-3">
                  <p className="text-foreground font-semibold mb-2">Pre-Upload Phase:</p>
                  <ol className="space-y-1 ml-4 text-xs">
                    <li>1. Complete power and communication infrastructure checks</li>
                    <li>2. Verify controller addressing and labelling</li>
                    <li>3. Test all communication paths and network connectivity</li>
                    <li>4. Prepare safe access to all controller locations</li>
                    <li>5. Coordinate with engineering team on upload schedule</li>
                  </ol>
                </div>
                
                <div className="bg-gray-700 rounded-lg p-3">
                  <p className="text-foreground font-semibold mb-2">During Upload Phase:</p>
                  <ol className="space-y-1 ml-4 text-xs">
                    <li>1. Monitor power stability and controller status indicators</li>
                    <li>2. Assist with cable connections and troubleshooting</li>
                    <li>3. Provide field device operation for testing</li>
                    <li>4. Document any issues or anomalies discovered</li>
                    <li>5. Verify upload completion and controller restart</li>
                  </ol>
                </div>
              </div>
              
              <div className="bg-gray-700 rounded-lg p-3 text-sm">
                <p className="text-foreground font-semibold mb-2">Post-Upload Phase:</p>
                <div className="grid md:grid-cols-3 gap-3 text-xs">
                  <div>
                    <p className="text-foreground font-semibold mb-1">System Testing:</p>
                    <ul className="ml-4 space-y-1">
                      <li>• Test all I/O point responses</li>
                      <li>• Verify safety function operation</li>
                      <li>• Check alarm and notification systems</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-foreground font-semibold mb-1">Documentation:</p>
                    <ul className="ml-4 space-y-1">
                      <li>• Update commissioning records</li>
                      <li>• Record final configuration settings</li>
                      <li>• Document any field modifications</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-foreground font-semibold mb-1">Handover:</p>
                    <ul className="ml-4 space-y-1">
                      <li>• Transfer system to operations team</li>
                      <li>• Provide training on local overrides</li>
                      <li>• Ensure maintenance access preserved</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-foreground mb-4">Common Pitfalls to Avoid</h3>
          
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
            <div className="space-y-3 text-sm">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-red-300 font-semibold mb-2">Power-Related Issues:</p>
                  <ul className="space-y-1 ml-4 text-xs">
                    <li>• Don't assume power is stable - always test under load</li>
                    <li>• Avoid uploading during electrical work on same circuits</li>
                    <li>• Never skip UPS battery testing for critical controllers</li>
                    <li>• Don't ignore voltage fluctuation warnings</li>
                  </ul>
                </div>
                <div>
                  <p className="text-red-300 font-semibold mb-2">Communication Problems:</p>
                  <ul className="space-y-1 ml-4 text-xs">
                    <li>• Don't assume RS-485 polarity is correct</li>
                    <li>• Avoid uploading over unreliable network connections</li>
                    <li>• Don't skip termination resistor verification</li>
                    <li>• Never leave controllers with duplicate addresses</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-gray-700 rounded p-3 mt-3">
                <p className="text-red-400 font-semibold mb-1">Critical Warning:</p>
                <p className="text-xs text-foreground">
                  A failed upload can brick a controller, requiring factory reprogramming or replacement. Always verify all electrical 
                  prerequisites before allowing software upload to proceed. Prevention is far more cost-effective than recovery.
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};