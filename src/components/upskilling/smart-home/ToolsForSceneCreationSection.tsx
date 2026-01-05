import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Wrench } from 'lucide-react';

export const ToolsForSceneCreationSection = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Wrench className="h-5 w-5 text-elec-yellow" />
          Scene Programming Platforms
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-6">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-600">
                <th className="text-left p-3">Platform</th>
                <th className="text-left p-3">Scene Capacity</th>
                <th className="text-left p-3">Programming Method</th>
                <th className="text-left p-3">Cost Level</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-700">
                <td className="p-3"><strong className="text-blue-200">Philips Hue</strong></td>
                <td className="p-3">100 scenes per bridge</td>
                <td className="p-3">App-based visual editor</td>
                <td className="p-3 text-yellow-400">Premium</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="p-3"><strong className="text-green-200">Home Assistant</strong></td>
                <td className="p-3">Unlimited</td>
                <td className="p-3">YAML coding</td>
                <td className="p-3 text-green-400">Free</td>
              </tr>
              <tr>
                <td className="p-3"><strong className="text-purple-200">Lutron Caseta</strong></td>
                <td className="p-3">50+ per system</td>
                <td className="p-3">App + physical controls</td>
                <td className="p-3 text-orange-400">Mid-range</td>
              </tr>
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};