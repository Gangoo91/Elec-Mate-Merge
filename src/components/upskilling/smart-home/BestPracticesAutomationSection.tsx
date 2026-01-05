import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckSquare, TrendingUp, Settings, Users } from 'lucide-react';

export const BestPracticesAutomationSection = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <CheckSquare className="h-6 w-6 text-elec-yellow" />
          Best Practices
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <p className="text-foreground">
          Successful automation requires careful planning and gradual implementation. These proven practices 
          ensure systems enhance rather than complicate daily life.
        </p>

        <div className="grid gap-4">
          <div className="bg-green-900/20 border border-green-600/50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="h-5 w-5 text-green-400" />
              <h4 className="text-green-300 font-semibold">Start Simple, Expand Gradually</h4>
            </div>
            <ul className="text-green-200 text-sm space-y-1">
              <li>• Begin with basic grouping and simple motion sensors</li>
              <li>• Add complexity only after users are comfortable</li>
              <li>• Test each addition thoroughly before expanding</li>
              <li>• Document what works and what doesn't</li>
            </ul>
          </div>

          <div className="bg-blue-900/20 border border-blue-600/50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <Settings className="h-5 w-5 text-blue-400" />
              <h4 className="text-blue-300 font-semibold">Use Layered Automation</h4>
            </div>
            <ul className="text-blue-200 text-sm space-y-1">
              <li>• Combine scenes, motion logic, and manual controls</li>
              <li>• Provide multiple ways to achieve the same result</li>
              <li>• Allow progressive override from manual to automatic</li>
              <li>• Enable automation learning from manual preferences</li>
            </ul>
          </div>

          <div className="bg-purple-900/20 border border-purple-600/50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <CheckSquare className="h-5 w-5 text-purple-400" />
              <h4 className="text-purple-300 font-semibold">Provide Manual Fallback</h4>
            </div>
            <ul className="text-purple-200 text-sm space-y-1">
              <li>• Maintain physical switches for essential lighting</li>
              <li>• Ensure easy override for all automated functions</li>
              <li>• Keep systems functional even if automation fails</li>
              <li>• Train users on manual override procedures</li>
            </ul>
          </div>

          <div className="bg-amber-900/20 border border-amber-600/50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <Settings className="h-5 w-5 text-amber-400" />
              <h4 className="text-amber-300 font-semibold">Optimise Sensor Placement</h4>
            </div>
            <ul className="text-amber-200 text-sm space-y-1">
              <li>• Test different positions to reduce false triggers</li>
              <li>• Consider pet movement patterns and sizes</li>
              <li>• Avoid areas with air movement or temperature changes</li>
              <li>• Use appropriate sensitivity settings for each location</li>
            </ul>
          </div>
        </div>

        <div className="bg-elec-gray p-5 rounded-lg border border-gray-600">
          <h4 className="text-foreground font-semibold mb-3 flex items-center gap-2">
            <Users className="h-5 w-5 text-elec-yellow" />
            Implementation Checklist
          </h4>
          <div className="grid gap-3 md:grid-cols-2">
            <div>
              <h5 className="text-gray-300 font-semibold text-sm mb-2">Planning Phase</h5>
              <ul className="text-gray-300 text-xs space-y-1">
                <li>□ Survey user needs and preferences</li>
                <li>□ Map out logical zones and groups</li>
                <li>□ Identify automation opportunities</li>
                <li>□ Plan for future expansion</li>
              </ul>
            </div>
            <div>
              <h5 className="text-gray-300 font-semibold text-sm mb-2">Installation Phase</h5>
              <ul className="text-gray-300 text-xs space-y-1">
                <li>□ Start with basic grouping</li>
                <li>□ Add motion sensors strategically</li>
                <li>□ Test thoroughly before handover</li>
                <li>□ Provide user training</li>
              </ul>
            </div>
            <div>
              <h5 className="text-gray-300 font-semibold text-sm mb-2">Optimisation Phase</h5>
              <ul className="text-gray-300 text-xs space-y-1">
                <li>□ Monitor system performance</li>
                <li>□ Adjust settings based on usage</li>
                <li>□ Add complexity gradually</li>
                <li>□ Schedule regular maintenance</li>
              </ul>
            </div>
            <div>
              <h5 className="text-gray-300 font-semibold text-sm mb-2">Maintenance Phase</h5>
              <ul className="text-gray-300 text-xs space-y-1">
                <li>□ Check sensor batteries regularly</li>
                <li>□ Update firmware when available</li>
                <li>□ Review and refine automation rules</li>
                <li>□ Provide ongoing user support</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-green-900/20 border border-green-600/50 p-4 rounded-lg">
          <p className="text-green-200 text-sm">
            <strong>Golden Rule:</strong> Automation should be invisible when working correctly. If users 
            frequently notice or need to override the system, it needs refinement.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};