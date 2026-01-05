import { DoorOpen } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const SmartHomeModule5Section3ContactSensors = () => {
  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <DoorOpen className="h-6 w-6 text-blue-500" />
          Door/Window Contact Sensors
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-6">
        <div className="bg-blue-600/10 p-4 rounded-lg border border-blue-600/30">
          <h4 className="text-foreground font-semibold mb-3">How Contact Sensors Work</h4>
          <p className="text-sm mb-3">
            Door and window contact sensors consist of two components: a magnetic switch (sensor) 
            mounted on the frame and a magnet mounted on the moving door or window. When the door 
            or window opens, the magnet moves away from the sensor, breaking the magnetic field 
            and triggering an alert.
          </p>
          <p className="text-sm">
            These sensors provide immediate detection of unauthorised entry attempts at perimeter 
            access points, forming the first line of defence in a layered security system.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h4 className="text-foreground font-semibold text-lg mb-4">Optimal Placement Locations</h4>
            <div className="space-y-3">
              <div className="bg-green-600/20 p-3 rounded border border-green-600/40">
                <p className="text-green-400 font-semibold text-sm mb-1">Primary Entry Points</p>
                <p className="text-xs text-foreground">Front door, back door, patio doors, main access routes</p>
              </div>
              <div className="bg-blue-600/20 p-3 rounded border border-blue-600/40">
                <p className="text-blue-400 font-semibold text-sm mb-1">Ground Floor Windows</p>
                <p className="text-xs text-foreground">Accessible windows, bay windows, French windows</p>
              </div>
              <div className="bg-purple-600/20 p-3 rounded border border-purple-600/40">
                <p className="text-purple-400 font-semibold text-sm mb-1">Secondary Access</p>
                <p className="text-xs text-foreground">Garage doors, side gates, basement access</p>
              </div>
              <div className="bg-orange-600/20 p-3 rounded border border-orange-600/40">
                <p className="text-orange-400 font-semibold text-sm mb-1">Vulnerable Areas</p>
                <p className="text-xs text-foreground">Basement windows, roof access, conservatory doors</p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-foreground font-semibold text-lg mb-4">Key Advantages & Limitations</h4>
            <div className="space-y-3">
              <div className="bg-elec-dark p-3 rounded border border-gray-600">
                <p className="text-green-400 font-semibold text-sm mb-1">✓ Advantages</p>
                <ul className="text-xs text-foreground space-y-1">
                  <li>• Immediate detection at entry points</li>
                  <li>• Very low power consumption</li>
                  <li>• Simple installation and maintenance</li>
                  <li>• No false alarms from pets or weather</li>
                  <li>• Works in all lighting conditions</li>
                </ul>
              </div>
              <div className="bg-elec-dark p-3 rounded border border-gray-600">
                <p className="text-red-400 font-semibold text-sm mb-1">⚠ Limitations</p>
                <ul className="text-xs text-foreground space-y-1">
                  <li>• Only detects when door/window opens</li>
                  <li>• Cannot detect glass breakage</li>
                  <li>• Vulnerable to tampering if visible</li>
                  <li>• May not detect slow, careful opening</li>
                  <li>• Requires proper alignment for reliability</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-elec-dark p-4 rounded-lg">
          <h4 className="text-elec-yellow font-semibold mb-3">Smart Features & Integration</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-foreground font-semibold text-sm mb-2">Automation Triggers:</p>
              <ul className="text-xs space-y-1">
                <li>• Automatic lighting activation</li>
                <li>• HVAC system responses</li>
                <li>• Security camera recording</li>
                <li>• Notification alerts</li>
              </ul>
            </div>
            <div>
              <p className="text-foreground font-semibold text-sm mb-2">Monitoring Features:</p>
              <ul className="text-xs space-y-1">
                <li>• Open/close history logging</li>
                <li>• Battery level monitoring</li>
                <li>• Signal strength indicators</li>
                <li>• Tamper detection alerts</li>
              </ul>
            </div>
            <div>
              <p className="text-foreground font-semibold text-sm mb-2">Integration Options:</p>
              <ul className="text-xs space-y-1">
                <li>• Smart locks coordination</li>
                <li>• Alarm system integration</li>
                <li>• Mobile app notifications</li>
                <li>• Voice assistant compatibility</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};