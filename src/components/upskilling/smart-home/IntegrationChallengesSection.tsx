import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Wifi, ChevronDown, ChevronUp } from 'lucide-react';

export const IntegrationChallengesSection = () => {
  const [showAnswers, setShowAnswers] = useState(false);

  const challenges = [
    {
      title: "Compatibility Issues",
      description: "Different brands and protocols may not work together",
      details: "Legacy devices using different communication protocols (Zigbee, Z-Wave, Wi-Fi, Bluetooth) often cannot communicate directly. This creates 'silos' where devices from one manufacturer cannot interact with another's ecosystem.",
      solutions: "Use universal hubs like SmartThings or Hubitat, choose Matter-compatible devices, or implement bridge devices."
    },
    {
      title: "Latency Problems", 
      description: "Delays in response can affect user experience",
      details: "Cloud-dependent systems may experience delays due to internet connectivity issues, server processing time, or network congestion. Critical safety systems require near-instantaneous response times.",
      solutions: "Implement local processing with edge computing, use mesh networks for faster communication, prioritise local automation rules."
    },
    {
      title: "Power Supply Challenges",
      description: "Balancing convenience with maintenance requirements",
      details: "Battery-powered devices offer flexible placement but require regular maintenance. Mains-powered devices are reliable but limit installation locations and may require professional wiring.",
      solutions: "Mix of battery and mains devices based on criticality, use energy-efficient protocols, implement low-power design practices."
    },
    {
      title: "Security Vulnerabilities",
      description: "Connected devices can create entry points for cyber attacks",
      details: "Weak device passwords, unencrypted communications, and poor firmware update practices can expose entire home networks. Compromised devices may be used for surveillance or as entry points for broader attacks.",
      solutions: "Regular firmware updates, strong authentication, network segmentation, use of VPNs and firewalls."
    },
    {
      title: "Network Congestion",
      description: "Too many devices can overwhelm wireless networks",
      details: "High device density can saturate Wi-Fi channels and cause interference. Mesh networks can become unstable with poor node placement or bandwidth limitations.",
      solutions: "Use dedicated IoT networks, implement quality of service (QoS) rules, optimise device placement for signal strength."
    },
    {
      title: "Scalability Limitations",
      description: "Systems may not handle growth effectively",
      details: "Some controllers have device limits, network protocols may not scale well, and user interfaces can become overwhelming as device counts increase.",
      solutions: "Plan for future expansion, choose scalable platforms, implement logical grouping and automation scenes."
    }
  ];

  return (
    <div className="space-y-6">
      {/* Learning Content */}
      <Card className="bg-elec-gray border-gray-700">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-elec-yellow" />
            5. Integration Challenges in Smart Home Systems
          </CardTitle>
        </CardHeader>
        <CardContent className="text-gray-300 space-y-6">
          <p className="text-lg font-medium text-foreground mb-6">
            While smart home technology offers many benefits, integrating multiple systems presents several challenges that require careful consideration:
          </p>
          
          {/* Challenges Grid */}
          <div className="grid md:grid-cols-2 gap-4">
            {challenges.map((challenge, index) => {
              const colors = [
                "from-red-900/30 to-red-800/30 border-red-600",
                "from-orange-900/30 to-orange-800/30 border-orange-600",
                "from-yellow-900/30 to-yellow-800/30 border-yellow-600",
                "from-pink-900/30 to-pink-800/30 border-pink-600",
                "from-purple-900/30 to-purple-800/30 border-purple-600",
                "from-indigo-900/30 to-indigo-800/30 border-indigo-600"
              ];
              return (
                <div key={index} className={`p-4 bg-gradient-to-br ${colors[index]} border rounded-lg hover:scale-105 transition-all duration-300`}>
                  <h4 className="font-semibold text-foreground mb-2 text-lg">{challenge.title}</h4>
                  <p className="text-gray-200 mb-3 text-sm font-medium">{challenge.description}</p>
                  <p className="text-gray-300 text-xs leading-relaxed mb-3">{challenge.details}</p>
                  <div className="p-2 bg-black/30 border border-gray-500 rounded text-xs">
                    <span className="font-medium text-elec-yellow">Solutions: </span>
                    <span className="text-gray-200">{challenge.solutions}</span>
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* Best Practices */}
          <div className="mt-8 p-4 bg-[#0f0f0f] border border-gray-600 rounded-lg">
            <h4 className="font-semibold text-foreground mb-4">Best Practices for Integration</h4>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <h5 className="font-medium text-elec-yellow mb-2">Planning Phase:</h5>
                <ul className="space-y-1 text-gray-300">
                  <li>• Research device compatibility before purchase</li>
                  <li>• Plan network infrastructure requirements</li>
                  <li>• Consider future expansion needs</li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium text-elec-yellow mb-2">Implementation Phase:</h5>
                <ul className="space-y-1 text-gray-300">
                  <li>• Start with core systems first</li>
                  <li>• Test thoroughly before adding more devices</li>
                  <li>• Document configurations and settings</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="p-4 bg-[#0f0f0f] border border-gray-600 rounded-lg">
            <p className="text-sm font-medium text-gray-300">
              These challenges highlight the importance of careful system planning, choosing compatible devices, and implementing proper security measures from the outset.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Interactive Knowledge Check */}
      <Card className="bg-gradient-to-br from-red-900/25 to-orange-900/25 border-red-600">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Wifi className="h-5 w-5 text-red-400" />
            Knowledge Check: Integration Challenges
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="p-3 bg-red-900/30 border border-red-500 rounded-lg">
              <p className="font-medium text-red-100">Q1: Name three common integration challenges in smart home systems.</p>
            </div>
            
            <div className="p-3 bg-orange-900/30 border border-orange-500 rounded-lg">
              <p className="font-medium text-orange-100">Q2: Why can latency be problematic in cloud-based smart home systems?</p>
            </div>
            
            <div className="p-3 bg-yellow-900/30 border border-yellow-500 rounded-lg">
              <p className="font-medium text-yellow-100">Q3: What security risks do compromised smart home devices pose?</p>
            </div>
            
            <div className="p-3 bg-pink-900/30 border border-pink-500 rounded-lg">
              <p className="font-medium text-pink-100">Q4: How can network congestion affect smart home performance?</p>
            </div>
          </div>

          <Button 
            onClick={() => setShowAnswers(!showAnswers)}
            variant="outline" 
            className="w-full border-red-600 text-red-200 hover:bg-red-900/30 hover:text-red-100"
          >
            {showAnswers ? <ChevronUp className="mr-2 h-4 w-4" /> : <ChevronDown className="mr-2 h-4 w-4" />}
            {showAnswers ? 'Hide Answers' : 'Show Answers'}
          </Button>

          {showAnswers && (
            <div className="space-y-3 pt-4 border-t border-gray-600">
              <div className="p-3 bg-[#0f0f0f] border border-gray-600 rounded-lg">
                <p className="font-medium text-elec-yellow mb-2">A1:</p>
                <p className="text-gray-300">Compatibility issues between different brands/protocols, latency problems with cloud-dependent systems, power supply challenges, security vulnerabilities, network congestion, and scalability limitations.</p>
              </div>
              
              <div className="p-3 bg-[#0f0f0f] border border-gray-600 rounded-lg">
                <p className="font-medium text-elec-yellow mb-2">A2:</p>
                <p className="text-gray-300">Delays in response can affect user experience, make safety-critical systems unreliable, and cause automation to feel sluggish or unresponsive, particularly during internet connectivity issues.</p>
              </div>
              
              <div className="p-3 bg-[#0f0f0f] border border-gray-600 rounded-lg">
                <p className="font-medium text-elec-yellow mb-2">A3:</p>
                <p className="text-gray-300">Compromised devices can be used for surveillance, unauthorised access to home networks, control of critical systems like locks and alarms, and as entry points for broader cyber attacks on connected systems.</p>
              </div>
              
              <div className="p-3 bg-[#0f0f0f] border border-gray-600 rounded-lg">
                <p className="font-medium text-elec-yellow mb-2">A4:</p>
                <p className="text-gray-300">Network congestion can cause device communication delays, intermittent connectivity issues, reduced system responsiveness, and potential conflicts between devices competing for bandwidth.</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};