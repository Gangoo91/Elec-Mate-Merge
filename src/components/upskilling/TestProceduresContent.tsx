import { BookOpen, Settings, CheckCircle, AlertTriangle, Table, FileText, Zap, Calculator, Eye } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const TestProceduresContent = () => {
  const setupSteps = [
    "Isolate the circuit and verify it's dead using a proving unit",
    "Disconnect both ends of the circuit where needed (e.g. for ring circuits)",
    "Use a low-resistance ohmmeter (part of an MFT or standalone)",
    "Null your test leads before testing to remove lead resistance",
    "Ensure test leads are in good condition with proper connections"
  ];

  const testProcedures = [
    {
      type: "Circuit Protective Conductors (CPCs)",
      procedure: "Test from DB earth terminal to furthest point on the circuit",
      expected: "Measure and record actual resistance (aim for values typically under 1 ohm)",
      notes: "For radial circuits, measure from main earth terminal to each outlet. For ring circuits, measure end-to-end resistance first."
    },
    {
      type: "Main Equipotential Bonding",
      procedure: "Test between main earthing terminal and bonding clamp (e.g. gas, water pipe)",
      expected: "Should show very low resistance (typically < 0.05Ω)",
      notes: "Use 25A DC test current where possible. Check bonding conductor is continuous throughout its length."
    },
    {
      type: "Supplementary Bonding",
      procedure: "Test between simultaneously accessible exposed/extraneous conductive parts",
      expected: "Resistance should not exceed 50V/Ia (where Ia is RCD rating)",
      notes: "Required in special locations like bathrooms. May not be needed if main bonding and RCD protection present."
    },
    {
      type: "Ring Final Circuits",
      procedure: "Perform 3-part continuity test as covered in Module 4.3",
      expected: "Record end-to-end readings and cross-check socket readings for balance",
      notes: "Line and neutral end-to-end values should be similar. CPC end-to-end should be higher due to smaller CSA."
    }
  ];

  const expectedValues = [
    { conductor: "CPC (Radial) - 1.5mm²", resistance: "< 12.1 mΩ/m", notes: "Based on conductor resistance at 20°C" },
    { conductor: "CPC (Radial) - 2.5mm²", resistance: "< 7.41 mΩ/m", notes: "Common for lighting circuits" },
    { conductor: "CPC (Ring) - 1.5mm²", resistance: "2 x radial value ÷ 4", notes: "Parallel path effect reduces total resistance" },
    { conductor: "Main Bonding - 10mm²", resistance: "< 1.83 mΩ/m", notes: "Very low resistance expected" },
    { conductor: "Supplementary Bonding", resistance: "< 50V/Ia", notes: "Where Ia is operating current of protective device" }
  ];

  const equipmentSettings = [
    {
      parameter: "Test Current",
      setting: "200mA minimum (DC preferred)",
      reason: "Sufficient to overcome contact resistance but not excessive"
    },
    {
      parameter: "Resolution",
      setting: "0.01Ω or better",
      reason: "Adequate precision for continuity measurements"
    },
    {
      parameter: "Lead Nulling",
      setting: "Always perform before testing",
      reason: "Removes lead resistance from measurements"
    },
    {
      parameter: "Test Leads",
      setting: "Heavy duty, low resistance",
      reason: "Minimise measurement errors and ensure good contact"
    }
  ];

  const interpretationGuidance = [
    {
      scenario: "Reading higher than expected",
      possibleCauses: ["Loose connections", "High resistance joints", "Damaged conductor", "Incorrect routing"],
      action: "Investigate and rectify before proceeding"
    },
    {
      scenario: "Reading significantly lower than expected",
      possibleCauses: ["Parallel paths", "Incorrect test setup", "Short circuit condition"],
      action: "Re-check test configuration and wiring"
    },
    {
      scenario: "Inconsistent readings",
      possibleCauses: ["Poor test lead connections", "Intermittent faults", "Contact resistance"],
      action: "Clean contacts and repeat test"
    },
    {
      scenario: "No continuity (OL or very high)",
      possibleCauses: ["Open circuit", "Disconnected conductor", "Severe damage"],
      action: "Locate and repair fault before energising"
    }
  ];

  const calculationExamples = [
    {
      title: "20m Radial Circuit with 2.5mm² CPC",
      calculation: "20m × 7.41mΩ/m = 148.2mΩ (0.148Ω)",
      note: "This would be an acceptable reading for this circuit length"
    },
    {
      title: "Ring Circuit CPC - 30m total length",
      calculation: "Ring resistance = (30m × 12.1mΩ/m) ÷ 4 = 90.75mΩ",
      note: "Division by 4 accounts for parallel paths in ring configuration"
    }
  ];

  const troubleshootingSteps = [
    "Re-check test lead connections and ensure good contact",
    "Confirm lead resistance has been nulled out",
    "Verify circuit isolation and disconnection points",
    "Check for parallel paths or unintended connections",
    "Investigate for loose terminations, damaged cables, or incorrect routing",
    "Consider environmental factors (temperature, moisture)",
    "Do not proceed to insulation resistance if continuity fails"
  ];

  const safetyReminders = [
    "Always prove the circuit is dead before starting",
    "Use a proving unit to check your voltage indicator",
    "Ensure proper isolation including removal of links where necessary",
    "Never assume continuity is good based on visual inspection alone",
    "Be aware that some electronic equipment may be damaged by continuity testing"
  ];

  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <BookOpen className="h-5 w-5 text-elec-yellow" />
          Core Content
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        
        {/* Setting Up for Testing */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground flex items-center gap-2">
            <Settings className="h-5 w-5 text-elec-yellow" />
            Setting Up for Continuity Testing
          </h3>
          <div className="bg-[#323232] rounded-lg p-4">
            <div className="space-y-3">
              {setupSteps.map((step, index) => (
                <div key={index} className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-elec-yellow text-elec-dark rounded-full flex items-center justify-center text-sm font-semibold mt-0.5 flex-shrink-0">
                    {index + 1}
                  </span>
                  <span className="text-foreground">{step}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-blue-600/10 border border-blue-600/20 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Settings className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
              <p className="text-foreground text-sm">
                <strong>Critical:</strong> Nulling your test leads is essential. Without this, 
                the resistance of the test leads themselves (typically 0.5-1.0Ω) will be included 
                in your readings, giving false high results that could mask real problems.
              </p>
            </div>
          </div>
        </div>

        {/* Equipment Settings */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground flex items-center gap-2">
            <Settings className="h-5 w-5 text-elec-yellow" />
            Equipment Settings & Requirements
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {equipmentSettings.map((setting, index) => (
              <div key={index} className="bg-[#323232] rounded-lg p-4 border-l-4 border-blue-500/50">
                <h4 className="text-foreground font-medium mb-2">{setting.parameter}</h4>
                <p className="text-elec-yellow text-sm mb-2"><strong>{setting.setting}</strong></p>
                <p className="text-foreground text-sm">{setting.reason}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Test Procedures */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-elec-yellow" />
            Detailed Test Procedures
          </h3>
          <div className="space-y-4">
            {testProcedures.map((test, index) => (
              <div key={index} className="bg-[#323232] rounded-lg p-4 border-l-4 border-elec-yellow/50">
                <h4 className="text-foreground font-medium mb-2">{test.type}</h4>
                <div className="space-y-2">
                  <p className="text-foreground text-sm"><strong>Procedure:</strong> {test.procedure}</p>
                  <p className="text-foreground text-sm"><strong>Expected:</strong> {test.expected}</p>
                  <p className="text-blue-300 text-sm"><strong>Notes:</strong> {test.notes}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Expected Values Table */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground flex items-center gap-2">
            <Table className="h-5 w-5 text-elec-yellow" />
            Expected Values & Calculations
          </h3>
          <div className="bg-[#323232] rounded-lg p-4">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-600">
                    <th className="text-left text-elec-yellow font-medium py-2">Conductor Type</th>
                    <th className="text-left text-elec-yellow font-medium py-2">Typical Resistance</th>
                    <th className="text-left text-elec-yellow font-medium py-2">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {expectedValues.map((value, index) => (
                    <tr key={index} className="border-b border-gray-700">
                      <td className="text-foreground py-2">{value.conductor}</td>
                      <td className="text-foreground py-2">{value.resistance}</td>
                      <td className="text-foreground py-2">{value.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          {/* Calculation Examples */}
          <div className="bg-green-600/10 border border-green-600/20 rounded-lg p-4">
            <h4 className="text-green-200 font-medium mb-3 flex items-center gap-2">
              <Calculator className="h-4 w-4" />
              Calculation Examples
            </h4>
            <div className="space-y-3">
              {calculationExamples.map((example, index) => (
                <div key={index} className="bg-[#2a2a2a] p-3 rounded">
                  <p className="text-foreground font-medium text-sm mb-1">{example.title}</p>
                  <p className="text-elec-yellow text-sm mb-1">{example.calculation}</p>
                  <p className="text-foreground text-xs">{example.note}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Reading Interpretation */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground flex items-center gap-2">
            <Eye className="h-5 w-5 text-elec-yellow" />
            Interpreting Your Readings
          </h3>
          <div className="space-y-4">
            {interpretationGuidance.map((guide, index) => (
              <div key={index} className="bg-[#323232] rounded-lg p-4">
                <h4 className="text-foreground font-medium mb-2">{guide.scenario}</h4>
                <div className="space-y-2">
                  <div>
                    <p className="text-orange-300 text-sm font-medium mb-1">Possible Causes:</p>
                    <ul className="text-foreground text-sm ml-4">
                      {guide.possibleCauses.map((cause, i) => (
                        <li key={i}>• {cause}</li>
                      ))}
                    </ul>
                  </div>
                  <p className="text-green-300 text-sm"><strong>Action:</strong> {guide.action}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recording Results */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground flex items-center gap-2">
            <FileText className="h-5 w-5 text-elec-yellow" />
            Recording Results
          </h3>
          <div className="bg-[#323232] rounded-lg p-4 space-y-3">
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-foreground">
                <FileText className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                <span><strong>Always log actual values in ohms (Ω)</strong>—not just "pass", "tick", or "satisfactory"</span>
              </li>
              <li className="flex items-start gap-3 text-foreground">
                <FileText className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                <span>For <strong>EIC or MEIWC</strong>, enter readings into Schedule of Test Results</span>
              </li>
              <li className="flex items-start gap-3 text-foreground">
                <FileText className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                <span>On an <strong>EICR</strong>, record values and identify any failures with appropriate codes (C1–C3/FI)</span>
              </li>
              <li className="flex items-start gap-3 text-foreground">
                <FileText className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                <span><strong>Include test conditions:</strong> ambient temperature, test current used, equipment details</span>
              </li>
            </ul>
          </div>
          <div className="bg-red-600/10 border border-red-600/20 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
              <p className="text-foreground text-sm">
                <strong>Warning:</strong> Simply writing "pass", using tick marks, or "satisfactory" 
                is not acceptable and fails to meet BS7671 requirements. Actual resistance values 
                in ohms are mandatory for proper assessment and future comparison.
              </p>
            </div>
          </div>
        </div>

        {/* Troubleshooting */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground flex items-center gap-2">
            <Zap className="h-5 w-5 text-elec-yellow" />
            Troubleshooting Unexpected Results
          </h3>
          <div className="bg-[#323232] rounded-lg p-4">
            <div className="space-y-3">
              {troubleshootingSteps.map((step, index) => (
                <div key={index} className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-elec-yellow text-elec-dark rounded-full flex items-center justify-center text-sm font-semibold mt-0.5 flex-shrink-0">
                    {index + 1}
                  </span>
                  <span className="text-foreground">{step}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-orange-600/10 border border-orange-600/20 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-orange-400 mt-0.5 flex-shrink-0" />
              <p className="text-foreground text-sm">
                <strong>Important:</strong> If continuity tests fail or show unexpected results, 
                do not proceed with further testing until the issue is resolved. The installation 
                may not be safe to energise and could pose serious risks.
              </p>
            </div>
          </div>
        </div>

        {/* Safety Reminders */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-400" />
            Safety Reminders
          </h3>
          <div className="bg-red-600/10 border border-red-600/20 rounded-lg p-4">
            <div className="space-y-3">
              {safetyReminders.map((reminder, index) => (
                <div key={index} className="flex items-start gap-3">
                  <AlertTriangle className="h-4 w-4 text-red-400 mt-1 flex-shrink-0" />
                  <span className="text-foreground text-sm">{reminder}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </CardContent>
    </Card>
  );
};
