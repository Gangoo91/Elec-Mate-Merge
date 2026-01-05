import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, AlertTriangle, CheckCircle, MessageCircle } from 'lucide-react';

export const SmartHomeModule5Section3RealWorld = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Users className="h-5 w-5 text-elec-yellow" />
          Real-World Case Study
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-600/50 rounded-lg p-6">
          <h3 className="text-blue-200 font-semibold mb-4">Security Gap Scenario</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 bg-[#1a1a1a] border border-red-600 rounded-lg">
              <h4 className="font-semibold text-red-200 mb-3 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-red-400" />
                Initial Setup Issue
              </h4>
              <p className="text-red-100 text-sm mb-3">
                A family installed contact sensors on all ground-floor windows but no PIR sensors indoors.
              </p>
              <ul className="text-red-100 text-sm space-y-1">
                <li>• Perimeter detection only</li>
                <li>• No interior monitoring</li>
                <li>• Coverage gap identified</li>
              </ul>
            </div>

            <div className="p-4 bg-[#1a1a1a] border border-green-600 rounded-lg">
              <h4 className="font-semibold text-green-200 mb-3 flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-400" />
                Improved Solution
              </h4>
              <p className="text-green-100 text-sm mb-3">
                Adding PIR sensors provided a second line of detection, reducing response gaps.
              </p>
              <ul className="text-green-100 text-sm space-y-1">
                <li>• Layered security approach</li>
                <li>• Interior movement detection</li>
                <li>• Faster threat response</li>
              </ul>
            </div>
          </div>

          <div className="mt-6 p-4 bg-[#1a1a1a] border border-yellow-600 rounded-lg">
            <h4 className="font-semibold text-yellow-200 mb-3">The Incident</h4>
            <p className="text-yellow-100 text-sm">
              During a break-in, the intruder forced a door open (triggering an alert) but moved freely inside before police arrived. The family realised they had no way to track the intruder's movements within the property.
            </p>
          </div>

          <div className="mt-6 p-4 bg-gradient-to-r from-green-900/20 to-blue-900/20 border border-green-600/50 rounded-lg">
            <h4 className="font-semibold text-green-200 mb-2 flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-400" />
              Key Learning Points
            </h4>
            <ul className="text-green-100 text-sm space-y-1">
              <li>• Perimeter-only protection has blind spots</li>
              <li>• Interior detection provides crucial coverage</li>
              <li>• Multiple sensor types reduce response gaps</li>
              <li>• Layered security increases effectiveness</li>
            </ul>
          </div>

          <div className="mt-6 p-4 bg-gradient-to-r from-purple-900/20 to-pink-900/20 border border-purple-600/50 rounded-lg">
            <h4 className="font-semibold text-purple-200 mb-3 flex items-center gap-2">
              <MessageCircle className="h-4 w-4 text-purple-400" />
              Discussion Point
            </h4>
            <p className="text-purple-100 text-sm italic">
              "What lesson does this scenario teach about layered security?"
            </p>
            <p className="text-purple-200 text-sm mt-2">
              Consider how combining different sensor types creates comprehensive coverage and why relying on a single detection method can leave security gaps.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};