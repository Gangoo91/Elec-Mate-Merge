import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb, Zap, Battery, Shuffle } from 'lucide-react';

export const TypesOfLoadsSection = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Zap className="h-6 w-6 text-elec-yellow" />
          Types of Loads
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <p className="text-foreground">
          Understanding the electrical characteristics of different lighting loads is fundamental to proper control selection.
        </p>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="bg-elec-dark p-4 rounded-lg border border-gray-600">
            <div className="flex items-center gap-2 mb-3">
              <Lightbulb className="h-5 w-5 text-elec-yellow" />
              <h4 className="text-foreground font-semibold">Resistive Loads</h4>
            </div>
            <ul className="text-gray-300 text-sm space-y-1">
              <li>• Incandescent and halogen lamps</li>
              <li>• Stable, linear characteristics</li>
              <li>• Easy to dim with most controls</li>
              <li>• Pure resistive behaviour</li>
            </ul>
          </div>

          <div className="bg-elec-dark p-4 rounded-lg border border-gray-600">
            <div className="flex items-center gap-2 mb-3">
              <Zap className="h-5 w-5 text-elec-yellow" />
              <h4 className="text-foreground font-semibold">Inductive Loads</h4>
            </div>
            <ul className="text-gray-300 text-sm space-y-1">
              <li>• Magnetic ballasts</li>
              <li>• Some transformers</li>
              <li>• Lagging power factor</li>
              <li>• More challenging to dim</li>
            </ul>
          </div>

          <div className="bg-elec-dark p-4 rounded-lg border border-gray-600">
            <div className="flex items-center gap-2 mb-3">
              <Battery className="h-5 w-5 text-elec-yellow" />
              <h4 className="text-foreground font-semibold">Capacitive Loads</h4>
            </div>
            <ul className="text-gray-300 text-sm space-y-1">
              <li>• LED drivers</li>
              <li>• Electronic transformers</li>
              <li>• Leading power factor</li>
              <li>• Sensitive to control method</li>
            </ul>
          </div>

          <div className="bg-elec-dark p-4 rounded-lg border border-gray-600">
            <div className="flex items-center gap-2 mb-3">
              <Shuffle className="h-5 w-5 text-elec-yellow" />
              <h4 className="text-foreground font-semibold">Mixed Loads</h4>
            </div>
            <ul className="text-gray-300 text-sm space-y-1">
              <li>• Combination circuits</li>
              <li>• Common in modern homes</li>
              <li>• Requires careful consideration</li>
              <li>• May need load balancing</li>
            </ul>
          </div>
        </div>

        <div className="bg-amber-900/20 border border-amber-600/50 p-4 rounded-lg">
          <p className="text-amber-200 text-sm">
            <strong>Key Point:</strong> Each load type has different electrical characteristics that affect 
            how they respond to dimming and control methods. Mismatching can cause poor performance or damage.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};