import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, AlertCircle, Usb, Globe, Cable } from 'lucide-react';

export const BMSModule7Section4ContentPart1 = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Download className="h-5 w-5 text-elec-yellow" />
          Software Upload
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-6">
        <div>
          <h4 className="text-elec-yellow font-semibold mb-3">What is Software Upload?</h4>
          <p className="text-foreground mb-4">
            The BMS software package is prepared by engineers and then loaded into site controllers. This software contains 
            all the control logic, device mappings, setpoints, and operational parameters needed for the controller to 
            operate the connected plant and equipment.
          </p>
        </div>

        <div>
          <h4 className="text-elec-yellow font-semibold mb-3">Upload Communication Methods</h4>
          
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
              <h5 className="text-blue-400 font-semibold mb-2 flex items-center gap-2">
                <Usb className="h-4 w-4" />
                USB Connection
              </h5>
              <div className="space-y-2 text-sm">
                <p className="text-foreground"><strong>Method:</strong> Direct laptop to controller</p>
                <ul className="ml-4 space-y-1">
                  <li>• Most common for individual controllers</li>
                  <li>• Requires physical access to controller</li>
                  <li>• Fast and reliable connection</li>
                  <li>• No network dependencies</li>
                </ul>
                <div className="bg-gray-700 rounded p-2 mt-2">
                  <p className="text-xs text-foreground">
                    <strong>Typical use:</strong> Single controllers, field devices, standalone units
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
              <h5 className="text-green-400 font-semibold mb-2 flex items-center gap-2">
                <Globe className="h-4 w-4" />
                Ethernet/IP
              </h5>
              <div className="space-y-2 text-sm">
                <p className="text-foreground"><strong>Method:</strong> Network connection via switch</p>
                <ul className="ml-4 space-y-1">
                  <li>• Can upload to multiple controllers</li>
                  <li>• Remote access capability</li>
                  <li>• Faster for large programs</li>
                  <li>• Requires network infrastructure</li>
                </ul>
                <div className="bg-gray-700 rounded p-2 mt-2">
                  <p className="text-xs text-foreground">
                    <strong>Typical use:</strong> Main controllers, central plant, networked systems
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
              <h5 className="text-purple-400 font-semibold mb-2 flex items-center gap-2">
                <Cable className="h-4 w-4" />
                Serial/RS-485
              </h5>
              <div className="space-y-2 text-sm">
                <p className="text-foreground"><strong>Method:</strong> Serial communication bus</p>
                <ul className="ml-4 space-y-1">
                  <li>• Used for older controllers</li>
                  <li>• Multi-drop capability</li>
                  <li>• Slower upload speeds</li>
                  <li>• Requires correct bus termination</li>
                </ul>
                <div className="bg-gray-700 rounded p-2 mt-2">
                  <p className="text-xs text-foreground">
                    <strong>Typical use:</strong> Legacy systems, retrofit projects, simple controllers
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-elec-yellow font-semibold mb-3">What Gets Uploaded?</h4>
          
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-blue-500/10 to-green-500/10 border border-blue-500/20 rounded-lg p-4">
              <h5 className="text-blue-400 font-semibold mb-2">Software Package Contents</h5>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div className="bg-gray-700 rounded-lg p-3">
                  <p className="text-foreground font-semibold mb-2">Control Logic:</p>
                  <ul className="space-y-1 ml-4">
                    <li>• AHU supply and extract fan sequences</li>
                    <li>• Pump changeover and duty cycling logic</li>
                    <li>• Chiller/boiler startup and shutdown procedures</li>
                    <li>• VAV box temperature control algorithms</li>
                    <li>• Safety interlock and alarm logic</li>
                  </ul>
                </div>
                
                <div className="bg-gray-700 rounded-lg p-3">
                  <p className="text-foreground font-semibold mb-2">Configuration Data:</p>
                  <ul className="space-y-1 ml-4">
                    <li>• Device mappings from IO lists</li>
                    <li>• Default setpoints and operating ranges</li>
                    <li>• Time schedules and calendar exceptions</li>
                    <li>• Alarm limits and notification settings</li>
                    <li>• Trending and logging configurations</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-elec-yellow font-semibold mb-3">Upload Process Example</h4>
          
          <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20 rounded-lg p-4">
            <h5 className="text-green-400 font-semibold mb-2">Chiller Controller Programming</h5>
            <div className="space-y-3 text-sm">
              <div className="bg-gray-700 rounded-lg p-3">
                <p className="text-foreground mb-2"><strong>Upload includes:</strong></p>
                <ul className="space-y-1 ml-4">
                  <li>• Chilled water temperature PID control (setpoint 6°C)</li>
                  <li>• Condenser water pump sequencing logic</li>
                  <li>• Safety trips for low flow, high pressure, oil failure</li>
                  <li>• Capacity modulation based on load demand</li>
                  <li>• Energy monitoring and efficiency calculations</li>
                  <li>• Maintenance reminder scheduling</li>
                </ul>
              </div>
              
              <div className="bg-blue-500/10 border border-blue-500/20 rounded p-3">
                <p className="text-blue-400 font-semibold mb-1">Upload Method:</p>
                <p className="text-xs text-foreground">
                  Engineer connects laptop to chiller controller via Ethernet, downloads program package over network. 
                  Controller validates program integrity, loads control logic, and begins normal operation sequence.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-elec-yellow font-semibold mb-3">Pre-Upload Requirements</h4>
          
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
            <h5 className="text-red-400 font-semibold mb-2">Critical Prerequisites</h5>
            <div className="space-y-3 text-sm">
              <div className="grid md:grid-cols-2 gap-3">
                <div>
                  <p className="text-foreground font-semibold mb-2">Power & Infrastructure:</p>
                  <ul className="ml-4 space-y-1">
                    <li>• Stable, clean power supply to controller</li>
                    <li>• All communication wiring completed and tested</li>
                    <li>• Network switches powered and configured</li>
                    <li>• Termination resistors installed correctly</li>
                  </ul>
                </div>
                <div>
                  <p className="text-foreground font-semibold mb-2">Configuration & Access:</p>
                  <ul className="ml-4 space-y-1">
                    <li>• Controller addressing completed and verified</li>
                    <li>• Panel access available and safe</li>
                    <li>• Communication ports accessible</li>
                    <li>• Device labelling completed</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="text-foreground font-semibold mb-2">Inline Check</h4>
              <p className="text-sm text-foreground mb-2">
                👉 Why must controllers be powered and stable before software upload?
              </p>
              <p className="text-xs text-foreground">
                <strong>Answer:</strong> Controllers need stable power to maintain memory during upload, process the incoming 
                software package, and validate program integrity. Unstable power can corrupt the upload, damage the controller's 
                memory, or cause programming failures that require complete reprogramming.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};