import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Building, ChevronDown, ChevronUp, Cable, Server, Zap, Shield } from 'lucide-react';

export const NewBuildInstallationsSection = () => {
  const [showAnswers, setShowAnswers] = useState(false);

  const practicalExamples = [
    {
      system: "Structured Cabling",
      icon: Cable,
      implementation: "Cat 6 ethernet throughout, fibre backbone",
      benefits: "High-speed networking, future-proof, reliable",
      typical_cost: "£2,000-5,000",
      planning_stage: "Design"
    },
    {
      system: "Central Control Hub",
      icon: Server,
      implementation: "Dedicated cabinet with UPS, central processor",
      benefits: "Centralised control, easy maintenance, professional finish",
      typical_cost: "£1,500-4,000",
      planning_stage: "Pre-construction"
    },
    {
      system: "Smart Lighting Circuits",
      icon: Zap,
      implementation: "Dedicated circuits for smart switches and dimmers",
      benefits: "Whole-home lighting control, scene management",
      typical_cost: "£3,000-8,000",
      planning_stage: "Electrical planning"
    },
    {
      system: "Integrated Security",
      icon: Shield,
      implementation: "Wired cameras, sensors, access control",
      benefits: "Professional security system, hidden wiring",
      typical_cost: "£5,000-15,000",
      planning_stage: "Design"
    }
  ];

  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'Design': return 'text-blue-400';
      case 'Pre-construction': return 'text-green-400';
      case 'Electrical planning': return 'text-yellow-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      {/* Learning Content */}
      <Card className="bg-elec-gray border-gray-700">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Building className="h-5 w-5 text-elec-yellow" />
            2. New Build Smart Home Installations
          </CardTitle>
        </CardHeader>
        <CardContent className="text-gray-300 space-y-6">
          <p className="text-lg font-medium text-foreground mb-4">
            Smart systems integrated at the design and construction stage for optimal performance and aesthetics.
          </p>
          
          {/* Key Characteristics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-[#1a1a1a] border border-gray-600 rounded-lg">
              <h4 className="font-semibold text-foreground mb-3">Strengths</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0"></div>
                  Seamless integration with architecture
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0"></div>
                  Higher reliability with structured cabling
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0"></div>
                  Long-term scalability and future-proofing
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0"></div>
                  Professional finish with hidden cabling
                </li>
              </ul>
            </div>
            
            <div className="p-4 bg-[#1a1a1a] border border-gray-600 rounded-lg">
              <h4 className="font-semibold text-foreground mb-3">Limitations</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0"></div>
                  Higher upfront investment costs
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0"></div>
                  Requires early planning and design decisions
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0"></div>
                  Complex coordination with construction team
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0"></div>
                  Less flexibility once construction is complete
                </li>
              </ul>
            </div>
          </div>

          {/* Practical Examples */}
          <div>
            <h4 className="font-semibold text-foreground mb-4 text-lg">Practical Examples for New Build</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {practicalExamples.map((example, index) => (
                <div key={index} className="p-4 bg-[#1a1a1a] border border-gray-600 rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <example.icon className="h-5 w-5 text-elec-yellow" />
                    <h5 className="font-semibold text-foreground">{example.system}</h5>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-gray-400">Implementation: </span>
                      <span className="text-gray-300">{example.implementation}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Benefits: </span>
                      <span className="text-gray-300">{example.benefits}</span>
                    </div>
                    <div className="flex justify-between items-center pt-2">
                      <span className="text-elec-yellow font-medium">{example.typical_cost}</span>
                      <span className={`text-xs font-medium ${getStageColor(example.planning_stage)}`}>
                        {example.planning_stage}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Future-Proofing Strategies */}
          <div className="p-4 bg-elec-gray border border-gray-600 rounded-lg">
            <h4 className="font-semibold text-foreground mb-3">Future-Proofing Strategies</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div>
                <h5 className="font-medium text-blue-300 mb-2">Infrastructure</h5>
                <ul className="space-y-1 text-blue-100">
                  <li>• Spare conduits for future cables</li>
                  <li>• Over-specification of electrical capacity</li>
                  <li>• Central equipment cabinet space</li>
                  <li>• Fiber optic backbone installation</li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium text-green-300 mb-2">Technology</h5>
                <ul className="space-y-1 text-green-100">
                  <li>• Cat 6A cabling for high-speed networks</li>
                  <li>• Multiple protocol support</li>
                  <li>• Modular control systems</li>
                  <li>• Upgrade-friendly hardware choices</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Real-World Case Study */}
          <div className="p-4 bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-600 rounded-lg">
            <h4 className="font-semibold text-foreground mb-3">Case Study: Luxury New Build</h4>
            <p className="text-sm text-gray-300 mb-3">
              A £800,000 new build integrated a comprehensive smart home system during construction:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div>
                <h5 className="font-medium text-blue-300 mb-2">Systems Included</h5>
                <ul className="space-y-1 text-blue-100">
                  <li>• Whole-home audio/visual</li>
                  <li>• Automated lighting and blinds</li>
                  <li>• HVAC integration</li>
                  <li>• Security and access control</li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium text-green-300 mb-2">Investment Breakdown</h5>
                <ul className="space-y-1 text-green-100">
                  <li>• Smart systems: £25,000 (3.1%)</li>
                  <li>• Installation during build: £5,000</li>
                  <li>• Retrofit cost would have been: £45,000+</li>
                  <li>• Savings: £15,000+ vs retrofit</li>
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
            <Building className="h-5 w-5 text-elec-yellow" />
            Knowledge Check: New Build Installations
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="p-3 bg-[#1a1a1a] border border-gray-600 rounded-lg">
              <p className="font-medium text-foreground">Q1: What does "future-proofing" mean in new build smart homes?</p>
            </div>
            
            <div className="p-3 bg-[#1a1a1a] border border-gray-600 rounded-lg">
              <p className="font-medium text-foreground">Q2: Why is structured cabling preferred in new builds?</p>
            </div>
            
            <div className="p-3 bg-[#1a1a1a] border border-gray-600 rounded-lg">
              <p className="font-medium text-foreground">Q3: What is one advantage of integrating systems during construction versus retrofitting?</p>
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
                <p className="text-gray-300">Installing infrastructure (spare conduits, high-specification cabling) and choosing systems that can be easily upgraded as technology advances.</p>
              </div>
              
              <div className="p-3 bg-[#0f0f0f] border border-gray-600 rounded-lg">
                <p className="font-medium text-elec-yellow mb-2">A2:</p>
                <p className="text-gray-300">Provides reliable, high-speed connections throughout the home, enables professional system integration, and supports future technology upgrades.</p>
              </div>
              
              <div className="p-3 bg-[#0f0f0f] border border-gray-600 rounded-lg">
                <p className="font-medium text-elec-yellow mb-2">A3:</p>
                <p className="text-gray-300">Lower overall cost (installing during build is cheaper than retrofitting), hidden cabling for better aesthetics, and seamless integration with architecture.</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};