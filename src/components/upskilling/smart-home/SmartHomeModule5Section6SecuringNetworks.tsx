import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Lock, Shield, Smartphone, Wifi } from 'lucide-react';
import { SecureNetworkQuickCheck } from './SecureNetworkQuickCheck';

export const SmartHomeModule5Section6SecuringNetworks = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Lock className="h-5 w-5 text-elec-yellow" />
          Securing Smart Home Networks
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-elec-dark p-4 rounded-lg border border-gray-600">
            <div className="flex items-center gap-2 mb-2">
              <Wifi className="h-4 w-4 text-elec-yellow" />
              <h4 className="font-semibold text-foreground">Wi-Fi Security</h4>
            </div>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                Use strong, unique Wi-Fi passwords (minimum 12 characters)
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                Enable WPA3 encryption (or at least WPA2)
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                Change default router login credentials
              </li>
            </ul>
          </div>

          <div className="bg-elec-dark p-4 rounded-lg border border-gray-600">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="h-4 w-4 text-elec-yellow" />
              <h4 className="font-semibold text-foreground">Device Management</h4>
            </div>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                Keep device firmware and apps up to date
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                Change default device passwords immediately
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                Regularly review connected devices
              </li>
            </ul>
          </div>

          <div className="bg-elec-dark p-4 rounded-lg border border-gray-600">
            <div className="flex items-center gap-2 mb-2">
              <Wifi className="h-4 w-4 text-elec-yellow" />
              <h4 className="font-semibold text-foreground">Network Segmentation</h4>
            </div>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                Set up a separate guest Wi-Fi network
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                Consider IoT device isolation
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                Use VLANs for advanced separation
              </li>
            </ul>
          </div>

          <div className="bg-elec-dark p-4 rounded-lg border border-gray-600">
            <div className="flex items-center gap-2 mb-2">
              <Smartphone className="h-4 w-4 text-elec-yellow" />
              <h4 className="font-semibold text-foreground">Authentication</h4>
            </div>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                Enable two-factor authentication (2FA) where possible
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                Use unique passwords for each device/app
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                Consider password managers
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-green-950/20 p-4 rounded-lg border border-green-800/30">
          <h4 className="font-semibold text-green-400 mb-2">Best Practice Checklist</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div className="text-gray-300 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-green-400">✓</span>
                Strong router password
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-400">✓</span>
                WPA3/WPA2 encryption
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-400">✓</span>
                Regular firmware updates
              </div>
            </div>
            <div className="text-gray-300 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-green-400">✓</span>
                Guest network setup
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-400">✓</span>
                2FA enabled
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-400">✓</span>
                Default passwords changed
              </div>
            </div>
          </div>
        </div>

        <SecureNetworkQuickCheck />
      </CardContent>
    </Card>
  );
};