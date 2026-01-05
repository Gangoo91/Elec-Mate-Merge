import { Home } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const SmartHomeRealWorld = () => {
  return (
    <Card className="bg-blue-600/10 border-blue-600/30 border">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Home className="h-6 w-6 text-blue-400" />
          Real-World Case Study
        </CardTitle>
      </CardHeader>
      <CardContent className="text-gray-300 space-y-4">
        <div className="bg-blue-600/20 p-4 rounded-lg border border-blue-600/40">
          <p className="font-semibold text-foreground mb-3">
            The Riverside House Smart Home Retrofit Project
          </p>
          <p className="text-sm mb-4">
            A Victorian terraced house in Birmingham underwent a comprehensive smart home conversion over 18 months, 
            demonstrating how traditional properties can successfully integrate modern technology while preserving 
            their character and addressing common implementation challenges.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="bg-elec-dark p-3 rounded">
              <p className="text-foreground font-semibold text-sm mb-2">Phase 1: Core Systems (Months 1-6)</p>
              <ul className="text-xs text-gray-400 space-y-1">
                <li>• Smart thermostats in 3 heating zones</li>
                <li>• 28 smart LED bulbs with dimming</li>
                <li>• 12 motion sensors for automation</li>
                <li>• Window sensors for heating efficiency</li>
                <li>• Central Zigbee hub installation</li>
              </ul>
            </div>
            
            <div className="bg-elec-dark p-3 rounded">
              <p className="text-foreground font-semibold text-sm mb-2">Phase 2: Security & Access (Months 7-12)</p>
              <ul className="text-xs text-gray-400 space-y-1">
                <li>• Smart locks on front and rear doors</li>
                <li>• Video doorbell with facial recognition</li>
                <li>• 6 security cameras (4 external, 2 internal)</li>
                <li>• Smart smoke and CO detectors</li>
                <li>• Integrated alarm system</li>
              </ul>
            </div>
            
            <div className="bg-elec-dark p-3 rounded">
              <p className="text-foreground font-semibold text-sm mb-2">Phase 3: Advanced Features (Months 13-18)</p>
              <ul className="text-xs text-gray-400 space-y-1">
                <li>• Multi-room audio system</li>
                <li>• Smart garden irrigation</li>
                <li>• Solar panel integration</li>
                <li>• Electric vehicle charging control</li>
                <li>• AI-powered automation routines</li>
              </ul>
            </div>
            
            <div className="bg-elec-dark p-3 rounded">
              <p className="text-foreground font-semibold text-sm mb-2">Challenges Encountered & Solutions</p>
              <ul className="text-xs text-gray-400 space-y-1">
                <li>• Thick walls → Z-Wave mesh network</li>
                <li>• Mixed protocols → Matter bridge implementation</li>
                <li>• User complexity → Simplified app interface</li>
                <li>• Wi-Fi coverage → Mesh router system</li>
                <li>• Energy monitoring → Smart meter integration</li>
              </ul>
            </div>
          </div>
          
          <div className="bg-green-600/20 border border-green-600/40 p-4 rounded">
            <p className="text-green-400 font-semibold text-sm mb-3">Measured Results After 12 Months:</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-foreground font-semibold text-xs mb-1">Energy Efficiency</p>
                <ul className="text-xs text-gray-300 space-y-1">
                  <li>• 32% reduction in heating costs</li>
                  <li>• 28% reduction in lighting energy</li>
                  <li>• £850 annual savings</li>
                  <li>• ROI achieved in 3.2 years</li>
                </ul>
              </div>
              <div>
                <p className="text-foreground font-semibold text-xs mb-1">Security & Convenience</p>
                <ul className="text-xs text-gray-300 space-y-1">
                  <li>• 24/7 remote monitoring</li>
                  <li>• 95% automation coverage</li>
                  <li>• 0 false alarms after tuning</li>
                  <li>• 89% user satisfaction</li>
                </ul>
              </div>
              <div>
                <p className="text-foreground font-semibold text-xs mb-1">Quality of Life</p>
                <ul className="text-xs text-gray-300 space-y-1">
                  <li>• Improved sleep quality (lighting)</li>
                  <li>• Enhanced accessibility features</li>
                  <li>• Reduced daily management time</li>
                  <li>• Increased property value</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="bg-yellow-600/20 border border-yellow-600/40 p-3 rounded mt-4">
            <p className="text-yellow-400 font-semibold text-sm mb-2">Key Lessons Learned:</p>
            <ul className="text-xs text-gray-300 space-y-1">
              <li>• Start with core systems (heating, lighting) before adding advanced features</li>
              <li>• Professional network design crucial for reliable performance</li>
              <li>• User training and simplified interfaces essential for adoption</li>
              <li>• Regular system updates and maintenance prevent security issues</li>
              <li>• Integration planning saves time and money in later phases</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};