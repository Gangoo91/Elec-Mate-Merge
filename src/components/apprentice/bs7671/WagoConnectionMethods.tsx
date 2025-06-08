
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Zap, 
  Cable, 
  Settings, 
  AlertTriangle, 
  CheckCircle, 
  Info,
  Wrench,
  Eye,
  Shield
} from "lucide-react";
import { useState } from "react";

interface WagoConnectionStep {
  id: string;
  title: string;
  description: string;
  safetyNote?: string;
  tips: string[];
}

interface WagoConnectorType {
  id: string;
  name: string;
  description: string;
  applications: string[];
  wireCapacity: string;
  advantages: string[];
  connectionSteps: WagoConnectionStep[];
}

const wagoConnectorTypes: WagoConnectorType[] = [
  {
    id: "221-series",
    name: "Wago 221 Series (Lever Nuts)",
    description: "Compact splicing connectors with operating levers for easy connection",
    applications: ["Lighting circuits", "Socket outlets", "Junction boxes", "Testing connections"],
    wireCapacity: "0.2-4mm² (24-12 AWG)",
    advantages: [
      "Tool-free connection",
      "Visual verification of connection",
      "Reusable and repositionable",
      "Compact design",
      "Excellent contact reliability"
    ],
    connectionSteps: [
      {
        id: "step1",
        title: "Strip Wire Insulation",
        description: "Strip 10-11mm of insulation from the conductor end using wire strippers",
        safetyNote: "Ensure circuit is isolated before making connections",
        tips: [
          "Use the strip gauge on the connector for accurate length",
          "Avoid nicking the conductor",
          "Ensure clean, straight cut"
        ]
      },
      {
        id: "step2", 
        title: "Open Operating Lever",
        description: "Lift the orange operating lever fully upward to open the conductor entry",
        tips: [
          "Lever should click into open position",
          "Check that conductor entry is fully open",
          "Do not force the lever"
        ]
      },
      {
        id: "step3",
        title: "Insert Conductor",
        description: "Insert the stripped conductor fully into the conductor entry until it stops",
        tips: [
          "Push conductor in firmly until it bottoms out",
          "Ensure no bare copper is visible outside the connector",
          "Conductor should be fully seated"
        ]
      },
      {
        id: "step4",
        title: "Close Operating Lever",
        description: "Push the operating lever down firmly until it clicks into the closed position",
        tips: [
          "Lever should lie flat against the connector body",
          "You should hear/feel a positive click",
          "Test connection with gentle pull on wire"
        ]
      },
      {
        id: "step5",
        title: "Verify Connection",
        description: "Perform visual inspection and gentle pull test to confirm secure connection",
        tips: [
          "Conductor should not pull out with reasonable force",
          "Orange lever should be fully closed",
          "Check for proper seating through test window if available"
        ]
      }
    ]
  },
  {
    id: "222-series",
    name: "Wago 222 Series (Push-Wire)",
    description: "Push-in connectors for permanent connections with spring clamp technology",
    applications: ["Permanent installations", "Distribution boards", "Fixed wiring", "Industrial applications"],
    wireCapacity: "0.08-2.5mm² (28-14 AWG)",
    advantages: [
      "Spring clamp technology",
      "No tools required",
      "High contact force",
      "Vibration resistant",
      "Long-term reliability"
    ],
    connectionSteps: [
      {
        id: "step1",
        title: "Prepare Conductor",
        description: "Strip 10-12mm of insulation from conductor using appropriate wire strippers",
        safetyNote: "Verify circuit isolation with approved voltage tester",
        tips: [
          "Use strip gauge marking on connector",
          "Ensure conductor is straight and undamaged",
          "Remove any oxidation from copper"
        ]
      },
      {
        id: "step2",
        title: "Insert into Connector",
        description: "Push the conductor straight into the connector opening until fully seated",
        tips: [
          "Push firmly and steadily",
          "Conductor should bottom out in the connector",
          "No bare copper should be visible"
        ]
      },
      {
        id: "step3",
        title: "Test Connection",
        description: "Perform pull test to verify the spring clamp has engaged properly",
        tips: [
          "Apply reasonable pulling force",
          "Conductor should not withdraw",
          "Check for secure mechanical connection"
        ]
      }
    ]
  },
  {
    id: "773-series",
    name: "Wago 773 Series (Push-In with Test Point)",
    description: "Push-in connectors with integrated test points for measurement access",
    applications: ["Testing circuits", "Temporary connections", "Measurement points", "Troubleshooting"],
    wireCapacity: "0.75-2.5mm² (18-14 AWG)",
    advantages: [
      "Integrated test points",
      "Easy measurement access",
      "Secure push-in connection",
      "Ideal for testing procedures",
      "Visual connection verification"
    ],
    connectionSteps: [
      {
        id: "step1",
        title: "Strip and Prepare",
        description: "Strip 12mm of insulation from conductor end",
        safetyNote: "Always verify safe isolation before connection",
        tips: [
          "Use the 12mm strip gauge",
          "Ensure clean conductor surface",
          "Check for proper wire gauge compatibility"
        ]
      },
      {
        id: "step2",
        title: "Push-In Connection",
        description: "Insert conductor into push-in opening until fully seated",
        tips: [
          "Push straight and firm",
          "Listen for seating click",
          "Ensure full insertion depth"
        ]
      },
      {
        id: "step3",
        title: "Verify and Test",
        description: "Check connection security and test electrical continuity via test point",
        tips: [
          "Use test point for measurements",
          "Verify mechanical connection with pull test",
          "Check electrical continuity with multimeter"
        ]
      }
    ]
  }
];

