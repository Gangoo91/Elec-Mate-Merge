import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Settings, ChevronDown, ChevronUp, User, Home, PoundSterling, Clock } from 'lucide-react';

export const ChoosingApproachSection = () => {
  const [showAnswers, setShowAnswers] = useState(false);

  const decisionMatrix = [
    {
      factor: "Budget Available",
      icon: PoundSterling,
      under_3k: "Retrofit - gradual device addition",
      between_3k_10k: "Hybrid - some wired, mostly wireless",
      over_10k: "New build - comprehensive integration"
    },
    {
      factor: "Property Status",
      icon: Home,
      renting: "Retrofit - portable, removable devices",
      renovating: "Hybrid - integrate during renovation",
      new_build: "New build - design-stage integration"
    },
    {
      factor: "Technical Expertise",
      icon: User,
      beginner: "Retrofit - simple plug-and-play devices",
      intermediate: "Hybrid - mix of simple and complex",
      advanced: "New build - full system design"
    },
    {
      factor: "Timeline Needs",
      icon: Clock,
      immediate: "Retrofit - instant improvements",
      planned: "Hybrid - phased implementation",
      long_term: "New build - comprehensive planning"
    }
  ];

  const clientProfiles = [
    {
      profile: "First-Time Smart Home User",
      characteristics: "Limited experience, wants to try smart home features",
      recommended_approach: "Retrofit",
      starting_devices: "Smart bulbs, smart plugs, voice assistant",
      budget_range: "£200-800",
      next_steps: "Add thermostat and security cameras if satisfied"
    },
    {
      profile: "Growing Family",
      characteristics: "Established home, children, security and energy concerns",
      recommended_approach: "Hybrid Retrofit",
      starting_devices: "Security system, smart thermostats, lighting control",
      budget_range: "£1,500-4,000",
      next_steps: "Expand to full home automation over 2-3 years"
    },
    {
      profile: "Tech Enthusiast",
      characteristics: "Wants cutting-edge features, maximum integration",
      recommended_approach: "Comprehensive New Build",
      starting_devices: "Whole-home system, AV integration, advanced automation",
      budget_range: "£15,000-40,000",
      next_steps: "Regular updates and expansion of capabilities"
    },
    {
      profile: "Elderly/Accessibility Needs",
      characteristics: "Simple operation, reliability, emergency features",
      recommended_approach: "Targeted Retrofit",
      starting_devices: "Voice control, emergency buttons, lighting automation",
      budget_range: "£500-1,500",
      next_steps: "Add medical alert and monitoring systems"
    }
  ];

  const assessmentQuestions = [
    {
      question: "What is your primary goal?",
      answers: {
        convenience: "Retrofit - start with smart lighting and plugs",
        security: "Hybrid - combine wired security with wireless sensors",
        efficiency: "New build - integrated HVAC and energy management",
        entertainment: "New build - whole-home audio/visual systems"
      }
    },
    {
      question: "How long will you live in this property?",
      answers: {
        under_2_years: "Retrofit - portable devices you can take with you",
        two_to_five_years: "Hybrid - moderate investment, some fixed installations",
        over_5_years: "New build - long-term investment in comprehensive system",
        permanent: "New build - maximum integration and future-proofing"
      }
    },
    {
      question: "What's your comfort with technology?",
      answers: {
        minimal: "Retrofit - simple, single-purpose devices",
        moderate: "Hybrid - mix of simple and integrated systems",
        high: "New build - complex automation and programming",
        expert: "New build - custom systems and advanced features"
      }
    }
  ];

  return (
    <div className="space-y-6">
      {/* Learning Content */}
      <Card className="bg-elec-gray border-gray-700">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Settings className="h-5 w-5 text-elec-yellow" />
            5. Choosing the Right Approach
          </CardTitle>
        </CardHeader>
        <CardContent className="text-gray-300 space-y-6">
          <p className="text-lg font-medium text-foreground mb-4">
            Selecting the optimal installation approach based on specific client needs and circumstances.
          </p>
          
          {/* Decision Matrix */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Decision Matrix</h4>
            <div className="space-y-4">
              {decisionMatrix.map((factor, index) => (
                <div key={index} className="p-4 bg-[#1a1a1a] border border-gray-600 rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <factor.icon className="h-5 w-5 text-elec-yellow" />
                    <h5 className="font-semibold text-foreground">{factor.factor}</h5>
                  </div>
                  
                  {/* Mobile-first responsive layout */}
                  <div className="hidden sm:grid sm:grid-cols-3 gap-4 text-sm">
                    <div className="p-3 bg-blue-900/20 border border-blue-600 rounded">
                      <div className="font-medium text-blue-200 mb-1">Budget Conscious</div>
                      <div className="text-blue-100">{factor.under_3k}</div>
                    </div>
                    <div className="p-3 bg-yellow-900/20 border border-yellow-600 rounded">
                      <div className="font-medium text-yellow-200 mb-1">Moderate Investment</div>
                      <div className="text-yellow-100">{factor.between_3k_10k}</div>
                    </div>
                    <div className="p-3 bg-green-900/20 border border-green-600 rounded">
                      <div className="font-medium text-green-200 mb-1">Premium Investment</div>
                      <div className="text-green-100">{factor.over_10k}</div>
                    </div>
                  </div>
                  
                  {/* Mobile layout */}
                  <div className="sm:hidden space-y-3 text-sm">
                    <div className="p-3 bg-blue-900/20 border border-blue-600 rounded">
                      <div className="font-medium text-blue-200 mb-1">Budget Conscious</div>
                      <div className="text-blue-100">{factor.under_3k}</div>
                    </div>
                    <div className="p-3 bg-yellow-900/20 border border-yellow-600 rounded">
                      <div className="font-medium text-yellow-200 mb-1">Moderate Investment</div>
                      <div className="text-yellow-100">{factor.between_3k_10k}</div>
                    </div>
                    <div className="p-3 bg-green-900/20 border border-green-600 rounded">
                      <div className="font-medium text-green-200 mb-1">Premium Investment</div>
                      <div className="text-green-100">{factor.over_10k}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Client Profiles */}
          <div>
            <h4 className="font-semibold text-foreground mb-4 text-lg">Client Profile Recommendations</h4>
            <div className="grid grid-cols-1 gap-4">
              {clientProfiles.map((client, index) => (
                <div key={index} className="p-4 bg-[#1a1a1a] border border-gray-600 rounded-lg">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-3">
                    <h5 className="font-semibold text-foreground">{client.profile}</h5>
                    <span className="text-elec-yellow font-medium">{client.budget_range}</span>
                  </div>
                  <p className="text-gray-300 text-sm mb-3">{client.characteristics}</p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-400">Approach: </span>
                      <span className="text-foreground font-medium">{client.recommended_approach}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Starting devices: </span>
                      <span className="text-gray-300">{client.starting_devices}</span>
                    </div>
                  </div>
                  
                  <div className="mt-2 text-sm">
                    <span className="text-gray-400">Next steps: </span>
                    <span className="text-gray-300">{client.next_steps}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Assessment Framework */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Client Assessment Framework</h4>
            <div className="space-y-4">
              {assessmentQuestions.map((item, index) => (
                <div key={index} className="p-4 bg-[#1a1a1a] border border-gray-600 rounded-lg">
                  <h5 className="font-semibold text-foreground mb-3">{item.question}</h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                    {Object.entries(item.answers).map(([key, value], answerIndex) => (
                      <div key={answerIndex} className="p-2 bg-[#0f0f0f] border border-gray-700 rounded">
                        <div className="font-medium text-elec-yellow mb-1 capitalize">
                          {key.replace(/_/g, ' ')}:
                        </div>
                        <div className="text-gray-300">{value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Professional Advice Process */}
          <div className="p-4 bg-gradient-to-r from-indigo-900/20 to-purple-900/20 border border-indigo-600 rounded-lg">
            <h4 className="font-semibold text-foreground mb-4">Professional Consultation Process</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div>
                <h5 className="font-medium text-indigo-200 mb-3">Initial Assessment</h5>
                <ol className="space-y-1 text-indigo-100">
                  <li>1. Property survey and electrical assessment</li>
                  <li>2. Lifestyle and needs analysis</li>
                  <li>3. Budget and timeline discussion</li>
                  <li>4. Technology comfort level evaluation</li>
                </ol>
              </div>
              <div>
                <h5 className="font-medium text-purple-200 mb-3">Recommendation Process</h5>
                <ol className="space-y-1 text-purple-100">
                  <li>1. Present 2-3 suitable approaches</li>
                  <li>2. Demonstrate key devices/systems</li>
                  <li>3. Provide detailed cost breakdown</li>
                  <li>4. Plan phased implementation if needed</li>
                </ol>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Interactive Knowledge Check */}
      <Card className="bg-elec-gray border-gray-700">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Settings className="h-5 w-5 text-elec-yellow" />
            Knowledge Check: Choosing the Right Approach
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="p-3 bg-[#1a1a1a] border border-gray-600 rounded-lg">
              <p className="font-medium text-foreground">Q1: What factors should be considered when advising a client on smart home approach?</p>
            </div>
            
            <div className="p-3 bg-[#1a1a1a] border border-gray-600 rounded-lg">
              <p className="font-medium text-foreground">Q2: Why might a growing family choose a hybrid approach?</p>
            </div>
            
            <div className="p-3 bg-[#1a1a1a] border border-gray-600 rounded-lg">
              <p className="font-medium text-foreground">Q3: What would you recommend for someone with limited budget but wanting immediate improvements?</p>
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
                <p className="text-gray-300">Budget, property status (rent/own/new build), technical expertise, timeline needs, lifestyle requirements, and long-term goals.</p>
              </div>
              
              <div className="p-3 bg-[#0f0f0f] border border-gray-600 rounded-lg">
                <p className="font-medium text-elec-yellow mb-2">A2:</p>
                <p className="text-gray-300">They need security and energy management but want flexibility to expand gradually as children grow and needs change, without major upfront investment.</p>
              </div>
              
              <div className="p-3 bg-[#0f0f0f] border border-gray-600 rounded-lg">
                <p className="font-medium text-elec-yellow mb-2">A3:</p>
                <p className="text-gray-300">Retrofit approach starting with smart bulbs and plugs (£200-400) to provide immediate convenience and energy savings whilst learning the technology.</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};