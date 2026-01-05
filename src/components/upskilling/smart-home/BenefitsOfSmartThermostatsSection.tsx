import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp } from 'lucide-react';

export const BenefitsOfSmartThermostatsSection = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-elec-yellow" />
          Benefits of Smart Thermostats
        </CardTitle>
      </CardHeader>
      <CardContent className="text-gray-300 space-y-4">
        <p>
          Smart thermostats offer significant advantages over traditional heating controls, delivering both practical benefits and cost savings.
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-elec-gray border border-green-600 rounded-lg p-4">
            <h4 className="font-semibold text-green-200 mb-3">Energy Efficiency</h4>
            <ul className="space-y-2 text-sm text-green-100">
              <li>• Optimise heating times</li>
              <li>• Avoid overheating</li>
              <li>• Learn usage patterns</li>
              <li>• Automatic setback</li>
            </ul>
          </div>
          
          <div className="bg-elec-gray border border-blue-600 rounded-lg p-4">
            <h4 className="font-semibold text-blue-200 mb-3">Convenience</h4>
            <ul className="space-y-2 text-sm text-blue-100">
              <li>• Remote control access</li>
              <li>• Voice command integration</li>
              <li>• Mobile app control</li>
              <li>• Status notifications</li>
            </ul>
          </div>
          
          <div className="bg-elec-gray border border-purple-600 rounded-lg p-4">
            <h4 className="font-semibold text-purple-200 mb-3">Comfort</h4>
            <ul className="space-y-2 text-sm text-purple-100">
              <li>• Tailored schedules</li>
              <li>• Lifestyle adaptation</li>
              <li>• Precise temperature control</li>
              <li>• Zone-based heating</li>
            </ul>
          </div>
          
          <div className="bg-elec-gray border border-orange-600 rounded-lg p-4">
            <h4 className="font-semibold text-orange-200 mb-3">Integration</h4>
            <ul className="space-y-2 text-sm text-orange-100">
              <li>• Smart home ecosystems</li>
              <li>• Occupancy sensors</li>
              <li>• Weather compensation</li>
              <li>• Lighting coordination</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};