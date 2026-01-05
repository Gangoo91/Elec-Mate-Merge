import { Target, Wrench, Settings } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const PracticalImplementationSection = () => {
  const hubSetupSteps = [
    "Position hub centrally, away from Wi-Fi router (min 3 feet)",
    "Connect to ethernet for reliability (Wi-Fi as backup only)",
    "Install mobile app and create user account",
    "Update firmware to latest version before adding devices",
    "Configure basic automation rules for testing"
  ];

  const hublessSetupSteps = [
    "Ensure strong Wi-Fi coverage throughout installation area",
    "Create dedicated IoT network (optional but recommended)",
    "Install manufacturer apps for each device type",
    "Test internet connectivity and cloud service access",
    "Document device MAC addresses for network management"
  ];

  const realWorldScenarios = [
    {
      title: "Victorian Terrace - Hub Retrofit Challenge",
      situation: "Thick walls, no ethernet runs, mixed device ecosystem",
      hubSolution: "Zigbee hub with repeaters, powerline ethernet to hub location",
      hublessSolution: "Wi-Fi 6 mesh system, 2.4GHz-only smart devices",
      recommendation: "Hub-based for reliability despite installation complexity"
    },
    {
      title: "New Build Smart Home",
      situation: "Pre-wired ethernet, central equipment room, high-end finish",
      hubSolution: "Professional hub with PoE, structured cabling for sensors",
      hublessSolution: "Enterprise Wi-Fi with VLAN segmentation",
      recommendation: "Hub-based for scalability and future-proofing"
    },
    {
      title: "Rental Apartment",
      situation: "No permanent modifications allowed, budget constraints",
      hubSolution: "Portable hub with wireless sensors, easily removable",
      hublessSolution: "Wi-Fi devices only, cloud-based automation",
      recommendation: "Hubless for simplicity and reversibility"
    }
  ];

  const migrationStrategy = [
    "Audit existing devices and their protocols",
    "Identify which devices can migrate to hub-based protocols",
    "Plan migration in phases (lighting first, then sensors, finally integration)",
    "Maintain backup automation during transition",
    "Test thoroughly before decommissioning old setup"
  ];

  const troubleshootingMatrix = [
    {
      problem: "Devices dropping offline randomly",
      hubCause: "Weak mesh, power issues, interference",
      hublessCause: "Wi-Fi congestion, router overload, cloud connectivity",
      solution: "Add repeaters / Change channels, upgrade router"
    },
    {
      problem: "Slow response to commands",
      hubCause: "Network congestion, hub overload",
      hublessCause: "Internet latency, cloud processing delays",
      solution: "Optimize mesh topology / Local processing alternatives"
    },
    {
      problem: "Automation not executing",
      hubCause: "Logic errors, device status issues",
      hublessCause: "Internet outage, cloud service problems",
      solution: "Check device health / Add local backup rules"
    }
  ];

  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Wrench className="h-5 w-5 text-elec-yellow" />
          Practical Implementation Guide
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 text-foreground">
        <p className="text-foreground">
          Real-world implementation requires careful planning and execution. Here's how to successfully deploy both architectures.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-blue-600/10 border border-blue-600/20 rounded-lg p-4">
            <h4 className="text-blue-400 font-semibold mb-3 flex items-center gap-2">
              <Target className="h-4 w-4" />
              Hub-Based Setup Process
            </h4>
            <ol className="space-y-2">
              {hubSetupSteps.map((step, index) => (
                <li key={index} className="text-sm text-foreground flex items-start gap-3">
                  <span className="bg-blue-400 text-blue-900 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                    {index + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="bg-green-600/10 border border-green-600/20 rounded-lg p-4">
            <h4 className="text-green-400 font-semibold mb-3 flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Hubless Setup Process
            </h4>
            <ol className="space-y-2">
              {hublessSetupSteps.map((step, index) => (
                <li key={index} className="text-sm text-foreground flex items-start gap-3">
                  <span className="bg-green-400 text-green-900 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                    {index + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-foreground font-semibold">Real-World Implementation Scenarios</h4>
          {realWorldScenarios.map((scenario, index) => (
            <div key={index} className="bg-orange-600/10 border border-orange-600/20 rounded-lg p-4">
              <h5 className="text-orange-400 font-medium mb-2">{scenario.title}</h5>
              <p className="text-sm text-foreground mb-2">
                <span className="font-medium">Situation:</span> {scenario.situation}
              </p>
              <div className="grid sm:grid-cols-2 gap-2 text-sm">
                <p className="text-foreground">
                  <span className="font-medium text-blue-400">Hub Option:</span> {scenario.hubSolution}
                </p>
                <p className="text-foreground">
                  <span className="font-medium text-green-400">Hubless Option:</span> {scenario.hublessSolution}
                </p>
              </div>
              <p className="text-sm text-yellow-400 mt-2">
                <span className="font-medium">Recommendation:</span> {scenario.recommendation}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-purple-600/10 border border-purple-600/20 rounded-lg p-4">
          <h4 className="text-purple-400 font-semibold mb-3">Migration Strategy: Hubless to Hub-Based</h4>
          <ol className="space-y-2">
            {migrationStrategy.map((step, index) => (
              <li key={index} className="text-sm text-foreground flex items-start gap-3">
                <span className="bg-purple-400 text-purple-900 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                  {index + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="bg-red-600/10 border border-red-600/20 rounded-lg p-4">
          <h4 className="text-red-400 font-semibold mb-3">Troubleshooting Matrix</h4>
          <div className="space-y-3">
            {troubleshootingMatrix.map((item, index) => (
              <div key={index} className="bg-elec-dark border border-gray-600 rounded p-3">
                <div className="font-medium text-foreground mb-2">{item.problem}</div>
                <div className="grid sm:grid-cols-2 gap-2 text-sm mb-2">
                  <div>
                    <span className="font-medium text-blue-400">Hub Causes:</span>
                    <span className="text-foreground ml-1">{item.hubCause}</span>
                  </div>
                  <div>
                    <span className="font-medium text-green-400">Hubless Causes:</span>
                    <span className="text-foreground ml-1">{item.hublessCause}</span>
                  </div>
                </div>
                <div className="text-sm">
                  <span className="font-medium text-yellow-400">Solutions:</span>
                  <span className="text-foreground ml-1">{item.solution}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-elec-dark border border-gray-600 rounded-lg p-4">
          <h4 className="text-foreground font-semibold mb-2">Implementation Challenge:</h4>
          <p className="text-sm text-foreground">
            A family of 4 wants smart lighting in 12 rooms, 6 door sensors, automated heating, and security cameras. 
            They have a £2000 budget and want the system to work during internet outages. Design your solution.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};