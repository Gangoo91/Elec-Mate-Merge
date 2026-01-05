import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, AlertCircle, Hash, Tag } from 'lucide-react';

export const BMSModule7Section1ContentPart1 = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <FileText className="h-5 w-5 text-elec-yellow" />
          IO Lists
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-6">
        <div>
          <h4 className="text-elec-yellow font-semibold mb-3">What is an IO List?</h4>
          <p className="text-foreground mb-4">
            An IO list is the master document that records every input and output the BMS must manage. It serves as 
            the foundation for system design, procurement, installation, and commissioning. Without a complete and 
            accurate IO list, projects inevitably encounter delays and cost overruns.
          </p>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
              <h5 className="text-blue-400 font-semibold mb-2 flex items-center gap-2">
                <Hash className="h-4 w-4" />
                Digital Inputs
              </h5>
              <ul className="space-y-2 text-sm">
                <li>• <strong>Flow switches:</strong> Water/air flow detection</li>
                <li>• <strong>Fire alarm signals:</strong> Interface with fire panel</li>
                <li>• <strong>Door contacts:</strong> Plant room security monitoring</li>
                <li>• <strong>Status feedback:</strong> Pump/fan run confirmation</li>
                <li>• <strong>Alarms:</strong> High/low pressure switches</li>
              </ul>
            </div>
            
            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
              <h5 className="text-green-400 font-semibold mb-2">Analog Inputs</h5>
              <ul className="space-y-2 text-sm">
                <li>• <strong>Temperature sensors:</strong> 0–10V or 4–20mA signals</li>
                <li>• <strong>Pressure sensors:</strong> Duct and pipe monitoring</li>
                <li>• <strong>CO₂ sensors:</strong> Indoor air quality measurement</li>
                <li>• <strong>Humidity sensors:</strong> RH% monitoring</li>
                <li>• <strong>Energy meters:</strong> kWh consumption tracking</li>
              </ul>
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-elec-yellow font-semibold mb-3">Output Types</h4>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4">
              <h5 className="text-orange-400 font-semibold mb-2">Digital Outputs</h5>
              <ul className="space-y-2 text-sm">
                <li>• <strong>Relays:</strong> Switching pumps, fans, valves</li>
                <li>• <strong>Solenoids:</strong> On/off valve control</li>
                <li>• <strong>Dampers:</strong> Open/close actuator control</li>
                <li>• <strong>Alarms:</strong> Beacon lights, sounders</li>
                <li>• <strong>Interlocks:</strong> Safety system integration</li>
              </ul>
            </div>
            
            <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
              <h5 className="text-purple-400 font-semibold mb-2">Analog Outputs</h5>
              <ul className="space-y-2 text-sm">
                <li>• <strong>Modulating valves:</strong> 0–10V or 4–20mA control</li>
                <li>• <strong>VSDs:</strong> Variable speed drive signals</li>
                <li>• <strong>Dampers:</strong> Positioning control signals</li>
                <li>• <strong>Lighting:</strong> 0–10V dimming control</li>
                <li>• <strong>Setpoints:</strong> Room controller references</li>
              </ul>
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-elec-yellow font-semibold mb-3">IO List Components</h4>
          <p className="text-foreground mb-4">
            Each point in the IO list should be described with complete information to avoid confusion during installation and commissioning:
          </p>
          
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-lg p-4">
              <h5 className="text-yellow-400 font-semibold mb-2 flex items-center gap-2">
                <Tag className="h-4 w-4" />
                Essential Information
              </h5>
              <ul className="space-y-2 text-sm">
                <li>• <strong>Tag number:</strong> Unique identifier (e.g., AHU-01-T01)</li>
                <li>• <strong>Device/equipment name:</strong> Clear description</li>
                <li>• <strong>Signal type:</strong> Digital/analog, input/output</li>
                <li>• <strong>Engineering units:</strong> °C, ppm, bar, kW, etc.</li>
                <li>• <strong>Alarm/status information:</strong> Critical limits</li>
              </ul>
            </div>
            
            <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20 rounded-lg p-4">
              <h5 className="text-green-400 font-semibold mb-2">Additional Details</h5>
              <ul className="space-y-2 text-sm">
                <li>• <strong>Location:</strong> Plant room, floor, zone reference</li>
                <li>• <strong>Priority:</strong> Critical, normal, or advisory</li>
                <li>• <strong>Cable type:</strong> Screened, fire-rated requirements</li>
                <li>• <strong>Power requirements:</strong> 24V AC/DC, 230V AC</li>
                <li>• <strong>Interface notes:</strong> Special wiring considerations</li>
              </ul>
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-elec-yellow font-semibold mb-3">Sample IO List Extract</h4>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-gray-600">
                  <th className="text-left py-2 px-3 text-elec-yellow">Tag</th>
                  <th className="text-left py-2 px-3 text-elec-yellow">Description</th>
                  <th className="text-left py-2 px-3 text-elec-yellow">Type</th>
                  <th className="text-left py-2 px-3 text-elec-yellow">Units</th>
                  <th className="text-left py-2 px-3 text-elec-yellow">Alarms</th>
                </tr>
              </thead>
              <tbody className="text-foreground">
                <tr className="border-b border-gray-700">
                  <td className="py-2 px-3">AHU-01-T01</td>
                  <td className="py-2 px-3">Supply Air Temperature</td>
                  <td className="py-2 px-3">AI 4-20mA</td>
                  <td className="py-2 px-3">°C</td>
                  <td className="py-2 px-3">&lt;5°C, &gt;40°C</td>
                </tr>
                <tr className="border-b border-gray-700">
                  <td className="py-2 px-3">AHU-01-SF01</td>
                  <td className="py-2 px-3">Supply Fan Status</td>
                  <td className="py-2 px-3">DI</td>
                  <td className="py-2 px-3">On/Off</td>
                  <td className="py-2 px-3">Fault if off when should be on</td>
                </tr>
                <tr className="border-b border-gray-700">
                  <td className="py-2 px-3">AHU-01-DMP01</td>
                  <td className="py-2 px-3">Outside Air Damper</td>
                  <td className="py-2 px-3">AO 0-10V</td>
                  <td className="py-2 px-3">%</td>
                  <td className="py-2 px-3">Position feedback</td>
                </tr>
                <tr>
                  <td className="py-2 px-3">AHU-01-CO2-01</td>
                  <td className="py-2 px-3">Return Air CO₂</td>
                  <td className="py-2 px-3">AI 0-10V</td>
                  <td className="py-2 px-3">ppm</td>
                  <td className="py-2 px-3">&gt;1000ppm</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="text-foreground font-semibold mb-2">Inline Check</h4>
              <p className="text-sm text-foreground mb-2">
                👉 Why is an IO list critical before installation begins?
              </p>
              <p className="text-xs text-foreground">
                <strong>Answer:</strong> The IO list ensures all required signals are identified, prevents missing devices, 
                guides cable routing and panel design, supports procurement decisions, and provides the foundation for 
                commissioning documentation. Without it, costly site changes and delays are inevitable.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};