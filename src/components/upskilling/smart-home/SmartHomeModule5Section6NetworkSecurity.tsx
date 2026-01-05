import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Wifi, AlertTriangle } from 'lucide-react';
import { NetworkSecurityQuickCheck } from './NetworkSecurityQuickCheck';

export const SmartHomeModule5Section6NetworkSecurity = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Wifi className="h-5 w-5 text-elec-yellow" />
          Why Network Security Matters
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-4">
          <div className="bg-elec-dark p-4 rounded-lg border border-gray-600">
            <h4 className="font-semibold text-foreground mb-2">Communication Methods</h4>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                Smart devices communicate over Wi-Fi, Bluetooth, Zigbee, or Z-Wave
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                These networks create potential entry points for attackers
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                Each connected device increases the attack surface
              </li>
            </ul>
          </div>

          <div className="bg-red-950/20 p-4 rounded-lg border border-red-800/30">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="h-4 w-4 text-red-400" />
              <h4 className="font-semibold text-red-400">Security Risks</h4>
            </div>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-red-400">•</span>
                If networks are unsecured, attackers can gain control of cameras, locks, or lighting
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400">•</span>
                Data such as video feeds, access logs, and personal details can be stolen
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400">•</span>
                Compromised systems can be used for further attacks or surveillance
              </li>
            </ul>
          </div>
        </div>

        <NetworkSecurityQuickCheck />
      </CardContent>
    </Card>
  );
};