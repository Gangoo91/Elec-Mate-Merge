import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Users, Home, Zap } from 'lucide-react';

const SmartHomeModule6Section3RealWorld = () => {
  return (
    <Card className="bg-elec-gray border-transparent">
      <CardContent className="p-6">
        <h2 className="text-2xl font-bold text-foreground mb-6">Real World Example</h2>
        
        <div className="space-y-6">
          {/* Case Study Header */}
          <div className="flex items-start gap-4">
            <MapPin className="h-6 w-6 text-elec-yellow mt-1 flex-shrink-0" />
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-2">London Flat: "Leaving Home" Routine</h3>
              <p className="text-foreground">
                In a London flat, an electrician set up a comprehensive departure routine for a busy couple. 
                This case study shows how a single routine can integrate multiple systems for efficiency and security.
              </p>
            </div>
          </div>

          {/* Client Profile */}
          <Card className="bg-elec-dark/50 border-elec-yellow/20">
            <CardContent className="p-5">
              <div className="flex items-center gap-3 mb-3">
                <Users className="h-5 w-5 text-elec-yellow" />
                <h4 className="text-lg font-semibold text-foreground">Client Profile</h4>
              </div>
              <div className="grid md:grid-cols-2 gap-4 text-sm text-foreground">
                <div>
                  <strong>Situation:</strong> Young professional couple<br/>
                  <strong>Property:</strong> 2-bedroom London flat<br/>
                  <strong>Challenge:</strong> Often forget to secure home when rushing to work
                </div>
                <div>
                  <strong>Goals:</strong> Improve security and reduce energy waste<br/>
                  <strong>Budget:</strong> Moderate - wanted smart solution without full renovation<br/>
                  <strong>Tech comfort:</strong> Basic - needed simple voice commands
                </div>
              </div>
            </CardContent>
          </Card>

          {/* The Solution */}
          <Card className="bg-elec-dark/50 border-green-500/30">
            <CardContent className="p-5">
              <div className="flex items-center gap-3 mb-4">
                <Home className="h-5 w-5 text-green-400" />
                <h4 className="text-lg font-semibold text-foreground">The "Leaving Home" Routine</h4>
              </div>
              
              <div className="mb-4">
                <p className="text-foreground mb-3">
                  <strong>Trigger Phrase:</strong> <span className="bg-blue-500/20 text-blue-300 px-2 py-1 rounded font-mono">"Hey Google, we're off"</span>
                </p>
              </div>

              <div className="grid gap-3">
                <div className="flex items-center gap-3 p-3 bg-red-500/10 border border-red-500/30 rounded">
                  <span className="text-red-300 text-sm font-mono bg-red-500/20 px-2 py-1 rounded">1</span>
                  <span className="text-foreground">All lights turned off (5 rooms)</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-blue-500/10 border border-blue-500/30 rounded">
                  <span className="text-blue-300 text-sm font-mono bg-blue-500/20 px-2 py-1 rounded">2</span>
                  <span className="text-foreground">Heating dropped to eco mode (18°C)</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-green-500/10 border border-green-500/30 rounded">
                  <span className="text-green-300 text-sm font-mono bg-green-500/20 px-2 py-1 rounded">3</span>
                  <span className="text-foreground">Smart locks engaged (front door + patio)</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-purple-500/10 border border-purple-500/30 rounded">
                  <span className="text-purple-300 text-sm font-mono bg-purple-500/20 px-2 py-1 rounded">4</span>
                  <span className="text-foreground">Security camera system activated</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Results */}
          <Card className="bg-elec-dark/50 border-amber-500/30">
            <CardContent className="p-5">
              <div className="flex items-center gap-3 mb-3">
                <Zap className="h-5 w-5 text-amber-400" />
                <h4 className="text-lg font-semibold text-foreground">Results and Benefits</h4>
              </div>
              
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div className="bg-green-500/10 border border-green-500/30 rounded p-3">
                  <h5 className="text-green-300 font-semibold mb-1">Energy Savings</h5>
                  <p className="text-foreground">Reduced monthly bills by 15% through coordinated device control</p>
                </div>
                <div className="bg-blue-500/10 border border-blue-500/30 rounded p-3">
                  <h5 className="text-blue-300 font-semibold mb-1">Security</h5>
                  <p className="text-foreground">Never forgot to lock doors or activate security again</p>
                </div>
                <div className="bg-purple-500/10 border border-purple-500/30 rounded p-3">
                  <h5 className="text-purple-300 font-semibold mb-1">Convenience</h5>
                  <p className="text-foreground">Departure time reduced from 5+ minutes to 30 seconds</p>
                </div>
              </div>

              <div className="mt-4 p-3 bg-amber-500/10 border border-amber-500/30 rounded">
                <p className="text-foreground text-sm">
                  <strong>Client Feedback:</strong> "This routine completely changed our morning stress levels. 
                  We know everything is secure and efficient with just two words. Best investment we made!"
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
};

export default SmartHomeModule6Section3RealWorld;