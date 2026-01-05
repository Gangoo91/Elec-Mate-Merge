import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Home, ChevronDown, ChevronUp, Wifi, Plug, Lightbulb, Thermometer } from 'lucide-react';

export const RetrofitInstallationsSection = () => {
  const [showAnswers, setShowAnswers] = useState(false);

  const practicalExamples = [
    {
      device: "Smart Plugs",
      icon: Plug,
      installation: "Plug into existing wall sockets",
      benefits: "Control any device remotely, power monitoring",
      typical_cost: "£15-50 each",
      difficulty: "Beginner"
    },
    {
      device: "Wi-Fi Smart Bulbs",
      icon: Lightbulb,
      installation: "Replace existing bulbs in standard fittings",
      benefits: "Dimming, colour changes, scheduling",
      typical_cost: "£10-40 each",
      difficulty: "Beginner"
    },
    {
      device: "Wireless Thermostats",
      icon: Thermometer,
      installation: "Replace wired thermostat, battery backup available",
      benefits: "Remote control, scheduling, energy savings",
      typical_cost: "£150-300",
      difficulty: "Intermediate"
    },
    {
      device: "Wireless Security Cameras",
      icon: Wifi,
      installation: "Mount externally, battery or solar powered",
      benefits: "Remote monitoring, motion detection, cloud storage",
      typical_cost: "£80-250 each",
      difficulty: "Intermediate"
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'text-green-400';
      case 'Intermediate': return 'text-yellow-400';
      case 'Advanced': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      {/* Learning Content */}
      <Card className="bg-elec-gray border-gray-700">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Home className="h-5 w-5 text-elec-yellow" />
            1. Retrofit Smart Home Installations
          </CardTitle>
        </CardHeader>
        <CardContent className="text-gray-300 space-y-6">
          <p className="text-lg font-medium text-foreground mb-4">
            Adding smart devices to existing wiring and infrastructure without major construction work.
          </p>
          
          {/* Key Characteristics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-[#1a1a1a] border border-gray-600 rounded-lg">
              <h4 className="font-semibold text-foreground mb-3">Strengths</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0"></div>
                  Accessible and cost-effective for small upgrades
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0"></div>
                  Minimal disruption to daily life
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0"></div>
                  No rewiring or construction required
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0"></div>
                  Immediate benefits and quick installation
                </li>
              </ul>
            </div>
            
            <div className="p-4 bg-[#1a1a1a] border border-gray-600 rounded-lg">
              <h4 className="font-semibold text-foreground mb-3">Limitations</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0"></div>
                  Harder to integrate whole-home systems
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0"></div>
                  Signal range and reliability issues
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0"></div>
                  Aesthetic compromises with visible devices
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0"></div>
                  Limited scalability for complex automation
                </li>
              </ul>
            </div>
          </div>

          {/* Practical Examples */}
          <div>
            <h4 className="font-semibold text-foreground mb-4 text-lg">Practical Examples for Retrofit</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {practicalExamples.map((example, index) => (
                <div key={index} className="p-4 bg-[#1a1a1a] border border-gray-600 rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <example.icon className="h-5 w-5 text-elec-yellow" />
                    <h5 className="font-semibold text-foreground">{example.device}</h5>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-gray-400">Installation: </span>
                      <span className="text-gray-300">{example.installation}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Benefits: </span>
                      <span className="text-gray-300">{example.benefits}</span>
                    </div>
                    <div className="flex justify-between items-center pt-2">
                      <span className="text-elec-yellow font-medium">{example.typical_cost}</span>
                      <span className={`text-xs font-medium ${getDifficultyColor(example.difficulty)}`}>
                        {example.difficulty}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Common Technologies */}
          <div className="p-4 bg-elec-gray border border-gray-600 rounded-lg">
            <h4 className="font-semibold text-foreground mb-3">Common Wireless Technologies</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
              <div className="text-center p-3 bg-[#1a1a1a] rounded">
                <h5 className="font-medium text-blue-300 mb-2">Wi-Fi</h5>
                <p className="text-blue-100">High bandwidth, internet connectivity, existing infrastructure</p>
              </div>
              <div className="text-center p-3 bg-[#1a1a1a] rounded">
                <h5 className="font-medium text-green-300 mb-2">Zigbee</h5>
                <p className="text-green-100">Low power, mesh network, reliable for sensors</p>
              </div>
              <div className="text-center p-3 bg-[#1a1a1a] rounded">
                <h5 className="font-medium text-purple-300 mb-2">Z-Wave</h5>
                <p className="text-purple-100">Dedicated frequency, strong mesh, good range</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Interactive Knowledge Check */}
      <Card className="bg-elec-gray border-gray-700">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Home className="h-5 w-5 text-elec-yellow" />
            Knowledge Check: Retrofit Installations
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="p-3 bg-[#1a1a1a] border border-gray-600 rounded-lg">
              <p className="font-medium text-foreground">Q1: Why are wireless protocols commonly used in retrofit installations?</p>
            </div>
            
            <div className="p-3 bg-[#1a1a1a] border border-gray-600 rounded-lg">
              <p className="font-medium text-foreground">Q2: What is one major limitation of retrofit smart home systems?</p>
            </div>
            
            <div className="p-3 bg-[#1a1a1a] border border-gray-600 rounded-lg">
              <p className="font-medium text-foreground">Q3: Give a practical example of a beginner-level retrofit device.</p>
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
                <p className="text-gray-300">Wireless protocols avoid the need for rewiring or major construction work, making installation quick and minimally disruptive to existing homes.</p>
              </div>
              
              <div className="p-3 bg-[#0f0f0f] border border-gray-600 rounded-lg">
                <p className="font-medium text-elec-yellow mb-2">A2:</p>
                <p className="text-gray-300">Difficulty integrating whole-home systems due to signal range limitations, aesthetic compromises, and challenges with complex automation.</p>
              </div>
              
              <div className="p-3 bg-[#0f0f0f] border border-gray-600 rounded-lg">
                <p className="font-medium text-elec-yellow mb-2">A3:</p>
                <p className="text-gray-300">Smart plugs or Wi-Fi smart bulbs - these require no wiring, simply plug in or screw in to existing fittings.</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};