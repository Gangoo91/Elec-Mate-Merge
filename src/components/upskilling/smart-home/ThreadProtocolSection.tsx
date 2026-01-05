import { Network, Zap, Shield, Globe } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const ThreadProtocolSection = () => {
  const threadFeatures = [
    {
      icon: <Network className="h-4 w-4" />,
      title: "IP-Based Mesh",
      description: "Native IPv6 support enables direct internet connectivity"
    },
    {
      icon: <Zap className="h-4 w-4" />,
      title: "Self-Healing",
      description: "Automatically reroutes around failed nodes"
    },
    {
      icon: <Shield className="h-4 w-4" />,
      title: "Enterprise Security",
      description: "Bank-grade encryption and authentication"
    },
    {
      icon: <Globe className="h-4 w-4" />,
      title: "Low Power",
      description: "Optimised for battery-powered IoT devices"
    }
  ];

  const supporters = [
    "Google Nest devices",
    "Apple HomePod (border router)",
    "Amazon Echo devices",
    "Samsung SmartThings",
    "Nanoleaf lighting systems",
    "Eve smart home products"
  ];

  const advantages = [
    "Works directly with existing IP infrastructure",
    "No proprietary hubs required for basic connectivity",
    "Scales to hundreds of devices per network",
    "Better security than older mesh protocols",
    "Future-proof with ongoing development"
  ];

  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Network className="h-5 w-5 text-elec-yellow" />
          3. Thread Protocol
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 text-foreground">
        <p>
          Thread represents the next generation of mesh networking, specifically designed for smart home and IoT applications. Unlike proprietary protocols, Thread is built on open standards and integrates seamlessly with existing IP networks, making it a compelling choice for future-proof installations.
        </p>

        <div className="space-y-4">
          <h4 className="text-foreground font-semibold">What Makes Thread Different</h4>
          <div className="grid md:grid-cols-2 gap-4">
            {threadFeatures.map((feature, index) => (
              <div key={index} className="bg-purple-600/10 border border-purple-600/20 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <div className="text-purple-400 mt-0.5">
                    {feature.icon}
                  </div>
                  <div>
                    <h5 className="text-purple-400 font-semibold">{feature.title}</h5>
                    <p className="text-sm text-foreground mt-1">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="text-foreground font-semibold">Key Advantages</h4>
            <div className="bg-green-600/10 border border-green-600/20 rounded-lg p-4">
              <ul className="space-y-2">
                {advantages.map((advantage, index) => (
                  <li key={index} className="text-sm text-foreground flex items-start gap-2">
                    <div className="w-1 h-1 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>{advantage}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-foreground font-semibold">Industry Adoption</h4>
            <div className="bg-blue-600/10 border border-blue-600/20 rounded-lg p-4">
              <ul className="space-y-2">
                {supporters.map((supporter, index) => (
                  <li key={index} className="text-sm text-foreground flex items-start gap-2">
                    <div className="w-1 h-1 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>{supporter}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-yellow-600/10 border border-yellow-600/20 rounded-lg p-4">
          <h4 className="text-yellow-400 font-semibold mb-3">Border Router Requirement</h4>
          <p className="text-sm text-foreground mb-2">
            Thread networks require a "border router" to connect to your Wi-Fi network and the internet. This functionality is increasingly built into smart speakers and hubs:
          </p>
          <ul className="text-sm text-foreground space-y-1">
            <li>• Apple HomePod mini/max (automatic setup)</li>
            <li>• Google Nest Hub (2nd gen and later)</li>
            <li>• Amazon Echo devices (4th gen and later)</li>
            <li>• Dedicated Thread border routers</li>
          </ul>
        </div>

        <div className="bg-elec-dark border border-gray-600 rounded-lg p-4">
          <h4 className="text-foreground font-semibold mb-2">Quick Check:</h4>
          <p className="text-sm text-foreground">What type of network topology does Thread use, and how does it improve on traditional mesh protocols?</p>
        </div>
      </CardContent>
    </Card>
  );
};