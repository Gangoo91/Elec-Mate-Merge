import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle } from 'lucide-react';

export const CompatibilityIssuesSection = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-elec-yellow" />
          Compatibility Issues
        </CardTitle>
      </CardHeader>
      <CardContent className="text-gray-300 space-y-4">
        <p>
          Not all smart heating components are compatible with every heating system. Understanding these limitations is crucial for successful installations and avoiding equipment damage.
        </p>
        
        <div className="space-y-4">
          <div className="bg-elec-gray border border-red-600 rounded-lg p-4">
            <h4 className="font-semibold text-red-200 mb-3">Thermostat Limitations</h4>
            <ul className="space-y-2 text-sm text-red-100">
              <li>• Not all smart thermostats support modulation (some are only relay-based)</li>
              <li>• Different voltage requirements (12V, 24V, 230V)</li>
              <li>• Wiring compatibility varies between manufacturers</li>
              <li>• Some require neutral wire connections</li>
            </ul>
          </div>
          
          <div className="bg-elec-gray border border-orange-600 rounded-lg p-4">
            <h4 className="font-semibold text-orange-200 mb-3">Proprietary Protocols</h4>
            <ul className="space-y-2 text-sm text-orange-100">
              <li>• Some boilers/heat pumps use proprietary communication (e.g., Vaillant eBUS)</li>
              <li>• Manufacturer-specific control interfaces</li>
              <li>• Limited cross-brand compatibility</li>
              <li>• Firmware dependencies and updates</li>
            </ul>
          </div>
          
          <div className="bg-elec-gray border border-yellow-600 rounded-lg p-4">
            <h4 className="font-semibold text-yellow-200 mb-3">Setup Risks</h4>
            <ul className="space-y-2 text-sm text-yellow-100">
              <li>• Incorrect setup can reduce efficiency</li>
              <li>• Wrong wiring may damage equipment</li>
              <li>• Improper heat pump controls can cause system failure</li>
              <li>• Warranty implications of incompatible installations</li>
            </ul>
          </div>
        </div>

        <div className="bg-elec-gray border border-gray-600 rounded-lg p-4">
          <h4 className="font-semibold text-foreground mb-3">Best Practice</h4>
          <p className="text-sm">
            <strong className="text-elec-yellow">Always check manufacturer-approved compatibility lists</strong> before specifying smart heating controls. 
            When in doubt, consult technical support or use manufacturer-specific control systems to ensure proper operation and maintain warranties.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-elec-gray border border-green-600 rounded-lg p-4">
            <h4 className="font-semibold text-green-200 mb-3">Compatibility Checking</h4>
            <ul className="space-y-2 text-sm text-green-100">
              <li>• Review boiler manual specifications</li>
              <li>• Check smart control compatibility lists</li>
              <li>• Verify wiring requirements</li>
              <li>• Confirm protocol support</li>
            </ul>
          </div>
          
          <div className="bg-elec-gray border border-blue-600 rounded-lg p-4">
            <h4 className="font-semibold text-blue-200 mb-3">Safe Installation</h4>
            <ul className="space-y-2 text-sm text-blue-100">
              <li>• Follow manufacturer guidelines</li>
              <li>• Use approved installation methods</li>
              <li>• Test system operation thoroughly</li>
              <li>• Document configuration settings</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};