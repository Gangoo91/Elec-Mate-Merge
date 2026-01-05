import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Settings, Lightbulb, Camera, Lock, Smartphone } from 'lucide-react';

export const ChoosingProtocolSection = () => {
  const protocolChoices = [
    {
      protocol: "Zigbee/Z-Wave",
      icon: Lightbulb,
      bestFor: "Low-power sensors and lighting",
      reasons: [
        "Exceptional battery life (1-2 years)",
        "Mesh networking extends coverage",
        "Reliable, self-healing networks",
        "Perfect for sensors and switches"
      ],
      examples: "Motion sensors, door contacts, smart bulbs, dimmer switches",
      color: "blue"
    },
    {
      protocol: "Wi-Fi",
      icon: Camera,
      bestFor: "High-data devices",
      reasons: [
        "High bandwidth for video/audio",
        "Direct internet connectivity",
        "No additional hub required",
        "Good for streaming applications"
      ],
      examples: "Security cameras, voice assistants, smart TVs, video doorbells",
      color: "purple"
    },
    {
      protocol: "Bluetooth",
      icon: Lock,
      bestFor: "Mobile-controlled devices",
      reasons: [
        "Direct smartphone integration",
        "Ultra-low power consumption",
        "Fast, simple pairing process",
        "Good for personal devices"
      ],
      examples: "Smart locks, fitness trackers, beacons, proximity sensors",
      color: "cyan"
    },
    {
      protocol: "Thread/Matter",
      icon: Smartphone,
      bestFor: "Future-proof installations",
      reasons: [
        "Cross-platform compatibility",
        "Industry-standard approach",
        "IPv6 native networking",
        "Vendor-agnostic solutions"
      ],
      examples: "New smart home installations, mixed-brand systems",
      color: "orange"
    }
  ];

  const decisionMatrix = [
    {
      scenario: "Battery-powered sensor",
      recommendation: "Zigbee or Z-Wave",
      reasoning: "Ultra-low power consumption extends battery life significantly"
    },
    {
      scenario: "Security camera system",
      recommendation: "Wi-Fi",
      reasoning: "High bandwidth needed for video streaming and cloud storage"
    },
    {
      scenario: "Smart door lock",
      recommendation: "Bluetooth or Z-Wave",
      reasoning: "Bluetooth for smartphone integration, Z-Wave for hub control"
    },
    {
      scenario: "Whole-home lighting",
      recommendation: "Zigbee or Z-Wave",
      reasoning: "Mesh networking provides reliable coverage throughout large homes"
    },
    {
      scenario: "Voice assistant",
      recommendation: "Wi-Fi",
      reasoning: "Requires internet connectivity and handles audio streaming"
    },
    {
      scenario: "Mixed-brand ecosystem",
      recommendation: "Matter-compatible devices",
      reasoning: "Ensures interoperability across different manufacturers"
    }
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue': return 'border-blue-600 bg-blue-900/20';
      case 'purple': return 'border-purple-600 bg-purple-900/20';
      case 'cyan': return 'border-cyan-600 bg-cyan-900/20';
      case 'orange': return 'border-orange-600 bg-orange-900/20';
      default: return 'border-gray-600 bg-gray-900/20';
    }
  };

  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Settings className="h-5 w-5 text-elec-yellow" />
          5. Choosing the Right Protocol
        </CardTitle>
      </CardHeader>
      <CardContent className="text-gray-300 space-y-6">
        <p className="text-lg font-medium text-foreground mb-6">
          Select protocols based on device requirements, application needs, and system architecture.
        </p>
        
        {/* Protocol Recommendations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {protocolChoices.map((choice, index) => (
            <div key={index} className={`p-4 border rounded-lg ${getColorClasses(choice.color)}`}>
              <div className="flex items-start gap-3 mb-3">
                <choice.icon className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground mb-1">{choice.protocol}</h4>
                  <p className="text-sm font-medium text-gray-300 mb-3">{choice.bestFor}</p>
                  
                  <div className="space-y-2">
                    <div>
                      <h5 className="text-xs font-medium text-gray-400 mb-1">Why choose this protocol:</h5>
                      <ul className="space-y-1">
                        {choice.reasons.map((reason, reasonIndex) => (
                          <li key={reasonIndex} className="flex items-center gap-2">
                            <div className="w-1 h-1 rounded-full bg-elec-yellow flex-shrink-0"></div>
                            <span className="text-xs text-gray-300">{reason}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h5 className="text-xs font-medium text-gray-400 mb-1">Common examples:</h5>
                      <p className="text-xs text-gray-300">{choice.examples}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Decision Matrix */}
        <div className="p-4 bg-[#1a1a1a] border border-gray-600 rounded-lg">
          <h4 className="font-semibold text-foreground mb-4">Protocol Selection Guide</h4>
          <div className="space-y-3">
            {decisionMatrix.map((decision, index) => (
              <div key={index} className="p-3 bg-[#0f0f0f] border border-gray-700 rounded">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex-1">
                    <span className="font-medium text-foreground">{decision.scenario}</span>
                    <span className="text-gray-400 text-sm block sm:inline sm:ml-2">→ {decision.recommendation}</span>
                  </div>
                </div>
                <p className="text-xs text-gray-400 mt-1">{decision.reasoning}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Best Practices */}
        <div className="p-4 bg-gradient-to-r from-green-900/20 to-blue-900/20 border border-green-600 rounded-lg">
          <h4 className="font-semibold text-foreground mb-4">Best Practice Guidelines</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div>
              <h5 className="font-medium text-green-200 mb-3">Protocol Planning</h5>
              <ul className="space-y-1 text-green-100">
                <li>• Assess power requirements first</li>
                <li>• Consider data bandwidth needs</li>
                <li>• Plan for future expansion</li>
                <li>• Evaluate interference potential</li>
              </ul>
            </div>
            <div>
              <h5 className="font-medium text-blue-200 mb-3">Implementation Tips</h5>
              <ul className="space-y-1 text-blue-100">
                <li>• Start with core functions</li>
                <li>• Test range and reliability</li>
                <li>• Document protocol choices</li>
                <li>• Plan integration pathways</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};