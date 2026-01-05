import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Network } from 'lucide-react';

export const HVACIntegrationSection = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Network className="h-5 w-5 text-elec-yellow" />
          1. What is HVAC Integration?
        </CardTitle>
      </CardHeader>
      <CardContent className="text-gray-300 space-y-4">
        <p className="leading-relaxed">
          HVAC integration involves connecting heating, ventilation, and cooling systems into one coordinated control network. 
          This unified approach ensures all components work together efficiently rather than operating independently.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">How Integration Works:</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-1.5 flex-shrink-0"></div>
                Achieved through hubs, BMS (Building Management Systems), or dedicated HVAC controllers
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-1.5 flex-shrink-0"></div>
                Systems respond to occupancy sensors and external conditions
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-1.5 flex-shrink-0"></div>
                Central control coordinates all HVAC components
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Key Benefits:</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-1.5 flex-shrink-0"></div>
                Prevents conflicting operations
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-1.5 flex-shrink-0"></div>
                Reduces energy consumption
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-1.5 flex-shrink-0"></div>
                Improves overall comfort
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-1.5 flex-shrink-0"></div>
                Extends equipment lifespan
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-[#1a1a1a] border border-gray-600 rounded-lg p-4">
          <h4 className="font-semibold text-foreground mb-3">Integration Example:</h4>
          <p className="text-sm text-gray-300">
            A smart thermostat connects to both heating and cooling systems, window sensors, and occupancy detectors. 
            When nobody is home, it reduces HVAC activity. If windows are opened, it temporarily suspends operation to avoid wasting energy.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};