import { Globe } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const SmartHomeModule5Section4RemoteAccess = () => {
  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Globe className="h-6 w-6 text-green-500" />
          1. What is Remote Access?
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-6">
        <div className="bg-green-600/10 p-4 rounded-lg border border-green-600/30">
          <h4 className="text-foreground font-semibold mb-3">Definition and Core Concept</h4>
          <p className="text-sm mb-3">
            Remote access means controlling home devices (lighting, heating, CCTV, alarms) via the 
            internet, usually through a mobile app or web portal. This technology enables homeowners 
            to interact with their property systems from anywhere in the world with an internet connection.
          </p>
          <p className="text-sm">
            It relies on the home hub/router being connected to cloud servers, creating a secure 
            communication bridge between your mobile device and the home automation system.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h4 className="text-foreground font-semibold text-lg mb-4">Common Remote Access Methods</h4>
            <div className="space-y-3">
              <div className="bg-blue-600/20 p-3 rounded border border-blue-600/40">
                <p className="text-blue-400 font-semibold text-sm mb-1">Mobile Applications</p>
                <p className="text-xs text-foreground">Native iOS and Android apps with dedicated interfaces</p>
              </div>
              <div className="bg-purple-600/20 p-3 rounded border border-purple-600/40">
                <p className="text-purple-400 font-semibold text-sm mb-1">Web Portals</p>
                <p className="text-xs text-foreground">Browser-based dashboards for computer access</p>
              </div>
              <div className="bg-orange-600/20 p-3 rounded border border-orange-600/40">
                <p className="text-orange-400 font-semibold text-sm mb-1">Voice Assistants</p>
                <p className="text-xs text-foreground">Alexa, Google Assistant, and Siri integration</p>
              </div>
              <div className="bg-green-600/20 p-3 rounded border border-green-600/40">
                <p className="text-green-400 font-semibold text-sm mb-1">API Integration</p>
                <p className="text-xs text-foreground">Third-party automation and custom applications</p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-foreground font-semibold text-lg mb-4">Technology Requirements</h4>
            <div className="space-y-3">
              <div className="bg-elec-dark p-3 rounded border border-gray-600">
                <p className="text-elec-yellow font-semibold text-sm mb-1">Essential Infrastructure</p>
                <ul className="text-xs text-foreground space-y-1">
                  <li>• Reliable broadband internet connection</li>
                  <li>• Home router with port forwarding capability</li>
                  <li>• Smart home hub or gateway device</li>
                  <li>• Cloud service subscription (often included)</li>
                  <li>• Compatible mobile device or computer</li>
                </ul>
              </div>
              <div className="bg-elec-dark p-3 rounded border border-gray-600">
                <p className="text-blue-400 font-semibold text-sm mb-1">Network Considerations</p>
                <ul className="text-xs text-foreground space-y-1">
                  <li>• Minimum upload speed of 2Mbps recommended</li>
                  <li>• Router placement for optimal device coverage</li>
                  <li>• Regular firmware updates for security</li>
                  <li>• Firewall configuration for safe access</li>
                  <li>• Backup internet connection options</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-elec-dark p-4 rounded-lg">
          <h4 className="text-elec-yellow font-semibold mb-3">Communication Flow</h4>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="bg-blue-600/20 p-3 rounded mb-2">
                <p className="text-foreground font-semibold text-sm">Mobile App</p>
              </div>
              <p className="text-xs">User sends command</p>
            </div>
            <div className="text-center">
              <div className="bg-green-600/20 p-3 rounded mb-2">
                <p className="text-foreground font-semibold text-sm">Cloud Server</p>
              </div>
              <p className="text-xs">Processes & authenticates</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-600/20 p-3 rounded mb-2">
                <p className="text-foreground font-semibold text-sm">Home Hub</p>
              </div>
              <p className="text-xs">Receives instruction</p>
            </div>
            <div className="text-center">
              <div className="bg-orange-600/20 p-3 rounded mb-2">
                <p className="text-foreground font-semibold text-sm">Device</p>
              </div>
              <p className="text-xs">Executes action</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};