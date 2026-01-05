import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain } from 'lucide-react';

export const AILearningControlSection = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Brain className="h-5 w-5 text-elec-yellow" />
          AI Learning Control
        </CardTitle>
      </CardHeader>
      <CardContent className="text-gray-300 space-y-4">
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-foreground mb-2">Definition</h4>
            <p>System "learns" household behaviour and adapts automatically to optimise comfort and efficiency.</p>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-2">Methods</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-[#1a1a1a] border border-blue-600 rounded-lg p-3">
                <h5 className="font-medium text-blue-200 mb-2">Occupancy Detection</h5>
                <p className="text-blue-100 text-sm">Motion sensors, smartphone geofencing, app usage patterns</p>
              </div>
              
              <div className="bg-[#1a1a1a] border border-green-600 rounded-lg p-3">
                <h5 className="font-medium text-green-200 mb-2">Weather Compensation</h5>
                <p className="text-green-100 text-sm">Heating anticipates external temperature changes</p>
              </div>
              
              <div className="bg-[#1a1a1a] border border-purple-600 rounded-lg p-3">
                <h5 className="font-medium text-purple-200 mb-2">Adaptive Algorithms</h5>
                <p className="text-purple-100 text-sm">Adjusts run time to meet comfort targets efficiently</p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-2">Examples</h4>
            <ul className="space-y-1 list-disc list-inside ml-4">
              <li>Google Nest Learning Thermostat</li>
              <li>Tado° Auto-Assist functionality</li>
              <li>Honeywell Evohome with AI features</li>
              <li>Ecobee SmartThermostat with occupancy sensors</li>
            </ul>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-[#1a1a1a] border border-green-600 rounded-lg p-4">
              <h4 className="font-semibold text-green-200 mb-3">Pros</h4>
              <ul className="space-y-2 text-sm text-green-100">
                <li>• Energy savings through optimisation</li>
                <li>• Convenience - minimal user input</li>
                <li>• Adapts to lifestyle changes</li>
                <li>• Weather-responsive heating</li>
              </ul>
            </div>
            
            <div className="bg-[#1a1a1a] border border-red-600 rounded-lg p-4">
              <h4 className="font-semibold text-red-200 mb-3">Cons</h4>
              <ul className="space-y-2 text-sm text-red-100">
                <li>• May feel intrusive to some users</li>
                <li>• Learning period required</li>
                <li>• Internet dependency for full features</li>
                <li>• Some users dislike lack of direct control</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};