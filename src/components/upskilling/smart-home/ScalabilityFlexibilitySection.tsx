import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Layers, ChevronDown, ChevronUp, TrendingUp, Shuffle, Zap } from 'lucide-react';

export const ScalabilityFlexibilitySection = () => {
  const [showAnswers, setShowAnswers] = useState(false);

  const scalabilityFactors = [
    {
      aspect: "System Expansion",
      retrofit: {
        rating: "Limited",
        description: "Signal range constraints, device compatibility issues",
        practical_limit: "15-25 devices per hub",
        upgrade_path: "Replace hubs, mesh extenders"
      },
      newbuild: {
        rating: "Excellent",
        description: "Structured cabling supports unlimited expansion",
        practical_limit: "100+ devices per system",
        upgrade_path: "Modular component upgrades"
      }
    },
    {
      aspect: "Future Technology",
      retrofit: {
        rating: "Moderate",
        description: "Limited by existing infrastructure",
        practical_limit: "Wireless protocol dependent",
        upgrade_path: "Bridge devices, protocol converters"
      },
      newbuild: {
        rating: "Excellent",
        description: "Infrastructure ready for new technologies",
        practical_limit: "Future-proof wiring in place",
        upgrade_path: "Simple component swaps"
      }
    },
    {
      aspect: "Integration Complexity",
      retrofit: {
        rating: "Complex",
        description: "Multiple apps, protocol conflicts",
        practical_limit: "3-5 different ecosystems",
        upgrade_path: "Universal controllers, hubs"
      },
      newbuild: {
        rating: "Simple",
        description: "Centralised control from design stage",
        practical_limit: "Single unified system",
        upgrade_path: "Incremental software updates"
      }
    }
  ];

  const hybridApproaches = [
    {
      name: "Wired Backbone + Wireless Devices",
      description: "Ethernet infrastructure with wireless sensors and switches",
      best_for: "New builds wanting flexibility",
      cost_range: "£8,000-20,000",
      examples: "Cat 6 to rooms, wireless light switches, Wi-Fi sensors"
    },
    {
      name: "Smart Panel + Retrofit Devices",
      description: "Professional electrical panel with smart breakers, add wireless devices",
      best_for: "Existing homes with electrical upgrades",
      cost_range: "£3,000-8,000",
      examples: "Smart breakers, wireless thermostats, mesh network"
    },
    {
      name: "Gradual Integration Strategy",
      description: "Start retrofit, plan for wired upgrades during renovations",
      best_for: "Long-term homeowners with renovation plans",
      cost_range: "£2,000-15,000 over time",
      examples: "Begin wireless, add wiring during kitchen/bathroom upgrades"
    }
  ];

  const getRatingColor = (rating: string) => {
    switch (rating.toLowerCase()) {
      case 'excellent': return 'text-green-400';
      case 'moderate': return 'text-yellow-400';
      case 'limited': return 'text-red-400';
      case 'complex': return 'text-red-400';
      case 'simple': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      {/* Learning Content */}
      <Card className="bg-elec-gray border-gray-700">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Layers className="h-5 w-5 text-elec-yellow" />
            4. Scalability and Flexibility
          </CardTitle>
        </CardHeader>
        <CardContent className="text-gray-300 space-y-6">
          <p className="text-lg font-medium text-foreground mb-4">
            Evaluating how each approach handles growth and adaptation over time.
          </p>
          
          {/* Scalability Comparison */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Scalability Comparison</h4>
            <div className="space-y-4">
              {scalabilityFactors.map((factor, index) => (
                <div key={index} className="p-4 bg-[#1a1a1a] border border-gray-600 rounded-lg">
                  <h5 className="font-semibold text-foreground mb-3">{factor.aspect}</h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-3 border border-blue-600 rounded bg-blue-900/20">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium text-blue-200">Retrofit</span>
                        <span className={`font-semibold ${getRatingColor(factor.retrofit.rating)}`}>
                          {factor.retrofit.rating}
                        </span>
                      </div>
                      <p className="text-sm text-blue-100 mb-2">{factor.retrofit.description}</p>
                      <div className="text-xs text-blue-200">
                        <div>Limit: {factor.retrofit.practical_limit}</div>
                        <div>Upgrade: {factor.retrofit.upgrade_path}</div>
                      </div>
                    </div>
                    <div className="p-3 border border-green-600 rounded bg-green-900/20">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium text-green-200">New Build</span>
                        <span className={`font-semibold ${getRatingColor(factor.newbuild.rating)}`}>
                          {factor.newbuild.rating}
                        </span>
                      </div>
                      <p className="text-sm text-green-100 mb-2">{factor.newbuild.description}</p>
                      <div className="text-xs text-green-200">
                        <div>Limit: {factor.newbuild.practical_limit}</div>
                        <div>Upgrade: {factor.newbuild.upgrade_path}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Hybrid Approaches */}
          <div>
            <h4 className="font-semibold text-foreground mb-4 text-lg">Hybrid Approaches for Best of Both</h4>
            <div className="grid grid-cols-1 gap-4">
              {hybridApproaches.map((approach, index) => (
                <div key={index} className="p-4 bg-[#1a1a1a] border border-gray-600 rounded-lg">
                  <div className="flex items-start gap-3 mb-3">
                    <Shuffle className="h-5 w-5 text-elec-yellow mt-1 flex-shrink-0" />
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                        <h5 className="font-semibold text-foreground">{approach.name}</h5>
                        <span className="text-elec-yellow font-medium">{approach.cost_range}</span>
                      </div>
                      <p className="text-gray-300 text-sm mb-2">{approach.description}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-400">Best for: </span>
                          <span className="text-foreground">{approach.best_for}</span>
                        </div>
                        <div>
                          <span className="text-gray-400">Examples: </span>
                          <span className="text-gray-300">{approach.examples}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 10-Year Planning Scenarios */}
          <div className="p-4 bg-gradient-to-r from-purple-900/20 to-blue-900/20 border border-purple-600 rounded-lg">
            <h4 className="font-semibold text-foreground mb-4">10-Year Technology Planning</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div>
                <h5 className="font-medium text-purple-200 mb-3 flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Emerging Technologies
                </h5>
                <ul className="space-y-2 text-purple-100">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-400 flex-shrink-0"></div>
                    Matter protocol standardisation
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-400 flex-shrink-0"></div>
                    AI-powered automation
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-400 flex-shrink-0"></div>
                    Edge computing integration
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-400 flex-shrink-0"></div>
                    Energy storage systems
                  </li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium text-blue-200 mb-3 flex items-center gap-2">
                  <Zap className="h-4 w-4" />
                  Infrastructure Requirements
                </h5>
                <ul className="space-y-2 text-blue-100">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0"></div>
                    Higher power requirements
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0"></div>
                    Gigabit networking speeds
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0"></div>
                    Local processing capability
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0"></div>
                    Redundant system design
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Practical Expansion Examples */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-elec-gray border border-gray-600 rounded-lg">
              <h4 className="font-semibold text-foreground mb-3">Retrofit Expansion Path</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Year 1:</span>
                  <span className="text-gray-300">Smart lights, plugs (£300)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Year 2:</span>
                  <span className="text-gray-300">Thermostat, security (£600)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Year 3:</span>
                  <span className="text-gray-300">Hub upgrade, more devices (£800)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Year 5:</span>
                  <span className="text-gray-300">System integration challenges</span>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-elec-gray border border-gray-600 rounded-lg">
              <h4 className="font-semibold text-foreground mb-3">New Build Expansion Path</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Year 1:</span>
                  <span className="text-gray-300">Core system installed (£15k)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Year 2:</span>
                  <span className="text-gray-300">Add zones, devices (£2k)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Year 3:</span>
                  <span className="text-gray-300">Software upgrades (£0)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Year 5:</span>
                  <span className="text-gray-300">Seamless new integrations</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Interactive Knowledge Check */}
      <Card className="bg-elec-gray border-gray-700">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Layers className="h-5 w-5 text-elec-yellow" />
            Knowledge Check: Scalability and Flexibility
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="p-3 bg-[#1a1a1a] border border-gray-600 rounded-lg">
              <p className="font-medium text-foreground">Q1: Which approach is more scalable long-term and why?</p>
            </div>
            
            <div className="p-3 bg-[#1a1a1a] border border-gray-600 rounded-lg">
              <p className="font-medium text-foreground">Q2: What is a hybrid approach and when might it be used?</p>
            </div>
            
            <div className="p-3 bg-[#1a1a1a] border border-gray-600 rounded-lg">
              <p className="font-medium text-foreground">Q3: What infrastructure consideration is important for 10-year planning?</p>
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
                <p className="text-gray-300">New build is more scalable because structured cabling supports unlimited device expansion and future technologies without infrastructure constraints.</p>
              </div>
              
              <div className="p-3 bg-[#0f0f0f] border border-gray-600 rounded-lg">
                <p className="font-medium text-elec-yellow mb-2">A2:</p>
                <p className="text-gray-300">A hybrid approach combines wired infrastructure with wireless devices, offering reliability and flexibility. Used when wanting professional backbone with retrofit convenience.</p>
              </div>
              
              <div className="p-3 bg-[#0f0f0f] border border-gray-600 rounded-lg">
                <p className="font-medium text-elec-yellow mb-2">A3:</p>
                <p className="text-gray-300">Gigabit networking speeds and higher electrical capacity to support emerging technologies like AI processing, energy storage, and advanced automation systems.</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};