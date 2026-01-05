import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Smartphone, Play } from 'lucide-react';

const AppWalkthroughSection = () => {
  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Smartphone className="h-6 w-6 text-elec-yellow" />
          2. Walking Through the App
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <p className="text-foreground">
          The app walkthrough is the most critical part of client training. A systematic approach ensures clients understand all key features.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground flex items-center gap-2">
              <Play className="h-5 w-5 text-blue-400" />
              Essential App Features to Demonstrate
            </h4>
            
            <div className="space-y-3">
              <div className="p-3 bg-[#1a1a1a] rounded-lg">
                <h5 className="font-medium text-foreground mb-1">Login and Navigation</h5>
                <p className="text-gray-300 text-sm">Show clients how to log in, navigate menus, and access device controls</p>
              </div>
              
              <div className="p-3 bg-[#1a1a1a] rounded-lg">
                <h5 className="font-medium text-foreground mb-1">Device Control</h5>
                <p className="text-gray-300 text-sm">Demonstrate manual control of lights, heating, security systems</p>
              </div>
              
              <div className="p-3 bg-[#1a1a1a] rounded-lg">
                <h5 className="font-medium text-foreground mb-1">Creating Routines</h5>
                <p className="text-gray-300 text-sm">Show how to create basic scenes like "goodnight" or "away" modes</p>
              </div>
              
              <div className="p-3 bg-[#1a1a1a] rounded-lg">
                <h5 className="font-medium text-foreground mb-1">Notifications and Alerts</h5>
                <p className="text-gray-300 text-sm">Explain motion detection alerts, low battery warnings, system status</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Advanced Features</h4>
            
            <div className="p-4 bg-blue-900/20 border border-blue-600/30 rounded-lg">
              <h5 className="font-medium text-blue-200 mb-2">Voice Assistant Integration</h5>
              <p className="text-blue-100 text-sm mb-2">If applicable, demonstrate:</p>
              <ul className="text-blue-100 text-sm space-y-1">
                <li>• Voice commands for common actions</li>
                <li>• Setting up voice routines</li>
                <li>• Troubleshooting voice recognition issues</li>
              </ul>
            </div>
            
            <div className="p-4 bg-green-900/20 border border-green-600/30 rounded-lg">
              <h5 className="font-medium text-green-200 mb-2">Scheduling and Automation</h5>
              <p className="text-green-100 text-sm mb-2">Show clients how to:</p>
              <ul className="text-green-100 text-sm space-y-1">
                <li>• Set up timed events (heating schedules)</li>
                <li>• Create sensor-triggered automations</li>
                <li>• Adjust settings for holidays/away periods</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg p-4">
          <h4 className="font-semibold text-elec-yellow mb-3">Client Training Best Practices</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ul className="space-y-2 text-gray-300 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                Let the client operate the app themselves during demonstration
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                Use simple, non-technical language throughout
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                Focus on features they will actually use daily
              </li>
            </ul>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                Encourage questions and repeat demonstrations if needed
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                Provide written or video guides for future reference
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                Test client understanding before concluding the handover
              </li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AppWalkthroughSection;