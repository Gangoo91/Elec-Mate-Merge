import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Settings, Clipboard } from 'lucide-react';
import CommissioningDefinitionQuickCheck from '@/components/upskilling/smart-home/CommissioningDefinitionQuickCheck';

const CommissioningFundamentalsSection = () => {
  return (
    <div className="space-y-6">
      <Card className="bg-elec-gray border-transparent">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Settings className="h-6 w-6 text-elec-yellow" />
            What is Commissioning?
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-blue-600/10 border border-blue-600/30 rounded-lg">
            <h4 className="font-semibold text-blue-400 mb-2">Definition</h4>
            <p className="text-gray-300">
              <strong className="text-foreground">Commissioning</strong> = the process of making a system fully operational
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Commissioning Includes:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-[#1a1a1a] rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Clipboard className="h-4 w-4 text-elec-yellow" />
                  <span className="font-medium text-foreground">Device Pairing</span>
                </div>
                <p className="text-gray-300 text-sm">Connecting devices to hubs and networks</p>
              </div>
              
              <div className="p-4 bg-[#1a1a1a] rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Clipboard className="h-4 w-4 text-elec-yellow" />
                  <span className="font-medium text-foreground">Testing Functionality</span>
                </div>
                <p className="text-gray-300 text-sm">Verifying each device operates correctly</p>
              </div>
              
              <div className="p-4 bg-[#1a1a1a] rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Clipboard className="h-4 w-4 text-elec-yellow" />
                  <span className="font-medium text-foreground">Programming Routines</span>
                </div>
                <p className="text-gray-300 text-sm">Setting up automation and schedules</p>
              </div>
              
              <div className="p-4 bg-[#1a1a1a] rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Clipboard className="h-4 w-4 text-elec-yellow" />
                  <span className="font-medium text-foreground">Documenting Results</span>
                </div>
                <p className="text-gray-300 text-sm">Recording device details and settings</p>
              </div>
            </div>
          </div>

          <div className="bg-green-600/10 border border-green-600/30 rounded-lg p-4">
            <h4 className="font-semibold text-green-400 mb-2">Key Benefits</h4>
            <ul className="space-y-1 text-gray-300 text-sm">
              <li>• Ensures compliance with design specifications and client needs</li>
              <li>• Reduces call-backs and customer complaints</li>
              <li>• Validates system reliability before handover</li>
              <li>• Provides documentation for future maintenance</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <CommissioningDefinitionQuickCheck />
    </div>
  );
};

export default CommissioningFundamentalsSection;