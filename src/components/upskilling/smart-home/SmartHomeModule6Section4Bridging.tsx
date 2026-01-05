import { Card, CardContent } from '@/components/ui/card';
import { Link2, Wifi, ArrowLeftRight } from 'lucide-react';
import BridgingQuickCheck from '@/components/upskilling/smart-home/BridgingQuickCheck';

const SmartHomeModule6Section4Bridging = () => {
  return (
    <section className="space-y-6">
      <Card className="bg-elec-gray border-transparent">
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold text-foreground mb-6">1. What is Bridging?</h2>
          
          <div className="space-y-6">
            <div>
              <p className="text-foreground text-lg font-semibold mb-2">
                Bridging = enabling older or incompatible devices to communicate with modern smart home platforms
              </p>
              <p className="text-foreground mb-4">
                This process allows existing systems to integrate with new technology without complete replacement.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-elec-dark/50 border border-elec-yellow/20 rounded-lg p-5">
                <div className="mb-3">
                  <h3 className="text-lg font-semibold text-foreground">How It Works</h3>
                </div>
                <div className="space-y-2 text-sm text-foreground">
                  <div>• Bridge hubs translate signals</div>
                  <div>• Protocol converters enable communication</div>
                  <div>• Cloud integrations link systems</div>
                  <div>• Software bridges connect platforms</div>
                </div>
              </div>

              <div className="bg-elec-dark/50 border border-elec-yellow/20 rounded-lg p-5">
                <div className="mb-3">
                  <h3 className="text-lg font-semibold text-foreground">Example</h3>
                </div>
                <p className="text-foreground text-sm">
                  Using a Hue Bridge to connect Zigbee bulbs to Alexa, allowing voice control of older lighting systems.
                </p>
              </div>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
              <h4 className="text-lg font-semibold text-blue-400 mb-2">Key Benefits of Bridging</h4>
              <div className="grid md:grid-cols-3 gap-3 text-sm text-foreground">
                <div>
                  <strong className="text-green-400">Cost Effective:</strong> Preserve existing investments
                </div>
                <div>
                  <strong className="text-blue-400">Gradual Upgrade:</strong> Modernise systems over time
                </div>
                <div>
                  <strong className="text-purple-400">Functionality:</strong> Add smart features to old devices
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <BridgingQuickCheck />
    </section>
  );
};

export default SmartHomeModule6Section4Bridging;