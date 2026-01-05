import { Activity, Camera, Thermometer, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const BandwidthSmartHomesSection = () => {
  const highBandwidth = [
    "Security cameras (1-10 Mbps each)",
    "Video doorbells with live streaming",
    "Smart speakers with music streaming",
    "Smart TVs and media devices",
    "High-resolution touchscreen panels"
  ];

  const lowBandwidth = [
    "Temperature and humidity sensors",
    "Door/window contact sensors",
    "Motion detectors and PIR sensors",
    "Smart switches and dimmers",
    "Smart thermostats and HVAC controls"
  ];

  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Activity className="h-5 w-5 text-elec-yellow" />
          Bandwidth in Smart Homes
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 text-foreground">
        <p className="text-foreground">
          Not all smart home devices are created equal when it comes to bandwidth requirements. Understanding these differences is crucial for network planning and protocol selection.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-blue-600/10 border border-blue-600/20 rounded-lg p-4">
            <h4 className="text-blue-400 font-semibold mb-3 flex items-center gap-2">
              <Camera className="h-4 w-4" />
              High Bandwidth Devices
            </h4>
            <ul className="space-y-2">
              {highBandwidth.map((device, index) => (
                <li key={index} className="text-sm text-foreground flex items-start gap-2">
                  <div className="w-1 h-1 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>{device}</span>
                </li>
              ))}
            </ul>
            <p className="text-xs text-blue-300 mt-3 italic">
              Best suited for Wi-Fi networks with adequate router capacity
            </p>
          </div>

          <div className="bg-green-600/10 border border-green-600/20 rounded-lg p-4">
            <h4 className="text-green-400 font-semibold mb-3 flex items-center gap-2">
              <Thermometer className="h-4 w-4" />
              Low Bandwidth Devices
            </h4>
            <ul className="space-y-2">
              {lowBandwidth.map((device, index) => (
                <li key={index} className="text-sm text-foreground flex items-start gap-2">
                  <div className="w-1 h-1 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>{device}</span>
                </li>
              ))}
            </ul>
            <p className="text-xs text-green-300 mt-3 italic">
              Perfect for Zigbee, Z-Wave, or Thread mesh networks
            </p>
          </div>
        </div>

        <div className="bg-yellow-600/10 border border-yellow-600/20 rounded-lg p-4">
          <h4 className="text-yellow-400 font-semibold mb-3 flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            Network Scaling Considerations
          </h4>
          <div className="text-sm text-foreground space-y-2">
            <p>• Wi-Fi handles a few high-bandwidth devices well, but struggles with dozens of always-on sensors</p>
            <p>• Mesh protocols (Zigbee/Z-Wave/Thread) are designed for many low-data devices</p>
            <p>• Mixed networks often work best: Wi-Fi for cameras, mesh for sensors</p>
            <p>• Consider network segmentation for large installations (100+ devices)</p>
          </div>
        </div>

        <div className="bg-elec-dark border border-gray-600 rounded-lg p-4">
          <h4 className="text-foreground font-semibold mb-2">Quick Check:</h4>
          <p className="text-sm text-foreground">Why does Wi-Fi struggle with dozens of always-on sensors, even though they use minimal bandwidth?</p>
        </div>
      </CardContent>
    </Card>
  );
};