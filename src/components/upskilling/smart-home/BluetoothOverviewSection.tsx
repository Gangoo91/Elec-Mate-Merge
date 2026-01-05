import { Bluetooth, Battery, Signal, Lock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const BluetoothOverviewSection = () => {
  const bluetoothTypes = [
    {
      type: "Classic Bluetooth",
      range: "10m (30ft)",
      power: "Higher consumption",
      uses: ["Audio devices", "File transfers", "Keyboards/mice"],
      color: "blue"
    },
    {
      type: "Bluetooth Low Energy (BLE)",
      range: "10-100m",
      power: "Ultra-low consumption",
      uses: ["Smart locks", "Fitness trackers", "Beacons", "Sensors"],
      color: "green"
    }
  ];

  const commonUses = [
    { device: "Smart door locks", reason: "Secure proximity unlocking via smartphone" },
    { device: "Fitness trackers", reason: "Low power consumption for continuous monitoring" },
    { device: "Asset trackers", reason: "Location services with minimal battery drain" },
    { device: "Proximity sensors", reason: "Detect presence without complex setup" },
    { device: "Setup/pairing", reason: "Easy device configuration and onboarding" }
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue': return 'bg-blue-600/10 border-blue-600/20 text-blue-400';
      case 'green': return 'bg-green-600/10 border-green-600/20 text-green-400';
      default: return 'bg-gray-600/10 border-gray-600/20 text-gray-400';
    }
  };

  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Bluetooth className="h-5 w-5 text-elec-yellow" />
          2. Bluetooth and Bluetooth Low Energy (BLE)
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 text-foreground">
        <p>
          Bluetooth technology has evolved significantly for smart home applications. While classic Bluetooth handles high-data tasks, Bluetooth Low Energy (BLE) has revolutionised battery-powered devices by dramatically reducing power consumption while maintaining reliable connectivity.
        </p>

        <div className="space-y-4">
          <h4 className="text-foreground font-semibold">Bluetooth Variants</h4>
          <div className="grid md:grid-cols-2 gap-4">
            {bluetoothTypes.map((bt, index) => (
              <div key={index} className={`border rounded-lg p-4 ${getColorClasses(bt.color)}`}>
                <h5 className="font-semibold mb-3">{bt.type}</h5>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Signal className="h-3 w-3" />
                    <span>Range: {bt.range}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Battery className="h-3 w-3" />
                    <span>Power: {bt.power}</span>
                  </div>
                  <div className="mt-3">
                    <p className="font-medium mb-1">Common uses:</p>
                    <ul className="space-y-1">
                      {bt.uses.map((use, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-current rounded-full mt-2 flex-shrink-0"></div>
                          <span>{use}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-foreground font-semibold">Smart Home Applications</h4>
          <div className="space-y-3">
            {commonUses.map((use, index) => (
              <div key={index} className="bg-elec-dark border border-gray-600 rounded-lg p-3">
                <div className="flex items-start gap-3">
                  <Lock className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <div>
                    <h5 className="text-foreground font-medium">{use.device}</h5>
                    <p className="text-sm text-foreground">{use.reason}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-orange-600/10 border border-orange-600/20 rounded-lg p-4">
          <h4 className="text-orange-400 font-semibold mb-2">Key Limitations</h4>
          <ul className="space-y-1 text-sm text-foreground">
            <li>• Limited range compared to mesh protocols</li>
            <li>• Usually requires hub/bridge for whole-home automation</li>
            <li>• Point-to-point connections don't scale well</li>
            <li>• Smartphone dependency for many applications</li>
          </ul>
        </div>

        <div className="bg-elec-dark border border-gray-600 rounded-lg p-4">
          <h4 className="text-foreground font-semibold mb-2">Quick Check:</h4>
          <p className="text-sm text-foreground">What's the main difference between standard Bluetooth and BLE in smart home applications?</p>
        </div>
      </CardContent>
    </Card>
  );
};