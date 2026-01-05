
import { Settings, Zap, AlertTriangle, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const InsulationResistanceTestingProcess = () => {
  const testSequence = [
    "Complete continuity testing first",
    "Verify circuit is safely isolated and proven dead",
    "Disconnect electronic equipment and sensitive devices", 
    "Select appropriate test voltage (typically 500V DC)",
    "Perform tests between L-N, L-E, and N-E",
    "Record actual values (not just pass/fail)",
    "Investigate any readings below minimum values"
  ];

  const commonCauses = [
    { issue: "Moisture ingress", causes: ["Condensation in accessories", "Water penetration in outdoor fittings", "Damp cable runs"] },
    { issue: "Insulation damage", causes: ["Mechanical damage during installation", "Heat degradation", "Rodent damage"] },
    { issue: "Poor workmanship", causes: ["Bare conductors too close", "Incorrect terminations", "Foreign objects in enclosures"] },
    { issue: "Equipment leakage", causes: ["Connected loads with normal leakage", "Faulty equipment", "Surge protection devices"] }
  ];

  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Settings className="h-5 w-5 text-elec-yellow" />
          Testing Process Overview
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        
        {/* Test Sequence */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Proper Test Sequence</h3>
          <div className="bg-[#323232] rounded-lg p-4">
            <div className="space-y-3">
              {testSequence.map((step, index) => (
                <div key={index} className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-elec-yellow text-elec-dark rounded-full flex items-center justify-center text-sm font-semibold mt-0.5 flex-shrink-0">
                    {index + 1}
                  </span>
                  <span className="text-foreground">{step}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Test Voltages */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground flex items-center gap-2">
            <Zap className="h-5 w-5 text-elec-yellow" />
            Test Voltage Selection
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#323232] rounded-lg p-4 border-l-4 border-green-500/50">
              <h4 className="text-foreground font-medium mb-2">Standard Circuits (≤500V)</h4>
              <p className="text-elec-yellow text-lg font-semibold mb-2">500V DC</p>
              <p className="text-foreground text-sm">Used for most domestic and commercial installations including 230V single-phase and 400V three-phase circuits.</p>
            </div>
            <div className="bg-[#323232] rounded-lg p-4 border-l-4 border-blue-500/50">
              <h4 className="text-foreground font-medium mb-2">Extra-Low Voltage</h4>
              <p className="text-elec-yellow text-lg font-semibold mb-2">250V DC</p>
              <p className="text-foreground text-sm">For SELV and PELV circuits including 12V/24V lighting and control systems.</p>
            </div>
          </div>
        </div>

        {/* Common Failure Causes */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-orange-400" />
            Common Causes of Low IR
          </h3>
          <div className="space-y-4">
            {commonCauses.map((item, index) => (
              <div key={index} className="bg-[#323232] rounded-lg p-4">
                <h4 className="text-orange-200 font-medium mb-3">{item.issue}</h4>
                <ul className="space-y-1">
                  {item.causes.map((cause, i) => (
                    <li key={i} className="text-foreground text-sm flex items-start gap-2">
                      <span className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></span>
                      {cause}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Critical Reminders */}
        <div className="bg-red-600/10 border border-red-600/20 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="text-red-200 font-medium mb-2">Critical Safety Points</h4>
              <ul className="space-y-2 text-foreground text-sm">
                <li>• Never apply test voltage to circuits with connected electronic equipment</li>
                <li>• Always verify isolation before testing—use a proving unit</li>
                <li>• Don't proceed with further testing if IR values are below minimum</li>
                <li>• Record actual values in ohms—never just "pass" or tick marks</li>
              </ul>
            </div>
          </div>
        </div>

      </CardContent>
    </Card>
  );
};
