import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link2, Database } from 'lucide-react';

export const BMSModule7Section3ContentPart2 = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Link2 className="h-5 w-5 text-elec-yellow" />
          Device Mapping
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-6">
        <p>
          Mapping links real-world signals to their representation in the BMS software.
        </p>

        <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20 rounded-lg p-4">
          <h4 className="text-green-300 font-semibold mb-2">Example</h4>
          <p className="text-foreground">
            A CO₂ sensor wired to Analog Input 3 on a controller must be mapped in software as "Room 101 CO₂ Sensor."
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Database className="h-4 w-4 text-blue-300" />
              <h4 className="font-semibold text-blue-300">Input Mapping</h4>
            </div>
            <p className="text-foreground text-sm">
              Ensures sensor values appear correctly in dashboards and trend logs.
            </p>
          </div>

          <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Database className="h-4 w-4 text-orange-300" />
              <h4 className="font-semibold text-orange-300">Output Mapping</h4>
            </div>
            <p className="text-foreground text-sm">
              Ensures actuators (valves, dampers, pumps) respond to the right commands.
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-lg p-4">
          <h4 className="text-cyan-300 font-semibold mb-2">💡 Inline Check</h4>
          <p className="text-foreground font-medium">
            Why is device mapping critical for BMS dashboards and trend logs?
          </p>
        </div>
      </CardContent>
    </Card>
  );
};