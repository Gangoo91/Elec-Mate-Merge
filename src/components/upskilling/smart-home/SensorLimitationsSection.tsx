import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, Battery, Eye, Shield, Network } from 'lucide-react';

export const SensorLimitationsSection = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-elec-yellow" />
          Limitations and Challenges
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 bg-[#1a1a1a] border border-orange-600 rounded-lg">
            <h4 className="font-semibold text-orange-200 mb-3 flex items-center gap-2">
              <Battery className="h-4 w-4 text-orange-400" />
              Power Management
            </h4>
            <p className="text-orange-100 text-sm mb-2">
              Battery-powered sensors need regular monitoring and replacement.
            </p>
            <ul className="text-orange-100 text-sm space-y-1">
              <li>• Typical battery life: 1-3 years</li>
              <li>• Low battery alerts essential</li>
              <li>• Climate affects battery performance</li>
            </ul>
          </div>

          <div className="p-4 bg-[#1a1a1a] border border-red-600 rounded-lg">
            <h4 className="font-semibold text-red-200 mb-3 flex items-center gap-2">
              <Eye className="h-4 w-4 text-red-400" />
              PIR Detection Gaps
            </h4>
            <p className="text-red-100 text-sm mb-2">
              PIR sensors may miss certain types of movement.
            </p>
            <ul className="text-red-100 text-sm space-y-1">
              <li>• Very slow or partial movements</li>
              <li>• Movement directly towards sensor</li>
              <li>• Cold objects in warm environments</li>
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 bg-[#1a1a1a] border border-blue-600 rounded-lg">
            <h4 className="font-semibold text-blue-200 mb-3 flex items-center gap-2">
              <Shield className="h-4 w-4 text-blue-400" />
              Security Vulnerabilities
            </h4>
            <p className="text-blue-100 text-sm mb-2">
              Contact sensors have potential bypass methods.
            </p>
            <ul className="text-blue-100 text-sm space-y-1">
              <li>• Can be defeated if not securely installed</li>
              <li>• Magnet manipulation possible</li>
              <li>• Wireless jamming potential</li>
            </ul>
          </div>

          <div className="p-4 bg-[#1a1a1a] border border-purple-600 rounded-lg">
            <h4 className="font-semibold text-purple-200 mb-3 flex items-center gap-2">
              <Network className="h-4 w-4 text-purple-400" />
              Integration Challenges
            </h4>
            <p className="text-purple-100 text-sm mb-2">
              System compatibility and setup requirements.
            </p>
            <ul className="text-purple-100 text-sm space-y-1">
              <li>• Hub compatibility essential</li>
              <li>• Protocol matching required</li>
              <li>• Network range limitations</li>
            </ul>
          </div>
        </div>

        <div className="bg-gradient-to-r from-red-900/20 to-orange-900/20 border border-red-600/50 rounded-lg p-4">
          <h4 className="font-semibold text-red-200 mb-2">Mitigation Strategies</h4>
          <p className="text-red-100 text-sm">
            Address limitations through proper system design: use multiple sensor types, implement regular maintenance schedules, ensure secure mounting, and choose compatible protocols for reliable integration.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};