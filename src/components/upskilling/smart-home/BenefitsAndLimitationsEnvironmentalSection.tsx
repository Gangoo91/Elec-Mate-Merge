import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, AlertCircle } from 'lucide-react';

export const BenefitsAndLimitationsEnvironmentalSection = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-elec-yellow" />
          Benefits and Limitations of Environmental Sensors
        </CardTitle>
      </CardHeader>
      <CardContent className="text-gray-300 space-y-4">
        <p>
          Environmental sensors provide significant benefits for health, comfort, and efficiency, but installers should understand their limitations and implementation challenges.
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-elec-gray border border-green-600 rounded-lg p-4">
            <h4 className="font-semibold text-green-200 mb-3 flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Benefits
            </h4>
            <div className="space-y-3 text-sm">
              <div>
                <h5 className="font-medium text-foreground mb-1">Health Improvements</h5>
                <p className="text-gray-300">Enhanced wellbeing, reduced illness, better respiratory health, and improved sleep quality.</p>
              </div>
              <div>
                <h5 className="font-medium text-foreground mb-1">Comfort Enhancement</h5>
                <p className="text-gray-300">Balanced humidity and temperature create more pleasant living and working conditions.</p>
              </div>
              <div>
                <h5 className="font-medium text-foreground mb-1">Energy Savings</h5>
                <p className="text-gray-300">Ventilation operates only when necessary, reducing unnecessary heating and cooling costs.</p>
              </div>
              <div>
                <h5 className="font-medium text-foreground mb-1">Regulatory Compliance</h5>
                <p className="text-gray-300">Meets building standards, health regulations, and environmental requirements.</p>
              </div>
            </div>
          </div>
          
          <div className="bg-elec-gray border border-red-600 rounded-lg p-4">
            <h4 className="font-semibold text-red-200 mb-3 flex items-center gap-2">
              <AlertCircle className="h-4 w-4" />
              Limitations & Challenges
            </h4>
            <div className="space-y-3 text-sm">
              <div>
                <h5 className="font-medium text-foreground mb-1">Calibration Requirements</h5>
                <p className="text-gray-300">Sensors require regular calibration for accurate readings and may drift over time.</p>
              </div>
              <div>
                <h5 className="font-medium text-foreground mb-1">Critical Placement</h5>
                <p className="text-gray-300">Location affects accuracy - must avoid drafts, heat sources, and direct sunlight.</p>
              </div>
              <div>
                <h5 className="font-medium text-foreground mb-1">Cost Considerations</h5>
                <p className="text-gray-300">May be prohibitive in small installations, especially for comprehensive multi-sensor systems.</p>
              </div>
              <div>
                <h5 className="font-medium text-foreground mb-1">Energy Balance Risk</h5>
                <p className="text-gray-300">Over-ventilation can waste energy if not properly balanced with other systems.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-elec-gray border border-gray-600 rounded-lg p-4">
          <h4 className="font-semibold text-foreground mb-3">Quantifiable Benefits</h4>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            <div className="text-center p-3 bg-green-600/10 border border-green-600/30 rounded">
              <div className="text-xl font-bold text-green-400">20-30%</div>
              <div className="text-xs text-green-200">Energy Savings</div>
            </div>
            <div className="text-center p-3 bg-blue-600/10 border border-blue-600/30 rounded">
              <div className="text-xl font-bold text-blue-400">15%</div>
              <div className="text-xs text-blue-200">Productivity Increase</div>
            </div>
            <div className="text-center p-3 bg-purple-600/10 border border-purple-600/30 rounded">
              <div className="text-xl font-bold text-purple-400">50%</div>
              <div className="text-xs text-purple-200">Reduced Sick Days</div>
            </div>
            <div className="text-center p-3 bg-orange-600/10 border border-orange-600/30 rounded">
              <div className="text-xl font-bold text-orange-400">10-25%</div>
              <div className="text-xs text-orange-200">HVAC Energy Reduction</div>
            </div>
          </div>
        </div>

        <div className="bg-elec-gray border border-yellow-600 rounded-lg p-4">
          <h4 className="font-semibold text-yellow-200 mb-3">Implementation Best Practices</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div>
              <h5 className="font-medium text-foreground mb-2">Sensor Placement</h5>
              <ul className="space-y-1 text-gray-300">
                <li>• Away from direct air currents</li>
                <li>• Avoid heat sources and windows</li>
                <li>• Representative of occupied space</li>
                <li>• Accessible for maintenance</li>
              </ul>
            </div>
            <div>
              <h5 className="font-medium text-foreground mb-2">System Design</h5>
              <ul className="space-y-1 text-gray-300">
                <li>• Appropriate sensor density</li>
                <li>• Redundancy for critical areas</li>
                <li>• Integration with existing HVAC</li>
                <li>• User-friendly interfaces</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-elec-gray border border-blue-600 rounded-lg p-4">
          <h4 className="font-semibold text-blue-200 mb-3">Maintenance Considerations</h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
            <div>
              <h5 className="font-medium text-foreground mb-2">Regular Tasks</h5>
              <ul className="space-y-1 text-gray-300">
                <li>• Sensor cleaning</li>
                <li>• Calibration verification</li>
                <li>• Battery replacement</li>
                <li>• Firmware updates</li>
              </ul>
            </div>
            <div>
              <h5 className="font-medium text-foreground mb-2">Monitoring</h5>
              <ul className="space-y-1 text-gray-300">
                <li>• Data accuracy checks</li>
                <li>• Communication status</li>
                <li>• Response validation</li>
                <li>• Performance trending</li>
              </ul>
            </div>
            <div>
              <h5 className="font-medium text-foreground mb-2">Troubleshooting</h5>
              <ul className="space-y-1 text-gray-300">
                <li>• Sensor fault diagnosis</li>
                <li>• Network connectivity</li>
                <li>• Control loop verification</li>
                <li>• System integration issues</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};