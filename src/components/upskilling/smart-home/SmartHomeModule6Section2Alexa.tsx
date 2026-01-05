import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageCircle, Zap, CloudOff } from 'lucide-react';
import { AlexaQuickCheck } from './AlexaQuickCheck';

export const SmartHomeModule6Section2Alexa = () => {
  return (
    <div className="space-y-6">
      <Card className="bg-elec-gray border-elec-yellow/20">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-foreground flex items-center gap-3">
            <span className="bg-elec-yellow text-elec-dark w-8 h-8 rounded-full flex items-center justify-center text-lg font-bold">2</span>
            Amazon Alexa Integration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-foreground leading-relaxed">
            Amazon Alexa has become one of the most widely adopted voice assistants for smart home control, offering extensive device compatibility and third-party integrations.
          </p>

          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg">
              <MessageCircle className="h-6 w-6 text-blue-400 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-foreground mb-2">Skills System</h4>
                <p className="text-foreground text-sm mb-3">
                  Alexa "Skills" are like apps that extend functionality beyond basic device control. They enable features like security alerts, energy monitoring, and custom automations.
                </p>
                <p className="text-foreground text-sm">
                  <strong>Example:</strong> The Samsung SmartThings skill allows Alexa to control any device connected to a SmartThings hub.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-green-900/20 border border-green-500/30 rounded-lg">
              <Zap className="h-6 w-6 text-green-400 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-foreground mb-2">Wide Compatibility</h4>
                <p className="text-foreground text-sm mb-3">
                  Works with thousands of devices across different brands including Philips Hue, TP-Link Kasa, Ring, Nest, and many more.
                </p>
                <p className="text-foreground text-sm">
                  <strong>Advantage:</strong> Low entry cost and regular feature updates make it accessible to most homeowners.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-red-900/20 border border-red-500/30 rounded-lg">
              <CloudOff className="h-6 w-6 text-red-400 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-foreground mb-2">Cloud Dependency</h4>
                <p className="text-foreground text-sm mb-3">
                  Alexa relies heavily on cloud services for processing commands and connecting to devices.
                </p>
                <p className="text-foreground text-sm">
                  <strong>Limitation:</strong> Internet outages can significantly impact functionality, and some clients may have privacy concerns about cloud data processing.
                </p>
              </div>
            </div>
          </div>

          {/* Popular Alexa Commands */}
          <div className="bg-elec-dark/50 border border-gray-600/30 rounded-lg p-4">
            <h4 className="font-semibold text-elec-yellow mb-3">Popular Alexa Commands:</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h5 className="font-medium text-foreground mb-2">Basic Control</h5>
                <ul className="space-y-1 text-foreground text-sm">
                  <li>• "Alexa, turn on the kitchen lights"</li>
                  <li>• "Alexa, set thermostat to 21 degrees"</li>
                  <li>• "Alexa, lock the front door"</li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium text-foreground mb-2">Advanced Features</h5>
                <ul className="space-y-1 text-foreground text-sm">
                  <li>• "Alexa, turn on movie mode"</li>
                  <li>• "Alexa, good morning" (routine)</li>
                  <li>• "Alexa, is my security system armed?"</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <AlexaQuickCheck />
    </div>
  );
};