import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Layers, ChevronDown, ChevronUp, Check, X, Zap } from 'lucide-react';

export const HybridArchitecturesSection = () => {
  const [showAnswers, setShowAnswers] = useState(false);

  const platforms = [
    {
      name: "Hubitat + Alexa",
      description: "Local processing with cloud voice control",
      features: ["Local automation", "Cloud voice commands", "Redundant operation", "Best of both worlds"],
      setup: "Intermediate"
    },
    {
      name: "Home Assistant + Cloud",
      description: "Local hub with cloud integrations",
      features: ["Local control", "Cloud services", "Remote access", "Third-party APIs"],
      setup: "Advanced"
    },
    {
      name: "Apple HomeKit + iCloud",
      description: "Local processing with cloud synchronisation",
      features: ["Local automation", "Cross-device sync", "Remote access", "End-to-end encryption"],
      setup: "Beginner to Intermediate"
    }
  ];

  const prosAndCons = [
    {
      type: "pros",
      items: [
        "Combines speed of local with features of cloud",
        "Redundancy - partial operation during outages",
        "Flexible scaling based on needs",
        "Balance of privacy and convenience",
        "Can optimise critical vs non-critical functions"
      ]
    },
    {
      type: "cons", 
      items: [
        "More complex system architecture",
        "Potential for conflicting automation rules",
        "Higher setup and maintenance requirements",
        "Cost of both local and cloud components",
        "Troubleshooting complexity increases"
      ]
    }
  ];

  return (
    <div className="space-y-6">
      {/* Learning Content */}
      <Card className="bg-elec-gray border-gray-700">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Layers className="h-5 w-5 text-elec-yellow" />
            3. Hybrid Architectures
          </CardTitle>
        </CardHeader>
        <CardContent className="text-gray-300 space-y-6">
          <p className="text-lg font-medium text-foreground mb-6">
            Hybrid architectures combine local processing capabilities with cloud services to optimise performance and functionality:
          </p>
          
          {/* How it Works */}
          <div className="p-4 bg-[#1a1a1a] border border-gray-600 rounded-lg">
            <h4 className="font-semibold text-foreground mb-3">How Hybrid Processing Works</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-purple-600 text-foreground rounded-full flex items-center justify-center text-xs font-bold">1</div>
                <div>
                  <span className="font-medium text-foreground">Local Priority:</span>
                  <span className="text-gray-300 ml-2">Critical functions (lighting, security, HVAC) process locally for immediate response</span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-purple-600 text-foreground rounded-full flex items-center justify-center text-xs font-bold">2</div>
                <div>
                  <span className="font-medium text-foreground">Cloud Enhancement:</span>
                  <span className="text-gray-300 ml-2">Advanced features (voice control, AI, remote access) utilise cloud services when available</span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-purple-600 text-foreground rounded-full flex items-center justify-center text-xs font-bold">3</div>
                <div>
                  <span className="font-medium text-foreground">Intelligent Routing:</span>
                  <span className="text-gray-300 ml-2">System automatically determines optimal processing location based on function type and connectivity</span>
                </div>
              </div>
            </div>
          </div>

          {/* Architecture Diagram */}
          <div className="p-4 bg-gradient-to-r from-purple-900/30 to-indigo-900/30 border border-purple-600 rounded-lg">
            <h4 className="font-semibold text-foreground mb-4">Hybrid System Components</h4>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-lg mx-auto mb-2 flex items-center justify-center">
                  <span className="text-foreground font-bold">LOCAL</span>
                </div>
                <h5 className="font-medium text-blue-200 mb-1">Critical Functions</h5>
                <p className="text-blue-100">Security, lighting, HVAC control</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-600 rounded-lg mx-auto mb-2 flex items-center justify-center">
                  <span className="text-foreground font-bold">CLOUD</span>
                </div>
                <h5 className="font-medium text-green-200 mb-1">Enhanced Features</h5>
                <p className="text-green-100">Voice control, AI, remote access</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-600 rounded-lg mx-auto mb-2 flex items-center justify-center">
                  <span className="text-foreground font-bold">SYNC</span>
                </div>
                <h5 className="font-medium text-purple-200 mb-1">Coordination</h5>
                <p className="text-purple-100">Data sharing, backup, updates</p>
              </div>
            </div>
          </div>

          {/* Platform Examples */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Popular Hybrid Implementations</h4>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {platforms.map((platform, index) => (
                <div key={index} className="p-4 bg-gradient-to-br from-purple-900/30 to-purple-800/30 border border-purple-600 rounded-lg">
                  <h5 className="font-semibold text-purple-200 mb-2">{platform.name}</h5>
                  <p className="text-purple-100 text-sm mb-3">{platform.description}</p>
                  <div className="space-y-2">
                    <div className="text-xs">
                      <span className="font-medium text-purple-200">Features:</span>
                      <ul className="mt-1 space-y-1">
                        {platform.features.map((feature, idx) => (
                          <li key={idx} className="text-purple-100 flex items-center gap-1">
                            <div className="w-1 h-1 bg-purple-400 rounded-full"></div>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="text-xs">
                      <span className="font-medium text-purple-200">Setup Level:</span>
                      <span className="text-purple-100 ml-1">{platform.setup}</span>
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

          {/* Use Cases */}
          <div className="p-4 bg-gradient-to-r from-orange-900/30 to-yellow-900/30 border border-orange-600 rounded-lg">
            <h4 className="font-semibold text-foreground mb-3">Ideal Use Cases</h4>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <h5 className="font-medium text-orange-200 mb-2">Perfect For:</h5>
                <ul className="space-y-1 text-orange-100">
                  <li>• Larger homes with complex automation</li>
                  <li>• Professional or commercial installations</li>
                  <li>• Users wanting both reliability and features</li>
                  <li>• Gradual migration from cloud to local</li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium text-orange-200 mb-2">Consider Alternatives If:</h5>
                <ul className="space-y-1 text-orange-100">
                  <li>• Simple automation needs only</li>
                  <li>• Limited technical expertise available</li>
                  <li>• Budget constraints for dual systems</li>
                  <li>• Preference for single-vendor solutions</li>
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
            <Zap className="h-5 w-5 text-elec-yellow" />
            Knowledge Check: Hybrid Architectures
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="p-3 bg-[#1a1a1a] border border-gray-600 rounded-lg">
              <p className="font-medium text-foreground">Q1: What is the main benefit of hybrid smart home architectures?</p>
            </div>
            
            <div className="p-3 bg-[#1a1a1a] border border-gray-600 rounded-lg">
              <p className="font-medium text-foreground">Q2: Which functions typically remain local in a hybrid system?</p>
            </div>
            
            <div className="p-3 bg-[#1a1a1a] border border-gray-600 rounded-lg">
              <p className="font-medium text-foreground">Q3: What happens during an internet outage in a well-designed hybrid system?</p>
            </div>
            
            <div className="p-3 bg-[#1a1a1a] border border-gray-600 rounded-lg">
              <p className="font-medium text-foreground">Q4: Why might hybrid systems be more complex to troubleshoot?</p>
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
                <p className="text-gray-300">Combines the speed and reliability of local processing with the advanced features and convenience of cloud services, providing balanced performance.</p>
              </div>
              
              <div className="p-3 bg-[#0f0f0f] border border-gray-600 rounded-lg">
                <p className="font-medium text-elec-yellow mb-2">A2:</p>
                <p className="text-gray-300">Critical functions like security systems, lighting control, HVAC, and basic automation routines remain local for immediate response and reliability.</p>
              </div>
              
              <div className="p-3 bg-[#0f0f0f] border border-gray-600 rounded-lg">
                <p className="font-medium text-elec-yellow mb-2">A3:</p>
                <p className="text-gray-300">Essential functions continue operating locally while cloud-dependent features (voice control, remote access) become unavailable until connectivity is restored.</p>
              </div>
              
              <div className="p-3 bg-[#0f0f0f] border border-gray-600 rounded-lg">
                <p className="font-medium text-elec-yellow mb-2">A4:</p>
                <p className="text-gray-300">Problems could originate from local components, cloud services, or the interaction between them, requiring knowledge of multiple systems and potential conflicting rules.</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};