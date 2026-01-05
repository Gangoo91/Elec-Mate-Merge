import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Info } from 'lucide-react';

export const SmartHomeSection3Intro = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Info className="h-5 w-5 text-elec-yellow" />
          Introduction
        </CardTitle>
      </CardHeader>
      <CardContent className="text-gray-300 space-y-4">
        <p className="text-lg font-medium text-foreground mb-4">
          Smart homes rely on three fundamental components that work together to create intelligent automation systems:
        </p>
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div className="p-3 bg-gradient-to-br from-blue-900/30 to-blue-800/30 border border-blue-600 rounded-lg text-center hover:scale-105 transition-transform">
            <h4 className="font-semibold text-blue-200 mb-2">Sensors</h4>
            <p className="text-sm text-blue-100">Detect environmental changes and user activity</p>
          </div>
          <div className="p-3 bg-gradient-to-br from-green-900/30 to-green-800/30 border border-green-600 rounded-lg text-center hover:scale-105 transition-transform">
            <h4 className="font-semibold text-green-200 mb-2">Actuators</h4>
            <p className="text-sm text-green-100">Execute physical actions based on commands</p>
          </div>
          <div className="p-3 bg-gradient-to-br from-purple-900/30 to-purple-800/30 border border-purple-600 rounded-lg text-center hover:scale-105 transition-transform">
            <h4 className="font-semibold text-purple-200 mb-2">Controllers</h4>
            <p className="text-sm text-purple-100">Process information and coordinate system responses</p>
          </div>
        </div>
        <p>
          Understanding these core components is essential for designing, implementing, and troubleshooting smart home systems. Each component plays a crucial role in the automation ecosystem, and their effective integration determines the overall system performance and user experience.
        </p>
        <p>
          This section provides detailed coverage of how these devices function individually and collectively, their various types and applications, communication methods, integration challenges, and emerging trends that will shape the future of smart home technology.
        </p>
      </CardContent>
    </Card>
  );
};