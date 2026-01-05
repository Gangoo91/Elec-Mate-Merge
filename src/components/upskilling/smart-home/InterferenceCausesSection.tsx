import { AlertCircle, XCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const InterferenceCausesSection = () => {
  const commonMistakes = [
    "Placing router and Zigbee hub right next to each other",
    "Using overlapping Wi-Fi channels with neighbours",
    "Installing devices behind metal cabinets or appliances",
    "Ignoring microwave oven placement near 2.4GHz devices",
    "Running too many devices on a single Wi-Fi channel"
  ];

  const physicalFactors = [
    "Thick walls and concrete structures",
    "Metal objects and appliances",
    "Large water features or aquariums",
    "Electrical panels and circuit breakers",
    "Cordless phone base stations"
  ];

  const environmentalFactors = [
    "Neighbouring Wi-Fi networks on same channels",
    "Baby monitors and wireless cameras",
    "Bluetooth devices during active use",
    "LED lights with poor drivers",
    "Kitchen appliances (microwaves, induction hobs)"
  ];

  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <AlertCircle className="h-5 w-5 text-elec-yellow" />
          Common Causes of Interference
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 text-foreground">
        <p className="text-foreground">
          Interference in smart homes typically stems from poor planning, physical obstructions, and environmental factors. Identifying these causes is the first step to building reliable wireless networks.
        </p>

        <div className="space-y-6">
          <div className="bg-red-600/10 border border-red-600/20 rounded-lg p-4">
            <h4 className="text-red-400 font-semibold mb-3 flex items-center gap-2">
              <XCircle className="h-4 w-4" />
              Installation Mistakes
            </h4>
            <ul className="space-y-2">
              {commonMistakes.map((mistake, index) => (
                <li key={index} className="text-sm text-foreground flex items-start gap-2">
                  <div className="w-1 h-1 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>{mistake}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-orange-600/10 border border-orange-600/20 rounded-lg p-4">
              <h4 className="text-orange-400 font-semibold mb-3">Physical Obstructions</h4>
              <ul className="space-y-2">
                {physicalFactors.map((factor, index) => (
                  <li key={index} className="text-sm text-foreground flex items-start gap-2">
                    <div className="w-1 h-1 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>{factor}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-purple-600/10 border border-purple-600/20 rounded-lg p-4">
              <h4 className="text-purple-400 font-semibold mb-3">Environmental Interference</h4>
              <ul className="space-y-2">
                {environmentalFactors.map((factor, index) => (
                  <li key={index} className="text-sm text-foreground flex items-start gap-2">
                    <div className="w-1 h-1 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>{factor}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-yellow-600/10 border border-yellow-600/20 rounded-lg p-4">
          <h4 className="text-yellow-400 font-semibold mb-3">The 2.4 GHz Problem</h4>
          <p className="text-sm text-foreground mb-2">
            The 2.4 GHz band is particularly crowded because it's used by:
          </p>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-foreground">
            <div>
              <p className="font-medium mb-1">Smart Home:</p>
              <ul className="space-y-1">
                <li>• Wi-Fi networks</li>
                <li>• Zigbee devices</li>
                <li>• Some Bluetooth devices</li>
              </ul>
            </div>
            <div>
              <p className="font-medium mb-1">Household Items:</p>
              <ul className="space-y-1">
                <li>• Microwave ovens</li>
                <li>• Baby monitors</li>
                <li>• Cordless phones</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-elec-dark border border-gray-600 rounded-lg p-4">
          <h4 className="text-foreground font-semibold mb-2">Quick Check:</h4>
          <p className="text-sm text-foreground">What's the most common mistake installers make when setting up Wi-Fi and Zigbee networks?</p>
        </div>
      </CardContent>
    </Card>
  );
};