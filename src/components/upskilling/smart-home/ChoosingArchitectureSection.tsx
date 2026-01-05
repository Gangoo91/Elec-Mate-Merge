import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Settings, ChevronDown, ChevronUp, User, Building, CreditCard, Wrench } from 'lucide-react';

export const ChoosingArchitectureSection = () => {
  const [showAnswers, setShowAnswers] = useState(false);

  const decisionFactors = [
    {
      category: "User Requirements",
      icon: User,
      factors: [
        { name: "Technical Expertise", local: "High", cloud: "Low", hybrid: "Medium-High" },
        { name: "Setup Preference", local: "Custom", cloud: "Plug-and-play", hybrid: "Flexible" },
        { name: "Privacy Priority", local: "Maximum", cloud: "Shared", hybrid: "Selective" },
        { name: "Control Level", local: "Complete", cloud: "Limited", hybrid: "Balanced" }
      ]
    },
    {
      category: "Building Characteristics",
      icon: Building,
      factors: [
        { name: "Internet Reliability", local: "Not critical", cloud: "Essential", hybrid: "Important" },
        { name: "Building Type", local: "Any", cloud: "Permanent", hybrid: "Any" },
        { name: "Installation Complexity", local: "Can be complex", cloud: "Simple", hybrid: "Medium" },
        { name: "Future Expansion", local: "Limited by hub", cloud: "Unlimited", hybrid: "Flexible" }
      ]
    },
    {
      category: "Budget Considerations",
      icon: CreditCard,
      factors: [
        { name: "Upfront Cost", local: "Medium-High", cloud: "Low", hybrid: "High" },
        { name: "Ongoing Costs", local: "None", cloud: "Possible subscriptions", hybrid: "Mixed" },
        { name: "Maintenance", local: "DIY/Professional", cloud: "Minimal", hybrid: "Professional" },
        { name: "Upgrade Path", local: "Hardware replacement", cloud: "Automatic", hybrid: "Both" }
      ]
    }
  ];

  const recommendations = [
    {
      title: "Choose Local If:",
      items: [
        "Privacy and data security are paramount",
        "Internet connectivity is unreliable",
        "You have technical expertise or professional help",
        "Real-time response is critical (security, safety)",
        "You want complete control over your system"
      ],
      color: "blue"
    },
    {
      title: "Choose Cloud If:",
      items: [
        "Ease of setup and use is most important",
        "You want the latest features and integrations",
        "Technical maintenance is not desired",
        "Renting or temporary installation",
        "Heavy use of voice assistants and online services"
      ],
      color: "green"
    },
    {
      title: "Choose Hybrid If:",
      items: [
        "You need both reliability and advanced features",
        "Budget allows for comprehensive system",
        "Professional installation is available",
        "Large or complex home automation needs",
        "Gradual migration strategy from cloud to local"
      ],
      color: "purple"
    }
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue': return 'from-blue-900/30 to-blue-800/30 border-blue-600 text-blue-100';
      case 'green': return 'from-green-900/30 to-green-800/30 border-green-600 text-green-100';
      case 'purple': return 'from-purple-900/30 to-purple-800/30 border-purple-600 text-purple-100';
      default: return 'from-gray-900/30 to-gray-800/30 border-gray-600 text-gray-100';
    }
  };

  return (
    <div className="space-y-6">
      {/* Learning Content */}
      <Card className="bg-elec-gray border-gray-700">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Settings className="h-5 w-5 text-elec-yellow" />
            5. Choosing the Right Architecture
          </CardTitle>
        </CardHeader>
        <CardContent className="text-gray-300 space-y-6">
          <p className="text-lg font-medium text-foreground mb-6">
            Selecting the optimal architecture requires careful consideration of multiple factors specific to your situation:
          </p>
          
          {/* Decision Factors */}
          <div className="space-y-6">
            {decisionFactors.map((category, index) => (
              <div key={index} className="p-4 bg-[#1a1a1a] border border-gray-600 rounded-lg">
                <div className="flex items-center gap-3 mb-4">
                  <category.icon className="h-5 w-5 text-elec-yellow" />
                  <h4 className="font-semibold text-foreground text-lg">{category.category}</h4>
                </div>
                
                {/* Mobile-first responsive table */}
                <div className="hidden sm:block">
                  <div className="grid grid-cols-4 gap-4 mb-2 text-xs font-medium text-gray-400">
                    <div></div>
                    <div className="text-blue-400">Local</div>
                    <div className="text-green-400">Cloud</div>
                    <div className="text-purple-400">Hybrid</div>
                  </div>
                  <div className="space-y-3">
                    {category.factors.map((factor, idx) => (
                      <div key={idx} className="grid grid-cols-4 gap-4 p-3 bg-[#0f0f0f] border border-gray-700 rounded">
                        <div className="font-medium text-foreground text-sm">{factor.name}</div>
                        <div className="text-blue-300 text-sm">{factor.local}</div>
                        <div className="text-green-300 text-sm">{factor.cloud}</div>
                        <div className="text-purple-300 text-sm">{factor.hybrid}</div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Mobile layout */}
                <div className="sm:hidden space-y-4">
                  {category.factors.map((factor, idx) => (
                    <div key={idx} className="p-3 bg-[#0f0f0f] border border-gray-700 rounded">
                      <div className="font-medium text-foreground mb-3 text-sm">{factor.name}</div>
                      <div className="grid grid-cols-3 gap-3 text-xs">
                        <div className="text-center">
                          <div className="text-blue-400 font-medium mb-1">Local</div>
                          <div className="text-blue-300">{factor.local}</div>
                        </div>
                        <div className="text-center">
                          <div className="text-green-400 font-medium mb-1">Cloud</div>
                          <div className="text-green-300">{factor.cloud}</div>
                        </div>
                        <div className="text-center">
                          <div className="text-purple-400 font-medium mb-1">Hybrid</div>
                          <div className="text-purple-300">{factor.hybrid}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Recommendations */}
          <div>
            <h4 className="font-semibold text-foreground mb-4 text-lg">Architecture Selection Guide</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {recommendations.map((rec, index) => (
                <div key={index} className="p-4 bg-elec-gray border border-gray-600 rounded-lg">
                  <h5 className="font-semibold mb-3 text-base sm:text-lg text-foreground">{rec.title}</h5>
                  <ul className="space-y-2">
                    {rec.items.map((item, idx) => (
                      <li key={idx} className="text-sm flex items-start gap-2 text-gray-300">
                        <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 bg-elec-yellow"></div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Decision Flowchart */}
          <div className="p-3 sm:p-4 bg-elec-gray border border-gray-600 rounded-lg">
            <h4 className="font-semibold text-foreground mb-4">Quick Decision Flowchart</h4>
            <div className="space-y-3 text-sm">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 p-3 bg-[#1a1a1a] rounded">
                <div className="w-8 h-8 bg-elec-yellow text-elec-dark rounded-full flex items-center justify-center font-bold text-xs flex-shrink-0">1</div>
                <div className="flex-1">
                  <span className="text-foreground font-medium block">Do you need offline operation?</span>
                  <span className="text-gray-300 text-xs">YES → Local or Hybrid | NO → Continue</span>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 p-3 bg-[#1a1a1a] rounded">
                <div className="w-8 h-8 bg-elec-yellow text-elec-dark rounded-full flex items-center justify-center font-bold text-xs flex-shrink-0">2</div>
                <div className="flex-1">
                  <span className="text-foreground font-medium block">Is easy setup a priority?</span>
                  <span className="text-gray-300 text-xs">YES → Cloud or Hybrid | NO → Continue</span>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 p-3 bg-[#1a1a1a] rounded">
                <div className="w-8 h-8 bg-elec-yellow text-elec-dark rounded-full flex items-center justify-center font-bold text-xs flex-shrink-0">3</div>
                <div className="flex-1">
                  <span className="text-foreground font-medium block">Do you want maximum control?</span>
                  <span className="text-gray-300 text-xs">YES → Local | NO → Cloud</span>
                </div>
              </div>
            </div>
          </div>

          {/* Integration Considerations */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-elec-gray border border-gray-600 rounded-lg">
              <h4 className="font-semibold text-foreground mb-3">Third-Party Integrations</h4>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-elec-yellow flex-shrink-0"></div>
                  Voice assistants (Alexa, Google)
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-elec-yellow flex-shrink-0"></div>
                  Music streaming services
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-elec-yellow flex-shrink-0"></div>
                  Weather and news services
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-elec-yellow flex-shrink-0"></div>
                  Security monitoring companies
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-elec-yellow flex-shrink-0"></div>
                  Energy utility integrations
                </li>
              </ul>
              <p className="text-elec-yellow text-xs mt-3 font-medium">Best with: Cloud or Hybrid systems</p>
            </div>
            
            <div className="p-4 bg-elec-gray border border-gray-600 rounded-lg">
              <h4 className="font-semibold text-foreground mb-3">Technical Skills Required</h4>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-elec-yellow flex-shrink-0"></div>
                  Network configuration knowledge
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-elec-yellow flex-shrink-0"></div>
                  Device troubleshooting ability
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-elec-yellow flex-shrink-0"></div>
                  Automation logic programming
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-elec-yellow flex-shrink-0"></div>
                  Security and privacy setup
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-elec-yellow flex-shrink-0"></div>
                  System maintenance and updates
                </li>
              </ul>
              <p className="text-elec-yellow text-xs mt-3 font-medium">Essential for: Local systems</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Interactive Knowledge Check */}
      <Card className="bg-elec-gray border-gray-700">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Wrench className="h-5 w-5 text-elec-yellow" />
            Knowledge Check: Choosing Architecture
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="p-3 bg-[#1a1a1a] border border-gray-600 rounded-lg">
              <p className="font-medium text-foreground">Q1: What is the most important factor when choosing a smart home architecture?</p>
            </div>
            
            <div className="p-3 bg-[#1a1a1a] border border-gray-600 rounded-lg">
              <p className="font-medium text-foreground">Q2: Why might someone in a rural area prefer local architecture?</p>
            </div>
            
            <div className="p-3 bg-[#1a1a1a] border border-gray-600 rounded-lg">
              <p className="font-medium text-foreground">Q3: What type of user would benefit most from a hybrid system?</p>
            </div>
            
            <div className="p-3 bg-[#1a1a1a] border border-gray-600 rounded-lg">
              <p className="font-medium text-foreground">Q4: Name one scenario where cloud architecture is clearly the best choice.</p>
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
                <p className="text-gray-300">The user's specific needs and priorities - there's no universally "best" architecture, only the best fit for particular requirements like privacy, ease of use, or reliability.</p>
              </div>
              
              <div className="p-3 bg-[#0f0f0f] border border-gray-600 rounded-lg">
                <p className="font-medium text-elec-yellow mb-2">A2:</p>
                <p className="text-gray-300">Rural areas often have unreliable or slow internet connections, making cloud-dependent systems unreliable. Local architecture works completely offline.</p>
              </div>
              
              <div className="p-3 bg-[#0f0f0f] border border-gray-600 rounded-lg">
                <p className="font-medium text-elec-yellow mb-2">A3:</p>
                <p className="text-gray-300">Users with complex automation needs who want both reliability and advanced features, typically in larger homes with professional installation and higher budgets.</p>
              </div>
              
              <div className="p-3 bg-[#0f0f0f] border border-gray-600 rounded-lg">
                <p className="font-medium text-elec-yellow mb-2">A4:</p>
                <p className="text-gray-300">Renters wanting temporary installations, first-time users prioritising ease of setup, or users heavily relying on voice assistants and online service integrations.</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};