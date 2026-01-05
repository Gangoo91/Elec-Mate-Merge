import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Move, Clock, Settings, Zap } from 'lucide-react';

export const MotionLogicSection = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Move className="h-6 w-6 text-elec-yellow" />
          Motion Logic
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <p className="text-foreground">
          Motion-based automation uses sensors to detect movement and trigger lighting responses. From basic 
          on/off control to sophisticated adaptive systems, motion logic enhances convenience and energy efficiency.
        </p>

        <div className="grid gap-4">
          <div className="bg-elec-gray p-4 rounded-lg border border-gray-600">
            <div className="flex items-center gap-2 mb-3">
              <Zap className="h-5 w-5 text-elec-yellow" />
              <h4 className="text-foreground font-semibold">Basic Motion Logic</h4>
            </div>
            <p className="text-gray-300 text-sm mb-2">Simple presence detection and response</p>
            <ul className="text-gray-300 text-sm space-y-1">
              <li>• Motion detected → light on</li>
              <li>• No motion for set time → light off</li>
              <li>• Works regardless of time or conditions</li>
              <li>• Ideal for utility areas and corridors</li>
            </ul>
          </div>

          <div className="bg-elec-gray p-4 rounded-lg border border-gray-600">
            <div className="flex items-center gap-2 mb-3">
              <Clock className="h-5 w-5 text-elec-yellow" />
              <h4 className="text-foreground font-semibold">Conditional Motion Logic</h4>
            </div>
            <p className="text-gray-300 text-sm mb-2">Motion response based on specific conditions</p>
            <ul className="text-gray-300 text-sm space-y-1">
              <li>• Only activate after dark (light level sensing)</li>
              <li>• Only in certain modes (night light, security)</li>
              <li>• Different responses for different times</li>
              <li>• Override capabilities for manual control</li>
            </ul>
          </div>

          <div className="bg-elec-gray p-4 rounded-lg border border-gray-600">
            <div className="flex items-center gap-2 mb-3">
              <Settings className="h-5 w-5 text-elec-yellow" />
              <h4 className="text-foreground font-semibold">Adaptive Motion Logic</h4>
            </div>
            <p className="text-gray-300 text-sm mb-2">Intelligent response based on context and usage patterns</p>
            <ul className="text-gray-300 text-sm space-y-1">
              <li>• Brightness adjusts based on time of day</li>
              <li>• Different responses for different occupancy types</li>
              <li>• Learning patterns from user behaviour</li>
              <li>• Gradual transitions to avoid startling</li>
            </ul>
          </div>

          <div className="bg-elec-gray p-4 rounded-lg border border-gray-600">
            <div className="flex items-center gap-2 mb-3">
              <Move className="h-5 w-5 text-elec-yellow" />
              <h4 className="text-foreground font-semibold">Advanced Multi-Sensor Logic</h4>
            </div>
            <p className="text-gray-300 text-sm mb-2">Combining multiple inputs for intelligent responses</p>
            <ul className="text-gray-300 text-sm space-y-1">
              <li>• Motion + ambient light level detection</li>
              <li>• Presence + time of day + room function</li>
              <li>• Multiple sensors for larger areas</li>
              <li>• Integration with other smart home systems</li>
            </ul>
          </div>
        </div>

        <div className="bg-blue-900/20 border border-blue-600/50 p-4 rounded-lg">
          <p className="text-blue-200 text-sm">
            <strong>Implementation Tip:</strong> Start with basic motion logic and gradually add conditional 
            and adaptive features as users become comfortable with the system.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};