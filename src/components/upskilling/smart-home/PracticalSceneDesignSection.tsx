import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PenTool } from 'lucide-react';

export const PracticalSceneDesignSection = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <PenTool className="h-5 w-5 text-elec-yellow" />
          Practical Scene Design Framework
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-4">
        <p>
          Use this systematic approach to design effective lighting scenes that truly enhance client lifestyles:
        </p>
        
        <div className="space-y-4">
          <div className="p-3 bg-blue-600/10 border border-blue-600/20 rounded-lg">
            <h4 className="font-semibold text-blue-200 mb-2">1. Activity Analysis</h4>
            <div className="grid md:grid-cols-2 gap-3 mt-2">
              <div>
                <h5 className="font-medium text-blue-100 mb-1">Map Daily Routines:</h5>
                <ul className="text-sm text-blue-100 space-y-1">
                  <li>• Morning wake-up sequence</li>
                  <li>• Work/study periods</li>
                  <li>• Meal times and cooking</li>
                  <li>• Evening relaxation</li>
                  <li>• Entertainment activities</li>
                  <li>• Bedtime preparation</li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium text-blue-100 mb-1">Identify Lighting Needs:</h5>
                <ul className="text-sm text-blue-100 space-y-1">
                  <li>• Task lighting requirements</li>
                  <li>• Ambient lighting preferences</li>
                  <li>• Colour temperature needs</li>
                  <li>• Brightness level variations</li>
                  <li>• Multi-zone coordination</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="p-3 bg-green-600/10 border border-green-600/20 rounded-lg">
            <h4 className="font-semibold text-green-200 mb-2">2. Core Scene Categories</h4>
            <div className="grid md:grid-cols-3 gap-3 mt-2">
              <div>
                <h5 className="font-medium text-green-100 mb-1">Functional Scenes:</h5>
                <ul className="text-sm text-green-100 space-y-1">
                  <li>• Work/Study Focus</li>
                  <li>• Cooking/Kitchen Tasks</li>
                  <li>• Reading/Detailed Work</li>
                  <li>• Cleaning/Maintenance</li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium text-green-100 mb-1">Comfort Scenes:</h5>
                <ul className="text-sm text-green-100 space-y-1">
                  <li>• Morning Energise</li>
                  <li>• Evening Relax</li>
                  <li>• Movie/TV Watching</li>
                  <li>• Dinner/Social</li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium text-green-100 mb-1">Utility Scenes:</h5>
                <ul className="text-sm text-green-100 space-y-1">
                  <li>• All On (emergency)</li>
                  <li>• All Off (leaving)</li>
                  <li>• Night Navigation</li>
                  <li>• Security/Away</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="p-3 bg-purple-600/10 border border-purple-600/20 rounded-lg">
            <h4 className="font-semibold text-purple-200 mb-2">3. Scene Parameter Guidelines</h4>
            <div className="space-y-3">
              <div>
                <h5 className="font-medium text-purple-100 mb-1">Brightness Levels (% of maximum):</h5>
                <ul className="text-sm text-purple-100 space-y-1">
                  <li>• <strong>Task lighting:</strong> 80-100% for detailed work</li>
                  <li>• <strong>General ambient:</strong> 40-70% for comfortable living</li>
                  <li>• <strong>Relaxation:</strong> 20-40% for evening wind-down</li>
                  <li>• <strong>Navigation:</strong> 5-15% for safe movement at night</li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium text-purple-100 mb-1">Colour Temperature (Kelvin):</h5>
                <ul className="text-sm text-purple-100 space-y-1">
                  <li>• <strong>Focus work:</strong> 4000-6500K (cool, alerting)</li>
                  <li>• <strong>General daytime:</strong> 3000-4000K (neutral white)</li>
                  <li>• <strong>Evening relax:</strong> 2200-2700K (warm, calming)</li>
                  <li>• <strong>Bedtime:</strong> 1800-2200K (very warm, sleep-friendly)</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="p-3 bg-orange-600/10 border border-orange-600/20 rounded-lg">
            <h4 className="font-semibold text-orange-200 mb-2">4. Multi-Room Coordination</h4>
            <ul className="text-sm text-orange-100 space-y-1">
              <li>• <strong>Zone grouping:</strong> Related areas change together (living + dining for entertaining)</li>
              <li>• <strong>Progressive dimming:</strong> Gradual brightness reduction from active to quiet areas</li>
              <li>• <strong>Path lighting:</strong> Ensure safe navigation routes between spaces</li>
              <li>• <strong>Activity isolation:</strong> Allow different activities in adjacent rooms without interference</li>
            </ul>
          </div>

          <div className="p-3 bg-yellow-600/10 border border-yellow-600/20 rounded-lg">
            <h4 className="font-semibold text-yellow-200 mb-2">5. Client Consultation Checklist</h4>
            <div className="grid md:grid-cols-2 gap-3 mt-2">
              <div>
                <h5 className="font-medium text-yellow-100 mb-1">Lifestyle Questions:</h5>
                <ul className="text-sm text-yellow-100 space-y-1">
                  <li>• What time do you typically wake up/sleep?</li>
                  <li>• Do you work from home? Which rooms?</li>
                  <li>• How often do you entertain guests?</li>
                  <li>• Any special lighting preferences?</li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium text-yellow-100 mb-1">Technical Preferences:</h5>
                <ul className="text-sm text-yellow-100 space-y-1">
                  <li>• Preferred control methods (app, voice, switch)?</li>
                  <li>• Tolerance for automation vs manual control?</li>
                  <li>• Priority: convenience, energy saving, or ambience?</li>
                  <li>• Budget for advanced features?</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};