import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Zap, Router, Shield } from 'lucide-react';
import MetalEnclosureQuickCheck from '@/components/upskilling/smart-home/MetalEnclosureQuickCheck';

const CoverageOptimisationSection = () => {
  return (
    <div className="space-y-6">
      <Card className="bg-elec-gray border-transparent">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Zap className="h-6 w-6 text-elec-yellow" />
            Optimising Coverage
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-300">
            Strategic placement of hubs, routers, and devices significantly improves wireless coverage and system reliability.
          </p>

          <div className="space-y-4">
            <h4 className="font-semibold text-foreground flex items-center gap-2">
              <Router className="h-4 w-4 text-elec-yellow" />
              Hub and Router Placement
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-green-600/10 border border-green-600/30 rounded-lg">
                <h5 className="font-semibold text-green-400 mb-2">✅ Best Practices</h5>
                <ul className="space-y-1 text-green-100 text-sm">
                  <li>• Central location in the home</li>
                  <li>• Elevated position (shelf, wall mount)</li>
                  <li>• Away from metal objects</li>
                  <li>• Clear line of sight to devices</li>
                  <li>• Away from interference sources</li>
                  <li>• Good ventilation for cooling</li>
                </ul>
              </div>

              <div className="p-4 bg-red-900/20 border border-red-600/30 rounded-lg">
                <h5 className="font-semibold text-red-200 mb-2">❌ Avoid These Locations</h5>
                <ul className="space-y-1 text-red-100 text-sm">
                  <li>• Inside cupboards or closets</li>
                  <li>• Behind large metal appliances</li>
                  <li>• Near microwave ovens</li>
                  <li>• In basements or corners</li>
                  <li>• Close to other wireless devices</li>
                  <li>• Areas with poor ventilation</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Coverage Enhancement Solutions</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-[#1a1a1a] rounded-lg">
                <h5 className="font-medium text-foreground mb-2">Mesh Wi-Fi Systems</h5>
                <ul className="space-y-1 text-gray-300 text-sm">
                  <li>• Multiple access points</li>
                  <li>• Seamless roaming</li>
                  <li>• Self-optimising coverage</li>
                  <li>• Easy expansion</li>
                </ul>
              </div>

              <div className="p-4 bg-[#1a1a1a] rounded-lg">
                <h5 className="font-medium text-foreground mb-2">Wi-Fi Extenders</h5>
                <ul className="space-y-1 text-gray-300 text-sm">
                  <li>• Boost existing signals</li>
                  <li>• Cost-effective solution</li>
                  <li>• Targeted coverage areas</li>
                  <li>• Simple installation</li>
                </ul>
              </div>

              <div className="p-4 bg-[#1a1a1a] rounded-lg">
                <h5 className="font-medium text-foreground mb-2">Powerline Adapters</h5>
                <ul className="space-y-1 text-gray-300 text-sm">
                  <li>• Use existing electrical wiring</li>
                  <li>• No additional cables needed</li>
                  <li>• Stable backbone connection</li>
                  <li>• Good through thick walls</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-red-900/20 border border-red-600/30 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="h-4 w-4 text-red-400" />
              <h4 className="font-semibold text-red-200">Metal Enclosure Warning</h4>
            </div>
            <p className="text-red-100 text-sm mb-2">
              Never install smart devices inside metal enclosures as this creates a Faraday cage effect that blocks wireless signals.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div>
                <span className="text-red-300 font-medium">Problematic Locations:</span>
                <ul className="text-red-100 mt-1 space-y-1">
                  <li>• Metal consumer units</li>
                  <li>• Steel junction boxes</li>
                  <li>• Aluminium enclosures</li>
                  <li>• Metal-lined cavities</li>
                </ul>
              </div>
              <div>
                <span className="text-green-300 font-medium">Better Alternatives:</span>
                <ul className="text-green-100 mt-1 space-y-1">
                  <li>• External mounting</li>
                  <li>• Plastic enclosures</li>
                  <li>• Remote antenna options</li>
                  <li>• Signal repeater nearby</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Zigbee/Z-Wave Mesh Optimisation</h4>
            
            <div className="p-4 bg-blue-600/10 border border-blue-600/30 rounded-lg">
              <p className="text-blue-100 text-sm mb-3">
                Mesh networks improve coverage by using powered devices as signal repeaters:
              </p>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-blue-400">•</span>
                  Add powered devices (smart plugs, switches) to strengthen mesh
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400">•</span>
                  Space repeater devices 10-15 metres apart for optimal coverage
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400">•</span>
                  Battery devices don't repeat signals (to preserve battery life)
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400">•</span>
                  Network automatically finds best signal paths
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <MetalEnclosureQuickCheck />
    </div>
  );
};

export default CoverageOptimisationSection;