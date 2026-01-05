import { Shield, Home, Zap, TestTube, Calendar, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const Amendment3Content = () => {
  const bidirectionalRequirements = [
    {
      scenario: "Solar PV Systems with Battery Storage",
      requirement: "Bidirectional protection mandatory",
      reason: "Energy flows in both directions depending on generation and consumption",
      device: "MCCBs or MCBs with bidirectional capability"
    },
    {
      scenario: "Electric Vehicle Charging with V2G",
      requirement: "Enhanced grid interaction protection",
      reason: "Vehicle-to-grid technology creates reverse current flows",
      device: "Specialist EV protective devices with anti-islanding"
    },
    {
      scenario: "Domestic Solar Installations",
      requirement: "Consumer unit upgrades may be required",
      reason: "Standard MCBs may not provide adequate reverse current protection",
      device: "Type 2 coordination with bidirectional devices"
    },
    {
      scenario: "Commercial Renewable Systems",
      requirement: "Comprehensive grid interaction study",
      reason: "Large-scale generation affects local grid stability",
      device: "G98/G99 compliant protection schemes"
    }
  ];

  const consumerUnitRequirements = [
    "RCD protection must remain effective under reverse current conditions",
    "Main switch ratings must accommodate bidirectional current flows",
    "Overcurrent devices must provide protection in both directions",
    "Neutral isolation must be maintained during grid disconnection",
    "Arc fault protection may be required for PV DC circuits"
  ];

  const testingProcedures = [
    {
      test: "Bidirectional Continuity",
      method: "Verify protective device operation in both current directions",
      acceptance: "Operation within manufacturer's specifications for both polarities"
    },
    {
      test: "Anti-Islanding Function",
      method: "Simulate grid disconnection during reverse power flow",
      acceptance: "System isolation within 5 seconds of grid loss detection"
    },
    {
      test: "RCD Operation Under Reverse Current",
      method: "Test RCD tripping with current flowing from installation to grid",
      acceptance: "Trip time and sensitivity within BS 7671 limits regardless of current direction"
    },
    {
      test: "Grid Interaction Compliance",
      method: "Verify compliance with G98/G99 grid codes",
      acceptance: "All protection settings and response times within grid code limits"
    }
  ];

  return (
    <div className="space-y-6">
      <Card className="bg-elec-gray border-transparent">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Shield className="h-5 w-5 text-elec-yellow" />
            Bidirectional Protection Requirements
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-300 mb-4">
            Amendment 3 mandates bidirectional protection where electrical installations can generate power that flows back into the supply system.
          </p>
          <div className="space-y-4">
            {bidirectionalRequirements.map((req, index) => (
              <div key={index} className="border border-gray-600/30 rounded-lg p-4">
                <div className="flex items-start gap-3 mb-3">
                  <Zap className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <h3 className="text-foreground font-semibold text-lg">{req.scenario}</h3>
                    <p className="text-elec-yellow text-sm font-medium mb-2">{req.requirement}</p>
                    <p className="text-gray-300 text-sm mb-2">{req.reason}</p>
                    <p className="text-blue-400 text-sm"><strong>Solution:</strong> {req.device}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-elec-gray border-transparent">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Home className="h-5 w-5 text-elec-yellow" />
            Enhanced Consumer Unit Requirements
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-300 mb-4">
            Consumer units in installations with renewable energy sources must meet enhanced requirements to ensure safety under bidirectional current conditions.
          </p>
          <div className="bg-[#323232] rounded-lg p-4">
            <h3 className="text-foreground font-semibold mb-3">Key Requirements</h3>
            <ul className="space-y-2">
              {consumerUnitRequirements.map((requirement, index) => (
                <li key={index} className="text-gray-300 text-sm flex items-start gap-2">
                  <span className="text-elec-yellow mt-1">•</span>
                  {requirement}
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-elec-gray border-transparent">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <TestTube className="h-5 w-5 text-elec-yellow" />
            Testing and Commissioning Procedures
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-300 mb-4">
            Amendment 3 introduces specific testing requirements to verify bidirectional protection effectiveness and grid interaction safety.
          </p>
          <div className="space-y-4">
            {testingProcedures.map((test, index) => (
              <div key={index} className="border border-gray-600/30 rounded-lg p-4">
                <h3 className="text-foreground font-semibold mb-2">{test.test}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-400 text-sm font-medium mb-1">Test Method:</p>
                    <p className="text-gray-300 text-sm">{test.method}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm font-medium mb-1">Acceptance Criteria:</p>
                    <p className="text-gray-300 text-sm">{test.acceptance}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-elec-gray border-transparent">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Calendar className="h-5 w-5 text-elec-yellow" />
            Implementation and Compliance Timeline
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-green-600/10 border border-green-600/20 rounded-lg p-4">
              <h3 className="text-green-200 font-medium mb-3">From 31st July 2024</h3>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>• All new installations must comply with Amendment 3</li>
                <li>• New renewable energy systems require bidirectional protection</li>
                <li>• Consumer unit replacements must meet enhanced requirements</li>
                <li>• Testing procedures must include bidirectional verification</li>
              </ul>
            </div>
            
            <div className="bg-yellow-600/10 border border-yellow-600/20 rounded-lg p-4">
              <h3 className="text-yellow-200 font-medium mb-3">Existing Installations</h3>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>• No immediate requirement to upgrade existing compliant installations</li>
                <li>• Major alterations must consider Amendment 3 requirements</li>
                <li>• Addition of renewable energy triggers upgrade requirements</li>
                <li>• EICR assessments should reference Amendment 3 compliance</li>
              </ul>
            </div>
          </div>
          
          <div className="bg-red-600/10 border border-red-600/20 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="text-red-200 font-medium mb-2">Non-Compliance Risks</h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Failure to implement Amendment 3 requirements can result in dangerous back-feed conditions, 
                  equipment damage, fire risks, and potential liability issues. Insurance coverage may be 
                  affected for non-compliant installations.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};