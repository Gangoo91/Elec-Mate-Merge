import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Zap, Brain, Volume2, Lightbulb, Smartphone } from 'lucide-react';

export const CCTVFeaturesSection = () => {
  const features = [
    {
      name: "Motion Detection",
      icon: Zap,
      description: "Smart alerts triggered by movement",
      details: ["Reduces false alarms", "Saves storage space", "Instant notifications"]
    },
    {
      name: "AI Recognition",
      icon: Brain,
      description: "Advanced detection of people, vehicles, packages",
      details: ["People vs animal detection", "Vehicle recognition", "Package delivery alerts"]
    },
    {
      name: "Two-Way Audio",
      icon: Volume2,
      description: "Communicate through doorbell cameras",
      details: ["Speak to visitors", "Deterrent function", "Remote communication"]
    },
    {
      name: "Lighting Integration",
      icon: Lightbulb,
      description: "Automatic lighting triggers and alarm integration",
      details: ["Motion-activated lights", "Security scene automation", "Deterrent lighting"]
    },
    {
      name: "Remote Access",
      icon: Smartphone,
      description: "Monitor via smartphone app or web interface",
      details: ["Live viewing", "Playback footage", "System management"]
    }
  ];

  const comparisonData = [
    {
      feature: "Local Storage",
      internet: "Not required",
      security: "Vulnerable to theft/damage",
      access: "Limited to local network"
    },
    {
      feature: "Cloud Storage",
      internet: "Required",
      security: "Secure and encrypted",
      access: "Accessible anywhere"
    },
    {
      feature: "High Resolution",
      internet: "Higher bandwidth needed",
      security: "Excellent clarity",
      access: "More storage required"
    },
    {
      feature: "Wireless Cameras",
      internet: "Wi-Fi dependent",
      security: "Easy installation",
      access: "Flexible placement"
    }
  ];

  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Zap className="h-6 w-6 text-elec-yellow" />
          Key Features in Modern CCTV
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {features.map((feature, index) => (
            <div key={index} className="bg-elec-gray rounded-lg p-4 border border-gray-600">
              <div className="flex items-start gap-3 mb-3">
                <feature.icon className="h-5 w-5 text-elec-yellow mt-0.5" />
                <div>
                  <h4 className="text-foreground font-semibold">{feature.name}</h4>
                  <p className="text-gray-400 text-sm">{feature.description}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-1">
                {feature.details.map((detail, idx) => (
                  <Badge key={idx} variant="outline" className="border-gray-500 text-gray-300 text-xs">
                    {detail}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Benefits and Drawbacks Comparison */}
        <div className="bg-elec-gray rounded-lg p-4 border border-gray-600">
          <h4 className="text-foreground font-semibold mb-4">Benefits and Drawbacks Comparison</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-600">
                  <th className="text-left text-gray-300 pb-2">System Type</th>
                  <th className="text-left text-gray-300 pb-2">Internet Requirement</th>
                  <th className="text-left text-gray-300 pb-2">Security</th>
                  <th className="text-left text-gray-300 pb-2">Access</th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, index) => (
                  <tr key={index} className="border-b border-gray-700/50">
                    <td className="py-2 text-foreground font-medium">{row.feature}</td>
                    <td className="py-2 text-gray-300">{row.internet}</td>
                    <td className="py-2 text-gray-300">{row.security}</td>
                    <td className="py-2 text-gray-300">{row.access}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};