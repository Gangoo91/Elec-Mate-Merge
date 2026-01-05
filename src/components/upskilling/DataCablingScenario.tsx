import { User, AlertTriangle, CheckCircle, Lightbulb } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const DataCablingScenario = () => {
  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <User className="h-5 w-5 text-elec-yellow" />
          Real-World Scenario: Office Expansion Project
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-orange-600/20 border border-orange-600/30 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-orange-400 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-orange-300 mb-2">The Challenge</h4>
              <p className="text-orange-100 text-sm leading-relaxed">
                A growing company needs to expand their office space and add 50 new workstations. 
                The existing cabling is a mix of Cat5 and point-to-point connections installed 
                15 years ago. The IT department wants to support current Gigabit Ethernet and 
                future 10 Gigabit requirements, plus integrate VoIP phones and security cameras.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-green-600/20 border border-green-600/30 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-green-300 mb-2">The Structured Cabling Solution</h4>
              <div className="text-green-100 text-sm space-y-2">
                <p><strong>Infrastructure Design:</strong> Install Cat6A structured cabling system throughout</p>
                <p><strong>Backbone:</strong> Fiber optic backbone between telecommunications rooms</p>
                <p><strong>Horizontal:</strong> Cat6A to all work areas, allowing for 10GBASE-T</p>
                <p><strong>Integration:</strong> Single infrastructure supports data, voice, and security</p>
                <p><strong>Future-Proofing:</strong> 15-year technology lifecycle with upgrade flexibility</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-blue-600/20 border border-blue-600/30 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Lightbulb className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-blue-300 mb-2">Key Benefits Achieved</h4>
              <ul className="text-blue-100 text-sm space-y-1">
                <li>• 40% reduction in total cost of ownership over 10 years</li>
                <li>• Single infrastructure supports multiple applications</li>
                <li>• Easy reconfiguration for future office layout changes</li>
                <li>• Simplified troubleshooting and maintenance</li>
                <li>• Compliance with building and safety standards</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};