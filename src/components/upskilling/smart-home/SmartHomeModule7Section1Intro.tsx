import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Zap, Shield, Wrench } from 'lucide-react';

const SmartHomeModule7Section1Intro = () => {
  return (
    <div className="space-y-6">
      <Card className="bg-elec-gray border-transparent">
        <CardHeader>
          <CardTitle className="text-foreground">Introduction</CardTitle>
        </CardHeader>
        <CardContent className="text-gray-300 space-y-4">
          <p>
            Behind every smart home device is an electrical installation that must be safe, reliable, and compliant. 
            From ensuring correct wiring to selecting suitable power supplies and containment methods, electricians 
            play a critical role in making smart systems work long-term.
          </p>
          <p>
            Poor wiring practices can lead to faults, fire risks, or premature device failure — so this section 
            focuses on best practice installation methods aligned with BS 7671.
          </p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-elec-gray border-transparent hover:border-elec-yellow/20 transition-all duration-300">
          <CardContent className="text-center space-y-3 p-6">
            <div className="flex justify-center">
              <Zap className="h-8 w-8 text-elec-yellow" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">Correct Wiring</h3>
            <p className="text-gray-400 text-sm">
              Understanding device requirements and ensuring proper connections for reliable operation
            </p>
          </CardContent>
        </Card>

        <Card className="bg-elec-gray border-transparent hover:border-elec-yellow/20 transition-all duration-300">
          <CardContent className="text-center space-y-3 p-6">
            <div className="flex justify-center">
              <Shield className="h-8 w-8 text-elec-yellow" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">Safety Compliance</h3>
            <p className="text-gray-400 text-sm">
              Following BS 7671 standards for safe installation and long-term reliability
            </p>
          </CardContent>
        </Card>

        <Card className="bg-elec-gray border-transparent hover:border-elec-yellow/20 transition-all duration-300">
          <CardContent className="text-center space-y-3 p-6">
            <div className="flex justify-center">
              <Wrench className="h-8 w-8 text-elec-yellow" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">Professional Installation</h3>
            <p className="text-gray-400 text-sm">
              Best practices for containment, cable management, and professional finishing
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SmartHomeModule7Section1Intro;