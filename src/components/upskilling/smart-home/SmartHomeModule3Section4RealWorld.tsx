import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, AlertTriangle, Lightbulb, CheckCircle } from 'lucide-react';

export const SmartHomeModule3Section4RealWorld = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <MapPin className="h-6 w-6 text-elec-yellow" />
          Real-World Scenario
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-elec-dark p-4 rounded-lg border border-gray-600">
          <h3 className="text-foreground font-semibold mb-3 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-400" />
            The Problem
          </h3>
          <p className="text-gray-300 mb-4">
            An installer fits smart LED bulbs in a client's home but leaves the existing 
            leading-edge dimmers in place. The result: lights flicker, buzz loudly, and 
            sometimes won't dim below 30%.
          </p>
          <p className="text-gray-300">
            The client is frustrated with the poor performance and is considering returning 
            the expensive smart bulbs.
          </p>
        </div>

        <div className="bg-blue-900/20 border border-blue-600/50 p-4 rounded-lg">
          <h3 className="text-blue-300 font-semibold mb-3">💭 Think About It</h3>
          <p className="text-blue-200 text-sm">
            What went wrong in this installation, and what should the installer have done differently?
          </p>
        </div>

        <div className="space-y-4">
          <div className="bg-red-900/20 border border-red-600/50 p-4 rounded-lg">
            <h4 className="text-red-300 font-semibold mb-2 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              What Went Wrong
            </h4>
            <ul className="text-red-200 text-sm space-y-1">
              <li>• Leading-edge dimmers are incompatible with LED drivers</li>
              <li>• TRIAC control method causes interference with LED electronics</li>
              <li>• No compatibility check was performed before installation</li>
              <li>• Minimum load requirements weren't considered</li>
            </ul>
          </div>

          <div className="bg-green-900/20 border border-green-600/50 p-4 rounded-lg">
            <h4 className="text-green-300 font-semibold mb-2 flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              What Should Have Been Done
            </h4>
            <ul className="text-green-200 text-sm space-y-1">
              <li>• Replace leading-edge dimmers with trailing-edge or smart dimmers</li>
              <li>• Check manufacturer compatibility charts before installation</li>
              <li>• Test a small sample before installing all bulbs</li>
              <li>• Consider smart bulbs with built-in dimming instead</li>
              <li>• Educate client about control requirements</li>
            </ul>
          </div>

          <div className="bg-amber-900/20 border border-amber-600/50 p-4 rounded-lg">
            <h4 className="text-amber-300 font-semibold mb-2 flex items-center gap-2">
              <Lightbulb className="h-4 w-4" />
              Professional Solution
            </h4>
            <p className="text-amber-200 text-sm mb-2">
              The installer should return and:
            </p>
            <ul className="text-amber-200 text-sm space-y-1">
              <li>• Replace all leading-edge dimmers with trailing-edge versions</li>
              <li>• Test system performance thoroughly</li>
              <li>• Provide client with compatibility documentation</li>
              <li>• Offer warranty on the corrected installation</li>
            </ul>
          </div>
        </div>

        <div className="bg-elec-dark p-4 rounded-lg border border-gray-600">
          <h4 className="text-foreground font-semibold mb-2">Key Takeaway</h4>
          <p className="text-gray-300 text-sm">
            Always verify control and load compatibility before installation. A few minutes of 
            planning prevents hours of remedial work and maintains professional reputation.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};