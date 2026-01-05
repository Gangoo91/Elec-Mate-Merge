import { CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const SmartHomeSection2QuickCheck = () => {
  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <CheckCircle className="h-6 w-6 text-green-500" />
          In-Line Knowledge Checks
        </CardTitle>
      </CardHeader>
      <CardContent className="text-gray-300 space-y-4">
        <p className="text-base">
          Test your understanding of smart home applications with these focused questions:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-elec-gray p-4 rounded-lg border border-gray-600">
            <p className="text-foreground font-semibold text-sm mb-2">Q1: List three benefits of smart lighting</p>
            <p className="text-xs text-gray-400 mb-3">Consider energy efficiency, convenience, and functionality aspects.</p>
            <div className="text-xs text-green-400">
              Automated scheduling, energy efficiency through dimming/occupancy control, enhanced security integration
            </div>
          </div>
          <div className="bg-elec-gray p-4 rounded-lg border border-gray-600">
            <p className="text-foreground font-semibold text-sm mb-2">Q2: How can a smart thermostat improve energy efficiency?</p>
            <p className="text-xs text-gray-400 mb-3">Think about learning capabilities and automated adjustments.</p>
            <div className="text-xs text-green-400">
              Learning household patterns, occupancy-based heating/cooling, weather integration for optimised energy use
            </div>
          </div>
          <div className="bg-elec-gray p-4 rounded-lg border border-gray-600">
            <p className="text-foreground font-semibold text-sm mb-2">Q3: What is one advantage of smart locks over traditional locks?</p>
            <p className="text-xs text-gray-400 mb-3">Consider access control and monitoring capabilities.</p>
            <div className="text-xs text-green-400">
              Remote access control, activity monitoring, temporary access codes, integration with security systems
            </div>
          </div>
          <div className="bg-elec-gray p-4 rounded-lg border border-gray-600">
            <p className="text-foreground font-semibold text-sm mb-2">Q4: Give an example of how smart homes support accessibility</p>
            <p className="text-xs text-gray-400 mb-3">Focus on assistive technology and independent living support.</p>
            <div className="text-xs text-green-400">
              Voice control for users with mobility limitations, automated assistance, health monitoring integration
            </div>
          </div>
        </div>
        
        <div className="bg-blue-600/10 p-4 rounded-lg border border-blue-600/30 mt-6">
          <p className="text-blue-400 font-semibold text-sm mb-2">Additional Reflection Questions:</p>
          <ul className="text-sm space-y-2">
            <li>• How do smart lighting systems balance energy efficiency with user comfort?</li>
            <li>• What role does zoning play in smart HVAC system efficiency?</li>
            <li>• How can smart security systems provide both protection and convenience?</li>
            <li>• What considerations are important when designing accessibility features?</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};