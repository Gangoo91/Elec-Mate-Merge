import { MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const SmartHomeModule5Section4RealWorld = () => {
  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <MapPin className="h-6 w-6 text-green-500" />
          Real World Example
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-6">
        <div className="bg-green-600/10 p-4 rounded-lg border border-green-600/30">
          <h4 className="text-foreground font-semibold mb-3">London Holiday Security Alert</h4>
          <p className="text-sm mb-3">
            A homeowner in London installed a smart security system with door sensors, cameras, 
            and alarms before going on holiday abroad. The system was configured with remote 
            access through a mobile app, including push notifications for any security events.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h4 className="text-foreground font-semibold text-lg mb-4">The Incident</h4>
            <div className="space-y-3">
              <div className="bg-blue-600/20 p-3 rounded border border-blue-600/40">
                <p className="text-blue-400 font-semibold text-sm mb-1">Alert Received</p>
                <p className="text-xs text-foreground">
                  While holidaying in Spain, the homeowner received a push notification at 2:30 PM 
                  that the back door had been opened unexpectedly.
                </p>
              </div>
              <div className="bg-orange-600/20 p-3 rounded border border-orange-600/40">
                <p className="text-orange-400 font-semibold text-sm mb-1">Immediate Response</p>
                <p className="text-xs text-foreground">
                  Using the mobile app, they immediately accessed the CCTV feed from the back 
                  garden camera to see who had entered the property.
                </p>
              </div>
              <div className="bg-green-600/20 p-3 rounded border border-green-600/40">
                <p className="text-green-400 font-semibold text-sm mb-1">Situation Resolved</p>
                <p className="text-xs text-foreground">
                  The camera revealed their trusted neighbour entering through the back door 
                  to feed their cat, as previously arranged.
                </p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-foreground font-semibold text-lg mb-4">System Benefits Demonstrated</h4>
            <div className="space-y-3">
              <div className="bg-elec-dark p-3 rounded border border-gray-600">
                <p className="text-cyan-400 font-semibold text-sm mb-1">✓ Immediate Awareness</p>
                <ul className="text-xs text-foreground space-y-1">
                  <li>• Real-time notification delivered instantly</li>
                  <li>• Location-independent monitoring capability</li>
                  <li>• No delay in security event detection</li>
                </ul>
              </div>
              <div className="bg-elec-dark p-3 rounded border border-gray-600">
                <p className="text-yellow-400 font-semibold text-sm mb-1">✓ Visual Verification</p>
                <ul className="text-xs text-foreground space-y-1">
                  <li>• Live camera feed accessible immediately</li>
                  <li>• High-quality video for clear identification</li>
                  <li>• Avoided false alarm and unnecessary panic</li>
                </ul>
              </div>
              <div className="bg-elec-dark p-3 rounded border border-gray-600">
                <p className="text-green-400 font-semibold text-sm mb-1">✓ Peace of Mind</p>
                <ul className="text-xs text-foreground space-y-1">
                  <li>• Confirmed authorised access quickly</li>
                  <li>• Continued holiday enjoyment without worry</li>
                  <li>• Trust in system reliability established</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-elec-dark p-4 rounded-lg">
          <h4 className="text-elec-yellow font-semibold mb-3">Technical Implementation Details</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-foreground font-semibold text-sm mb-2">System Components:</p>
              <ul className="text-xs space-y-1">
                <li>• Magnetic door sensor on back door</li>
                <li>• IP camera with motion detection</li>
                <li>• Central hub with 4G backup</li>
                <li>• Mobile app with push notifications</li>
              </ul>
            </div>
            <div>
              <p className="text-foreground font-semibold text-sm mb-2">Network Setup:</p>
              <ul className="text-xs space-y-1">
                <li>• High-speed fibre broadband connection</li>
                <li>• Dual-band Wi-Fi router with good coverage</li>
                <li>• Cloud storage for video recordings</li>
                <li>• Encrypted data transmission protocols</li>
              </ul>
            </div>
            <div>
              <p className="text-foreground font-semibold text-sm mb-2">Configuration Keys:</p>
              <ul className="text-xs space-y-1">
                <li>• Instant alerts for door opening events</li>
                <li>• Camera triggered by door sensor activation</li>
                <li>• Mobile app logged in on multiple devices</li>
                <li>• Neighbour contact details in emergency list</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-purple-600/10 p-4 rounded-lg border border-purple-600/30">
          <h4 className="text-purple-400 font-semibold mb-3">Lessons for Electricians</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-foreground font-semibold text-sm mb-2">Installation Best Practices:</p>
              <ul className="text-xs space-y-1">
                <li>• Ensure robust internet connectivity before installation</li>
                <li>• Test remote access thoroughly during commissioning</li>
                <li>• Configure backup internet connection where possible</li>
                <li>• Provide customer training on app usage and features</li>
              </ul>
            </div>
            <div>
              <p className="text-foreground font-semibold text-sm mb-2">Customer Education Points:</p>
              <ul className="text-xs space-y-1">
                <li>• Demonstrate how to check camera feeds remotely</li>
                <li>• Explain notification settings and customisation</li>
                <li>• Discuss backup procedures for internet outages</li>
                <li>• Create emergency contact list within the system</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};