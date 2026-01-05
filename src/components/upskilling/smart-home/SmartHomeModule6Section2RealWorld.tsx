import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Home, Lightbulb, Thermometer } from 'lucide-react';

export const SmartHomeModule6Section2RealWorld = () => {
  return (
    <Card className="bg-elec-gray border-elec-yellow/20">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-foreground flex items-center gap-3">
          <MapPin className="h-7 w-7 text-elec-yellow" />
          Real World Example
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Case Study Header */}
        <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
          <div className="flex items-center gap-3 mb-3">
            <Home className="h-6 w-6 text-blue-400" />
            <h4 className="font-semibold text-foreground">Birmingham Smart Home Integration</h4>
          </div>
          <p className="text-foreground text-sm">
            A homeowner in Birmingham wanted comprehensive voice control for their newly renovated property, including heating, lighting, and motorised blinds.
          </p>
        </div>

        {/* Challenge */}
        <div>
          <h4 className="font-semibold text-elec-yellow mb-3">The Challenge:</h4>
          <div className="space-y-3 mb-4">
            <p className="text-foreground text-sm">
              The client had mixed device brands: Hive heating system, Philips Hue lighting, and budget Zigbee motorised blinds. 
              They wanted a single voice command to activate multiple "scenes" but were overwhelmed by different apps.
            </p>
            <p className="text-foreground text-sm">
              <strong>Client requirements:</strong> "Alexa, good night" should turn off all lights, lower blinds, and set heating to eco mode.
            </p>
          </div>
        </div>

        {/* Solution Implementation */}
        <div>
          <h4 className="font-semibold text-elec-yellow mb-3">The Solution:</h4>
          
          <div className="space-y-4">
            {/* Step 1 */}
            <div className="flex items-start gap-4 p-3 bg-green-900/20 border border-green-500/30 rounded-lg">
              <span className="bg-green-400 text-green-900 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">1</span>
              <div>
                <h5 className="font-medium text-foreground mb-2">SmartThings Hub Installation</h5>
                <p className="text-foreground text-sm">
                  Installed a Samsung SmartThings hub to unify all devices under one system. The Hive system connected via the official integration, 
                  Hue lights via the Philips Hue Bridge, and Zigbee blinds directly to SmartThings.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex items-start gap-4 p-3 bg-blue-900/20 border border-blue-500/30 rounded-lg">
              <span className="bg-blue-400 text-blue-900 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">2</span>
              <div>
                <h5 className="font-medium text-foreground mb-2">Alexa Integration Setup</h5>
                <p className="text-foreground text-sm">
                  Connected SmartThings to Amazon Alexa using the SmartThings skill. All devices became visible in the Alexa app, 
                  allowing voice control of every connected component.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex items-start gap-4 p-3 bg-purple-900/20 border border-purple-500/30 rounded-lg">
              <span className="bg-purple-400 text-purple-900 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">3</span>
              <div>
                <h5 className="font-medium text-foreground mb-2">Routine Configuration</h5>
                <p className="text-foreground text-sm">
                  Created an Alexa routine triggered by "good night" that: turns off all lights (Hue), 
                  closes all blinds (Zigbee motors), and sets Hive thermostat to 18°C eco mode.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="bg-elec-dark/50 border border-gray-600/30 rounded-lg p-4">
          <h4 className="font-semibold text-elec-yellow mb-3">Results:</h4>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <Lightbulb className="h-5 w-5 text-yellow-400" />
                <span className="text-foreground text-sm font-medium">Single Voice Interface</span>
              </div>
              <p className="text-foreground text-sm ml-8">
                Client now controls everything through Alexa voice commands instead of juggling three separate apps
              </p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <Thermometer className="h-5 w-5 text-blue-400" />
                <span className="text-foreground text-sm font-medium">Energy Efficiency</span>
              </div>
              <p className="text-foreground text-sm ml-8">
                Automated routines reduced energy consumption by ensuring heating and lighting aren't left on unnecessarily
              </p>
            </div>
          </div>
        </div>

        {/* Key Takeaways */}
        <div className="bg-orange-900/20 border border-orange-500/30 rounded-lg p-4">
          <h4 className="font-semibold text-orange-400 mb-3">Key Professional Takeaways:</h4>
          <ul className="space-y-2 text-foreground text-sm">
            <li>• SmartThings hub unified different brands and protocols</li>
            <li>• Alexa routines eliminated the complexity of multiple apps</li>
            <li>• Proper device naming made voice commands intuitive</li>
            <li>• Client training session ensured confident daily use</li>
            <li>• Follow-up call resolved minor timing adjustments</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};