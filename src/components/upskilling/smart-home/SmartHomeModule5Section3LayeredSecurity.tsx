import { Shield } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const SmartHomeModule5Section3LayeredSecurity = () => {
  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Shield className="h-6 w-6 text-purple-500" />
          Layered Security Benefits
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-6">
        <div className="bg-purple-600/10 p-4 rounded-lg border border-purple-600/30">
          <h4 className="text-foreground font-semibold mb-3">Perimeter + Interior Detection Strategy</h4>
          <p className="text-sm mb-3">
            Combining contact sensors at entry points with PIR sensors for interior detection 
            creates multiple detection layers that significantly improve security effectiveness. 
            This approach provides redundancy and catches different types of intrusion attempts.
          </p>
          <p className="text-sm">
            Contact sensors detect the initial breach at doors and windows, while PIR sensors 
            catch movement inside the property, ensuring comprehensive coverage even if perimeter 
            sensors are bypassed or disabled.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h4 className="text-foreground font-semibold text-lg mb-4">Security Enhancement</h4>
            <div className="space-y-3">
              <div className="bg-blue-600/20 p-3 rounded border border-blue-600/40">
                <p className="text-blue-400 font-semibold text-sm mb-1">Redundant Detection</p>
                <p className="text-xs text-foreground">Multiple sensors reduce risk of undetected intrusion</p>
              </div>
              <div className="bg-green-600/20 p-3 rounded border border-green-600/40">
                <p className="text-green-400 font-semibold text-sm mb-1">Different Detection Methods</p>
                <p className="text-xs text-foreground">Physical contact and thermal movement detection</p>
              </div>
              <div className="bg-purple-600/20 p-3 rounded border border-purple-600/40">
                <p className="text-purple-400 font-semibold text-sm mb-1">Bypass Protection</p>
                <p className="text-xs text-foreground">Interior sensors catch intruders who avoid entry points</p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-foreground font-semibold text-lg mb-4">Automation Integration</h4>
            <div className="space-y-3">
              <div className="bg-elec-dark p-3 rounded border border-gray-600">
                <p className="text-yellow-400 font-semibold text-sm mb-1">Lighting Automation</p>
                <p className="text-xs text-foreground">Automatic lights deter intruders and assist response</p>
              </div>
              <div className="bg-elec-dark p-3 rounded border border-gray-600">
                <p className="text-blue-400 font-semibold text-sm mb-1">CCTV Activation</p>
                <p className="text-xs text-foreground">Triggered recording provides evidence and monitoring</p>
              </div>
              <div className="bg-elec-dark p-3 rounded border border-gray-600">
                <p className="text-green-400 font-semibold text-sm mb-1">Alert Systems</p>
                <p className="text-xs text-foreground">Immediate notifications enable rapid response</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};