const WagoConnectionMethods = () => {
  const [selectedConnector, setSelectedConnector] = useState<WagoConnectorType | null>(null);
  const [activeStep, setActiveStep] = useState(0);

  const handleConnectorSelect = (connector: WagoConnectorType) => {
    setSelectedConnector(connector);
    setActiveStep(0);
  };

  const handleBackToOverview = () => {
    setSelectedConnector(null);
    setActiveStep(0);
  };

  if (selectedConnector) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-elec-yellow">{selectedConnector.name}</h2>
            <p className="text-muted-foreground">{selectedConnector.description}</p>
          </div>
          <Button variant="outline" onClick={handleBackToOverview}>
            Back to Overview
          </Button>
        </div>

        {/* Connector Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="border-blue-500/30 bg-blue-500/5">
            <CardHeader>
              <CardTitle className="text-blue-300 flex items-center gap-2">
                <Cable className="h-5 w-5" />
                Wire Capacity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-blue-100 font-mono text-lg">{selectedConnector.wireCapacity}</p>
            </CardContent>
          </Card>

          <Card className="border-green-500/30 bg-green-500/5">
            <CardHeader>
              <CardTitle className="text-green-300 flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                Applications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-1">
                {selectedConnector.applications.map((app, index) => (
                  <li key={index} className="text-green-100 text-sm flex items-center gap-2">
                    <span className="text-green-400">•</span>
                    {app}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="border-purple-500/30 bg-purple-500/5">
            <CardHeader>
              <CardTitle className="text-purple-300 flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Key Advantages
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-1">
                {selectedConnector.advantages.slice(0, 3).map((advantage, index) => (
                  <li key={index} className="text-purple-100 text-sm flex items-center gap-2">
                    <span className="text-purple-400">•</span>
                    {advantage}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Step-by-Step Connection Guide */}
        <Card className="border-elec-yellow/30 bg-elec-yellow/5">
          <CardHeader>
            <CardTitle className="text-elec-yellow flex items-center gap-2">
              <Wrench className="h-5 w-5" />
              Step-by-Step Connection Guide
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Step Navigation */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2">
                {selectedConnector.connectionSteps.map((step, index) => (
                  <Button
                    key={step.id}
                    variant={activeStep === index ? "default" : "outline"}
                    size="sm"
                    onClick={() => setActiveStep(index)}
                    className="flex-shrink-0"
                  >
                    Step {index + 1}
                  </Button>
                ))}
              </div>

              {/* Active Step Content */}
              {selectedConnector.connectionSteps[activeStep] && (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold text-elec-yellow mb-2">
                      Step {activeStep + 1}: {selectedConnector.connectionSteps[activeStep].title}
                    </h3>
                    <p className="text-muted-foreground">
                      {selectedConnector.connectionSteps[activeStep].description}
                    </p>
                  </div>

                  {selectedConnector.connectionSteps[activeStep].safetyNote && (
                    <Alert className="border-red-500/30 bg-red-500/10">
                      <AlertTriangle className="h-4 w-4 text-red-400" />
                      <AlertDescription className="text-red-100">
                        <span className="font-medium">Safety Note: </span>
                        {selectedConnector.connectionSteps[activeStep].safetyNote}
                      </AlertDescription>
                    </Alert>
                  )}

                  <Card className="border-cyan-500/30 bg-cyan-500/5">
                    <CardHeader>
                      <CardTitle className="text-cyan-300 text-sm flex items-center gap-2">
                        <Info className="h-4 w-4" />
                        Professional Tips
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {selectedConnector.connectionSteps[activeStep].tips.map((tip, index) => (
                          <li key={index} className="text-cyan-100 text-sm flex items-start gap-2">
                            <span className="text-cyan-400 mt-1">•</span>
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  {/* Navigation Buttons */}
                  <div className="flex justify-between pt-4">
                    <Button
                      variant="outline"
                      onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
                      disabled={activeStep === 0}
                    >
                      Previous Step
                    </Button>
                    <Button
                      onClick={() => setActiveStep(Math.min(selectedConnector.connectionSteps.length - 1, activeStep + 1))}
                      disabled={activeStep === selectedConnector.connectionSteps.length - 1}
                    >
                      Next Step
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/30 bg-gradient-to-r from-elec-yellow/10 to-amber-500/10">
        <CardHeader>
          <CardTitle className="text-elec-yellow flex items-center gap-2">
            <Cable className="h-5 w-5" />
            Wago Connection Methods Guide
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            Comprehensive guide to using Wago connector blocks for safe and reliable electrical connections 
            during BS7671 testing procedures. These connectors provide secure, tool-free connections ideal 
            for testing scenarios.
          </p>
          
          <Alert className="border-amber-500/30 bg-amber-500/10">
            <Info className="h-4 w-4 text-amber-400" />
            <AlertDescription className="text-amber-100">
              <span className="font-medium">Why Wago Connectors for Testing: </span>
              Wago connectors offer reliable, reusable connections that don't compromise conductor integrity, 
              making them ideal for testing where connections may need to be made and unmade multiple times.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* Connector Types Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {wagoConnectorTypes.map((connector) => (
          <Card 
            key={connector.id} 
            className="border-elec-yellow/20 bg-elec-gray hover:border-elec-yellow/40 transition-colors cursor-pointer"
            onClick={() => handleConnectorSelect(connector)}
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-white text-lg">{connector.name}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">{connector.description}</p>
                </div>
                <Badge className="bg-elec-yellow/20 text-elec-yellow">
                  {connector.wireCapacity}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium text-green-300 mb-2">Key Applications:</h4>
                <ul className="space-y-1">
                  {connector.applications.slice(0, 3).map((app, index) => (
                    <li key={index} className="text-sm text-muted-foreground flex items-center gap-2">
                      <span className="text-green-400">•</span>
                      {app}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-medium text-blue-300 mb-2">Advantages:</h4>
                <ul className="space-y-1">
                  {connector.advantages.slice(0, 2).map((advantage, index) => (
                    <li key={index} className="text-xs text-muted-foreground flex items-center gap-2">
                      <CheckCircle className="h-3 w-3 text-blue-400" />
                      {advantage}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-2">
                <Button 
                  className="w-full bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90"
                  onClick={() => handleConnectorSelect(connector)}
                >
                  View Connection Guide
                  <Eye className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* General Safety Guidelines */}
      <Card className="border-red-500/30 bg-red-500/10">
        <CardHeader>
          <CardTitle className="text-red-300 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            General Safety Guidelines for Wago Connections
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3 text-red-200">Before Making Connections</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Always verify safe isolation with approved voltage tester</li>
                <li>• Check conductor condition and compatibility</li>
                <li>• Ensure connector is suitable for the application</li>
                <li>• Verify wire gauge is within connector specifications</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-red-200">Connection Best Practices</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Strip conductors to exact length specified</li>
                <li>• Ensure full insertion and secure connection</li>
                <li>• Perform pull test to verify mechanical integrity</li>
                <li>• Label connections clearly for future reference</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WagoConnectionMethods;
