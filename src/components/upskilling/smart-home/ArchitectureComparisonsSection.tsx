import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart3, ChevronDown, ChevronUp, Zap, Shield, Wifi, PoundSterling } from 'lucide-react';

export const ArchitectureComparisonsSection = () => {
  const [showAnswers, setShowAnswers] = useState(false);

  const comparisons = [
    {
      factor: "Latency",
      icon: Zap,
      local: { rating: "Excellent", description: "Instant response (0-50ms)", color: "green" },
      cloud: { rating: "Variable", description: "1-5 seconds typical", color: "yellow" },
      hybrid: { rating: "Good", description: "Local fast, cloud variable", color: "blue" }
    },
    {
      factor: "Reliability",
      icon: Shield,
      local: { rating: "Very High", description: "Works offline", color: "green" },
      cloud: { rating: "Internet Dependent", description: "Fails without connection", color: "red" },
      hybrid: { rating: "High", description: "Partial offline operation", color: "blue" }
    },
    {
      factor: "Security",
      icon: Shield,
      local: { rating: "Highest", description: "Data stays local", color: "green" },
      cloud: { rating: "Provider Dependent", description: "External data sharing", color: "yellow" },
      hybrid: { rating: "Mixed", description: "Depends on implementation", color: "blue" }
    },
    {
      factor: "Setup Complexity",
      icon: Wifi,
      local: { rating: "High", description: "Technical expertise required", color: "red" },
      cloud: { rating: "Low", description: "Plug-and-play", color: "green" },
      hybrid: { rating: "Medium-High", description: "Multiple systems to configure", color: "yellow" }
    },
    {
      factor: "Scalability",
      icon: BarChart3,
      local: { rating: "Limited", description: "Hub capacity constraints", color: "yellow" },
      cloud: { rating: "Excellent", description: "Virtually unlimited", color: "green" },
      hybrid: { rating: "Good", description: "Flexible scaling options", color: "blue" }
    },
    {
      factor: "Cost",
      icon: PoundSterling,
      local: { rating: "Medium", description: "Higher upfront, no ongoing", color: "yellow" },
      cloud: { rating: "Low-Medium", description: "Low upfront, potential subscriptions", color: "yellow" },
      hybrid: { rating: "Higher", description: "Combined costs", color: "red" }
    }
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'green': return 'bg-green-900/30 border-green-500 text-green-100';
      case 'yellow': return 'bg-yellow-900/30 border-yellow-500 text-yellow-100';
      case 'red': return 'bg-red-900/30 border-red-500 text-red-100';
      case 'blue': return 'bg-blue-900/30 border-blue-500 text-blue-100';
      default: return 'bg-gray-900/30 border-gray-500 text-gray-100';
    }
  };

  return (
    <div className="space-y-6">
      {/* Learning Content */}
      <Card className="bg-elec-gray border-gray-700">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-elec-yellow" />
            4. Architecture Comparisons
          </CardTitle>
        </CardHeader>
        <CardContent className="text-gray-300 space-y-6">
          <p className="text-lg font-medium text-foreground mb-6">
            Direct comparison of key performance factors across all three architectural approaches:
          </p>
          
          {/* Comparison Table */}
          <div className="space-y-4">
            {comparisons.slice(0, 4).map((comparison, index) => (
              <div key={index} className="p-3 sm:p-4 bg-[#1a1a1a] border border-gray-600 rounded-lg">
                <div className="flex items-center gap-3 mb-4">
                  <comparison.icon className="h-5 w-5 text-elec-yellow flex-shrink-0" />
                  <h4 className="font-semibold text-foreground text-base sm:text-lg">{comparison.factor}</h4>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className={`p-3 border rounded-lg ${getColorClasses(comparison.local.color)}`}>
                    <div className="flex justify-between items-center sm:block">
                      <h5 className="font-semibold mb-0 sm:mb-1">Local</h5>
                      <div className="font-medium text-sm">{comparison.local.rating}</div>
                    </div>
                    <div className="text-xs mt-1 opacity-75 hidden sm:block">{comparison.local.description}</div>
                  </div>
                  
                  <div className={`p-3 border rounded-lg ${getColorClasses(comparison.cloud.color)}`}>
                    <div className="flex justify-between items-center sm:block">
                      <h5 className="font-semibold mb-0 sm:mb-1">Cloud</h5>
                      <div className="font-medium text-sm">{comparison.cloud.rating}</div>
                    </div>
                    <div className="text-xs mt-1 opacity-75 hidden sm:block">{comparison.cloud.description}</div>
                  </div>
                  
                  <div className={`p-3 border rounded-lg ${getColorClasses(comparison.hybrid.color)}`}>
                    <div className="flex justify-between items-center sm:block">
                      <h5 className="font-semibold mb-0 sm:mb-1">Hybrid</h5>
                      <div className="font-medium text-sm">{comparison.hybrid.rating}</div>
                    </div>
                    <div className="text-xs mt-1 opacity-75 hidden sm:block">{comparison.hybrid.description}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Reference */}
          <div className="p-3 sm:p-4 bg-elec-gray border border-gray-600 rounded-lg">
            <h4 className="font-semibold text-foreground mb-4">Quick Reference</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center text-sm">
              <div className="p-3 bg-[#1a1a1a] border border-gray-600 rounded-lg">
                <h5 className="font-medium text-blue-200 mb-2">Local Architecture</h5>
                <div className="space-y-1 text-blue-100">
                  <div>Speed: ★★★★★</div>
                  <div>Setup: ★★☆☆☆</div>
                  <div>Privacy: ★★★★★</div>
                </div>
              </div>
              <div className="p-3 bg-[#1a1a1a] border border-gray-600 rounded-lg">
                <h5 className="font-medium text-green-200 mb-2">Cloud Architecture</h5>
                <div className="space-y-1 text-green-100">
                  <div>Speed: ★★☆☆☆</div>
                  <div>Setup: ★★★★★</div>
                  <div>Privacy: ★★☆☆☆</div>
                </div>
              </div>
              <div className="p-3 bg-[#1a1a1a] border border-gray-600 rounded-lg">
                <h5 className="font-medium text-purple-200 mb-2">Hybrid Architecture</h5>
                <div className="space-y-1 text-purple-100">
                  <div>Speed: ★★★★☆</div>
                  <div>Setup: ★★★☆☆</div>
                  <div>Privacy: ★★★☆☆</div>
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
            <BarChart3 className="h-5 w-5 text-elec-yellow" />
            Knowledge Check: Architecture Comparisons
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="p-3 bg-[#1a1a1a] border border-gray-600 rounded-lg">
              <p className="font-medium text-foreground">Q1: Which architecture typically has the lowest latency and why?</p>
            </div>
            
            <div className="p-3 bg-[#1a1a1a] border border-gray-600 rounded-lg">
              <p className="font-medium text-foreground">Q2: What is the main trade-off between local and cloud systems regarding ease of use?</p>
            </div>
            
            <div className="p-3 bg-[#1a1a1a] border border-gray-600 rounded-lg">
              <p className="font-medium text-foreground">Q3: Why might hybrid systems have higher overall costs?</p>
            </div>
            
            <div className="p-3 bg-[#1a1a1a] border border-gray-600 rounded-lg">
              <p className="font-medium text-foreground">Q4: Which architecture offers the best scalability and why?</p>
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
                <p className="text-gray-300">Local architecture has the lowest latency (0-50ms) because all processing happens within the home without internet communication delays.</p>
              </div>
              
              <div className="p-3 bg-[#0f0f0f] border border-gray-600 rounded-lg">
                <p className="font-medium text-elec-yellow mb-2">A2:</p>
                <p className="text-gray-300">Local systems require more technical expertise and complex setup but offer greater control, while cloud systems are plug-and-play but offer less customisation control.</p>
              </div>
              
              <div className="p-3 bg-[#0f0f0f] border border-gray-600 rounded-lg">
                <p className="font-medium text-elec-yellow mb-2">A3:</p>
                <p className="text-gray-300">Hybrid systems require investment in both local hardware (hubs, controllers) and cloud services (subscriptions, integrations), combining the costs of both approaches.</p>
              </div>
              
              <div className="p-3 bg-[#0f0f0f] border border-gray-600 rounded-lg">
                <p className="font-medium text-elec-yellow mb-2">A4:</p>
                <p className="text-gray-300">Cloud architecture offers the best scalability because it's not limited by local hardware capacity and can leverage virtually unlimited cloud computing resources.</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};