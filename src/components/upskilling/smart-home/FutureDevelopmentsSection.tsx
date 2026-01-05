import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Zap } from 'lucide-react';

export const FutureDevelopmentsSection = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Zap className="h-5 w-5 text-elec-yellow" />
          Future Developments
        </CardTitle>
      </CardHeader>
      <CardContent className="text-gray-300 space-y-4">
        <p>
          The smart heating industry continues to evolve with emerging technologies that promise even greater efficiency, convenience, and environmental benefits.
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-elec-gray border border-blue-600 rounded-lg p-4">
            <h4 className="font-semibold text-blue-200 mb-3">AI Advancement</h4>
            <ul className="space-y-2 text-sm text-blue-100">
              <li>• Predictive heating algorithms</li>
              <li>• Occupancy pattern learning</li>
              <li>• Automatic system optimisation</li>
              <li>• Preventive maintenance alerts</li>
            </ul>
          </div>
          
          <div className="bg-elec-gray border border-green-600 rounded-lg p-4">
            <h4 className="font-semibold text-green-200 mb-3">Smart Grid Integration</h4>
            <ul className="space-y-2 text-sm text-green-100">
              <li>• Dynamic pricing response</li>
              <li>• Load balancing participation</li>
              <li>• Renewable energy prioritisation</li>
              <li>• Grid demand management</li>
            </ul>
          </div>
          
          <div className="bg-elec-gray border border-purple-600 rounded-lg p-4">
            <h4 className="font-semibold text-purple-200 mb-3">Carbon Awareness</h4>
            <ul className="space-y-2 text-sm text-purple-100">
              <li>• Carbon intensity monitoring</li>
              <li>• Renewable energy scheduling</li>
              <li>• Emissions reporting</li>
              <li>• Green heating prioritisation</li>
            </ul>
          </div>
        </div>

        <div className="bg-elec-gray border border-gray-600 rounded-lg p-4">
          <h4 className="font-semibold text-foreground mb-3">Industry Trends</h4>
          <p className="text-sm">
            Future smart heating systems will likely feature improved AI capabilities for predictive control, 
            tighter integration with energy tariffs and smart grids, and carbon-aware operation that adjusts 
            heating schedules based on renewable energy availability.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};