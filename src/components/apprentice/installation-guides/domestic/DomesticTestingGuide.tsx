
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TestTube, FileCheck, AlertCircle } from "lucide-react";

const DomesticTestingGuide = () => {
  const testSequence = [
    {
      test: "Continuity of Protective Conductors",
      purpose: "Verify earth continuity throughout installation",
      method: "R1 + R2 test using low resistance ohmmeter",
      acceptableLimits: "R1 + R2 ≤ maximum values in BS 7671 tables",
      equipment: "Low resistance ohmmeter, test leads"
    },
    {
      test: "Continuity of Ring Final Circuits",
      purpose: "Confirm ring circuit integrity",
      method: "End-to-end and cross-connection tests",
      acceptableLimits: "Readings should be consistent around ring",
      equipment: "Low resistance ohmmeter, test leads"
    },
    {
      test: "Insulation Resistance",
      purpose: "Verify cable insulation integrity",
      method: "500V DC test between conductors and earth",
      acceptableLimits: "≥1MΩ for circuits ≤500V, ≥0.5MΩ for SELV",
      equipment: "Insulation resistance tester"
    },
    {
      test: "Polarity",
      purpose: "Confirm correct conductor connections",
      method: "Visual inspection and continuity testing",
      acceptableLimits: "Line connected to switches, correct socket wiring",
      equipment: "Continuity tester, socket tester"
    },
    {
      test: "Earth Fault Loop Impedance",
      purpose: "Verify earth fault protection effectiveness",
      method: "Zs measurement at furthest point of circuit",
      acceptableLimits: "Zs ≤ maximum values for protective device type",
      equipment: "Earth fault loop impedance tester"
    },
    {
      test: "RCD Operation",
      purpose: "Confirm RCD protection functions correctly",
      method: "Test at rated sensitivity and time",
      acceptableLimits: "Trip at 0.5×IΔn to 1×IΔn, time ≤300ms at 1×IΔn",
      equipment: "RCD tester"
    }
  ];

  const certificationRequirements = [
    {
      certificate: "Electrical Installation Certificate (EIC)",
      when: "New installations and additions",
      whoSigns: "Designer, Constructor, Inspector & Tester",
      contents: ["Installation details", "Test results", "Observations", "Limitations"]
    },
    {
      certificate: "Minor Electrical Installation Works Certificate",
      when: "Small additions and alterations",
      whoSigns: "Person carrying out work",
      contents: ["Work description", "Test results", "Declaration of compliance"]
    }
  ];

  return (
    <div className="space-y-6">
      <Card className="border-green-500/30 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center gap-2">
            <TestTube className="h-6 w-6 text-green-400" />
            <CardTitle className="text-green-300">Testing Sequence</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {testSequence.map((test, index) => (
            <div key={index} className="bg-green-500/10 p-4 rounded-lg border border-green-500/20">
              <div className="flex items-center gap-2 mb-3">
                <Badge variant="outline" className="border-green-400 text-green-300 text-xs">
                  Test {index + 1}
                </Badge>
                <h4 className="font-medium text-white text-sm">{test.test}</h4>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div>
                  <h5 className="font-medium text-green-200 mb-1">Purpose</h5>
                  <p className="text-muted-foreground mb-2">{test.purpose}</p>
                  
                  <h5 className="font-medium text-green-200 mb-1">Method</h5>
                  <p className="text-muted-foreground">{test.method}</p>
                </div>
                <div>
                  <h5 className="font-medium text-green-200 mb-1">Acceptable Limits</h5>
                  <p className="text-muted-foreground mb-2">{test.acceptableLimits}</p>
                  
                  <h5 className="font-medium text-green-200 mb-1">Equipment Required</h5>
                  <p className="text-muted-foreground">{test.equipment}</p>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="border-purple-500/30 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center gap-2">
            <FileCheck className="h-6 w-6 text-purple-400" />
            <CardTitle className="text-purple-300">Certification Requirements</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {certificationRequirements.map((cert, index) => (
            <div key={index} className="bg-purple-500/10 p-4 rounded-lg border border-purple-500/20">
              <h4 className="font-medium text-white mb-2">{cert.certificate}</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                <div>
                  <h5 className="font-medium text-purple-200 mb-1">When Required</h5>
                  <p className="text-muted-foreground">{cert.when}</p>
                </div>
                <div>
                  <h5 className="font-medium text-purple-200 mb-1">Who Signs</h5>
                  <p className="text-muted-foreground">{cert.whoSigns}</p>
                </div>
                <div>
                  <h5 className="font-medium text-purple-200 mb-1">Contents</h5>
                  <ul className="space-y-1">
                    {cert.contents.map((item, idx) => (
                      <li key={idx} className="text-muted-foreground flex items-center gap-1">
                        <span className="w-1 h-1 bg-purple-400 rounded-full"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="border-red-500/30 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center gap-2">
            <AlertCircle className="h-6 w-6 text-red-400" />
            <CardTitle className="text-red-300">Common Testing Issues</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="bg-red-500/10 p-3 rounded-lg border border-red-500/20">
            <h4 className="font-medium text-red-200 mb-1 text-sm">High Earth Fault Loop Impedance</h4>
            <p className="text-xs text-muted-foreground">Check earth conductor continuity, TN-S system earth electrode, and protective device suitability.</p>
          </div>
          <div className="bg-red-500/10 p-3 rounded-lg border border-red-500/20">
            <h4 className="font-medium text-red-200 mb-1 text-sm">RCD Nuisance Tripping</h4>
            <p className="text-xs text-muted-foreground">Often caused by high background leakage current from multiple appliances or damaged cables.</p>
          </div>
          <div className="bg-red-500/10 p-3 rounded-lg border border-red-500/20">
            <h4 className="font-medium text-red-200 mb-1 text-sm">Low Insulation Resistance</h4>
            <p className="text-xs text-muted-foreground">May indicate damaged cable insulation, moisture ingress, or connected appliances affecting readings.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DomesticTestingGuide;
