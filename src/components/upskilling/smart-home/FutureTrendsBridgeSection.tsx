import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, Shield, Zap, Network, Award } from 'lucide-react';

export const FutureTrendsBridgeSection = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-elec-yellow" />
          Future Trends
        </CardTitle>
      </CardHeader>
      <CardContent className="text-gray-300 space-y-6">
        <div className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 border border-purple-600/30 rounded-lg p-4">
          <h4 className="text-purple-200 font-semibold mb-3 flex items-center gap-2">
            <Award className="h-4 w-4" />
            Matter Protocol Revolution
          </h4>
          <p className="text-purple-100 text-sm mb-3">
            Matter (formerly Project CHIP) is designed to significantly reduce the need for bridges by creating native compatibility across ecosystems.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="flex items-center gap-2">
              <Shield className="h-3 w-3 text-purple-400" />
              <span className="text-purple-200">Universal compatibility</span>
            </div>
            <div className="flex items-center gap-2">
              <Network className="h-3 w-3 text-purple-400" />
              <span className="text-purple-200">Thread/IP-based</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="h-3 w-3 text-purple-400" />
              <span className="text-purple-200">Reduced latency</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="h-3 w-3 text-purple-400" />
              <span className="text-purple-200">Industry backing</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-foreground font-semibold">Industry Movement Towards Native Compatibility</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-green-900/10 border border-green-600/20 rounded-lg p-4">
              <h5 className="text-green-400 font-medium mb-2">Current State</h5>
              <ul className="text-sm space-y-1 text-green-200">
                <li>• Multiple protocol standards</li>
                <li>• Bridge dependency</li>
                <li>• Ecosystem silos</li>
                <li>• Complex setup procedures</li>
              </ul>
            </div>
            
            <div className="bg-blue-900/10 border border-blue-600/20 rounded-lg p-4">
              <h5 className="text-blue-400 font-medium mb-2">Future Vision</h5>
              <ul className="text-sm space-y-1 text-blue-200">
                <li>• Universal device compatibility</li>
                <li>• Direct ecosystem integration</li>
                <li>• Simplified installation</li>
                <li>• Reduced failure points</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-amber-900/10 border border-amber-600/20 rounded-lg p-4">
          <h4 className="text-amber-200 font-semibold mb-3">Transition Period Reality</h4>
          <p className="text-amber-100 text-sm mb-2">
            While Matter promises to reduce bridge dependency, the transition will be gradual:
          </p>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 bg-amber-400 rounded-full"></div>
              <span className="text-amber-200">Legacy devices will still require bridges</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 bg-amber-400 rounded-full"></div>
              <span className="text-amber-200">Gradual Matter adoption across manufacturers</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 bg-amber-400 rounded-full"></div>
              <span className="text-amber-200">Bridges will remain relevant for 5-10 years</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-800/50 border border-gray-600/30 rounded-lg p-4">
          <h4 className="text-foreground font-semibold mb-3">Timeline Expectations</h4>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="text-xs bg-blue-600 text-foreground px-2 py-1 rounded">2024-2025</div>
              <span className="text-gray-300 text-sm">Early Matter device adoption</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-xs bg-purple-600 text-foreground px-2 py-1 rounded">2026-2028</div>
              <span className="text-gray-300 text-sm">Mainstream Matter ecosystem integration</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-xs bg-green-600 text-foreground px-2 py-1 rounded">2029+</div>
              <span className="text-gray-300 text-sm">Reduced bridge dependency for new installations</span>
            </div>
          </div>
        </div>

        <div className="bg-blue-900/10 border border-blue-600/20 rounded-lg p-4">
          <h4 className="text-blue-200 font-semibold mb-2">Installer Implications</h4>
          <div className="text-blue-100 text-sm space-y-1">
            <p>• Stay informed about Matter certification timelines</p>
            <p>• Plan upgrade paths for existing installations</p>
            <p>• Consider future compatibility when selecting current products</p>
            <p>• Maintain bridge expertise for legacy system support</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};