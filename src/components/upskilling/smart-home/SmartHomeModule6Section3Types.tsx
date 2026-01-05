import { Card, CardContent } from '@/components/ui/card';
import { Mic, Calendar, Settings } from 'lucide-react';
import RoutineTypesQuickCheck from '@/components/upskilling/smart-home/RoutineTypesQuickCheck';

const SmartHomeModule6Section3Types = () => {
  return (
    <section className="space-y-6">
      <Card className="bg-elec-gray border-transparent">
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold text-foreground mb-6">3. Types of Routines</h2>
          
          <div className="space-y-6">
            <div className="grid gap-6">
              {/* Single Command Routines */}
              <Card className="bg-elec-dark/50 border-elec-yellow/20">
                <CardContent className="p-5">
                  <div className="flex items-center gap-3 mb-4">
                    <Mic className="h-6 w-6 text-elec-yellow" />
                    <h3 className="text-xl font-semibold text-foreground">Single Command Routines</h3>
                  </div>
                  <p className="text-foreground mb-3">Triggered by one phrase, can control multiple devices.</p>
                  <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3">
                    <p className="text-foreground text-sm">
                      <strong>Example:</strong> "Alexa, bedtime" → Turn off lights, lock doors, set alarm, adjust thermostat
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Event-Based Routines */}
              <Card className="bg-elec-dark/50 border-elec-yellow/20">
                <CardContent className="p-5">
                  <div className="flex items-center gap-3 mb-4">
                    <Calendar className="h-6 w-6 text-elec-yellow" />
                    <h3 className="text-xl font-semibold text-foreground">Event-Based Routines</h3>
                  </div>
                  <p className="text-foreground mb-3">Triggered by sensors, schedules, or geofencing automatically.</p>
                  <div className="grid md:grid-cols-2 gap-3">
                    <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
                      <p className="text-foreground text-sm">
                        <strong>Geofencing:</strong> Lights on when arriving home
                      </p>
                    </div>
                    <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-3">
                      <p className="text-foreground text-sm">
                        <strong>Schedule:</strong> Coffee maker starts at 7am weekdays
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Conditional Routines */}
              <Card className="bg-elec-dark/50 border-elec-yellow/20">
                <CardContent className="p-5">
                  <div className="flex items-center gap-3 mb-4">
                    <Settings className="h-6 w-6 text-elec-yellow" />
                    <h3 className="text-xl font-semibold text-foreground">Conditional Routines</h3>
                  </div>
                  <p className="text-foreground mb-3">More advanced logic with multiple conditions.</p>
                  <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-3">
                    <p className="text-foreground text-sm">
                      <strong>Example:</strong> "Only turn heating on if temperature &lt; 18°C AND it's after 6pm AND someone is home"
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="bg-elec-dark/30 p-4 rounded-lg border border-elec-yellow/20">
              <h4 className="text-lg font-semibold text-elec-yellow mb-3">Routine Complexity Levels</h4>
              <div className="grid md:grid-cols-3 gap-3 text-sm">
                <div className="text-foreground">
                  <strong className="text-green-400">Basic:</strong> Single trigger, simple actions
                </div>
                <div className="text-foreground">
                  <strong className="text-amber-400">Intermediate:</strong> Multiple conditions, timed delays
                </div>
                <div className="text-foreground">
                  <strong className="text-red-400">Advanced:</strong> Complex logic, multiple integrations
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <RoutineTypesQuickCheck />
    </section>
  );
};

export default SmartHomeModule6Section3Types;