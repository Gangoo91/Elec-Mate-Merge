import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Target, Lightbulb, Home, Wifi } from 'lucide-react';

export const BestUseCasesSection = () => {
  const useCases = [
    {
      protocol: "Zigbee",
      icon: Lightbulb,
      title: "Dense Lighting Systems",
      description: "Large numbers of smart bulbs and switches",
      reasons: [
        "Supports thousands of devices per network",
        "Wide variety of lighting manufacturers",
        "Cost-effective for large installations",
        "Excellent mesh networking for coverage"
      ],
      examples: "Office buildings, hotels, large homes with 30+ lights",
      bestFor: "High device count scenarios"
    },
    {
      protocol: "Zigbee",
      icon: Wifi,
      title: "Smart Sensors",
      description: "Motion, door/window, temperature sensors",
      reasons: [
        "Ultra-low power consumption",
        "Large selection of sensor types",
        "Affordable sensor options",
        "Good for dense sensor networks"
      ],
      examples: "Security systems, environmental monitoring, automation triggers",
      bestFor: "Battery-powered devices"
    },
    {
      protocol: "Z-Wave",
      icon: Home,
      title: "Large Homes with Thick Walls",
      description: "Properties with challenging RF environments",
      reasons: [
        "Superior wall penetration (sub-1GHz)",
        "Longer range per device",
        "No interference from Wi-Fi",
        "Reliable performance in difficult environments"
      ],
      examples: "Stone houses, concrete buildings, multi-story homes",
      bestFor: "Range and penetration critical"
    },
    {
      protocol: "Z-Wave",
      icon: Target,
      title: "Professional Security Systems",
      description: "Mission-critical security and access control",
      reasons: [
        "Guaranteed interoperability",
        "Professional-grade reliability",
        "Strong certification process",
        "Excellent for locks and security devices"
      ],
      examples: "Commercial buildings, high-end residential, professional installs",
      bestFor: "Reliability is paramount"
    }
  ];

  const scenarioMatrix = [
    {
      scenario: "Modern apartment with 50+ smart bulbs",
      recommended: "Zigbee",
      reasoning: "High device count, cost considerations, adequate range in smaller space"
    },
    {
      scenario: "Victorian house with thick stone walls",
      recommended: "Z-Wave",
      reasoning: "Superior wall penetration, longer range, fewer devices needed"
    },
    {
      scenario: "Budget-conscious first smart home",
      recommended: "Zigbee",
      reasoning: "Lower device costs, wide selection, good starter ecosystem"
    },
    {
      scenario: "Professional security installation",
      recommended: "Z-Wave",
      reasoning: "Guaranteed reliability, professional support, certified interoperability"
    },
    {
      scenario: "Dense sensor network (100+ sensors)",
      recommended: "Zigbee",
      reasoning: "Unlimited device support, cost-effective sensors, good mesh"
    },
    {
      scenario: "Rural property with outbuildings",
      recommended: "Z-Wave",
      reasoning: "Maximum range, excellent outdoor performance, fewer repeaters needed"
    }
  ];

  const getProtocolColor = (protocol: string) => {
    return protocol === 'Zigbee' ? 'border-blue-600 bg-blue-900/20' : 'border-green-600 bg-green-900/20';
  };

  const getProtocolTextColor = (protocol: string) => {
    return protocol === 'Zigbee' ? 'text-blue-200' : 'text-green-200';
  };

  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Target className="h-5 w-5 text-elec-yellow" />
          6. Best Use Cases
        </CardTitle>
      </CardHeader>
      <CardContent className="text-gray-300 space-y-6">
        <p className="text-lg font-medium text-foreground mb-6">
          Choose the right protocol based on specific installation requirements and use case characteristics.
        </p>
        
        {/* Use Case Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {useCases.map((useCase, index) => (
            <div key={index} className={`p-4 border rounded-lg ${getProtocolColor(useCase.protocol)}`}>
              <div className="flex items-start gap-3 mb-3">
                <useCase.icon className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-foreground">{useCase.title}</h4>
                    <span className={`text-xs px-2 py-1 rounded font-medium ${getProtocolTextColor(useCase.protocol)}`}>
                      {useCase.protocol}
                    </span>
                  </div>
                  <p className="text-gray-300 text-sm mb-3">{useCase.description}</p>
                  
                  <div className="space-y-3">
                    <div>
                      <h5 className="text-xs font-medium text-gray-400 mb-2">Why {useCase.protocol}:</h5>
                      <ul className="space-y-1">
                        {useCase.reasons.map((reason, reasonIndex) => (
                          <li key={reasonIndex} className="flex items-center gap-2">
                            <div className="w-1 h-1 rounded-full bg-elec-yellow flex-shrink-0"></div>
                            <span className="text-xs text-gray-300">{reason}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h5 className="text-xs font-medium text-gray-400 mb-1">Examples:</h5>
                      <p className="text-xs text-gray-300">{useCase.examples}</p>
                    </div>
                    
                    <div>
                      <h5 className="text-xs font-medium text-gray-400 mb-1">Best for:</h5>
                      <p className="text-xs font-semibold text-foreground">{useCase.bestFor}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Scenario Decision Matrix */}
        <div className="p-4 bg-[#1a1a1a] border border-gray-600 rounded-lg">
          <h4 className="font-semibold text-foreground mb-4">Protocol Selection Scenarios</h4>
          <div className="space-y-3">
            {scenarioMatrix.map((scenario, index) => (
              <div key={index} className="p-3 bg-[#0f0f0f] border border-gray-700 rounded">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <h5 className="font-medium text-foreground">{scenario.scenario}</h5>
                  <span className={`text-sm font-medium px-2 py-1 rounded ${
                    scenario.recommended === 'Zigbee' ? 'bg-blue-600 text-blue-100' : 'bg-green-600 text-green-100'
                  }`}>
                    {scenario.recommended}
                  </span>
                </div>
                <p className="text-xs text-gray-400">{scenario.reasoning}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Installation Tips */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 bg-blue-900/20 border border-blue-600 rounded-lg">
            <h4 className="font-semibold text-blue-200 mb-3">Zigbee Installation Tips</h4>
            <ul className="space-y-2 text-sm text-blue-100">
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
                <span>Plan for Wi-Fi interference mitigation</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
                <span>Use strategic placement for mesh building</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
                <span>Start with lighting for strong mesh foundation</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
                <span>Choose Zigbee 3.0 for best compatibility</span>
              </li>
            </ul>
          </div>
          
          <div className="p-4 bg-green-900/20 border border-green-600 rounded-lg">
            <h4 className="font-semibold text-green-200 mb-3">Z-Wave Installation Tips</h4>
            <ul className="space-y-2 text-sm text-green-100">
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400"></div>
                <span>Leverage superior range for fewer devices</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400"></div>
                <span>Focus on critical path coverage first</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400"></div>
                <span>Plan network topology for optimal routing</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400"></div>
                <span>Use certified Z-Wave Plus devices</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="p-4 bg-gradient-to-r from-yellow-900/20 to-orange-900/20 border border-yellow-600 rounded-lg">
          <h4 className="font-semibold text-yellow-200 mb-3">Decision Framework</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div>
              <h5 className="font-medium text-yellow-200 mb-2">Choose Zigbee When:</h5>
              <ul className="space-y-1 text-yellow-100">
                <li>• You need many devices (30+)</li>
                <li>• Budget is a primary concern</li>
                <li>• Modern construction with good Wi-Fi management</li>
                <li>• Dense lighting or sensor deployments</li>
              </ul>
            </div>
            <div>
              <h5 className="font-medium text-orange-200 mb-2">Choose Z-Wave When:</h5>
              <ul className="space-y-1 text-orange-100">
                <li>• Range and penetration are critical</li>
                <li>• Reliability is paramount (security/access)</li>
                <li>• Challenging RF environments</li>
                <li>• Professional installation requirements</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};