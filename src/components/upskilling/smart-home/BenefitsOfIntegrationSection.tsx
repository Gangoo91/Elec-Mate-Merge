import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp } from 'lucide-react';

export const BenefitsOfIntegrationSection = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-elec-yellow" />
          Benefits of Integration
        </CardTitle>
      </CardHeader>
      <CardContent className="text-gray-300 space-y-4">
        <p>
          Proper integration of smart controls with heating equipment delivers significant improvements in comfort, efficiency, and environmental impact.
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-elec-gray border border-blue-600 rounded-lg p-4">
            <h4 className="font-semibold text-blue-200 mb-3">Smart TRV Benefits</h4>
            <ul className="space-y-2 text-sm text-blue-100">
              <li>• Individual room comfort control</li>
              <li>• Reduced heating in unused rooms</li>
              <li>• Personalised temperature schedules</li>
              <li>• Easy retrofit installation</li>
              <li>• Improved system responsiveness</li>
            </ul>
          </div>
          
          <div className="bg-elec-gray border border-green-600 rounded-lg p-4">
            <h4 className="font-semibold text-green-200 mb-3">Boiler Integration Benefits</h4>
            <ul className="space-y-2 text-sm text-green-100">
              <li>• Efficient modulation control</li>
              <li>• Reduced gas consumption</li>
              <li>• Lower heating bills</li>
              <li>• Extended boiler lifespan</li>
              <li>• Optimised performance</li>
            </ul>
          </div>
          
          <div className="bg-elec-gray border border-purple-600 rounded-lg p-4">
            <h4 className="font-semibold text-purple-200 mb-3">Heat Pump Benefits</h4>
            <ul className="space-y-2 text-sm text-purple-100">
              <li>• Maximised seasonal efficiency</li>
              <li>• Reduced electricity costs</li>
              <li>• Lower carbon emissions</li>
              <li>• Predictive operation</li>
              <li>• Weather compensation</li>
            </ul>
          </div>
          
          <div className="bg-elec-gray border border-orange-600 rounded-lg p-4">
            <h4 className="font-semibold text-orange-200 mb-3">Overall System Benefits</h4>
            <ul className="space-y-2 text-sm text-orange-100">
              <li>• Improved system responsiveness</li>
              <li>• Reduced energy waste</li>
              <li>• Enhanced user control</li>
              <li>• Remote monitoring capabilities</li>
              <li>• Integrated home automation</li>
            </ul>
          </div>
        </div>

        <div className="bg-elec-gray border border-gray-600 rounded-lg p-4">
          <h4 className="font-semibold text-foreground mb-3">Quantifiable Improvements</h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="text-center p-3 bg-green-600/10 border border-green-600/30 rounded">
              <div className="text-xl font-bold text-green-400">15-30%</div>
              <div className="text-xs text-green-200">Energy Savings</div>
            </div>
            <div className="text-center p-3 bg-blue-600/10 border border-blue-600/30 rounded">
              <div className="text-xl font-bold text-blue-400">±0.5°C</div>
              <div className="text-xs text-blue-200">Temperature Accuracy</div>
            </div>
            <div className="text-center p-3 bg-purple-600/10 border border-purple-600/30 rounded">
              <div className="text-xl font-bold text-purple-400">20-40%</div>
              <div className="text-xs text-purple-200">Carbon Reduction</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};