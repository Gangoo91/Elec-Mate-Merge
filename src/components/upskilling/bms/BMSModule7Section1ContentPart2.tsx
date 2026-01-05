import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileImage, AlertCircle, Zap, Settings, Cable } from 'lucide-react';

export const BMSModule7Section1ContentPart2 = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <FileImage className="h-5 w-5 text-elec-yellow" />
          Schematics
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-6">
        <div>
          <h4 className="text-elec-yellow font-semibold mb-3">Purpose of Schematics</h4>
          <p className="text-foreground mb-4">
            Schematics illustrate how devices are wired and controlled. They link physical connections to logical control 
            sequences, providing electricians and engineers with the roadmap needed for installation, commissioning, and 
            maintenance. Different types of schematics serve different purposes in BMS projects.
          </p>
        </div>

        <div>
          <h4 className="text-elec-yellow font-semibold mb-3">Types of BMS Schematics</h4>
          
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
              <h5 className="text-blue-400 font-semibold mb-2 flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Control Panel Wiring
              </h5>
              <div className="space-y-2 text-sm">
                <p className="text-foreground mb-2"><strong>Purpose:</strong></p>
                <ul className="ml-4 space-y-1">
                  <li>• Show I/O module connections</li>
                  <li>• Terminal block layouts</li>
                  <li>• Internal panel wiring</li>
                  <li>• Power distribution</li>
                  <li>• Fusing and protection</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
              <h5 className="text-green-400 font-semibold mb-2 flex items-center gap-2">
                <Cable className="h-4 w-4" />
                Field Device Wiring
              </h5>
              <div className="space-y-2 text-sm">
                <p className="text-foreground mb-2"><strong>Shows:</strong></p>
                <ul className="ml-4 space-y-1">
                  <li>• Sensor connections</li>
                  <li>• Actuator wiring</li>
                  <li>• Power supply routing</li>
                  <li>• Cable specifications</li>
                  <li>• Junction box details</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
              <h5 className="text-purple-400 font-semibold mb-2 flex items-center gap-2">
                <Zap className="h-4 w-4" />
                Control Logic
              </h5>
              <div className="space-y-2 text-sm">
                <p className="text-foreground mb-2"><strong>Represents:</strong></p>
                <ul className="ml-4 space-y-1">
                  <li>• Control sequences</li>
                  <li>• Interlocks and safety</li>
                  <li>• Lead/lag operation</li>
                  <li>• Alarm conditions</li>
                  <li>• Override functions</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-elec-yellow font-semibold mb-3">Control Loop Example</h4>
          <p className="text-foreground mb-4">
            A typical BMS schematic might show a boiler control loop, including temperature sensor input, 
            PID controller logic, and actuator signal to the gas valve. Here's what this would include:
          </p>
          
          <div className="bg-gradient-to-r from-blue-500/10 to-green-500/10 border border-blue-500/20 rounded-lg p-4">
            <h5 className="text-blue-400 font-semibold mb-2">Boiler Control Loop Components</h5>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <strong className="text-foreground">Input Side:</strong>
                <ul className="ml-4 mt-1 space-y-1">
                  <li>• Flow temperature sensor (4-20mA)</li>
                  <li>• Return temperature sensor (4-20mA)</li>
                  <li>• Outside air temperature (0-10V)</li>
                  <li>• Boiler run status (digital input)</li>
                  <li>• Safety interlock signals</li>
                </ul>
              </div>
              <div>
                <strong className="text-foreground">Output Side:</strong>
                <ul className="ml-4 mt-1 space-y-1">
                  <li>• Gas valve modulation (0-10V)</li>
                  <li>• Pump start/stop (relay output)</li>
                  <li>• Fault alarm signal (relay output)</li>
                  <li>• Status indication (LED/display)</li>
                  <li>• Network communication (BACnet/Modbus)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-elec-yellow font-semibold mb-3">Essential Schematic Information</h4>
          <p className="text-foreground mb-4">
            Effective schematics provide more than just basic connections - they include all the information needed 
            for successful installation and commissioning:
          </p>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
              <h5 className="text-yellow-400 font-semibold mb-2">Physical Details</h5>
              <ul className="space-y-2 text-sm">
                <li>• <strong>Cable types and sizes:</strong> Not just connections</li>
                <li>• <strong>Terminal numbers:</strong> Exact connection points</li>
                <li>• <strong>Cable routes:</strong> Containment system references</li>
                <li>• <strong>Device locations:</strong> Plant room, panel, field</li>
                <li>• <strong>Power requirements:</strong> 24V AC/DC, 230V AC</li>
              </ul>
            </div>
            
            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
              <h5 className="text-green-400 font-semibold mb-2">Functional Information</h5>
              <ul className="space-y-2 text-sm">
                <li>• <strong>Signal ranges:</strong> 4-20mA = 0-100°C</li>
                <li>• <strong>Control logic:</strong> PID parameters, setpoints</li>
                <li>• <strong>Alarm conditions:</strong> High/low limits</li>
                <li>• <strong>Interlock sequences:</strong> Safety requirements</li>
                <li>• <strong>Override capabilities:</strong> Manual/auto modes</li>
              </ul>
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-elec-yellow font-semibold mb-3">Standards and Symbols</h4>
          
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-lg p-4">
              <h5 className="text-purple-400 font-semibold mb-2">Drawing Standards</h5>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <strong className="text-foreground">Symbol Standards:</strong>
                  <ul className="ml-4 mt-1 space-y-1">
                    <li>• BS/IEC symbols for clarity</li>
                    <li>• Consistent device representations</li>
                    <li>• Standard line weights and styles</li>
                    <li>• Clear labelling conventions</li>
                  </ul>
                </div>
                <div>
                  <strong className="text-foreground">Documentation:</strong>
                  <ul className="ml-4 mt-1 space-y-1">
                    <li>• Title blocks with revision control</li>
                    <li>• Drawing numbers and references</li>
                    <li>• Cable schedules and legends</li>
                    <li>• "As-built" update requirements</li>
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
                👉 What do schematics provide that IO lists do not?
              </p>
              <p className="text-xs text-foreground">
                <strong>Answer:</strong> Schematics show the physical and logical connections between devices, 
                control sequences, wiring methods, and spatial relationships. While IO lists identify what signals 
                exist, schematics show how they're connected and how the system works as a whole.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};