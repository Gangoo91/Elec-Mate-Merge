
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PoundSterling, TrendingUp, Users, Building, AlertTriangle, CheckCircle, ExternalLink, Calculator } from "lucide-react";

const FundingOptionsTab = () => {
  const fundingOptions = [
    {
      type: "Personal Savings",
      amount: "£5,000-15,000",
      pros: ["No interest or repayments", "Full ownership", "Quick access"],
      cons: ["Limited amount", "Personal risk", "Depletes emergency fund"],
      best_for: "Small-scale start with basic equipment",
      difficulty: "Easy"
    },
    {
      type: "Start Up Loans",
      amount: "£500-25,000",
      pros: ["Government backing", "Competitive rates", "Mentoring included"],
      cons: ["Personal guarantee required", "Credit checks", "Fixed repayment terms"],
      best_for: "Structured business launch with equipment purchase",
      difficulty: "Medium"
    },
    {
      type: "Bank Business Loans",
      amount: "£1,000-100,000",
      pros: ["Large amounts available", "Established process", "Business relationship"],
      cons: ["Strict criteria", "Security required", "Higher interest rates"],
      best_for: "Established creditworthy individuals with business plan",
      difficulty: "Hard"
    },
    {
      type: "Asset Finance",
      amount: "£1,000-50,000",
      pros: ["Equipment as security", "Preserve cash flow", "Tax benefits"],
      cons: ["Equipment specific", "Higher total cost", "Ownership restrictions"],
      best_for: "Expensive equipment purchase (van, testing equipment)",
      difficulty: "Medium"
    }
  ];

  const grants = [
    {
      name: "New Enterprise Allowance",
      amount: "£1,274 + £1,000 loan",
      eligibility: "Unemployed for 6+ months",
      description: "Weekly allowance plus loan for business setup"
    },
    {
      name: "Local Enterprise Partnerships",
      amount: "£1,000-10,000",
      eligibility: "Varies by region",
      description: "Regional grants for business development"
    },
    {
      name: "Prince's Trust Enterprise Programme",
      amount: "£4,000 grant + £6,000 loan",
      eligibility: "Age 18-30, unemployed/low income",
      description: "Support for young entrepreneurs"
    },
    {
      name: "Innovate UK Smart Grants",
      amount: "£25,000-2,000,000",
      eligibility: "Innovative technology projects",
      description: "For businesses developing innovative electrical solutions"
    }
  ];

  const alternativeFunding = [
    {
      method: "Equipment Leasing",
      description: "Lease vehicles and expensive testing equipment",
      pros: ["Lower monthly payments", "Latest equipment", "Maintenance included"],
      considerations: ["No ownership", "Long-term commitment", "Total cost higher"]
    },
    {
      method: "Invoice Factoring",
      description: "Sell outstanding invoices for immediate cash",
      pros: ["Immediate cash flow", "No debt", "Outsourced credit control"],
      considerations: ["Fees reduce profit", "Customer notification", "Ongoing relationship"]
    },
    {
      method: "Crowdfunding",
      description: "Raise money from multiple small investors online",
      pros: ["No repayment required", "Marketing opportunity", "Community building"],
      considerations: ["Public exposure", "Campaign effort required", "Success not guaranteed"]
    },
    {
      method: "Trade Credit",
      description: "Extended payment terms with suppliers",
      pros: ["Preserves cash flow", "No interest charges", "Builds supplier relationships"],
      considerations: ["Limited to purchases", "Credit approval needed", "Payment discipline required"]
    }
  ];

  const costBreakdown = [
    {
      category: "Vehicle & Transport",
      min: 3000,
      max: 8000,
      items: ["Van purchase/lease", "Insurance", "Fuel", "Maintenance"]
    },
    {
      category: "Tools & Equipment",
      min: 2000,
      max: 5000,
      items: ["Basic hand tools", "Testing equipment", "Power tools", "PPE"]
    },
    {
      category: "Legal & Setup",
      min: 500,
      max: 1500,
      items: ["Registration fees", "Insurance", "Legal advice", "Accounting setup"]
    },
    {
      category: "Marketing & Branding",
      min: 500,
      max: 2000,
      items: ["Website", "Business cards", "Van signage", "Initial advertising"]
    },
    {
      category: "Working Capital",
      min: 2000,
      max: 5000,
      items: ["Initial materials", "Emergency fund", "First month expenses", "Insurance excess"]
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'Medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'Hard': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-elec-yellow/20 text-elec-yellow border-elec-yellow/30';
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/30 bg-gradient-to-br from-elec-yellow/5 to-green-500/5">
        <CardHeader>
          <CardTitle className="text-elec-yellow flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            Startup Cost Calculator
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="text-center p-4 bg-green-500/10 rounded-lg border border-green-500/20">
                <div className="text-2xl font-bold text-green-400">£8,000</div>
                <div className="text-sm text-muted-foreground">Minimum Startup Cost</div>
              </div>
              <div className="text-center p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                <div className="text-2xl font-bold text-blue-400">£21,500</div>
                <div className="text-sm text-muted-foreground">Recommended Startup Cost</div>
              </div>
            </div>
            
            <div className="space-y-3">
              {costBreakdown.map((category, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-elec-dark/50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-white">{category.category}</h4>
                    <p className="text-xs text-muted-foreground">{category.items.join(", ")}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-elec-yellow font-medium">£{category.min.toLocaleString()} - £{category.max.toLocaleString()}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-blue-500/50 bg-blue-500/10">
        <CardHeader>
          <CardTitle className="text-blue-300 flex items-center gap-2">
            <PoundSterling className="h-5 w-5" />
            Primary Funding Sources
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {fundingOptions.map((option, index) => (
              <div key={index} className="border border-blue-500/20 rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-medium text-white">{option.type}</h4>
                    <p className="text-sm text-blue-200">{option.best_for}</p>
                  </div>
                  <div className="text-right">
                    <Badge className={getDifficultyColor(option.difficulty)} className="mb-1">
                      {option.difficulty}
                    </Badge>
                    <div className="text-blue-300 font-medium">{option.amount}</div>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h5 className="text-green-300 font-medium mb-1">Pros:</h5>
                    <ul className="space-y-1">
                      {option.pros.map((pro, proIndex) => (
                        <li key={proIndex} className="flex items-start gap-1">
                          <CheckCircle className="h-3 w-3 text-green-400 mt-0.5 flex-shrink-0" />
                          <span className="text-green-200">{pro}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-red-300 font-medium mb-1">Cons:</h5>
                    <ul className="space-y-1">
                      {option.cons.map((con, conIndex) => (
                        <li key={conIndex} className="flex items-start gap-1">
                          <AlertTriangle className="h-3 w-3 text-red-400 mt-0.5 flex-shrink-0" />
                          <span className="text-red-200">{con}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-green-500/50 bg-green-500/10">
        <CardHeader>
          <CardTitle className="text-green-300 flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Grants & Government Support
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {grants.map((grant, index) => (
              <div key={index} className="flex items-center justify-between p-3 border border-green-500/20 rounded-lg">
                <div>
                  <h4 className="font-medium text-white">{grant.name}</h4>
                  <p className="text-sm text-muted-foreground">{grant.description}</p>
                  <Badge variant="outline" className="text-green-300 border-green-400/30 mt-1">
                    {grant.eligibility}
                  </Badge>
                </div>
                <div className="text-right">
                  <div className="text-green-300 font-medium">{grant.amount}</div>
                  <Button variant="outline" size="sm" className="mt-2">
                    <ExternalLink className="h-4 w-4 mr-1" />
                    Apply
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-purple-500/50 bg-purple-500/10">
        <CardHeader>
          <CardTitle className="text-purple-300 flex items-center gap-2">
            <Building className="h-5 w-5" />
            Alternative Funding Methods
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {alternativeFunding.map((method, index) => (
              <div key={index} className="border border-purple-500/20 rounded-lg p-4">
                <h4 className="font-medium text-white mb-2">{method.method}</h4>
                <p className="text-sm text-muted-foreground mb-3">{method.description}</p>
                
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h5 className="text-green-300 font-medium mb-1">Benefits:</h5>
                    <ul className="space-y-1">
                      {method.pros.map((pro, proIndex) => (
                        <li key={proIndex} className="flex items-start gap-1">
                          <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0" />
                          <span className="text-green-200">{pro}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-amber-300 font-medium mb-1">Considerations:</h5>
                    <ul className="space-y-1">
                      {method.considerations.map((consideration, consIndex) => (
                        <li key={consIndex} className="flex items-start gap-1">
                          <div className="w-1.5 h-1.5 bg-amber-400 rounded-full mt-2 flex-shrink-0" />
                          <span className="text-amber-200">{consideration}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-amber-500/50 bg-amber-500/10">
        <CardHeader>
          <CardTitle className="text-amber-300 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Financial Planning Tips
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3 text-amber-200">Before You Start</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Create detailed 12-month cash flow forecast</li>
                <li>• Build 3-month emergency fund</li>
                <li>• Get pre-approval for funding before ordering equipment</li>
                <li>• Compare all costs including hidden fees</li>
                <li>• Consider phased equipment purchase</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-amber-200">Managing Cash Flow</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Invoice immediately upon job completion</li>
                <li>• Offer payment terms incentives</li>
                <li>• Set up automatic payment reminders</li>
                <li>• Consider deposit requirements for large jobs</li>
                <li>• Track all expenses for tax purposes</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FundingOptionsTab;
