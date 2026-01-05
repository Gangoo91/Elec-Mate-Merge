import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Network, Lightbulb, Shield, Camera, Heart } from 'lucide-react';

export const IntegrationSensorsSection = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Network className="h-5 w-5 text-elec-yellow" />
          Integration with Smart Systems
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 bg-[#1a1a1a] border border-yellow-600 rounded-lg">
            <h4 className="font-semibold text-yellow-200 mb-3 flex items-center gap-2">
              <Lightbulb className="h-4 w-4 text-yellow-400" />
              Lighting Automation
            </h4>
            <p className="text-yellow-100 text-sm">
              PIR sensors trigger lights on entry, providing automatic illumination and acting as a visual deterrent to potential intruders.
            </p>
          </div>

          <div className="p-4 bg-[#1a1a1a] border border-red-600 rounded-lg">
            <h4 className="font-semibold text-red-200 mb-3 flex items-center gap-2">
              <Shield className="h-4 w-4 text-red-400" />
              Security Alarms
            </h4>
            <p className="text-red-100 text-sm">
              Door contact sensors trigger sirens and send immediate alerts when unauthorised entry is detected.
            </p>
          </div>
        </div>

        <div className="p-4 bg-[#1a1a1a] border border-blue-600 rounded-lg">
          <h4 className="font-semibold text-blue-200 mb-3 flex items-center gap-2">
            <Camera className="h-4 w-4 text-blue-400" />
            Intelligent Automation
          </h4>
          <p className="text-blue-100 text-sm mb-3">
            Advanced integration enables complex automation scenarios:
          </p>
          <ul className="text-blue-100 text-sm space-y-1">
            <li>• If contact sensor + motion detected → activate CCTV recording</li>
            <li>• PIR in hallway + time after 10pm → security mode activated</li>
            <li>• Door contact + no motion after 30 minutes → energy saving mode</li>
          </ul>
        </div>

        <div className="p-4 bg-[#1a1a1a] border border-green-600 rounded-lg">
          <h4 className="font-semibold text-green-200 mb-3 flex items-center gap-2">
            <Heart className="h-4 w-4 text-green-400" />
            Accessibility and Care
          </h4>
          <p className="text-green-100 text-sm">
            Contact sensors notify carers when doors open, providing peace of mind for elderly residents or children's safety monitoring.
          </p>
        </div>

        <div className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 border border-purple-600/50 rounded-lg p-4">
          <h4 className="font-semibold text-purple-200 mb-2">Integration Benefits</h4>
          <p className="text-purple-100 text-sm">
            Smart sensor integration transforms individual devices into a cohesive security ecosystem, enabling intelligent responses that adapt to different scenarios and user needs.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};