import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PoundSterling, ChevronDown, ChevronUp, Clock, Hammer, Eye } from 'lucide-react';

export const CostDisruptionSection = () => {
  const [showAnswers, setShowAnswers] = useState(false);

  const costComparison = [
    {
      factor: "Initial Investment",
      retrofit: { amount: "£500-2,000", description: "Lower upfront cost, device-by-device purchase" },
      newbuild: { amount: "£5,000-25,000", description: "Higher upfront cost, comprehensive system" }
    },
    {
      factor: "Installation Cost",
      retrofit: { amount: "£0-500", description: "DIY friendly, minimal labour costs" },
      newbuild: { amount: "£2,000-8,000", description: "Professional installation during construction" }
    },
    {
      factor: "Disruption Level",
      retrofit: { amount: "Minimal", description: "No construction work, immediate use" },
      newbuild: { amount: "None (post-build)", description: "Disruption only during construction phase" }
    },
    {
      factor: "Aesthetic Impact",
      retrofit: { amount: "Visible devices", description: "Surface-mounted devices, cable routing" },
      newbuild: { amount: "Hidden integration", description: "Concealed wiring, professional finish" }
    }
  ];

  const practicalScenarios = [
    {
      scenario: "Young Professional Renter",
      icon: Clock,
      approach: "Retrofit",
      reasoning: "Temporary installation, low cost, take devices when moving",
      typical_spend: "£300-800",
      devices: "Smart bulbs, plugs, wireless thermostat, security camera"
    },
    {
      scenario: "Family Home Owner",
      icon: Hammer,
      approach: "Retrofit + Gradual Expansion",
      reasoning: "Budget constraints, test before major investment",
      typical_spend: "£1,500-4,000 over time",
      devices: "Start basic, add automation, eventually integrate systems"
    },
    {
      scenario: "Custom New Build",
      icon: Eye,
      approach: "Comprehensive New Build",
      reasoning: "One-time opportunity, long-term home, maximum integration",
      typical_spend: "£15,000-40,000",
      devices: "Whole-home automation, AV systems, security, HVAC control"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Learning Content */}
      <Card className="bg-elec-gray border-gray-700">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <PoundSterling className="h-5 w-5 text-elec-yellow" />
            3. Cost and Disruption Factors
          </CardTitle>
        </CardHeader>
        <CardContent className="text-gray-300 space-y-6">
          <p className="text-lg font-medium text-foreground mb-4">
            Understanding the financial and practical implications of each installation approach.
          </p>
          
          {/* Cost Comparison Table */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Cost Comparison Analysis</h4>
            <div className="space-y-4">
              {costComparison.map((item, index) => (
                <div key={index} className="p-4 bg-[#1a1a1a] border border-gray-600 rounded-lg">
                  <h5 className="font-semibold text-foreground mb-3">{item.factor}</h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-3 border border-blue-600 rounded bg-blue-900/20">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium text-blue-200">Retrofit</span>
                        <span className="font-semibold text-blue-100">{item.retrofit.amount}</span>
                      </div>
                      <p className="text-sm text-blue-100">{item.retrofit.description}</p>
                    </div>
                    <div className="p-3 border border-green-600 rounded bg-green-900/20">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium text-green-200">New Build</span>
                        <span className="font-semibold text-green-100">{item.newbuild.amount}</span>
                      </div>
                      <p className="text-sm text-green-100">{item.newbuild.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Practical Scenarios */}
          <div>
            <h4 className="font-semibold text-foreground mb-4 text-lg">Real-World Cost Scenarios</h4>
            <div className="grid grid-cols-1 gap-4">
              {practicalScenarios.map((scenario, index) => (
                <div key={index} className="p-4 bg-[#1a1a1a] border border-gray-600 rounded-lg">
                  <div className="flex items-start gap-3 mb-3">
                    <scenario.icon className="h-5 w-5 text-elec-yellow mt-1 flex-shrink-0" />
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                        <h5 className="font-semibold text-foreground">{scenario.scenario}</h5>
                        <span className="text-elec-yellow font-medium">{scenario.typical_spend}</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-400">Approach: </span>
                          <span className="text-foreground font-medium">{scenario.approach}</span>
                        </div>
                        <div>
                          <span className="text-gray-400">Reasoning: </span>
                          <span className="text-gray-300">{scenario.reasoning}</span>
                        </div>
                      </div>
                      <div className="mt-2">
                        <span className="text-gray-400">Typical devices: </span>
                        <span className="text-gray-300">{scenario.devices}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Key Insights */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-elec-gray border border-gray-600 rounded-lg">
              <h4 className="font-semibold text-foreground mb-3">When Retrofit Makes Sense</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0"></div>
                  Budget under £3,000
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0"></div>
                  Renting or temporary living situation
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0"></div>
                  Testing smart home concepts first
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0"></div>
                  Immediate needs for specific functions
                </li>
              </ul>
            </div>
            
            <div className="p-4 bg-elec-gray border border-gray-600 rounded-lg">
              <h4 className="font-semibold text-foreground mb-3">When New Build Makes Sense</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0"></div>
                  Budget over £10,000
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0"></div>
                  Permanent family home
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0"></div>
                  Comprehensive automation desired
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0"></div>
                  Professional aesthetic requirements
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Interactive Knowledge Check */}
      <Card className="bg-elec-gray border-gray-700">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <PoundSterling className="h-5 w-5 text-elec-yellow" />
            Knowledge Check: Cost and Disruption
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="p-3 bg-[#1a1a1a] border border-gray-600 rounded-lg">
              <p className="font-medium text-foreground">Q1: Which installation type typically has lower upfront costs and why?</p>
            </div>
            
            <div className="p-3 bg-[#1a1a1a] border border-gray-600 rounded-lg">
              <p className="font-medium text-foreground">Q2: What is the main aesthetic advantage of new build installations?</p>
            </div>
            
            <div className="p-3 bg-[#1a1a1a] border border-gray-600 rounded-lg">
              <p className="font-medium text-foreground">Q3: Why might retrofit be better for testing smart home concepts?</p>
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
                <p className="text-gray-300">Retrofit has lower upfront costs because you can purchase devices gradually and many are DIY-friendly, avoiding professional installation fees.</p>
              </div>
              
              <div className="p-3 bg-[#0f0f0f] border border-gray-600 rounded-lg">
                <p className="font-medium text-elec-yellow mb-2">A2:</p>
                <p className="text-gray-300">Hidden integration - all wiring is concealed within walls, creating a professional finish without visible cables or surface-mounted devices.</p>
              </div>
              
              <div className="p-3 bg-[#0f0f0f] border border-gray-600 rounded-lg">
                <p className="font-medium text-elec-yellow mb-2">A3:</p>
                <p className="text-gray-300">Lower financial risk - you can try different devices and systems without major investment, learning what works before committing to larger systems.</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};