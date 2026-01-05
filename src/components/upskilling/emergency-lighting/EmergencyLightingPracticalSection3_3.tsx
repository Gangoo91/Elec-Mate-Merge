import { Wrench, AlertTriangle, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const EmergencyLightingPracticalSection3_3 = () => {
  return (
    <Card className="bg-gradient-to-br from-green-600/20 to-green-800/10 border border-green-500/40 shadow-lg">
      <CardHeader>
        <CardTitle className="text-green-300 flex items-center gap-2">
          <Wrench className="h-5 w-5 text-green-400 drop-shadow-md" />
          Practical Guidance
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-4">
            <div className="p-4 bg-gradient-to-br from-blue-600/20 to-blue-800/10 border border-blue-500/40 rounded-lg">
              <h4 className="text-blue-300 font-semibold mb-2 flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-blue-400" />
                Pre-Installation Checks
              </h4>
              <ul className="text-foreground text-sm space-y-1">
                <li>• Use laser distance meters or plans to confirm mounting heights accurately</li>
                <li>• Verify structural capacity for luminaire weight and fixing loads</li>
                <li>• Check for services conflicts (HVAC, sprinklers, data cables)</li>
                <li>• Confirm access requirements for future maintenance</li>
              </ul>
            </div>
            
            <div className="p-4 bg-gradient-to-br from-purple-600/20 to-purple-800/10 border border-purple-500/40 rounded-lg">
              <h4 className="text-purple-300 font-semibold mb-2 flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-purple-400" />
                Installation Best Practice
              </h4>
              <ul className="text-foreground text-sm space-y-1">
                <li>• In warehouses, check that luminaires are not obstructed by shelving or gantries</li>
                <li>• Test beam orientation during installation to ensure correct coverage</li>
                <li>• Use appropriate fixing methods for ceiling construction type</li>
                <li>• Ensure cable entries maintain IP rating where required</li>
              </ul>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="p-4 bg-gradient-to-br from-teal-600/20 to-teal-800/10 border border-teal-500/40 rounded-lg">
              <h4 className="text-teal-300 font-semibold mb-2 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-teal-400" />
                Key Considerations
              </h4>
              <ul className="text-foreground text-sm space-y-1">
                <li>• Remember that battery backup output may be lower than mains output — confirm emergency mode performance</li>
                <li>• Consider maintenance access — fittings mounted too high can increase costs of routine testing and repairs</li>
                <li>• Account for future layout changes that might affect light distribution</li>
                <li>• Ensure emergency lighting integrates well with general lighting schemes</li>
              </ul>
            </div>
            
            <div className="p-4 bg-gradient-to-br from-orange-600/20 to-orange-800/10 border border-orange-500/40 rounded-lg">
              <h4 className="text-orange-300 font-semibold mb-2 flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-orange-400" />
                Documentation Requirements
              </h4>
              <ul className="text-foreground text-sm space-y-1">
                <li>• Document spacing and mounting heights on the lighting layout drawings for verification</li>
                <li>• Record actual lux measurements during commissioning</li>
                <li>• Include photometric calculations in design documentation</li>
                <li>• Provide maintenance schedules and access requirements</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="bg-amber-600/20 border border-amber-500/40 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="h-4 w-4 text-amber-400" />
            <span className="text-amber-300 font-semibold">Critical Reminder</span>
          </div>
          <p className="text-foreground text-sm">
            Always verify photometric performance during commissioning testing. Even correctly installed systems can fail to meet requirements due to unforeseen obstructions, surface finishes, or component variations. Early detection prevents costly remedial work.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};