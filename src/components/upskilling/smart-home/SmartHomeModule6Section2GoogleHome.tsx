import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, Calendar, Search } from 'lucide-react';
import { GoogleHomeQuickCheck } from './GoogleHomeQuickCheck';

export const SmartHomeModule6Section2GoogleHome = () => {
  return (
    <div className="space-y-6">
      <Card className="bg-elec-gray border-elec-yellow/20">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-foreground flex items-center gap-3">
            <span className="bg-elec-yellow text-elec-dark w-8 h-8 rounded-full flex items-center justify-center text-lg font-bold">3</span>
            Google Home (Google Assistant) Integration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-foreground leading-relaxed">
            Google Assistant, available through Google Home devices, leverages Google's powerful AI and deep integration with Google services to provide intelligent smart home control.
          </p>

          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg">
              <Brain className="h-6 w-6 text-blue-400 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-foreground mb-2">Advanced AI Processing</h4>
                <p className="text-foreground text-sm mb-3">
                  Google's natural language processing is more conversational than competitors, understanding context and follow-up questions better.
                </p>
                <p className="text-foreground text-sm">
                  <strong>Example:</strong> "Turn on the lights" followed by "Make them dimmer" - Google understands the context.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-green-900/20 border border-green-500/30 rounded-lg">
              <Calendar className="h-6 w-6 text-green-400 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-foreground mb-2">Google Services Integration</h4>
                <p className="text-foreground text-sm mb-3">
                  Seamlessly integrates with Google Calendar, Gmail, Maps, and especially Nest devices for comprehensive home automation.
                </p>
                <p className="text-foreground text-sm">
                  <strong>Advantage:</strong> Can provide contextual information like "adjust heating before I get home from work" using calendar data.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-orange-900/20 border border-orange-500/30 rounded-lg">
              <Search className="h-6 w-6 text-orange-400 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-foreground mb-2">Limited Third-Party Support</h4>
                <p className="text-foreground text-sm mb-3">
                  While growing, Google Home has fewer third-party integrations compared to Alexa, particularly with lesser-known brands.
                </p>
                <p className="text-foreground text-sm">
                  <strong>Consideration:</strong> Always verify device compatibility before recommending Google Home to clients.
                </p>
              </div>
            </div>
          </div>

          {/* Google Home Strengths */}
          <div className="bg-elec-dark/50 border border-gray-600/30 rounded-lg p-4">
            <h4 className="font-semibold text-elec-yellow mb-3">Why Choose Google Home:</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-foreground text-sm">Best choice for households already using Google services and Nest products</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-foreground text-sm">Superior voice recognition and conversational AI capabilities</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-foreground text-sm">Excellent integration with search and information services</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-foreground text-sm">Strong privacy controls and transparent data usage policies</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <GoogleHomeQuickCheck />
    </div>
  );
};