import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckSquare } from 'lucide-react';

export const BestPracticesSceneProgrammingSection = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <CheckSquare className="h-5 w-5 text-elec-yellow" />
          Best Practices in Scene Programming
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-4">
        <p>
          Following proven practices ensures scenes and schedules enhance rather than frustrate the user experience.
        </p>
        
        <div className="space-y-4">
          <div className="p-3 bg-blue-600/10 border border-blue-600/20 rounded-lg">
            <h5 className="font-semibold text-blue-200 mb-2">Clear Naming Conventions</h5>
            <div className="grid md:grid-cols-2 gap-3 mt-2">
              <div>
                <h6 className="font-medium text-blue-100 mb-1">✅ Good Examples:</h6>
                <ul className="text-sm text-blue-100 space-y-1">
                  <li>• "Reading Light" - purpose clear</li>
                  <li>• "Movie Night" - activity based</li>
                  <li>• "Bedtime" - routine oriented</li>
                  <li>• "Security Away" - function specific</li>
                </ul>
              </div>
              <div>
                <h6 className="font-medium text-blue-100 mb-1">❌ Poor Examples:</h6>
                <ul className="text-sm text-blue-100 space-y-1">
                  <li>• "Scene 1" - no context</li>
                  <li>• "Bright" - vague meaning</li>
                  <li>• "Custom" - not descriptive</li>
                  <li>• "Test" - confusing purpose</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="p-3 bg-green-600/10 border border-green-600/20 rounded-lg">
            <h5 className="font-semibold text-green-200 mb-2">Simplicity and User Focus</h5>
            <ul className="text-sm text-green-100 space-y-1">
              <li>• <strong>Limit scene count:</strong> 5-8 scenes per room maximum</li>
              <li>• <strong>Avoid overlapping functions:</strong> Each scene should have clear purpose</li>
              <li>• <strong>Group related scenes:</strong> "Morning", "Afternoon", "Evening" progression</li>
              <li>• <strong>Consider user skill level:</strong> Start simple, add complexity gradually</li>
            </ul>
          </div>

          <div className="p-3 bg-purple-600/10 border border-purple-600/20 rounded-lg">
            <h5 className="font-semibold text-purple-200 mb-2">Include Manual Overrides</h5>
            <ul className="text-sm text-purple-100 space-y-1">
              <li>• <strong>Physical switches:</strong> Always maintain manual control option</li>
              <li>• <strong>App emergency button:</strong> Quick "all lights on" for safety</li>
              <li>• <strong>Schedule disable:</strong> Easy way to temporarily suspend automation</li>
              <li>• <strong>Guest mode:</strong> Simplified control for visitors</li>
            </ul>
          </div>

          <div className="p-3 bg-orange-600/10 border border-orange-600/20 rounded-lg">
            <h5 className="font-semibold text-orange-200 mb-2">Real-World Testing</h5>
            <ul className="text-sm text-orange-100 space-y-1">
              <li>• <strong>Live with schedules:</strong> Test automations for a full week</li>
              <li>• <strong>Family feedback:</strong> Ensure all household members understand scenes</li>
              <li>• <strong>Edge case handling:</strong> What happens during power cuts, internet outages?</li>
              <li>• <strong>Seasonal adjustment:</strong> Schedules may need tweaking for daylight changes</li>
            </ul>
          </div>

          <div className="p-3 bg-yellow-600/10 border border-yellow-600/20 rounded-lg">
            <h5 className="font-semibold text-yellow-200 mb-2">Client Lifestyle Adaptation</h5>
            <div className="grid md:grid-cols-3 gap-3 mt-2">
              <div>
                <h6 className="font-medium text-yellow-100 mb-1">Work-from-Home:</h6>
                <ul className="text-sm text-yellow-100 space-y-1">
                  <li>• Video call lighting</li>
                  <li>• Focus work scenes</li>
                  <li>• Break time ambience</li>
                </ul>
              </div>
              <div>
                <h6 className="font-medium text-yellow-100 mb-1">Family Homes:</h6>
                <ul className="text-sm text-yellow-100 space-y-1">
                  <li>• Homework lighting</li>
                  <li>• Bedtime routines</li>
                  <li>• Safe night navigation</li>
                </ul>
              </div>
              <div>
                <h6 className="font-medium text-yellow-100 mb-1">Elderly Users:</h6>
                <ul className="text-sm text-yellow-100 space-y-1">
                  <li>• Simple voice commands</li>
                  <li>• Bright task lighting</li>
                  <li>• Fall prevention paths</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};