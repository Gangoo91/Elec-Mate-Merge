import { AlertTriangle, AlertCircle, CheckCircle, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const InterferenceOverviewSection = () => {
  const symptoms = [
    "Devices randomly go offline or become unresponsive",
    "Slow response times to commands and automations",
    "Frequent reconnection attempts by smart devices",
    "Poor video quality or dropped calls on cameras",
    "Failed firmware updates or over-the-air updates"
  ];

  const primaryCauses = [
    "Multiple devices using the same frequency band",
    "Overlapping wireless channels from neighbouring networks",
    "Physical obstructions like walls and metal objects",
    "Electromagnetic interference from household appliances"
  ];

  const commonSources = [
    "Microwave ovens (2.4 GHz interference)",
    "Baby monitors and cordless phones",
    "Bluetooth headsets and speakers",
    "Neighbouring Wi-Fi networks",
    "Fluorescent lights and LED drivers"
  ];

  const whenNoticed = [
    "During peak usage times (evenings)",
    "When running complex automation scenes",
    "During device firmware updates",
    "In homes with many connected devices",
    "Near kitchen appliances or office equipment"
  ];

  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-elec-yellow" />
          What is Wireless Interference?
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 text-foreground">
        <p className="text-foreground">
          Wireless interference occurs when multiple devices or signals compete for the same frequency space, causing degraded performance or complete communication failure. Understanding interference is crucial for designing reliable smart home systems.
        </p>

        <div className="grid md:grid-cols-2 gap-6 h-fit">
          <div className="space-y-6 flex flex-col">
            <div className="bg-red-600/10 border border-red-600/20 rounded-lg p-4 flex-1">
              <h4 className="text-red-400 font-semibold mb-3 flex items-center gap-2">
                <AlertCircle className="h-4 w-4" />
                Symptoms
              </h4>
              <ul className="space-y-2">
                {symptoms.map((symptom, index) => (
                  <li key={index} className="text-sm text-foreground flex items-start gap-2">
                    <div className="w-1 h-1 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>{symptom}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-blue-600/10 border border-blue-600/20 rounded-lg p-4 flex-1">
              <h4 className="text-blue-400 font-semibold mb-3 flex items-center gap-2">
                <Zap className="h-4 w-4" />
                Common Sources
              </h4>
              <ul className="space-y-2">
                {commonSources.map((source, index) => (
                  <li key={index} className="text-sm text-foreground flex items-start gap-2">
                    <div className="w-1 h-1 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>{source}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="space-y-6 flex flex-col">
            <div className="bg-yellow-600/10 border border-yellow-600/20 rounded-lg p-4 flex-1">
              <h4 className="text-yellow-400 font-semibold mb-3 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                Primary Causes
              </h4>
              <ul className="space-y-2">
                {primaryCauses.map((cause, index) => (
                  <li key={index} className="text-sm text-foreground flex items-start gap-2">
                    <div className="w-1 h-1 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>{cause}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-green-600/10 border border-green-600/20 rounded-lg p-4 flex-1">
              <h4 className="text-green-400 font-semibold mb-3 flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                When You'll Notice It
              </h4>
              <ul className="space-y-2">
                {whenNoticed.map((when, index) => (
                  <li key={index} className="text-sm text-foreground flex items-start gap-2">
                    <div className="w-1 h-1 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>{when}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-elec-dark border border-gray-600 rounded-lg p-4">
          <h4 className="text-foreground font-semibold mb-2">Quick Check:</h4>
          <p className="text-sm text-foreground">Why might smart home devices work fine during the day but struggle in the evening?</p>
        </div>
      </CardContent>
    </Card>
  );
};