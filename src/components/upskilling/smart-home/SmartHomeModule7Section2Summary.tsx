import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen } from 'lucide-react';

const SmartHomeModule7Section2Summary = () => {
  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-elec-yellow" />
          Section Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="text-gray-300 space-y-4">
        <p>
          This section covered the critical commissioning process that transforms installed smart home devices into a fully operational system.
        </p>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-3 bg-[#1a1a1a] rounded-lg">
            <h4 className="font-semibold text-foreground mb-2">Commissioning Ensures</h4>
            <ul className="text-sm space-y-1">
              <li>• Devices are set up and tested correctly</li>
              <li>• Systems are fully operational before handover</li>
              <li>• Client expectations are met</li>
              <li>• Future problems are prevented</li>
            </ul>
          </div>
          
          <div className="p-3 bg-[#1a1a1a] rounded-lg">
            <h4 className="font-semibold text-foreground mb-2">Key Activities</h4>
            <ul className="text-sm space-y-1">
              <li>• Device pairing following manufacturer instructions</li>
              <li>• Comprehensive testing and verification</li>
              <li>• Systematic troubleshooting of issues</li>
              <li>• Client training and documentation</li>
            </ul>
          </div>
        </div>
        
        <p>
          Pairing requires following manufacturer instructions carefully, while testing includes verifying individual device function and system-wide routines. Troubleshooting may involve checking power, signal, duplication, or firmware issues.
        </p>

        <p>
          Proper commissioning prevents costly call-backs and ensures client satisfaction, making it an essential skill for professional smart home installers.
        </p>
      </CardContent>
    </Card>
  );
};

export default SmartHomeModule7Section2Summary;