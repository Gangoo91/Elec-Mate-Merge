import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Info } from 'lucide-react';

export const SmartHomeModule4Section3Intro = () => {
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
          Heating and ventilation aren't just about temperature. Comfort, productivity, and health are influenced by air quality factors such as humidity, carbon dioxide, and particulate matter. Smart environmental sensors measure these conditions and trigger HVAC responses to maintain a safe and comfortable indoor environment.
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
          <div className="p-4 bg-elec-gray border border-blue-600 rounded-lg">
            <h4 className="font-semibold text-blue-200 mb-2">Humidity Control</h4>
            <p className="text-blue-100 text-sm">Maintaining optimal moisture levels prevents mould growth and respiratory issues whilst ensuring comfort.</p>
          </div>
          
          <div className="p-4 bg-elec-gray border border-green-600 rounded-lg">
            <h4 className="font-semibold text-green-200 mb-2">CO₂ Monitoring</h4>
            <p className="text-green-100 text-sm">Tracking carbon dioxide levels ensures adequate ventilation for concentration and cognitive performance.</p>
          </div>
          
          <div className="p-4 bg-elec-gray border border-purple-600 rounded-lg">
            <h4 className="font-semibold text-purple-200 mb-2">Air Quality</h4>
            <p className="text-purple-100 text-sm">Detecting particulates and volatile compounds protects health and triggers appropriate ventilation responses.</p>
          </div>
        </div>

        <p>
          Modern smart systems use environmental data to automatically adjust heating, ventilation, and filtration, creating healthier indoor environments whilst optimising energy consumption.
        </p>
      </CardContent>
    </Card>
  );
};