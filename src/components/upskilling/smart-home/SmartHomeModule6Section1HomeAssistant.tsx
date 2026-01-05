import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Server, CheckCircle2, XCircle, Code } from 'lucide-react';
import { HomeAssistantQuickCheck } from './HomeAssistantQuickCheck';

export const SmartHomeModule6Section1HomeAssistant = () => {
  return (
    <div className="space-y-6">
      <Card className="bg-elec-gray border-elec-yellow/20">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-foreground flex items-center gap-3">
            <span className="bg-elec-yellow text-elec-dark w-8 h-8 rounded-full flex items-center justify-center text-lg font-bold">2</span>
            Home Assistant (Open-Source Hub)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-start gap-4 p-4 bg-orange-900/20 border border-orange-500/30 rounded-lg">
            <Server className="h-6 w-6 text-orange-400 flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-semibold text-foreground mb-2">Open-Source Platform</h4>
              <p className="text-foreground text-sm">
                Home Assistant is an open-source hub platform that runs on hardware like Raspberry Pi.
              </p>
            </div>
          </div>

          {/* Pros Section */}
          <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle2 className="h-5 w-5 text-green-400" />
              <h4 className="font-semibold text-foreground">Advantages</h4>
            </div>
            <ul className="space-y-2 text-foreground text-sm">
              <li>• <strong>Very flexible</strong> - highly customisable for complex setups</li>
              <li>• <strong>Thousands of integrations</strong> - supports virtually any smart device</li>
              <li>• <strong>Strong community support</strong> - active development and help</li>
              <li>• <strong>Local control</strong> - works without internet connection</li>
              <li>• <strong>No subscription fees</strong> - completely free to use</li>
            </ul>
          </div>

          {/* Cons Section */}
          <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <XCircle className="h-5 w-5 text-red-400" />
              <h4 className="font-semibold text-foreground">Disadvantages</h4>
            </div>
            <ul className="space-y-2 text-foreground text-sm">
              <li>• <strong>Technical knowledge required</strong> - complex setup and configuration</li>
              <li>• <strong>Time-intensive</strong> - requires regular maintenance and updates</li>
              <li>• <strong>Learning curve</strong> - YAML configuration can be challenging</li>
              <li>• <strong>No official support</strong> - relies on community assistance</li>
            </ul>
          </div>

          {/* Best Use Cases */}
          <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <Code className="h-5 w-5 text-blue-400" />
              <h4 className="font-semibold text-foreground">Best Suited For</h4>
            </div>
            <ul className="space-y-2 text-foreground text-sm">
              <li>• Advanced users who enjoy tinkering with technology</li>
              <li>• Electricians offering bespoke, highly customised solutions</li>
              <li>• Clients who want complete control over their data</li>
              <li>• Complex installations with unusual device combinations</li>
              <li>• Budget-conscious projects where flexibility is key</li>
            </ul>
          </div>

          <div className="bg-elec-dark/50 border border-gray-600/30 rounded-lg p-4">
            <h4 className="font-semibold text-elec-yellow mb-2">Hardware Requirements:</h4>
            <ul className="space-y-1 text-foreground text-sm">
              <li>• Raspberry Pi 4 (recommended) or dedicated mini PC</li>
              <li>• MicroSD card (32GB minimum) or SSD storage</li>
              <li>• Zigbee/Z-Wave USB dongles for wireless protocols</li>
              <li>• Reliable power supply and ethernet connection</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <HomeAssistantQuickCheck />
    </div>
  );
};