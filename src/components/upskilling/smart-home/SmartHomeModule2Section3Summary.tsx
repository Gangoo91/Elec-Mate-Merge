import { BookOpen } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const SmartHomeModule2Section3Summary = () => {
  const keyPoints = [
    "Wi-Fi excels for high-bandwidth devices but consumes too much power for sensors",
    "Bluetooth/BLE serves personal area networks and proximity-based applications",
    "Thread brings IP-based mesh networking with enterprise-grade security",
    "Matter enables interoperability across brands and ecosystems without replacing protocols",
    "Each protocol has optimal use cases - successful installations use multiple protocols",
    "Future-proofing requires considering Matter certification and Thread readiness"
  ];

  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-elec-yellow" />
          Section Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 text-foreground">
        <p>
          Modern smart homes rely on a diverse ecosystem of communication protocols, each optimised for specific applications. Understanding these protocols enables installers to make informed decisions that balance performance, reliability, and future compatibility.
        </p>

        <div className="space-y-4">
          <h4 className="text-foreground font-semibold">Key Takeaways</h4>
          <ul className="space-y-3">
            {keyPoints.map((point, index) => (
              <li key={index} className="flex items-start gap-3">
                <div className="w-2 h-2 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-foreground">{point}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-blue-600/10 border border-blue-600/20 rounded-lg p-4">
            <h4 className="text-blue-400 font-semibold mb-3">Installation Strategy</h4>
            <p className="text-sm text-foreground">
              Use Wi-Fi for bandwidth-intensive devices, Thread for efficient mesh networks, Bluetooth for personal devices, and ensure Matter compatibility for future-proofing.
            </p>
          </div>

          <div className="bg-green-600/10 border border-green-600/20 rounded-lg p-4">
            <h4 className="text-green-400 font-semibold mb-3">Customer Benefits</h4>
            <p className="text-sm text-foreground">
              Proper protocol selection delivers reliable performance, simplified management, enhanced security, and compatibility with future devices and services.
            </p>
          </div>
        </div>

        <div className="bg-purple-600/10 border border-purple-600/20 rounded-lg p-4">
          <h4 className="text-purple-400 font-semibold mb-3">Looking Forward</h4>
          <p className="text-sm text-foreground">
            The next section explores practical installation considerations, helping you apply this protocol knowledge to real-world smart home projects.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};