import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Home, ChevronDown, ChevronUp, Check, X, Wifi } from 'lucide-react';

export const LocalArchitecturesSection = () => {
  const [showAnswers, setShowAnswers] = useState(false);

  const platforms = [
    {
      name: "Home Assistant",
      description: "Open-source home automation platform",
      features: ["Extensive device support", "Local processing", "Privacy-focused", "Customisable automations"],
      skillLevel: "Intermediate to Advanced"
    },
    {
      name: "Hubitat Elevation",
      description: "Local processing smart home hub",
      features: ["Local automation", "Cloud backup", "Z-Wave/Zigbee support", "Rule machine"],
      skillLevel: "Intermediate"
    },
    {
      name: "Apple HomeKit",
      description: "Apple's smart home platform with local processing",
      features: ["Local automation", "Siri integration", "iOS ecosystem", "End-to-end encryption"],
      skillLevel: "Beginner to Intermediate"
    }
  ];

  const prosAndCons = [
    {
      type: "pros",
      items: [
        "Instant response times - no internet latency",
        "Works completely offline during internet outages", 
        "Enhanced privacy and data security",
        "No recurring cloud service fees",
        "Full control over system updates and features"
      ]
    },
    {
      type: "cons", 
      items: [
        "More complex initial setup and configuration",
        "Limited remote access capabilities",
        "Requires technical knowledge for maintenance",
        "Fewer integrated services compared to cloud",
        "Manual updates and feature additions"
      ]
    }
  ];

  return (
    <div className="space-y-6">
      {/* Learning Content */}
      <Card className="bg-elec-gray border-gray-700">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Home className="h-5 w-5 text-elec-yellow" />
            1. Local Architectures
          </CardTitle>
        </CardHeader>
        <CardContent className="text-gray-300 space-y-6">
          <p className="text-lg font-medium text-foreground mb-6">
            Local architectures process all automation decisions within the home using a dedicated controller or hub:
          </p>
          
          {/* How it Works */}
          <div className="p-4 bg-[#1a1a1a] border border-gray-600 rounded-lg">
            <h4 className="font-semibold text-foreground mb-3">How Local Processing Works</h4>
            <p className="text-gray-300 text-sm">
              All automation decisions happen within your home using a dedicated hub. Devices communicate directly 
              with the local controller, which processes rules and sends commands instantly without internet dependency.
            </p>
          </div>

          {/* Platform Examples */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Popular Local Platforms</h4>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 bg-gradient-to-br from-blue-900/30 to-blue-800/30 border border-blue-600 rounded-lg">
                <h5 className="font-semibold text-blue-200 mb-2">Home Assistant</h5>
                <p className="text-blue-100 text-sm mb-3">Open-source platform with extensive device support</p>
                <p className="text-blue-200 text-xs">Skill Level: Advanced</p>
              </div>
              <div className="p-4 bg-gradient-to-br from-blue-900/30 to-blue-800/30 border border-blue-600 rounded-lg">
                <h5 className="font-semibold text-blue-200 mb-2">Hubitat Elevation</h5>
                <p className="text-blue-100 text-sm mb-3">Local processing with cloud backup options</p>
                <p className="text-blue-200 text-xs">Skill Level: Intermediate</p>
              </div>
              <div className="p-4 bg-gradient-to-br from-blue-900/30 to-blue-800/30 border border-blue-600 rounded-lg">
                <h5 className="font-semibold text-blue-200 mb-2">Apple HomeKit</h5>
                <p className="text-blue-100 text-sm mb-3">Local automation with iOS ecosystem integration</p>
                <p className="text-blue-200 text-xs">Skill Level: Beginner</p>
              </div>
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

          {/* Use Cases */}
          <div className="p-4 bg-gradient-to-r from-indigo-900/30 to-purple-900/30 border border-indigo-600 rounded-lg">
            <h4 className="font-semibold text-foreground mb-3">When to Choose Local Architecture</h4>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <h5 className="font-medium text-indigo-200 mb-2">Perfect For:</h5>
                <ul className="space-y-1 text-indigo-100">
                  <li>• Privacy-conscious users</li>
                  <li>• Areas with poor internet</li>
                  <li>• Security-critical applications</li>
                  <li>• Tech-savvy homeowners</li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium text-indigo-200 mb-2">Avoid If:</h5>
                <ul className="space-y-1 text-indigo-100">
                  <li>• Limited technical expertise</li>
                  <li>• Want plug-and-play setup</li>
                  <li>• Need extensive cloud integrations</li>
                  <li>• Frequent remote access required</li>
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
            <Wifi className="h-5 w-5 text-elec-yellow" />
            Knowledge Check: Local Architectures
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="p-3 bg-[#1a1a1a] border border-gray-600 rounded-lg">
              <p className="font-medium text-foreground">Q1: What is the main characteristic of local smart home architectures?</p>
            </div>
            
            <div className="p-3 bg-[#1a1a1a] border border-gray-600 rounded-lg">
              <p className="font-medium text-foreground">Q2: Name two advantages of local processing over cloud-based systems.</p>
            </div>
            
            <div className="p-3 bg-[#1a1a1a] border border-gray-600 rounded-lg">
              <p className="font-medium text-foreground">Q3: Why might local architectures be preferred in rural areas?</p>
            </div>
            
            <div className="p-3 bg-[#1a1a1a] border border-gray-600 rounded-lg">
              <p className="font-medium text-foreground">Q4: What is one major disadvantage of local-only systems?</p>
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
                <p className="text-gray-300">All processing and automation decisions happen within the home using a local controller or hub, without requiring external server communication.</p>
              </div>
              
              <div className="p-3 bg-[#0f0f0f] border border-gray-600 rounded-lg">
                <p className="font-medium text-elec-yellow mb-2">A2:</p>
                <p className="text-gray-300">Instant response times (no internet latency), enhanced privacy/security (data stays local), works offline during internet outages, no recurring cloud fees.</p>
              </div>
              
              <div className="p-3 bg-[#0f0f0f] border border-gray-600 rounded-lg">
                <p className="font-medium text-elec-yellow mb-2">A3:</p>
                <p className="text-gray-300">Rural areas often have unreliable or slow internet connections. Local architectures continue functioning normally during internet outages and don't depend on external connectivity.</p>
              </div>
              
              <div className="p-3 bg-[#0f0f0f] border border-gray-600 rounded-lg">
                <p className="font-medium text-elec-yellow mb-2">A4:</p>
                <p className="text-gray-300">More complex setup and configuration requirements, limited remote access capabilities, requires technical knowledge for maintenance and troubleshooting.</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};