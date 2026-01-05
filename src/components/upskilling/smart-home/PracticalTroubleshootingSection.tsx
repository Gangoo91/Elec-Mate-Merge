import { Wrench, CheckCircle, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const PracticalTroubleshootingSection = () => {
  const diagnosticSteps = [
    "Use Wi-Fi analyser app to scan all networks in your area",
    "Check device signal strength (RSSI) readings",
    "Test connection during peak interference times",
    "Monitor for packet loss and connection drops",
    "Document which devices fail and when"
  ];

  const commonScenarios = [
    {
      title: "Smart doorbell keeps disconnecting",
      symptoms: "Video cuts out, notifications delayed, device shows offline",
      solution: "Move to 5GHz Wi-Fi, check power supply, relocate router or add extender"
    },
    {
      title: "Zigbee lights respond slowly",
      symptoms: "2-3 second delays, some commands ignored, worse in evenings",
      solution: "Change Zigbee channel (try 15, 20, 25), move hub away from router"
    },
    {
      title: "Whole network sluggish at peak times",
      symptoms: "All devices slow 6-9pm, streaming stutters, automation fails",
      solution: "Upgrade router, use QoS prioritisation, separate IoT network"
    }
  ];

  const quickFixes = [
    "Reboot router and hubs - fixes 60% of temporary issues",
    "Check for firmware updates - often improves compatibility",
    "Factory reset problem devices - clears corrupted settings",
    "Change Wi-Fi channel to 1, 6, or 11 - avoids overlap",
    "Move metal objects away from wireless devices"
  ];

  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Wrench className="h-5 w-5 text-elec-yellow" />
          Practical Troubleshooting Guide
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 text-foreground">
        <p className="text-foreground">
          Real-world interference problems need systematic diagnosis. Here's how to identify and fix issues step-by-step.
        </p>

        <div className="bg-blue-600/10 border border-blue-600/20 rounded-lg p-4">
          <h4 className="text-blue-400 font-semibold mb-3 flex items-center gap-2">
            <CheckCircle className="h-4 w-4" />
            Diagnostic Process
          </h4>
          <ol className="space-y-2">
            {diagnosticSteps.map((step, index) => (
              <li key={index} className="text-sm text-foreground flex items-start gap-3">
                <span className="bg-blue-400 text-blue-900 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                  {index + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="space-y-4">
          <h4 className="text-foreground font-semibold">Common Problem Scenarios</h4>
          {commonScenarios.map((scenario, index) => (
            <div key={index} className="bg-orange-600/10 border border-orange-600/20 rounded-lg p-4">
              <h5 className="text-orange-400 font-medium mb-2">{scenario.title}</h5>
              <p className="text-sm text-foreground mb-2">
                <span className="font-medium">Symptoms:</span> {scenario.symptoms}
              </p>
              <p className="text-sm text-foreground">
                <span className="font-medium text-green-400">Solution:</span> {scenario.solution}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-green-600/10 border border-green-600/20 rounded-lg p-4">
          <h4 className="text-green-400 font-semibold mb-3">Quick Win Solutions</h4>
          <ul className="space-y-2">
            {quickFixes.map((fix, index) => (
              <li key={index} className="text-sm text-foreground flex items-start gap-3">
                <div className="w-1 h-1 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>{fix}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-elec-dark border border-gray-600 rounded-lg p-4">
          <h4 className="text-foreground font-semibold mb-2 flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-yellow-400" />
            Practice Activity:
          </h4>
          <p className="text-sm text-foreground">
            You're called to a home where smart lights work fine during the day but fail most evenings. 
            The Zigbee hub is on channel 11, and you notice strong Wi-Fi networks on channels 6 and 11. 
            What's your diagnosis and solution?
          </p>
        </div>
      </CardContent>
    </Card>
  );
};