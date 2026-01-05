import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mic, Smartphone, Volume2 } from 'lucide-react';

export const SmartHomeModule6Section2Intro = () => {
  return (
    <Card className="bg-elec-gray border-elec-yellow/20">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-foreground">Introduction</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <p className="text-foreground leading-relaxed">
          Voice assistants like Amazon Alexa, Google Home, and Apple Siri have become central to smart home control. Instead of relying on apps or switches, homeowners can issue simple voice commands to control lighting, heating, security, and appliances.
        </p>
        
        <p className="text-foreground leading-relaxed">
          For electricians, understanding how these systems integrate with hubs and devices is essential — because many clients expect "hands-free" operation as standard.
        </p>

        {/* Key Benefits Grid */}
        <div className="grid md:grid-cols-3 gap-4 mt-6">
          <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-3">
              <Mic className="h-6 w-6 text-blue-400" />
              <h4 className="font-semibold text-foreground">Voice Control</h4>
            </div>
            <p className="text-foreground text-sm">
              Hands-free operation using natural language commands for all smart home functions
            </p>
          </div>
          
          <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-3">
              <Smartphone className="h-6 w-6 text-green-400" />
              <h4 className="font-semibold text-foreground">Universal Interface</h4>
            </div>
            <p className="text-foreground text-sm">
              Single voice interface to control devices from multiple brands and protocols
            </p>
          </div>
          
          <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-3">
              <Volume2 className="h-6 w-6 text-purple-400" />
              <h4 className="font-semibold text-foreground">Accessibility</h4>
            </div>
            <p className="text-foreground text-sm">
              Improved accessibility for users with mobility limitations or visual impairments
            </p>
          </div>
        </div>

        {/* Popular Commands Examples */}
        <div className="bg-elec-dark/50 border border-gray-600/30 rounded-lg p-4">
          <h4 className="font-semibold text-elec-yellow mb-3">Common Voice Commands:</h4>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h5 className="font-medium text-foreground mb-2">Lighting Control</h5>
              <ul className="space-y-1 text-foreground text-sm">
                <li>• "Turn on the living room lights"</li>
                <li>• "Dim the bedroom lights to 50%"</li>
                <li>• "Set lights to movie mode"</li>
              </ul>
            </div>
            <div>
              <h5 className="font-medium text-foreground mb-2">Scene Activation</h5>
              <ul className="space-y-1 text-foreground text-sm">
                <li>• "Good night" (all lights off, doors locked)</li>
                <li>• "I'm leaving" (security activated, heating down)</li>
                <li>• "Movie time" (lights dimmed, blinds closed)</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};