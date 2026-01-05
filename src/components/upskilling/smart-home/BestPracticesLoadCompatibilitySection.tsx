import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckSquare, AlertCircle, Search, TestTube } from 'lucide-react';

export const BestPracticesLoadCompatibilitySection = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <CheckSquare className="h-6 w-6 text-elec-yellow" />
          Best Practices in Load Compatibility
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <p className="text-foreground">
          Following these proven practices ensures reliable, safe, and efficient smart lighting installations 
          that perform as expected over their operational lifetime.
        </p>

        <div className="grid gap-4">
          <div className="bg-green-900/20 border border-green-600/50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <Search className="h-5 w-5 text-green-400" />
              <h4 className="text-green-300 font-semibold">Compatibility Verification</h4>
            </div>
            <ul className="text-green-200 text-sm space-y-1">
              <li>• Use dimmable lamps marked as compatible with chosen dimmer</li>
              <li>• Check manufacturer compatibility charts before purchase</li>
              <li>• Verify voltage and wattage ratings match</li>
              <li>• Consider future expansion and flexibility needs</li>
            </ul>
          </div>

          <div className="bg-blue-900/20 border border-blue-600/50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <AlertCircle className="h-5 w-5 text-blue-400" />
              <h4 className="text-blue-300 font-semibold">Circuit Loading</h4>
            </div>
            <ul className="text-blue-200 text-sm space-y-1">
              <li>• Don't overload circuits with too many lamps</li>
              <li>• Consider inrush current for LED installations</li>
              <li>• Maintain adequate de-rating for heat dissipation</li>
              <li>• Plan for future additions and modifications</li>
            </ul>
          </div>

          <div className="bg-amber-900/20 border border-amber-600/50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <AlertCircle className="h-5 w-5 text-amber-400" />
              <h4 className="text-amber-300 font-semibold">Load Segregation</h4>
            </div>
            <ul className="text-amber-200 text-sm space-y-1">
              <li>• Avoid mixing different lamp types on one dimmer channel</li>
              <li>• Separate LED and incandescent loads</li>
              <li>• Group similar technologies together</li>
              <li>• Consider separate circuits for different zones</li>
            </ul>
          </div>

          <div className="bg-purple-900/20 border border-purple-600/50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <TestTube className="h-5 w-5 text-purple-400" />
              <h4 className="text-purple-300 font-semibold">Testing and Documentation</h4>
            </div>
            <ul className="text-purple-200 text-sm space-y-1">
              <li>• Test system performance at installation stage</li>
              <li>• Document compatible combinations for future reference</li>
              <li>• Provide client with compatibility information</li>
              <li>• Keep up-to-date with manufacturer updates</li>
            </ul>
          </div>
        </div>

        <div className="bg-elec-dark p-4 rounded-lg border border-gray-600">
          <h4 className="text-foreground font-semibold mb-2">Professional Installation Checklist:</h4>
          <ul className="text-gray-300 text-sm space-y-1">
            <li>✓ Verify all components are compatible before installation</li>
            <li>✓ Test small sample before bulk installation</li>
            <li>✓ Document system configuration and settings</li>
            <li>✓ Provide client with operation and maintenance guidance</li>
            <li>✓ Schedule follow-up to check performance</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};