import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, Zap } from 'lucide-react';

export const ChallengesAndFutureSection = () => {
  return (
    <div className="space-y-6">
      <Card className="bg-elec-gray border-gray-700">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-elec-yellow" />
            Common Challenges
          </CardTitle>
        </CardHeader>
        <CardContent className="text-gray-300 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-semibold text-foreground">Scheduled Control Challenges</h4>
              <div className="bg-red-950/30 border border-red-600 rounded-lg p-4">
                <ul className="space-y-2 text-red-100 text-sm">
                  <li>• User forgets to update when routine changes</li>
                  <li>• Wasted energy during holidays/absences</li>
                  <li>• No adaptation to weather changes</li>
                  <li>• Manual intervention required frequently</li>
                </ul>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-foreground">AI Control Challenges</h4>
              <div className="bg-orange-950/30 border border-orange-600 rounded-lg p-4">
                <ul className="space-y-2 text-orange-100 text-sm">
                  <li>• Needs "learning period" to adapt effectively</li>
                  <li>• Can make wrong assumptions initially</li>
                  <li>• Internet dependency for full functionality</li>
                  <li>• Some features require cloud services</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-yellow-950/20 border border-yellow-600 rounded-lg p-4">
            <h4 className="font-semibold text-yellow-200 mb-2">Installation Considerations</h4>
            <ul className="space-y-1 text-yellow-100 text-sm">
              <li>• Client education essential for AI systems</li>
              <li>• WiFi reliability crucial for smart features</li>
              <li>• Backup manual controls recommended</li>
              <li>• Regular system updates may be needed</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-elec-gray border-gray-700">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Zap className="h-5 w-5 text-elec-yellow" />
            Future Developments
          </CardTitle>
        </CardHeader>
        <CardContent className="text-gray-300 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-blue-950/30 border border-blue-600 rounded-lg p-4">
              <h4 className="font-semibold text-blue-200 mb-3">Smart Tariff Integration</h4>
              <ul className="space-y-1 text-blue-100 text-sm">
                <li>• Heat when energy is cheapest</li>
                <li>• Time-of-use optimisation</li>
                <li>• Dynamic pricing response</li>
                <li>• Battery storage coordination</li>
              </ul>
            </div>
            
            <div className="bg-green-950/30 border border-green-600 rounded-lg p-4">
              <h4 className="font-semibold text-green-200 mb-3">Advanced AI</h4>
              <ul className="space-y-1 text-green-100 text-sm">
                <li>• More accurate occupancy prediction</li>
                <li>• Weather pattern learning</li>
                <li>• Lifestyle change adaptation</li>
                <li>• Multi-home learning networks</li>
              </ul>
            </div>
            
            <div className="bg-purple-950/30 border border-purple-600 rounded-lg p-4">
              <h4 className="font-semibold text-purple-200 mb-3">Carbon Awareness</h4>
              <ul className="space-y-1 text-purple-100 text-sm">
                <li>• Renewable energy scheduling</li>
                <li>• Grid carbon intensity monitoring</li>
                <li>• Emissions-based heating decisions</li>
                <li>• Green energy prioritisation</li>
              </ul>
            </div>
          </div>

          <div className="bg-gray-800 border border-gray-600 rounded-lg p-4">
            <h4 className="font-semibold text-foreground mb-2">Industry Outlook</h4>
            <p className="text-gray-300 text-sm">
              The future points towards hybrid systems that combine the reliability of schedules with the intelligence of AI learning, integrated with smart grids and renewable energy sources for optimal environmental and economic outcomes.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};