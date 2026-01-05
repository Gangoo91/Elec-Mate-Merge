import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mic, Wifi, Smartphone } from 'lucide-react';
import { VoiceRoleQuickCheck } from './VoiceRoleQuickCheck';

export const SmartHomeModule6Section2VoiceRole = () => {
  return (
    <div className="space-y-6">
      <Card className="bg-elec-gray border-elec-yellow/20">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-foreground flex items-center gap-3">
            <span className="bg-elec-yellow text-elec-dark w-8 h-8 rounded-full flex items-center justify-center text-lg font-bold">1</span>
            Role of Voice Assistants in Smart Homes
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg">
              <Mic className="h-6 w-6 text-blue-400 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-foreground mb-2">Interface, Not Hub</h4>
                <p className="text-foreground text-sm">
                  Voice assistants act as an interface, not a hub — they rely on compatible devices or hubs.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-green-900/20 border border-green-500/30 rounded-lg">
              <Wifi className="h-6 w-6 text-green-400 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-foreground mb-2">Command Translation</h4>
                <p className="text-foreground text-sm">
                  Commands like "Alexa, turn on the living room lights" are translated into actions via Wi-Fi or a hub.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-purple-900/20 border border-purple-500/30 rounded-lg">
              <Smartphone className="h-6 w-6 text-purple-400 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-foreground mb-2">User Benefits</h4>
                <p className="text-foreground text-sm">
                  They provide convenience, accessibility, and quick control without needing to find apps or switches.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <VoiceRoleQuickCheck />
    </div>
  );
};