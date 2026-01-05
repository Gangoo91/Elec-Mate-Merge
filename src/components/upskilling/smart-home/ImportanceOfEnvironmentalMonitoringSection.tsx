import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle } from 'lucide-react';

export const ImportanceOfEnvironmentalMonitoringSection = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-elec-yellow" />
          Importance of Environmental Monitoring
        </CardTitle>
      </CardHeader>
      <CardContent className="text-gray-300 space-y-4">
        <p>
          Indoor Air Quality (IAQ) significantly affects health, comfort, and productivity. Understanding and monitoring environmental conditions is essential for creating healthy indoor environments.
        </p>
        
        <div className="bg-elec-gray border border-gray-600 rounded-lg p-4">
          <h4 className="font-semibold text-foreground mb-3">Health Impacts of Poor IAQ</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <h5 className="font-medium text-red-200 mb-2">Immediate Effects</h5>
              <ul className="space-y-1 text-sm text-red-100">
                <li>• Headaches and fatigue</li>
                <li>• Eye, nose, and throat irritation</li>
                <li>• Difficulty concentrating</li>
                <li>• Dizziness and nausea</li>
              </ul>
            </div>
            <div>
              <h5 className="font-medium text-orange-200 mb-2">Long-term Effects</h5>
              <ul className="space-y-1 text-sm text-orange-100">
                <li>• Respiratory diseases</li>
                <li>• Asthma exacerbation</li>
                <li>• Cardiovascular problems</li>
                <li>• Cognitive impairment</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-elec-gray border border-blue-600 rounded-lg p-4">
            <h4 className="font-semibold text-blue-200 mb-3">Productivity Impact</h4>
            <ul className="space-y-2 text-sm text-blue-100">
              <li>• Reduced concentration levels</li>
              <li>• Decreased cognitive performance</li>
              <li>• Increased sick leave rates</li>
              <li>• Lower workplace satisfaction</li>
            </ul>
          </div>
          
          <div className="bg-elec-gray border border-green-600 rounded-lg p-4">
            <h4 className="font-semibold text-green-200 mb-3">Regulatory Framework</h4>
            <ul className="space-y-2 text-sm text-green-100">
              <li>• CIBSE guidelines for IAQ</li>
              <li>• WHO air quality standards</li>
              <li>• Building regulations compliance</li>
              <li>• BREEAM assessment criteria</li>
            </ul>
          </div>
        </div>

        <div className="bg-elec-gray border border-gray-600 rounded-lg p-4">
          <h4 className="font-semibold text-foreground mb-3">Key Environmental Factors</h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="text-center p-3 bg-[#1a1a1a] rounded">
              <h5 className="font-medium text-purple-200 text-sm mb-1">Temperature</h5>
              <p className="text-xs text-purple-100">18-24°C optimal range</p>
            </div>
            <div className="text-center p-3 bg-[#1a1a1a] rounded">
              <h5 className="font-medium text-blue-200 text-sm mb-1">Humidity</h5>
              <p className="text-xs text-blue-100">40-60% relative humidity</p>
            </div>
            <div className="text-center p-3 bg-[#1a1a1a] rounded">
              <h5 className="font-medium text-green-200 text-sm mb-1">Air Movement</h5>
              <p className="text-xs text-green-100">0.1-0.2 m/s velocity</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};