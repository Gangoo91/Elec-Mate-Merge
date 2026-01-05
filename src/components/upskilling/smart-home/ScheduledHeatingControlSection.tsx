import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock } from 'lucide-react';

export const ScheduledHeatingControlSection = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Clock className="h-5 w-5 text-elec-yellow" />
          Scheduled Heating Control
        </CardTitle>
      </CardHeader>
      <CardContent className="text-gray-300 space-y-4">
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-foreground mb-2">Definition</h4>
            <p>User programs heating times manually with fixed on/off schedules.</p>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-2">Examples</h4>
            <ul className="space-y-1 list-disc list-inside ml-4">
              <li>"On at 7am, off at 9am; on at 6pm, off at 10pm"</li>
              <li>Different schedules for weekdays and weekends</li>
              <li>Zone-specific timing for different areas</li>
            </ul>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-[#1a1a1a] border border-green-600 rounded-lg p-4">
              <h4 className="font-semibold text-green-200 mb-3">Pros</h4>
              <ul className="space-y-2 text-sm text-green-100">
                <li>• Predictable operation</li>
                <li>• Easy to set up and understand</li>
                <li>• User retains full control</li>
                <li>• No dependency on sensors</li>
              </ul>
            </div>
            
            <div className="bg-[#1a1a1a] border border-red-600 rounded-lg p-4">
              <h4 className="font-semibold text-red-200 mb-3">Cons</h4>
              <ul className="space-y-2 text-sm text-red-100">
                <li>• Rigid operation</li>
                <li>• Wastes energy if routine changes</li>
                <li>• No adaptation to external factors</li>
                <li>• Requires manual updates</li>
              </ul>
            </div>
          </div>

          <div className="bg-blue-950/30 border border-blue-600 rounded-lg p-4">
            <h4 className="font-semibold text-blue-200 mb-2">Best For</h4>
            <p className="text-blue-100">Regular households with consistent daily patterns, elderly users who prefer predictable systems, and situations where simplicity is prioritised over optimisation.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};