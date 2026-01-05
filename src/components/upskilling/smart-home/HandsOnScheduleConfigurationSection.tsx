import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Settings2 } from 'lucide-react';

export const HandsOnScheduleConfigurationSection = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Settings2 className="h-5 w-5 text-elec-yellow" />
          Hands-On Schedule Configuration
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-4">
        <p>
          Step-by-step procedures for implementing common lighting schedules across different platforms:
        </p>
        
        <div className="space-y-4">
          <div className="p-3 bg-blue-600/10 border border-blue-600/20 rounded-lg">
            <h4 className="font-semibold text-blue-200 mb-2">Basic Time-Based Schedule Setup</h4>
            <ol className="text-sm text-blue-100 space-y-1 list-decimal list-inside">
              <li>Open smart lighting app (Hue, SmartThings, etc.)</li>
              <li>Navigate to "Routines" or "Automation" section</li>
              <li>Create new routine: "Evening Outdoor Lights"</li>
              <li>Set trigger: "Sunset" (or specific time like 6:00 PM)</li>
              <li>Select action: Turn on outdoor lights to 80%</li>
              <li>Set days: Repeat daily or specific weekdays</li>
              <li>Save and test the automation</li>
            </ol>
          </div>

          <div className="p-3 bg-green-600/10 border border-green-600/20 rounded-lg">
            <h4 className="font-semibold text-green-200 mb-2">Motion-Activated Scene Configuration</h4>
            <ol className="text-sm text-green-100 space-y-1 list-decimal list-inside">
              <li>Ensure motion sensor is paired and positioned correctly</li>
              <li>Create automation: "Hallway Night Light"</li>
              <li>Set trigger: Motion detected AND time between 10 PM - 6 AM</li>
              <li>Set action: Turn on hallway lights to 10% warm white</li>
              <li>Set timeout: Turn off after 2 minutes of no motion</li>
              <li>Test during day (override time condition for testing)</li>
              <li>Fine-tune sensitivity and timeout based on usage</li>
            </ol>
          </div>

          <div className="p-3 bg-purple-600/10 border border-purple-600/20 rounded-lg">
            <h4 className="font-semibold text-purple-200 mb-2">Complex Condition-Based Automation</h4>
            <div className="space-y-2">
              <h5 className="font-medium text-purple-100">Example: "Smart Security Lighting"</h5>
              <ol className="text-sm text-purple-100 space-y-1 list-decimal list-inside">
                <li><strong>Condition 1:</strong> House mode = "Away" (via app or geofencing)</li>
                <li><strong>Condition 2:</strong> Time between sunset and sunrise</li>
                <li><strong>Condition 3:</strong> Motion detected in driveway/garden</li>
                <li><strong>Action 1:</strong> Turn on outdoor floods to 100% bright white</li>
                <li><strong>Action 2:</strong> Turn on random indoor lights (simulate occupancy)</li>
                <li><strong>Action 3:</strong> Send notification to phone (if supported)</li>
                <li><strong>Timeout:</strong> Reset after 10 minutes if no further motion</li>
              </ol>
            </div>
          </div>

          <div className="p-3 bg-orange-600/10 border border-orange-600/20 rounded-lg">
            <h4 className="font-semibold text-orange-200 mb-2">Voice Assistant Schedule Setup</h4>
            <div className="grid md:grid-cols-2 gap-3 mt-2">
              <div>
                <h5 className="font-medium text-orange-100 mb-1">Alexa Routine Example:</h5>
                <ol className="text-sm text-orange-100 space-y-1 list-decimal list-inside">
                  <li>Open Alexa app → "More" → "Routines"</li>
                  <li>Tap "+" to create new routine</li>
                  <li>Name: "Good Morning"</li>
                  <li>When: Time trigger (7:00 AM weekdays)</li>
                  <li>Add action: Smart Home → Lights</li>
                  <li>Select devices and set brightness/colour</li>
                  <li>Optional: Add voice announcement</li>
                  <li>Save and test with manual trigger first</li>
                </ol>
              </div>
              <div>
                <h5 className="font-medium text-orange-100 mb-1">Google Home Routine:</h5>
                <ol className="text-sm text-orange-100 space-y-1 list-decimal list-inside">
                  <li>Open Google Home app → "Routines"</li>
                  <li>Tap "+" → "Household routines"</li>
                  <li>Choose starter: Time schedule</li>
                  <li>Set time and repeat days</li>
                  <li>Add action: "Adjust lights and plugs"</li>
                  <li>Configure each light individually</li>
                  <li>Add optional assistant response</li>
                  <li>Save and enable routine</li>
                </ol>
              </div>
            </div>
          </div>

          <div className="p-3 bg-yellow-600/10 border border-yellow-600/20 rounded-lg">
            <h4 className="font-semibold text-yellow-200 mb-2">⚠️ Testing and Troubleshooting</h4>
            <div className="grid md:grid-cols-2 gap-3 mt-2">
              <div>
                <h5 className="font-medium text-yellow-100 mb-1">Testing Checklist:</h5>
                <ul className="text-sm text-yellow-100 space-y-1">
                  <li>• Test during setup with manual triggers</li>
                  <li>• Verify all devices respond correctly</li>
                  <li>• Check behaviour during edge cases</li>
                  <li>• Monitor for first week after installation</li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium text-yellow-100 mb-1">Common Issues:</h5>
                <ul className="text-sm text-yellow-100 space-y-1">
                  <li>• Motion sensor false triggers (adjust sensitivity)</li>
                  <li>• Time zone errors (verify location settings)</li>
                  <li>• Device not responding (check connectivity)</li>
                  <li>• Conflicting automations (review rule priorities)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};