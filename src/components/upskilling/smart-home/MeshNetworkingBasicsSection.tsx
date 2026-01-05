import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Network, ChevronDown, ChevronUp, Repeat, Shield, Home } from 'lucide-react';

export const MeshNetworkingBasicsSection = () => {
  const [showAnswers, setShowAnswers] = useState(false);

  const meshFeatures = [
    {
      feature: "Device Repeating",
      icon: Repeat,
      description: "Each device can act as a repeater, passing signals along to extend coverage",
      benefit: "Extended range without additional infrastructure"
    },
    {
      feature: "Self-Healing",
      icon: Shield,
      description: "If one node fails, the signal automatically reroutes through other devices",
      benefit: "Improved reliability and redundancy"
    },
    {
      feature: "Scalability",
      icon: Home,
      description: "Ideal for large homes or buildings with thick walls and multiple floors",
      benefit: "Coverage grows with each added device"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Learning Content */}
      <Card className="bg-elec-gray border-gray-700">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Network className="h-5 w-5 text-elec-yellow" />
            1. What is Mesh Networking?
          </CardTitle>
        </CardHeader>
        <CardContent className="text-gray-300 space-y-6">
          <p className="text-lg font-medium text-foreground mb-4">
            Mesh networking allows smart devices to create a self-extending, self-healing network where each device can relay signals to others.
          </p>
          
          {/* Mesh Features */}
          <div className="grid grid-cols-1 gap-4">
            {meshFeatures.map((feature, index) => (
              <div key={index} className="p-4 bg-[#1a1a1a] border border-gray-600 rounded-lg">
                <div className="flex items-start gap-3">
                  <feature.icon className="h-5 w-5 text-elec-yellow mt-1 flex-shrink-0" />
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground mb-2">{feature.feature}</h4>
                    <p className="text-gray-300 text-sm mb-2">{feature.description}</p>
                    <div className="text-xs">
                      <span className="font-medium text-green-400">Benefit: </span>
                      <span className="text-green-300">{feature.benefit}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Network Topology Comparison */}
          <div className="p-4 bg-gradient-to-r from-indigo-900/20 to-purple-900/20 border border-indigo-600 rounded-lg">
            <h4 className="font-semibold text-foreground mb-4">Network Topology Comparison</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div>
                <h5 className="font-medium text-indigo-200 mb-3">Mesh Network (Zigbee/Z-Wave)</h5>
                <ul className="space-y-1 text-indigo-100">
                  <li>• Multiple communication paths</li>
                  <li>• Each device acts as a repeater</li>
                  <li>• Self-healing if devices fail</li>
                  <li>• Range extends with more devices</li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium text-purple-200 mb-3">Star Network (Wi-Fi)</h5>
                <ul className="space-y-1 text-purple-100">
                  <li>• Single central connection point</li>
                  <li>• All devices connect to router</li>
                  <li>• Network fails if router fails</li>
                  <li>• Range limited to router coverage</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Practical Benefits */}
          <div className="p-4 bg-[#1a1a1a] border border-gray-600 rounded-lg">
            <h4 className="font-semibold text-foreground mb-4">Practical Benefits in Smart Homes</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div>
                <h5 className="font-medium text-blue-200 mb-3">Coverage Challenges Solved</h5>
                <ul className="space-y-1 text-blue-100">
                  <li>• Large homes with multiple floors</li>
                  <li>• Thick walls (stone, concrete, metal)</li>
                  <li>• Long distances between devices</li>
                  <li>• Signal dead zones</li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium text-green-200 mb-3">Reliability Features</h5>
                <ul className="space-y-1 text-green-100">
                  <li>• Automatic route optimisation</li>
                  <li>• Redundant communication paths</li>
                  <li>• Network rebuilds after device failures</li>
                  <li>• Improved signal strength over distance</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Real-World Example */}
          <div className="p-4 bg-gradient-to-r from-green-900/20 to-blue-900/20 border border-green-600 rounded-lg">
            <h4 className="font-semibold text-foreground mb-3">How Mesh Works in Practice</h4>
            <p className="text-gray-300 text-sm mb-3">
              Imagine a smart sensor in your garden shed trying to communicate with a hub in your living room:
            </p>
            <div className="space-y-2 text-sm">
              <div className="p-2 bg-[#1a1a1a] border border-gray-700 rounded">
                <span className="text-yellow-300 font-medium">Without Mesh:</span>
                <span className="text-gray-300 ml-2">Signal blocked by walls → Communication fails</span>
              </div>
              <div className="p-2 bg-[#1a1a1a] border border-gray-700 rounded">
                <span className="text-green-300 font-medium">With Mesh:</span>
                <span className="text-gray-300 ml-2">Signal routes through kitchen light → garage sensor → hub</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Interactive Knowledge Check */}
      <Card className="bg-elec-gray border-gray-700">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Network className="h-5 w-5 text-elec-yellow" />
            Knowledge Check: Mesh Networking
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="p-3 bg-[#1a1a1a] border border-gray-600 rounded-lg">
              <p className="font-medium text-foreground">Q1: What is mesh networking?</p>
            </div>
            
            <div className="p-3 bg-[#1a1a1a] border border-gray-600 rounded-lg">
              <p className="font-medium text-foreground">Q2: How does self-healing work in mesh networks?</p>
            </div>
            
            <div className="p-3 bg-[#1a1a1a] border border-gray-600 rounded-lg">
              <p className="font-medium text-foreground">Q3: What's the main difference between mesh and star network topologies?</p>
            </div>
          </div>

          <Button 
            onClick={() => setShowAnswers(!showAnswers)}
            variant="outline" 
            className="w-full border-gray-600 text-gray-300 hover:bg-[#323232] hover:text-foreground"
          >
            {showAnswers ? <ChevronUp className="mr-2 h-4 w-4" /> : <ChevronDown className="mr-2 h-4 w-4" />}
            {showAnswers ? 'Hide Answers' : 'Show Answers'}
          </Button>

          {showAnswers && (
            <div className="space-y-3 pt-4 border-t border-gray-600">
              <div className="p-3 bg-[#0f0f0f] border border-gray-600 rounded-lg">
                <p className="font-medium text-elec-yellow mb-2">A1:</p>
                <p className="text-foreground">A network topology where devices can communicate through multiple paths, with each device acting as a potential repeater to extend coverage and create redundant communication routes.</p>
              </div>
              
              <div className="p-3 bg-[#0f0f0f] border border-gray-600 rounded-lg">
                <p className="font-medium text-elec-yellow mb-2">A2:</p>
                <p className="text-foreground">When a device in the mesh network fails or is removed, the network automatically finds alternative routes through other devices, ensuring communication continues without manual intervention.</p>
              </div>
              
              <div className="p-3 bg-[#0f0f0f] border border-gray-600 rounded-lg">
                <p className="font-medium text-elec-yellow mb-2">A3:</p>
                <p className="text-foreground">Mesh networks have multiple interconnected paths between devices, while star networks have all devices connecting to a single central point (like a router), making them more vulnerable to single points of failure.</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};