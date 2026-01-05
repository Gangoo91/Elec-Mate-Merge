import { Wifi, CheckCircle, AlertTriangle, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const WiFiInSmartHomesSection = () => {
  const strengths = [
    "High bandwidth (up to 1 Gbps+) for data-intensive applications",
    "Works with existing home Wi-Fi infrastructure",
    "Wide device compatibility and easy adoption",
    "Mature security standards (WPA3 encryption)",
    "Direct internet connectivity without additional hubs"
  ];

  const uses = [
    "Security cameras and video doorbells",
    "Smart TVs and streaming devices",
    "Voice assistants and smart speakers",
    "Smart appliances (fridges, washing machines)",
    "High-resolution displays and control panels"
  ];

  const weaknesses = [
    "High power consumption - unsuitable for battery devices",
    "Network congestion with too many connected devices",
    "Limited range compared to mesh protocols",
    "Can suffer from interference in 2.4GHz band",
    "Requires robust router infrastructure for reliability"
  ];

  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Wifi className="h-5 w-5 text-elec-yellow" />
          1. Wi-Fi in Smart Homes
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 text-foreground">
        <p className="text-foreground">
          Wi-Fi is the backbone of many smart home systems, providing the high-speed connectivity needed for bandwidth-intensive devices. While not suitable for all applications, it excels where data throughput and real-time performance are critical.
        </p>

        <div className="grid md:grid-cols-2 gap-6 h-fit">
          <div className="space-y-6 flex flex-col">
            <div className="bg-green-600/10 border border-green-600/20 rounded-lg p-4 flex-1">
              <h4 className="text-green-400 font-semibold mb-3 flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                Strengths
              </h4>
              <ul className="space-y-2">
                {strengths.map((strength, index) => (
                  <li key={index} className="text-sm text-foreground flex items-start gap-2">
                    <div className="w-1 h-1 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>{strength}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-blue-600/10 border border-blue-600/20 rounded-lg p-4 flex-1">
              <h4 className="text-blue-400 font-semibold mb-3 flex items-center gap-2">
                <Zap className="h-4 w-4" />
                Common Uses
              </h4>
              <ul className="space-y-2">
                {uses.map((use, index) => (
                  <li key={index} className="text-sm text-foreground flex items-start gap-2">
                    <div className="w-1 h-1 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>{use}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="space-y-6 flex flex-col">
            <div className="bg-red-600/10 border border-red-600/20 rounded-lg p-4 flex-1">
              <h4 className="text-red-400 font-semibold mb-3 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                Limitations
              </h4>
              <ul className="space-y-2">
                {weaknesses.map((weakness, index) => (
                  <li key={index} className="text-sm text-foreground flex items-start gap-2">
                    <div className="w-1 h-1 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>{weakness}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-yellow-600/10 border border-yellow-600/20 rounded-lg p-4 flex-1">
              <h4 className="text-yellow-400 font-semibold mb-3">Security Considerations</h4>
              <p className="text-sm text-foreground">
                WPA3 encryption is essential for smart home Wi-Fi networks. Older WEP and WPA protocols are vulnerable to attacks. Always use strong passwords and consider network segmentation for IoT devices.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-elec-dark border border-gray-600 rounded-lg p-4">
          <h4 className="text-foreground font-semibold mb-2">Quick Check:</h4>
          <p className="text-sm text-foreground">Why is Wi-Fi unsuitable for most battery-powered sensors?</p>
        </div>
      </CardContent>
    </Card>
  );
};