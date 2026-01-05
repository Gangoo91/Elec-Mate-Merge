import { Target, Camera, Lock, Lightbulb, Shield } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const ModernProtocolUseCasesSection = () => {
  const useCases = [
    {
      protocol: "Wi-Fi",
      icon: <Camera className="h-5 w-5" />,
      color: "blue",
      bestFor: "High-bandwidth devices",
      examples: [
        "Security cameras and video doorbells",
        "Smart TVs and streaming devices",
        "Voice assistants and smart speakers",
        "Smart appliances with displays",
        "High-resolution control panels"
      ],
      avoid: "Battery-powered sensors, low-data devices in dense deployments"
    },
    {
      protocol: "Bluetooth/BLE",
      icon: <Lock className="h-5 w-5" />,
      color: "green",
      bestFor: "Personal area networks",
      examples: [
        "Smart door locks and access control",
        "Fitness trackers and wearables",
        "Asset tracking and beacons",
        "Device setup and configuration",
        "Proximity-based automation"
      ],
      avoid: "Whole-home automation, devices requiring long range"
    },
    {
      protocol: "Thread",
      icon: <Lightbulb className="h-5 w-5" />,
      color: "purple",
      bestFor: "Future-proof IoT networks",
      examples: [
        "Smart lighting systems",
        "Environmental sensors",
        "Smart switches and dimmers",
        "Window and blind controls",
        "HVAC integration devices"
      ],
      avoid: "High-bandwidth applications, legacy device integration"
    },
    {
      protocol: "Matter",
      icon: <Shield className="h-5 w-5" />,
      color: "gold",
      bestFor: "Cross-platform compatibility",
      examples: [
        "New smart home installations",
        "Mixed-brand ecosystems",
        "Future-proof device selection",
        "Simplified user experiences",
        "Professional installations"
      ],
      avoid: "Single-ecosystem deployments (may be unnecessary overhead)"
    }
  ];

  const scenarios = [
    {
      title: "Small Apartment",
      recommendation: "Wi-Fi + Bluetooth",
      reasoning: "Simple setup, fewer devices, existing infrastructure sufficient"
    },
    {
      title: "Large Family Home",
      recommendation: "Thread + Matter + Wi-Fi",
      reasoning: "Scalable mesh, future-proof, handles diverse device requirements"
    },
    {
      title: "Office Building",
      recommendation: "Wi-Fi + Thread + Matter",
      reasoning: "Professional infrastructure, interoperability, easy management"
    },
    {
      title: "Rental Property",
      recommendation: "Wi-Fi + Bluetooth",
      reasoning: "Portable devices, no permanent installation, tenant-friendly"
    }
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue': return 'bg-blue-600/10 border-blue-600/20 text-blue-400';
      case 'green': return 'bg-green-600/10 border-green-600/20 text-green-400';
      case 'purple': return 'bg-purple-600/10 border-purple-600/20 text-purple-400';
      case 'gold': return 'bg-yellow-600/10 border-yellow-600/20 text-yellow-400';
      default: return 'bg-gray-600/10 border-gray-600/20 text-gray-400';
    }
  };

  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Target className="h-5 w-5 text-elec-yellow" />
          6. Best Use Cases
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 text-foreground">
        <p>
          Selecting the right protocol depends on the specific requirements of your installation. Consider factors like power consumption, range, data requirements, and future compatibility when making protocol decisions.
        </p>

        <div className="space-y-4">
          <h4 className="text-foreground font-semibold">Protocol Recommendations by Use Case</h4>
          <div className="grid lg:grid-cols-2 gap-4">
            {useCases.map((useCase, index) => (
              <div key={index} className={`border rounded-lg p-4 ${getColorClasses(useCase.color)}`}>
                <div className="flex items-center gap-3 mb-3">
                  {useCase.icon}
                  <h5 className="font-semibold">{useCase.protocol}</h5>
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-foreground mb-1">Best for: {useCase.bestFor}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground mb-2">Examples:</p>
                    <ul className="space-y-1">
                      {useCase.examples.map((example, idx) => (
                        <li key={idx} className="text-sm flex items-start gap-2">
                          <div className="w-1 h-1 bg-current rounded-full mt-2 flex-shrink-0"></div>
                          <span>{example}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="pt-2 border-t border-current/20">
                    <p className="text-sm"><strong>Avoid for:</strong> {useCase.avoid}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-foreground font-semibold">Installation Scenarios</h4>
          <div className="grid md:grid-cols-2 gap-4">
            {scenarios.map((scenario, index) => (
              <div key={index} className="bg-elec-dark border border-gray-600 rounded-lg p-4">
                <h5 className="text-foreground font-semibold mb-2">{scenario.title}</h5>
                <div className="space-y-2">
                  <div>
                    <span className="text-elec-yellow font-medium">Recommended: </span>
                    <span className="text-foreground">{scenario.recommendation}</span>
                  </div>
                  <div>
                    <span className="text-elec-yellow font-medium">Why: </span>
                    <span className="text-foreground text-sm">{scenario.reasoning}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-orange-600/10 border border-orange-600/20 rounded-lg p-4">
          <h4 className="text-orange-400 font-semibold mb-3">Future-Proofing Considerations</h4>
          <ul className="space-y-2 text-sm text-foreground">
            <li>• Choose Matter-certified devices for maximum compatibility</li>
            <li>• Thread is gaining momentum - consider for new mesh installations</li>
            <li>• Wi-Fi 6/6E improves performance in dense device environments</li>
            <li>• Avoid proprietary protocols without clear migration paths</li>
            <li>• Plan for protocol bridges to integrate legacy devices</li>
          </ul>
        </div>

        <div className="bg-elec-dark border border-gray-600 rounded-lg p-4">
          <h4 className="text-foreground font-semibold mb-2">Quick Check:</h4>
          <p className="text-sm text-foreground">A client wants to install smart lighting in a 4-bedroom house with potential for expansion. Which two protocols would you recommend and why?</p>
        </div>
      </CardContent>
    </Card>
  );
};