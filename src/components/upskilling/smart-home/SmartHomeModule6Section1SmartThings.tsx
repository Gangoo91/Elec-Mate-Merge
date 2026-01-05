import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Smartphone, CheckCircle2, XCircle, Users } from 'lucide-react';
import { SmartThingsQuickCheck } from './SmartThingsQuickCheck';

export const SmartHomeModule6Section1SmartThings = () => {
  return (
    <div className="space-y-6">
      <Card className="bg-elec-gray border-elec-yellow/20">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-foreground flex items-center gap-3">
            <span className="bg-elec-yellow text-elec-dark w-8 h-8 rounded-full flex items-center justify-center text-lg font-bold">3</span>
            SmartThings (Commercial Hub)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-start gap-4 p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg">
            <Smartphone className="h-6 w-6 text-blue-400 flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-semibold text-foreground mb-2">Samsung SmartThings</h4>
              <p className="text-foreground text-sm">
                Samsung SmartThings is a popular mainstream hub designed for easy setup and broad compatibility.
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
              <li>• <strong>Easy to set up</strong> - simple plug-and-play installation</li>
              <li>• <strong>User-friendly app</strong> - intuitive mobile interface</li>
              <li>• <strong>Multi-protocol support</strong> - Zigbee, Z-Wave, and Wi-Fi devices</li>
              <li>• <strong>Reliable performance</strong> - stable Samsung backing</li>
              <li>• <strong>Good device compatibility</strong> - works with many brands</li>
            </ul>
          </div>

          {/* Cons Section */}
          <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <XCircle className="h-5 w-5 text-red-400" />
              <h4 className="font-semibold text-foreground">Disadvantages</h4>
            </div>
            <ul className="space-y-2 text-foreground text-sm">
              <li>• <strong>Cloud dependency</strong> - requires internet for most features</li>
              <li>• <strong>Limited customisation</strong> - compared to open-source solutions</li>
              <li>• <strong>Samsung ecosystem bias</strong> - favours Samsung devices</li>
              <li>• <strong>Privacy concerns</strong> - data stored on Samsung servers</li>
            </ul>
          </div>

          {/* Best Use Cases */}
          <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <Users className="h-5 w-5 text-purple-400" />
              <h4 className="font-semibold text-foreground">Best Suited For</h4>
            </div>
            <ul className="space-y-2 text-foreground text-sm">
              <li>• Homeowners who want simple, reliable automation</li>
              <li>• Clients new to smart home technology</li>
              <li>• Mid-size installations with mixed device brands</li>
              <li>• Users who prefer app-based control over technical configuration</li>
              <li>• Installations where cloud connectivity is acceptable</li>
            </ul>
          </div>

          <div className="bg-elec-dark/50 border border-gray-600/30 rounded-lg p-4">
            <h4 className="font-semibold text-elec-yellow mb-2">Key Features:</h4>
            <ul className="space-y-1 text-foreground text-sm">
              <li>• SmartThings app for iOS and Android</li>
              <li>• Built-in Zigbee 3.0 and Z-Wave Plus support</li>
              <li>• Works with Alexa, Google Assistant, and Bixby</li>
              <li>• Routine automation and scene creation</li>
              <li>• Remote monitoring and control capabilities</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <SmartThingsQuickCheck />
    </div>
  );
};