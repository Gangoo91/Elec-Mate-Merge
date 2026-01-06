
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
    const currentStep = selectedConnector.connectionSteps[activeStep];
    const progress = ((activeStep + 1) / selectedConnector.connectionSteps.length) * 100;

    return (
      <div className="space-y-6 animate-fade-in">
        {/* Header with Back Button */}
        <Card className="bg-gradient-to-br from-white/5 to-elec-card border-orange-500/20 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <CardHeader className="relative">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="space-y-1">
                <CardTitle className="text-white flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-gradient-to-br from-orange-500/20 to-orange-500/5 border border-orange-500/30">
                    <Cable className="h-5 w-5 text-orange-400" />
                  </div>
                  {selectedConnector.name}
                </CardTitle>
                <p className="text-white/60 ml-12">{selectedConnector.description}</p>
              </div>
              <Button
                variant="outline"
                onClick={handleBackToOverview}
                className="border-white/20 text-white hover:bg-white/10 touch-manipulation h-11"
              >
                Back to Overview
              </Button>
            </div>
          </CardHeader>
          <CardContent className="relative">
            <div className="p-4 rounded-xl bg-white/10 border border-white/10">
              <div className="flex justify-between text-sm mb-3">
                <span className="text-white/60">Progress</span>
                <span className="text-orange-400 font-medium">Step {activeStep + 1} of {selectedConnector.connectionSteps.length}</span>
              </div>
              <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-orange-500 to-elec-yellow transition-all duration-500 ease-out rounded-full"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Connector Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <Card className="bg-gradient-to-br from-white/5 to-elec-card border-blue-500/20 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
            <CardHeader className="pb-3 relative">
              <CardTitle className="text-white flex items-center gap-3 text-base">
                <div className="p-2 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-500/5 border border-blue-500/30">
                  <Cable className="h-4 w-4 text-blue-400" />
                </div>
                Wire Capacity
              </CardTitle>
            </CardHeader>
            <CardContent className="relative">
              <p className="text-blue-300 font-mono text-lg">{selectedConnector.wireCapacity}</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-white/5 to-elec-card border-green-500/20 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
            <CardHeader className="pb-3 relative">
              <CardTitle className="text-white flex items-center gap-3 text-base">
                <div className="p-2 rounded-xl bg-gradient-to-br from-green-500/20 to-green-500/5 border border-green-500/30">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                </div>
                Applications
              </CardTitle>
            </CardHeader>
            <CardContent className="relative">
              <ul className="space-y-1.5">
                {selectedConnector.applications.map((app, index) => (
                  <li key={index} className="text-sm text-white/70 flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full mt-1.5 flex-shrink-0" />
                    {app}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-white/5 to-elec-card border-purple-500/20 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
            <CardHeader className="pb-3 relative">
              <CardTitle className="text-white flex items-center gap-3 text-base">
                <div className="p-2 rounded-xl bg-gradient-to-br from-purple-500/20 to-purple-500/5 border border-purple-500/30">
                  <Shield className="h-4 w-4 text-purple-400" />
                </div>
                Key Advantages
              </CardTitle>
            </CardHeader>
            <CardContent className="relative">
              <ul className="space-y-1.5">
                {selectedConnector.advantages.slice(0, 3).map((advantage, index) => (
                  <li key={index} className="text-sm text-white/70 flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-1.5 flex-shrink-0" />
                    {advantage}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Step-by-Step Connection Guide */}
        <Card className="bg-gradient-to-br from-white/5 to-elec-card border-elec-yellow/20 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-elec-yellow/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <CardHeader className="relative">
            <CardTitle className="text-white flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-gradient-to-br from-elec-yellow/20 to-elec-yellow/5 border border-elec-yellow/30">
                <Wrench className="h-5 w-5 text-elec-yellow" />
              </div>
              Step-by-Step Connection Guide
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 relative">
            {/* Step Navigation */}
            <div className="flex overflow-x-auto scrollbar-hide gap-2 pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
              {selectedConnector.connectionSteps.map((step, index) => (
                <button
                  key={step.id}
                  onClick={() => setActiveStep(index)}
                  className={`flex-shrink-0 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 touch-manipulation ${
                    activeStep === index
                      ? 'bg-elec-yellow text-black'
                      : index < activeStep
                      ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                      : 'bg-white/10 text-white/60 border border-white/10 hover:border-white/20'
                  }`}
                >
                  {index < activeStep && <CheckCircle className="h-3 w-3 inline mr-1" />}
                  Step {index + 1}
                </button>
              ))}
            </div>

            {/* Active Step Content */}
            {currentStep && (
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-white/10 border border-elec-yellow/20">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-elec-yellow to-elec-yellow/80 text-black flex items-center justify-center text-lg font-bold flex-shrink-0">
                      {activeStep + 1}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-elec-yellow mb-2">
                        {currentStep.title}
                      </h3>
                      <p className="text-white/70">
                        {currentStep.description}
                      </p>
                    </div>
                  </div>
                </div>

                {currentStep.safetyNote && (
                  <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20">
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-red-500/20 flex-shrink-0">
                        <AlertTriangle className="h-4 w-4 text-red-400" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-red-400 mb-1">Safety Note</h4>
                        <p className="text-sm text-white/70">{currentStep.safetyNote}</p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="p-2 rounded-lg bg-cyan-500/20 flex-shrink-0">
                      <Info className="h-4 w-4 text-cyan-400" />
                    </div>
                    <h4 className="font-semibold text-cyan-400">Professional Tips</h4>
                  </div>
                  <ul className="space-y-2 ml-11">
                    {currentStep.tips.map((tip, index) => (
                      <li key={index} className="text-sm text-white/70 flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-1.5 flex-shrink-0" />
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Navigation Buttons */}
                <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 pt-4 border-t border-white/10">
                  <Button
                    variant="outline"
                    onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
                    disabled={activeStep === 0}
                    className="h-11 border-white/20 text-white hover:bg-white/10 disabled:opacity-50 touch-manipulation"
                  >
                    Previous Step
                  </Button>
                  <Button
                    onClick={() => setActiveStep(Math.min(selectedConnector.connectionSteps.length - 1, activeStep + 1))}
                    disabled={activeStep === selectedConnector.connectionSteps.length - 1}
                    className="h-11 bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold touch-manipulation active:scale-95 transition-all disabled:opacity-50"
                  >
                    Next Step
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Hero Header */}
      <Card className="bg-gradient-to-br from-white/5 to-elec-card border-orange-500/20 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <CardHeader className="relative">
          <CardTitle className="text-white flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-orange-500/20 to-orange-500/5 border border-orange-500/30">
              <Cable className="h-5 w-5 text-orange-400" />
            </div>
            Wago Connection Methods Guide
          </CardTitle>
        </CardHeader>
        <CardContent className="relative space-y-4">
          <p className="text-white/70">
            Comprehensive guide to using Wago connector blocks for safe and reliable electrical connections
            during BS7671 testing procedures. These connectors provide secure, tool-free connections ideal
            for testing scenarios.
          </p>

          <div className="p-4 rounded-xl bg-elec-yellow/10 border border-elec-yellow/30">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-elec-yellow/20 flex-shrink-0">
                <Info className="h-4 w-4 text-elec-yellow" />
              </div>
              <div>
                <h4 className="font-semibold text-elec-yellow mb-1">Why Wago Connectors for Testing</h4>
                <p className="text-sm text-white/70">
                  Wago connectors offer reliable, reusable connections that don't compromise conductor integrity,
                  making them ideal for testing where connections may need to be made and unmade multiple times.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Connector Types Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {wagoConnectorTypes.map((connector) => (
          <Card
            key={connector.id}
            className="bg-gradient-to-br from-white/5 to-elec-card border-white/10 hover:border-elec-yellow/30 transition-all duration-300 cursor-pointer group overflow-hidden relative"
            onClick={() => handleConnectorSelect(connector)}
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-elec-yellow/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity" />
            <CardHeader className="relative">
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <CardTitle className="text-white text-lg leading-tight">{connector.name}</CardTitle>
                  <Badge className="bg-orange-500/10 text-orange-400 border border-orange-500/30 flex-shrink-0 text-xs">
                    {connector.wireCapacity}
                  </Badge>
                </div>
                <p className="text-sm text-white/60">{connector.description}</p>
              </div>
            </CardHeader>

            <CardContent className="space-y-4 relative">
              <div className="p-3 rounded-xl bg-green-500/10 border border-green-500/20">
                <h4 className="font-medium text-green-400 mb-2 text-sm">Key Applications</h4>
                <ul className="space-y-1.5">
                  {connector.applications.slice(0, 3).map((app, index) => (
                    <li key={index} className="text-sm text-white/70 flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-green-400 rounded-full mt-1.5 flex-shrink-0" />
                      {app}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20">
                <h4 className="font-medium text-blue-400 mb-2 text-sm">Advantages</h4>
                <ul className="space-y-1.5">
                  {connector.advantages.slice(0, 2).map((advantage, index) => (
                    <li key={index} className="text-xs text-white/70 flex items-start gap-2">
                      <CheckCircle className="h-3 w-3 text-blue-400 mt-0.5 flex-shrink-0" />
                      {advantage}
                    </li>
                  ))}
                </ul>
              </div>

              <Button
                className="w-full h-11 bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold touch-manipulation active:scale-95 transition-all"
                onClick={() => handleConnectorSelect(connector)}
              >
                View Connection Guide
                <Eye className="h-4 w-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* General Safety Guidelines */}
      <Card className="bg-gradient-to-br from-white/5 to-elec-card border-red-500/20 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <CardHeader className="relative">
          <CardTitle className="text-white flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-red-500/20 to-red-500/5 border border-red-500/30">
              <AlertTriangle className="h-5 w-5 text-red-400" />
            </div>
            General Safety Guidelines for Wago Connections
          </CardTitle>
        </CardHeader>
        <CardContent className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-white/10 border border-red-500/20">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-red-500/20">
                  <Shield className="h-4 w-4 text-red-400" />
                </div>
                <h4 className="font-semibold text-white">Before Making Connections</h4>
              </div>
              <ul className="space-y-2">
                {[
                  "Always verify safe isolation with approved voltage tester",
                  "Check conductor condition and compatibility",
                  "Ensure connector is suitable for the application",
                  "Verify wire gauge is within connector specifications"
                ].map((item, index) => (
                  <li key={index} className="text-sm text-white/70 flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-red-400 rounded-full mt-1.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-4 rounded-xl bg-white/10 border border-green-500/20">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-green-500/20">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                </div>
                <h4 className="font-semibold text-white">Connection Best Practices</h4>
              </div>
              <ul className="space-y-2">
                {[
                  "Strip conductors to exact length specified",
                  "Ensure full insertion and secure connection",
                  "Perform pull test to verify mechanical integrity",
                  "Label connections clearly for future reference"
                ].map((item, index) => (
                  <li key={index} className="text-sm text-white/70 flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full mt-1.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WagoConnectionMethods;
