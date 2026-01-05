import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckSquare } from 'lucide-react';

export const BestPracticesSection = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <CheckSquare className="h-5 w-5 text-elec-yellow" />
          6. Best Practices for HVAC Interlocks
        </CardTitle>
      </CardHeader>
      <CardContent className="text-gray-300 space-y-4">
        <p className="leading-relaxed">
          Implementing effective HVAC interlocks requires careful planning and adherence to proven best practices. 
          These guidelines ensure optimal performance, safety, and user satisfaction.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Core Principles:</h4>
            
            <div className="space-y-3">
              <div className="bg-red-950/30 border border-red-600 rounded-lg p-4">
                <h5 className="font-medium text-red-200 mb-2">Always Prioritise Safety</h5>
                <p className="text-sm text-red-100 mb-2">
                  Safety interlocks take precedence over efficiency features.
                </p>
                <p className="text-xs text-red-200">
                  Example: Boiler interlock prevents overheating even if it disrupts comfort schedules.
                </p>
              </div>
              
              <div className="bg-green-950/30 border border-green-600 rounded-lg p-4">
                <h5 className="font-medium text-green-200 mb-2">Minimise Simultaneous Energy Use</h5>
                <p className="text-sm text-green-100 mb-2">
                  Design systems to avoid running multiple high-energy loads together.
                </p>
                <p className="text-xs text-green-200">
                  Example: Stagger heating and electric water heating to reduce peak demand.
                </p>
              </div>
              
              <div className="bg-blue-950/30 border border-blue-600 rounded-lg p-4">
                <h5 className="font-medium text-blue-200 mb-2">Use Conditional Logic</h5>
                <p className="text-sm text-blue-100 mb-2">
                  Implement clear if-then rules for system operation.
                </p>
                <p className="text-xs text-blue-200">
                  Example: "If temp &gt; 25°C → enable cooling, disable heating"
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Implementation Guidelines:</h4>
            
            <div className="space-y-3">
              <div className="bg-purple-950/30 border border-purple-600 rounded-lg p-4">
                <h5 className="font-medium text-purple-200 mb-2">Provide Manual Overrides</h5>
                <p className="text-sm text-purple-100">
                  Users must be able to override automatic systems when needed for maintenance or emergencies.
                </p>
              </div>
              
              <div className="bg-yellow-950/30 border border-yellow-600 rounded-lg p-4">
                <h5 className="font-medium text-yellow-200 mb-2">Test at Commissioning</h5>
                <p className="text-sm text-yellow-100">
                  Thoroughly test all interlocks during system commissioning to ensure proper function.
                </p>
              </div>
              
              <div className="bg-orange-950/30 border border-orange-600 rounded-lg p-4">
                <h5 className="font-medium text-orange-200 mb-2">Document Everything</h5>
                <p className="text-sm text-orange-100">
                  Create clear documentation of all interlock logic for future maintenance and troubleshooting.
                </p>
              </div>
            </div>

            <div className="bg-[#1a1a1a] border border-gray-600 rounded-lg p-4">
              <h5 className="font-medium text-foreground mb-2">Commissioning Checklist:</h5>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>✓ Verify safety interlocks function correctly</li>
                <li>✓ Test manual override capabilities</li>
                <li>✓ Confirm energy-saving logic works</li>
                <li>✓ Check sensor calibration and responses</li>
                <li>✓ Document all settings and configurations</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};