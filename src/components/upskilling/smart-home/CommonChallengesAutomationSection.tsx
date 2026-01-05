import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, Zap, RefreshCw, Wifi } from 'lucide-react';

export const CommonChallengesAutomationSection = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <AlertTriangle className="h-6 w-6 text-elec-yellow" />
          Common Challenges
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <p className="text-foreground">
          While automation offers significant benefits, poor implementation can create frustration. 
          Understanding common challenges helps installers design better systems.
        </p>

        <div className="grid gap-4">
          <div className="bg-red-900/20 border border-red-600/50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <Zap className="h-5 w-5 text-red-400" />
              <h4 className="text-red-300 font-semibold">Over-Automation</h4>
            </div>
            <p className="text-red-200 text-sm mb-2">Lights switching unnecessarily leading to user frustration</p>
            <ul className="text-red-200 text-xs space-y-1">
              <li>• Motion sensors triggering in inappropriate situations</li>
              <li>• Too many automated responses overwhelming users</li>
              <li>• Complex rules that users don't understand</li>
              <li>• Lack of simple manual override options</li>
            </ul>
          </div>

          <div className="bg-amber-900/20 border border-amber-600/50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="h-5 w-5 text-amber-400" />
              <h4 className="text-amber-300 font-semibold">False Triggers</h4>
            </div>
            <p className="text-amber-200 text-sm mb-2">Unintended activation causing inconvenience and energy waste</p>
            <ul className="text-amber-200 text-xs space-y-1">
              <li>• Pets activating motion sensors unnecessarily</li>
              <li>• Air movement from heating/cooling systems</li>
              <li>• Vehicle headlights triggering outdoor sensors</li>
              <li>• Sensitive sensors picking up movement through windows</li>
            </ul>
          </div>

          <div className="bg-blue-900/20 border border-blue-600/50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <RefreshCw className="h-5 w-5 text-blue-400" />
              <h4 className="text-blue-300 font-semibold">Conflicting Rules</h4>
            </div>
            <p className="text-blue-200 text-sm mb-2">Multiple automations giving different instructions</p>
            <ul className="text-blue-200 text-xs space-y-1">
              <li>• Motion sensor vs. scheduled dimming conflicts</li>
              <li>• Security system vs. energy saving modes</li>
              <li>• Manual overrides being ignored by automation</li>
              <li>• Priority systems not properly configured</li>
            </ul>
          </div>

          <div className="bg-purple-900/20 border border-purple-600/50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <Wifi className="h-5 w-5 text-purple-400" />
              <h4 className="text-purple-300 font-semibold">Network and Response Issues</h4>
            </div>
            <p className="text-purple-200 text-sm mb-2">Technical problems affecting system reliability</p>
            <ul className="text-purple-200 text-xs space-y-1">
              <li>• Network lag causing delayed light responses</li>
              <li>• Wi-Fi connectivity issues in some locations</li>
              <li>• Hub overload when too many devices active</li>
              <li>• Battery-powered sensors failing without warning</li>
            </ul>
          </div>
        </div>

        <div className="bg-elec-dark p-4 rounded-lg border border-gray-600">
          <h4 className="text-foreground font-semibold mb-3">Challenge Prevention Strategies</h4>
          <ul className="text-gray-300 text-sm space-y-1">
            <li>✓ Start with simple automation and add complexity gradually</li>
            <li>✓ Always provide manual override capabilities</li>
            <li>✓ Test motion sensor placement thoroughly during installation</li>
            <li>✓ Set up priority hierarchies for conflicting rules</li>
            <li>✓ Use quality components and plan for maintenance</li>
            <li>✓ Train users on how the system works and how to override it</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};