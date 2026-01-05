import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, CheckCircle2 } from 'lucide-react';

export const BMSModule4Section5Summary = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-elec-yellow" />
          Section Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-6">
        <p className="text-lg">
          Integrated HVAC and lighting control represents the pinnacle of building energy efficiency, delivering substantial savings while maintaining optimal occupant comfort.
        </p>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-semibold mb-2 text-green-300">Maximum Energy Savings</h4>
                <p className="text-sm text-foreground">
                  Come from integrating HVAC and lighting controls, typically achieving 20-40% reduction in building energy consumption compared to independent system operation.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-semibold mb-2 text-blue-300">Proven Control Strategies</h4>
                <p className="text-sm text-foreground">
                  Include occupancy-based control, daylight-linked HVAC optimisation, after-hours lockout, and demand-based load sharing for peak management.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-purple-400 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-semibold mb-2 text-purple-300">Electrician's Critical Role</h4>
                <p className="text-sm text-foreground">
                  Involves strategic wiring, clear labelling, and comprehensive testing of devices so both systems can respond together effectively and reliably.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-orange-400 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-semibold mb-2 text-orange-300">Successful Implementation</h4>
                <p className="text-sm text-foreground">
                  Requires proper planning, thorough commissioning, and comprehensive client training to ensure integration works smoothly in real-world conditions.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-elec-yellow/20 to-yellow-600/10 border border-elec-yellow/40 rounded-lg p-4">
          <h4 className="font-semibold mb-2 text-elec-yellow">Industry Impact</h4>
          <p className="text-sm text-foreground">
            As building regulations become increasingly stringent and energy costs continue to rise, integrated HVAC and lighting control will become standard practice. Electricians who master these integration techniques will be essential to the transition towards net-zero buildings and sustainable construction practices.
          </p>
        </div>

        <div className="bg-blue-600/20 border border-blue-600/40 rounded-lg p-4">
          <h4 className="font-semibold mb-2 text-blue-300">Next Steps</h4>
          <p className="text-sm text-foreground">
            The next section will explore advanced BMS features including predictive maintenance, artificial intelligence integration, and future technologies that will further enhance building performance and energy efficiency.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};