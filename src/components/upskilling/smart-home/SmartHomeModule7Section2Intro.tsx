import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Info } from 'lucide-react';

const SmartHomeModule7Section2Intro = () => {
  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Info className="h-6 w-6 text-elec-yellow" />
          Introduction
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-gray-300 text-base leading-relaxed">
          Installing smart home devices is only half the job. <strong className="text-foreground">Commissioning</strong> — the process of testing, configuring, and pairing devices — ensures the system works as designed and meets client expectations. Poor commissioning leads to unreliable systems, frustrated clients, and costly call-backs.
        </p>
        
        <p className="text-gray-300 text-base leading-relaxed">
          This section covers pairing procedures, system setup, and best practice testing protocols that professional electricians need to master for successful smart home installations.
        </p>
        
        <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg p-4">
          <h4 className="font-semibold text-elec-yellow mb-2">Why Commissioning Matters</h4>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-elec-yellow">•</span>
              Ensures devices work reliably from day one
            </li>
            <li className="flex items-start gap-2">
              <span className="text-elec-yellow">•</span>
              Prevents call-backs and customer complaints
            </li>
            <li className="flex items-start gap-2">
              <span className="text-elec-yellow">•</span>
              Validates system performance against specifications
            </li>
            <li className="flex items-start gap-2">
              <span className="text-elec-yellow">•</span>
              Builds client confidence in the installation
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default SmartHomeModule7Section2Intro;