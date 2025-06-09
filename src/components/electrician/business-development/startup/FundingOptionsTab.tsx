
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PoundSterling, TrendingUp, Users, Building, ExternalLink, Calculator } from "lucide-react";

const FundingOptionsTab = () => {
  const fundingOptions = [
    {
      type: "Personal Savings",
      amount: "£5K-15K",
      timeframe: "Immediate",
      difficulty: "Easy",
      equity: "0%",
      pros: ["Full control", "No debt", "Quick access"],
      cons: ["Limited capital", "Personal risk", "Depletes savings"],
      bestFor: "Small start with basic tools and van"
    },
    {
      type: "Start Up Loans",
      amount: "£500-25K",
      timeframe: "4-6 weeks",
      difficulty: "Medium",
      equity: "0%",
      pros: ["Government backed", "Competitive rates", "Business support"],
      cons: ["Personal guarantee", "Fixed repayments", "Credit checks"],
      bestFor: "Established plan with cash flow projections"
    },
    {
      type: "Bank Business Loan",
      amount: "£10K-50K",
      timeframe: "6-8 weeks",
      difficulty: "Hard",
      equity: "0%",
      pros: ["Large amounts", "Build credit history", "Tax deductible"],
      cons: ["Strict criteria", "Security required", "High rates"],
      bestFor: "Established business expanding operations"
    },
    {
      type: "Equipment Finance",
      amount: "£5K-100K",
      timeframe: "2-4 weeks",
      difficulty: "Medium",
      equity: "0%",
      pros: ["Asset secured", "Preserve cash", "Tax benefits"],
      cons: ["Asset risk", "Higher rates", "Depreciation"],
      bestFor: "Purchasing vehicles, tools, and equipment"
    }
  ];

  const grantOpportunities = [
    {
      name: "New Enterprise Allowance",
      amount: "£1,274 + loan",
      description: "For those on benefits starting a business",
      eligibility: "JSA, ESA, or Universal Credit recipients"
    },
    {
      name: "Regional Growth Fund",
      amount: "£1K-10K",
      description: "Local enterprise partnerships funding",
      eligibility: "Location and sector specific"
    },
    {
      name: "Green Business Fund",
      amount: "£2K-15K",
      description: "For eco-friendly electrical services",
      eligibility: "Solar, EV charging, energy efficiency focus"
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'medium': return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      case 'hard': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-elec-yellow/20 text-elec-yellow border-elec-yellow/30';
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/30 bg-gradient-to-br from-elec-yellow/5 to-green-500/5">
        <CardHeader>
          <CardTitle className="text-elec-yellow flex items-center gap-2">
            <PoundSterling className="h-5 w-5" />
            Funding Your Electrical Business
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-blue-500/10 rounded-lg p-4 border border-blue-500/20">
              <div className="text-2xl font-bold text-blue-400">£8K</div>
              <div className="text-sm text-muted-foreground">Average Startup Cost</div>
            </div>
            <div className="bg-green-500/10 rounded-lg p-4 border border-green-500/20">
              <div className="text-2xl font-bold text-green-400">£15K</div>
              <div className="text-sm text-muted-foreground">Recommended Capital</div>
            </div>
            <div className="bg-purple-500/10 rounded-lg p-4 border border-purple-500/20">
              <div className="text-2xl font-bold text-purple-400">3-6</div>
              <div className="text-sm text-muted-foreground">Months Cash Flow</div>
            </div>
            <div className="bg-amber-500/10 rounded-lg p-4 border border-amber-500/20">
              <div className="text-2xl font-bold text-amber-400">85%</div>
              <div className="text-sm text-muted-foreground">Approval Rate</div>
            </div>
          </div>
          
          <p className="text-muted-foreground">
            Choose the right funding mix for your electrical contracting business. Most successful startups combine 
            2-3 funding sources to minimise risk and maximise growth potential.
          </p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-white mb-4">Primary Funding Options</h3>
          {fundingOptions.map((option, index) => (
            <Card key={index} className="border-elec-yellow/20 bg-elec-gray">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white text-lg">{option.type}</CardTitle>
                  <Badge className={getDifficultyColor(option.difficulty)}>
                    {option.difficulty}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-green-400 font-medium">Amount:</span>
                    <p className="text-white">{option.amount}</p>
                  </div>
                  <div>
                    <span className="text-blue-400 font-medium">Timeframe:</span>
                    <p className="text-white">{option.timeframe}</p>
                  </div>
                  <div>
                    <span className="text-purple-400 font-medium">Equity:</span>
                    <p className="text-white">{option.equity}</p>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm text-amber-300 font-medium mb-1">Best for:</p>
                  <p className="text-xs text-muted-foreground">{option.bestFor}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs font-medium text-green-300 mb-1">Pros:</p>
                    <ul className="text-xs space-y-1">
                      {option.pros.map((pro, i) => (
                        <li key={i} className="text-green-200">• {pro}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-red-300 mb-1">Cons:</p>
                    <ul className="text-xs space-y-1">
                      {option.cons.map((con, i) => (
                        <li key={i} className="text-red-200">• {con}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="space-y-6">
          <Card className="border-green-500/30 bg-green-500/10">
            <CardHeader>
              <CardTitle className="text-green-300 flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Government Grants & Support
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {grantOpportunities.map((grant, index) => (
                <div key={index} className="border border-green-500/20 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-green-200">{grant.name}</h4>
                    <span className="text-green-400 font-bold">{grant.amount}</span>
                  </div>
                  <p className="text-sm text-green-100 mb-2">{grant.description}</p>
                  <p className="text-xs text-green-300">Eligibility: {grant.eligibility}</p>
                </div>
              ))}
              
              <Button className="w-full bg-green-500 text-green-900 hover:bg-green-400">
                <ExternalLink className="h-4 w-4 mr-2" />
                Find Local Grants
              </Button>
            </CardContent>
          </Card>

          <Card className="border-blue-500/30 bg-blue-500/10">
            <CardHeader>
              <CardTitle className="text-blue-300 flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                Funding Calculator
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-blue-200">Initial Equipment:</span>
                  <span className="text-blue-100 font-medium">£5,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-blue-200">Vehicle & Signage:</span>
                  <span className="text-blue-100 font-medium">£8,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-blue-200">Working Capital:</span>
                  <span className="text-blue-100 font-medium">£3,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-blue-200">Insurance & Legal:</span>
                  <span className="text-blue-100 font-medium">£1,200</span>
                </div>
                <hr className="border-blue-500/30" />
                <div className="flex justify-between font-bold">
                  <span className="text-blue-300">Total Required:</span>
                  <span className="text-blue-400">£17,200</span>
                </div>
              </div>
              
              <div className="bg-blue-600/20 rounded-lg p-3">
                <p className="text-xs text-blue-200 mb-2">Recommended Mix:</p>
                <ul className="text-xs space-y-1">
                  <li className="text-blue-100">• £7K Personal savings (40%)</li>
                  <li className="text-blue-100">• £7K Start Up Loan (40%)</li>
                  <li className="text-blue-100">• £3.2K Equipment finance (20%)</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FundingOptionsTab;
