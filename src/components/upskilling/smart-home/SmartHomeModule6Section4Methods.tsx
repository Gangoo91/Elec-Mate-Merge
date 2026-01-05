import { Card, CardContent } from '@/components/ui/card';
import { Cpu, Wifi, ArrowUpDown, Zap } from 'lucide-react';
import BridgingMethodsQuickCheck from '@/components/upskilling/smart-home/BridgingMethodsQuickCheck';

const SmartHomeModule6Section4Methods = () => {
  return (
    <section className="space-y-6">
      <Card className="bg-elec-gray border-transparent">
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold text-foreground mb-6">3. Methods of Bridging</h2>
          
          <div className="space-y-6">
            <p className="text-foreground text-lg">
              Several approaches can integrate legacy systems with modern smart home platforms:
            </p>

            <div className="grid gap-6">
              {/* Hardware Bridges */}
              <div className="bg-elec-dark/50 border border-blue-500/30 rounded-lg p-5">
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Hardware Bridges</h3>
                  <p className="text-foreground mb-4">Brand-specific hubs that translate between protocols and platforms.</p>
                  
                  <div className="space-y-3">
                    <div className="bg-blue-500/10 border border-blue-500/30 rounded p-3">
                      <h4 className="text-blue-300 font-semibold mb-2">Popular Examples</h4>
                      <div className="grid md:grid-cols-2 gap-2 text-sm text-foreground">
                        <div>• Philips Hue Bridge (Zigbee to Wi-Fi)</div>
                        <div>• Lutron Caseta Bridge (proprietary to Wi-Fi)</div>
                        <div>• SmartThings Hub (multi-protocol)</div>
                        <div>• Hubitat Elevation (local processing)</div>
                      </div>
                    </div>
                    
                    <div className="bg-blue-500/10 border border-blue-500/30 rounded p-3">
                      <h4 className="text-blue-300 font-semibold mb-2">Advantages</h4>
                      <p className="text-foreground text-sm">Plug-and-play setup, manufacturer support, reliable operation</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Software/API Integrations */}
              <div className="bg-elec-dark/50 border border-green-500/30 rounded-lg p-5">
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Software/API Integrations</h3>
                  <p className="text-foreground mb-4">Platform-based solutions that connect multiple device types via software.</p>
                  
                  <div className="space-y-3">
                    <div className="bg-green-500/10 border border-green-500/30 rounded p-3">
                      <h4 className="text-green-300 font-semibold mb-2">Key Platforms</h4>
                      <div className="grid md:grid-cols-2 gap-2 text-sm text-foreground">
                        <div>• Home Assistant (open source)</div>
                        <div>• OpenHAB (Java-based)</div>
                        <div>• Node-RED (visual programming)</div>
                        <div>• IFTTT (cloud automation)</div>
                      </div>
                    </div>
                    
                    <div className="bg-green-500/10 border border-green-500/30 rounded p-3">
                      <h4 className="text-green-300 font-semibold mb-2">Benefits</h4>
                      <p className="text-foreground text-sm">Extensive device support, custom integrations, community plugins</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Protocol Converters */}
              <div className="bg-elec-dark/50 border border-purple-500/30 rounded-lg p-5">
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Protocol Converters</h3>
                  <p className="text-foreground mb-4">Devices that translate signals between different communication standards.</p>
                  
                  <div className="space-y-3">
                    <div className="bg-purple-500/10 border border-purple-500/30 rounded p-3">
                      <h4 className="text-purple-300 font-semibold mb-2">Common Conversions</h4>
                      <div className="space-y-1 text-sm text-foreground">
                        <div>• Zigbee ↔ Wi-Fi conversion</div>
                        <div>• Z-Wave ↔ Wi-Fi bridges</div>
                        <div>• 433MHz ↔ Wi-Fi gateways</div>
                        <div>• RS485 ↔ Ethernet adapters</div>
                      </div>
                    </div>
                    
                    <div className="bg-purple-500/10 border border-purple-500/30 rounded p-3">
                      <h4 className="text-purple-300 font-semibold mb-2">Use Cases</h4>
                      <p className="text-foreground text-sm">Extending protocol reach, enabling cross-platform communication</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Smart Relays */}
              <div className="bg-elec-dark/50 border border-amber-500/30 rounded-lg p-5">
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Smart Relays</h3>
                  <p className="text-foreground mb-4">Interface devices that connect traditional wired switches to modern hubs.</p>
                  
                  <div className="space-y-3">
                    <div className="bg-amber-500/10 border border-amber-500/30 rounded p-3">
                      <h4 className="text-amber-300 font-semibold mb-2">Applications</h4>
                      <div className="grid md:grid-cols-2 gap-2 text-sm text-foreground">
                        <div>• Traditional light switches</div>
                        <div>• Garage door controls</div>
                        <div>• Irrigation systems</div>
                        <div>• Gate and barrier controls</div>
                      </div>
                    </div>
                    
                    <div className="bg-amber-500/10 border border-amber-500/30 rounded p-3">
                      <h4 className="text-amber-300 font-semibold mb-2">Installation</h4>
                      <p className="text-foreground text-sm">Behind existing switches, minimal rewiring required</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <BridgingMethodsQuickCheck />
    </section>
  );
};

export default SmartHomeModule6Section4Methods;