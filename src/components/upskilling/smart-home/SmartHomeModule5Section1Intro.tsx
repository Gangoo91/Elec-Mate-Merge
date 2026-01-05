import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Info, Lock, Shield, Smartphone } from 'lucide-react';

export const SmartHomeModule5Section1Intro = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Info className="h-5 w-5 text-elec-yellow" />
          Introduction
        </CardTitle>
      </CardHeader>
      <CardContent className="text-gray-300 space-y-4">
        <p>
          Access control is a core element of smart security systems. Traditional locks and keys are being replaced or supplemented by <strong className="text-foreground">smart locks and keypads</strong>, which allow secure, flexible, and trackable access. These systems integrate with apps, hubs, and wider smart home security features, giving users more control over who enters their property and when.
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
          <div className="p-4 bg-[#1a1a1a] border border-blue-600 rounded-lg">
            <Lock className="h-6 w-6 text-blue-400 mb-2" />
            <h4 className="font-semibold text-blue-200 mb-2">Electronic Control</h4>
            <p className="text-blue-100 text-sm">Replace mechanical keys with app control, keypads, and biometric access.</p>
          </div>
          
          <div className="p-4 bg-[#1a1a1a] border border-green-600 rounded-lg">
            <Shield className="h-6 w-6 text-green-400 mb-2" />
            <h4 className="font-semibold text-green-200 mb-2">Enhanced Security</h4>
            <p className="text-green-100 text-sm">Track access, create temporary codes, and integrate with alarm systems.</p>
          </div>
          
          <div className="p-4 bg-[#1a1a1a] border border-purple-600 rounded-lg">
            <Smartphone className="h-6 w-6 text-purple-400 mb-2" />
            <h4 className="font-semibold text-purple-200 mb-2">Remote Management</h4>
            <p className="text-purple-100 text-sm">Lock/unlock from anywhere and receive access notifications.</p>
          </div>
        </div>

        <p>
          Smart locks range from simple retrofit solutions that fit over existing deadbolts to sophisticated replacement systems with biometric authentication and integration capabilities.
        </p>
      </CardContent>
    </Card>
  );
};