import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2, CheckCircle2, XCircle, Lightbulb } from 'lucide-react';
import { ProprietaryHubQuickCheck } from './ProprietaryHubQuickCheck';

export const SmartHomeModule6Section1Proprietary = () => {
  return (
    <div className="space-y-6">
      <Card className="bg-elec-gray border-elec-yellow/20">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-foreground flex items-center gap-3">
            <span className="bg-elec-yellow text-elec-dark w-8 h-8 rounded-full flex items-center justify-center text-lg font-bold">4</span>
            Proprietary Hubs (Brand-Specific)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-start gap-4 p-4 bg-indigo-900/20 border border-indigo-500/30 rounded-lg">
            <Building2 className="h-6 w-6 text-indigo-400 flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-semibold text-foreground mb-2">Brand-Specific Systems</h4>
              <p className="text-foreground text-sm">
                Examples include Philips Hue Bridge, Hive Hub, and Tado Smart Thermostat Hub - designed specifically for their own ecosystems.
              </p>
            </div>
          </div>

          {/* Examples Grid */}
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-orange-900/20 border border-orange-500/30 rounded-lg p-4">
              <Lightbulb className="h-6 w-6 text-orange-400 mb-2" />
              <h4 className="font-semibold text-foreground text-sm mb-1">Philips Hue Bridge</h4>
              <p className="text-foreground text-xs">Lighting control system</p>
            </div>
            
            <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
              <Building2 className="h-6 w-6 text-blue-400 mb-2" />
              <h4 className="font-semibold text-foreground text-sm mb-1">Hive Hub</h4>
              <p className="text-foreground text-xs">Heating and energy management</p>
            </div>
            
            <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
              <Building2 className="h-6 w-6 text-green-400 mb-2" />
              <h4 className="font-semibold text-foreground text-sm mb-1">Tado Hub</h4>
              <p className="text-foreground text-xs">Smart thermostat control</p>
            </div>
          </div>

          {/* Pros Section */}
          <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle2 className="h-5 w-5 text-green-400" />
              <h4 className="font-semibold text-foreground">Advantages</h4>
            </div>
            <ul className="space-y-2 text-foreground text-sm">
              <li>• <strong>Seamless brand integration</strong> - perfect compatibility within ecosystem</li>
              <li>• <strong>Very stable performance</strong> - thoroughly tested and optimised</li>
              <li>• <strong>Professional support</strong> - dedicated customer service</li>
              <li>• <strong>Plug-and-play setup</strong> - minimal configuration required</li>
              <li>• <strong>Regular updates</strong> - consistent firmware improvements</li>
            </ul>
          </div>

          {/* Cons Section */}
          <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <XCircle className="h-5 w-5 text-red-400" />
              <h4 className="font-semibold text-foreground">Disadvantages</h4>
            </div>
            <ul className="space-y-2 text-foreground text-sm">
              <li>• <strong>Limited compatibility</strong> - only works with same-brand devices</li>
              <li>• <strong>Multiple hubs needed</strong> - separate hub for each system</li>
              <li>• <strong>Vendor lock-in</strong> - difficult to switch brands later</li>
              <li>• <strong>Higher overall cost</strong> - premium pricing for ecosystem</li>
              <li>• <strong>Multiple apps</strong> - separate control for each system</li>
            </ul>
          </div>

          {/* Common Applications */}
          <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-4">
            <h4 className="font-semibold text-foreground mb-3">Common Use Cases</h4>
            <ul className="space-y-2 text-foreground text-sm">
              <li>• <strong>Single-solution installs</strong> - lighting-only, heating-only systems</li>
              <li>• <strong>Premium brand preferences</strong> - clients wanting specific high-end products</li>
              <li>• <strong>Simple requirements</strong> - basic automation within one category</li>
              <li>• <strong>Phased installations</strong> - starting with one system, expanding later</li>
            </ul>
          </div>

          <div className="bg-elec-dark/50 border border-gray-600/30 rounded-lg p-4">
            <h4 className="font-semibold text-elec-yellow mb-2">Integration Considerations:</h4>
            <p className="text-foreground text-sm mb-2">
              While proprietary hubs excel within their ecosystems, they can often be integrated into broader systems:
            </p>
            <ul className="space-y-1 text-foreground text-sm">
              <li>• Many work with Alexa, Google Assistant, or Apple HomeKit</li>
              <li>• Can be connected to universal hubs like SmartThings</li>
              <li>• Some offer API access for advanced integration</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <ProprietaryHubQuickCheck />
    </div>
  );
};