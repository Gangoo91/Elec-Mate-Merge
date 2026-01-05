import { Card, CardContent } from '@/components/ui/card';
import { Shield, Thermometer, Lightbulb, Camera } from 'lucide-react';
import LegacyDevicesQuickCheck from '@/components/upskilling/smart-home/LegacyDevicesQuickCheck';

const SmartHomeModule6Section4Legacy = () => {
  return (
    <section className="space-y-6">
      <Card className="bg-elec-gray border-transparent">
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold text-foreground mb-6">2. Common Legacy Devices and Systems</h2>
          
          <div className="space-y-6">
            <p className="text-foreground text-lg">
              Electricians frequently encounter these older systems that clients want to integrate:
            </p>

            <div className="grid gap-6">
              {/* Wired Alarms */}
              <div className="bg-elec-dark/50 border border-red-500/30 rounded-lg p-5">
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Wired Intruder Alarms</h3>
                    <p className="text-foreground mb-3">Traditional hard-wired security systems using dry contacts and control panels.</p>
                    <div className="grid md:grid-cols-2 gap-3">
                      <div className="bg-red-500/10 border border-red-500/30 rounded p-3">
                        <h4 className="text-red-300 font-semibold text-sm mb-1">Typical Features</h4>
                        <p className="text-foreground text-xs">Door/window sensors, PIR detectors, keypads, sirens</p>
                      </div>
                      <div className="bg-red-500/10 border border-red-500/30 rounded p-3">
                        <h4 className="text-red-300 font-semibold text-sm mb-1">Integration Challenges</h4>
                        <p className="text-foreground text-xs">Proprietary protocols, wired connections, limited data output</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Old Thermostats */}
                <div className="bg-elec-dark/50 border border-blue-500/30 rounded-lg p-5">
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">Legacy Thermostats</h3>
                    <p className="text-foreground mb-3">Older programmable thermostats with limited connectivity options.</p>
                    <div className="grid md:grid-cols-2 gap-3">
                      <div className="bg-blue-500/10 border border-blue-500/30 rounded p-3">
                        <h4 className="text-blue-300 font-semibold text-sm mb-1">Common Types</h4>
                        <p className="text-foreground text-xs">7-day programmable, basic digital, mechanical dial systems</p>
                      </div>
                      <div className="bg-blue-500/10 border border-blue-500/30 rounded p-3">
                        <h4 className="text-blue-300 font-semibold text-sm mb-1">Limitations</h4>
                        <p className="text-foreground text-xs">No Wi-Fi, limited scheduling, manual operation only</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Proprietary Lighting */}
                <div className="bg-elec-dark/50 border border-yellow-500/30 rounded-lg p-5">
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">Proprietary Lighting Controls</h3>
                    <p className="text-foreground mb-3">Pre-Zigbee/Z-Wave lighting systems with custom protocols.</p>
                    <div className="grid md:grid-cols-2 gap-3">
                      <div className="bg-yellow-500/10 border border-yellow-500/30 rounded p-3">
                        <h4 className="text-yellow-300 font-semibold text-sm mb-1">Examples</h4>
                        <p className="text-foreground text-xs">Lutron RadioRA Classic, early X10 systems, proprietary dimmers</p>
                      </div>
                      <div className="bg-yellow-500/10 border border-yellow-500/30 rounded p-3">
                        <h4 className="text-yellow-300 font-semibold text-sm mb-1">Issues</h4>
                        <p className="text-foreground text-xs">Closed ecosystems, limited expansion, no modern app support</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* CCTV Systems */}
                <div className="bg-elec-dark/50 border border-green-500/30 rounded-lg p-5">
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">Analogue CCTV Systems</h3>
                    <p className="text-foreground mb-3">Traditional coaxial cable systems with DVR recording.</p>
                    <div className="grid md:grid-cols-2 gap-3">
                      <div className="bg-green-500/10 border border-green-500/30 rounded p-3">
                        <h4 className="text-green-300 font-semibold text-sm mb-1">Characteristics</h4>
                        <p className="text-foreground text-xs">BNC connections, coaxial cables, standalone DVR units</p>
                      </div>
                      <div className="bg-green-500/10 border border-green-500/30 rounded p-3">
                        <h4 className="text-green-300 font-semibold text-sm mb-1">Modernisation Needs</h4>
                        <p className="text-foreground text-xs">Remote access, mobile viewing, cloud storage options</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
          </div>
        </CardContent>
      </Card>

      <LegacyDevicesQuickCheck />
    </section>
  );
};

export default SmartHomeModule6Section4Legacy;