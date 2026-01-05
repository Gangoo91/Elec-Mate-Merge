import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Cloud, ChevronDown, ChevronUp, Check, X, Smartphone } from 'lucide-react';

export const CloudArchitecturesSection = () => {
  const [showAnswers, setShowAnswers] = useState(false);

  const platforms = [
    {
      name: "Amazon Alexa",
      description: "Voice-controlled smart home ecosystem",
      features: ["Voice control", "Skills marketplace", "Easy setup", "Wide device support"],
      company: "Amazon",
      primaryUse: "Voice automation and entertainment"
    },
    {
      name: "Google Home",
      description: "Google's smart home and assistant platform",
      features: ["Google Assistant", "Chromecast integration", "Routine automation", "Search capabilities"],
      company: "Google",
      primaryUse: "Information and media control"
    },
    {
      name: "SmartThings",
      description: "Samsung's cloud-based smart home platform",
      features: ["Multi-protocol support", "Scene automation", "Third-party integrations", "Mobile app control"],
      company: "Samsung",
      primaryUse: "Device coordination and automation"
    }
  ];

  const prosAndCons = [
    {
      type: "pros",
      items: [
        "Extremely easy setup - often plug-and-play",
        "Remote access from anywhere with internet",
        "Continuous feature updates and improvements", 
        "Extensive third-party service integrations",
        "Professional support and documentation"
      ]
    },
    {
      type: "cons", 
      items: [
        "Complete reliance on internet connectivity",
        "Potential latency and response delays",
        "Privacy concerns with data sharing",
        "Recurring subscription costs possible",
        "Limited control over system updates"
      ]
    }
  ];

  return (
    <div className="space-y-6">
      {/* Learning Content */}
      <Card className="bg-elec-gray border-gray-700">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Cloud className="h-5 w-5 text-elec-yellow" />
            2. Cloud Architectures
          </CardTitle>
        </CardHeader>
        <CardContent className="text-gray-300 space-y-6">
          <p className="text-lg font-medium text-foreground mb-6">
            Cloud architectures route device communications through remote servers where automation decisions are processed:
          </p>
          
          {/* How it Works */}
          <div className="p-4 bg-[#1a1a1a] border border-gray-600 rounded-lg">
            <h4 className="font-semibold text-foreground mb-3">How Cloud Processing Works</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-green-600 text-foreground rounded-full flex items-center justify-center text-xs font-bold">1</div>
                <div>
                  <span className="font-medium text-foreground">Device to Cloud:</span>
                  <span className="text-gray-300 ml-2">Smart devices connect to the internet and send status updates to cloud servers</span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-green-600 text-foreground rounded-full flex items-center justify-center text-xs font-bold">2</div>
                <div>
                  <span className="font-medium text-foreground">Server Processing:</span>
                  <span className="text-gray-300 ml-2">Cloud servers evaluate automation rules, process user commands, and determine appropriate responses</span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-green-600 text-foreground rounded-full flex items-center justify-center text-xs font-bold">3</div>
                <div>
                  <span className="font-medium text-foreground">Cloud to Device:</span>
                  <span className="text-gray-300 ml-2">Commands are sent back through the internet to target devices for execution</span>
                </div>
              </div>
            </div>
          </div>

          {/* Platform Examples */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Popular Cloud Platforms</h4>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {platforms.map((platform, index) => (
                <div key={index} className="p-4 bg-gradient-to-br from-green-900/30 to-green-800/30 border border-green-600 rounded-lg">
                  <h5 className="font-semibold text-green-200 mb-2">{platform.name}</h5>
                  <p className="text-green-100 text-sm mb-3">{platform.description}</p>
                  <div className="space-y-2">
                    <div className="text-xs">
                      <span className="font-medium text-green-200">Features:</span>
                      <ul className="mt-1 space-y-1">
                        {platform.features.map((feature, idx) => (
                          <li key={idx} className="text-green-100 flex items-center gap-1">
                            <div className="w-1 h-1 bg-green-400 rounded-full"></div>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="text-xs">
                      <span className="font-medium text-green-200">Primary Use:</span>
                      <span className="text-green-100 ml-1">{platform.primaryUse}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pros and Cons */}
          <div className="grid md:grid-cols-2 gap-4">
            {prosAndCons.map((section) => (
              <div key={section.type} className={`p-4 rounded-lg border ${
                section.type === 'pros' 
                  ? 'bg-gradient-to-br from-green-900/30 to-green-800/30 border-green-600' 
                  : 'bg-gradient-to-br from-red-900/30 to-red-800/30 border-red-600'
              }`}>
                <h5 className={`font-semibold mb-3 flex items-center gap-2 ${
                  section.type === 'pros' ? 'text-green-200' : 'text-red-200'
                }`}>
                  {section.type === 'pros' ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
                  {section.type === 'pros' ? 'Advantages' : 'Disadvantages'}
                </h5>
                <ul className="space-y-2">
                  {section.items.map((item, idx) => (
                    <li key={idx} className={`text-sm flex items-start gap-2 ${
                      section.type === 'pros' ? 'text-green-100' : 'text-red-100'
                    }`}>
                      <div className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${
                        section.type === 'pros' ? 'bg-green-400' : 'bg-red-400'
                      }`}></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Latency Considerations */}
          <div className="p-4 bg-gradient-to-r from-yellow-900/30 to-orange-900/30 border border-yellow-600 rounded-lg">
            <h4 className="font-semibold text-foreground mb-3">Latency and Performance Factors</h4>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <h5 className="font-medium text-yellow-200 mb-2">Factors Affecting Response Time:</h5>
                <ul className="space-y-1 text-yellow-100">
                  <li>• Internet connection speed and stability</li>
                  <li>• Server load and geographic distance</li>
                  <li>• Device processing and Wi-Fi performance</li>
                  <li>• Network congestion and traffic routing</li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium text-yellow-200 mb-2">Typical Response Times:</h5>
                <ul className="space-y-1 text-yellow-100">
                  <li>• Voice commands: 1-3 seconds</li>
                  <li>• App-triggered actions: 2-5 seconds</li>
                  <li>• Automation triggers: 3-10 seconds</li>
                  <li>• During outages: Complete failure</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Use Cases */}
          <div className="p-4 bg-gradient-to-r from-cyan-900/30 to-blue-900/30 border border-cyan-600 rounded-lg">
            <h4 className="font-semibold text-foreground mb-3">Ideal Use Cases</h4>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <h5 className="font-medium text-cyan-200 mb-2">Perfect For:</h5>
                <ul className="space-y-1 text-cyan-100">
                  <li>• First-time smart home users</li>
                  <li>• Renters with temporary installations</li>
                  <li>• Users wanting minimal maintenance</li>
                  <li>• Heavy integration with online services</li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium text-cyan-200 mb-2">Consider Alternatives If:</h5>
                <ul className="space-y-1 text-cyan-100">
                  <li>• Poor or unreliable internet connection</li>
                  <li>• Privacy is a primary concern</li>
                  <li>• Real-time responses are critical</li>
                  <li>• Avoiding recurring fees is important</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Interactive Knowledge Check */}
      <Card className="bg-elec-gray border-gray-700">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Smartphone className="h-5 w-5 text-elec-yellow" />
            Knowledge Check: Cloud Architectures
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="p-3 bg-[#1a1a1a] border border-gray-600 rounded-lg">
              <p className="font-medium text-foreground">Q1: How do cloud-based smart home systems process automation decisions?</p>
            </div>
            
            <div className="p-3 bg-[#1a1a1a] border border-gray-600 rounded-lg">
              <p className="font-medium text-foreground">Q2: What is the biggest advantage of cloud systems for new users?</p>
            </div>
            
            <div className="p-3 bg-[#1a1a1a] border border-gray-600 rounded-lg">
              <p className="font-medium text-foreground">Q3: What happens to a cloud-based system during an internet outage?</p>
            </div>
            
            <div className="p-3 bg-[#1a1a1a] border border-gray-600 rounded-lg">
              <p className="font-medium text-foreground">Q4: Why might latency be a concern with cloud architectures?</p>
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
                <p className="text-gray-300">Devices send data to remote servers via the internet, where automation rules are processed and commands are sent back to devices through the cloud.</p>
              </div>
              
              <div className="p-3 bg-[#0f0f0f] border border-gray-600 rounded-lg">
                <p className="font-medium text-elec-yellow mb-2">A2:</p>
                <p className="text-gray-300">Extremely easy setup - often plug-and-play installation with minimal technical knowledge required, plus professional support and documentation.</p>
              </div>
              
              <div className="p-3 bg-[#0f0f0f] border border-gray-600 rounded-lg">
                <p className="font-medium text-elec-yellow mb-2">A3:</p>
                <p className="text-gray-300">The system becomes completely non-functional as it cannot communicate with cloud servers to process automation or receive commands.</p>
              </div>
              
              <div className="p-3 bg-[#0f0f0f] border border-gray-600 rounded-lg">
                <p className="font-medium text-elec-yellow mb-2">A4:</p>
                <p className="text-gray-300">Commands must travel to remote servers and back, adding delays. Internet speed, server load, and network congestion can cause response times of several seconds.</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};