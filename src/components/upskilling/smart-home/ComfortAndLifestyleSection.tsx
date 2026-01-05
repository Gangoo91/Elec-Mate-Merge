import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Home } from 'lucide-react';

export const ComfortAndLifestyleSection = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Home className="h-5 w-5 text-elec-yellow" />
          Comfort and Lifestyle Considerations
        </CardTitle>
      </CardHeader>
      <CardContent className="text-gray-300 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h4 className="font-semibold text-foreground">Scheduled Control</h4>
            <div className="bg-blue-950/30 border border-blue-600 rounded-lg p-4">
              <p className="text-blue-200 font-medium mb-2">Reliability Focus</p>
              <ul className="space-y-1 text-blue-100 text-sm">
                <li>• Always on at set times</li>
                <li>• Predictable room temperatures</li>
                <li>• User feels in complete control</li>
                <li>• No surprises or unexpected behaviour</li>
              </ul>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-foreground">AI Learning Control</h4>
            <div className="bg-green-950/30 border border-green-600 rounded-lg p-4">
              <p className="text-green-200 font-medium mb-2">Flexibility Focus</p>
              <ul className="space-y-1 text-green-100 text-sm">
                <li>• Heating ready when user arrives unexpectedly</li>
                <li>• Adapts to lifestyle changes automatically</li>
                <li>• Optimises for comfort and efficiency</li>
                <li>• Reduces need for manual adjustments</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-purple-950/30 border border-purple-600 rounded-lg p-4">
          <h4 className="font-semibold text-purple-200 mb-2">Hybrid Systems</h4>
          <p className="text-purple-100 mb-3">
            Many modern thermostats offer the best of both worlds: schedules with AI overrides.
          </p>
          <ul className="space-y-1 text-purple-100 text-sm">
            <li>• Base schedule provides predictability</li>
            <li>• AI adjustments optimise for efficiency</li>
            <li>• User can override when needed</li>
            <li>• Gradual introduction to smart features</li>
          </ul>
        </div>

        <div className="space-y-3">
          <h4 className="font-semibold text-foreground">User Acceptance Factors</h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-[#1a1a1a] border border-gray-600 rounded-lg p-3">
              <h5 className="font-medium text-foreground mb-2">Tech Comfort</h5>
              <p className="text-gray-300 text-sm">Users comfortable with technology prefer AI learning</p>
            </div>
            
            <div className="bg-[#1a1a1a] border border-gray-600 rounded-lg p-3">
              <h5 className="font-medium text-foreground mb-2">Control Preference</h5>
              <p className="text-gray-300 text-sm">Users wanting direct control prefer schedules</p>
            </div>
            
            <div className="bg-[#1a1a1a] border border-gray-600 rounded-lg p-3">
              <h5 className="font-medium text-foreground mb-2">Convenience Priority</h5>
              <p className="text-gray-300 text-sm">Busy households value AI automation</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};