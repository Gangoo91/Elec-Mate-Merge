
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PoundSterling, TrendingUp, Building, Users, ExternalLink, Calculator, Shield, CheckCircle } from "lucide-react";

const FundingOptionsTab = () => {
  const fundingOptions = [
    {
      title: "Start Up Loans",
      type: "Government Backed",
      amount: "£500 - £25,000",
      rate: "6% fixed",
      term: "1-5 years",
      description: "Government-backed personal loans for new and early-stage businesses",
      pros: ["No upfront fees", "Fixed interest rate", "12-month repayment holiday available"],
      cons: ["Personal guarantee required", "Limited to £25k", "Requires business plan"],
      suitability: "high"
    },
    {
      title: "Bounce Back Loan",
      type: "Government Scheme",
      amount: "Up to £50,000",
      rate: "2.5%",
      term: "6 years",
      description: "Government scheme for businesses affected by COVID-19 (if still available)",
      pros: ["Low interest rate", "No personal guarantee", "100% government guarantee"],
      cons: ["Limited availability", "Specific criteria", "May require existing business"],
      suitability: "medium"
    },
    {
      title: "Bank Business Loan",
      type: "Traditional Banking",
      amount: "£1,000 - £500,000",
      rate: "4-15%",
      term: "1-25 years",
      description: "Traditional business loans from high street banks",
      pros: ["Large amounts available", "Flexible terms", "Relationship building"],
      cons: ["Strict criteria", "Personal guarantees", "Lengthy application"],
      suitability: "medium"
    },
    {
      title: "Asset Finance",
      type: "Equipment Funding",
      amount: "£1,000 - £1,000,000",
      rate: "3-12%",
      term: "2-7 years",
      description: "Finance specifically for purchasing tools, vehicles, and equipment",
      pros: ["Asset acts as security", "Preserve cash flow", "Tax advantages"],
      cons: ["Asset depreciation risk", "Early settlement fees", "Limited to assets"],
      suitability: "high"
    }
  ];

  const grants = [
    {
      name: "New Enterprise Allowance",
      amount: "£1,274 + mentoring",
      eligibility: "Unemployed individuals starting a business",
      description: "Weekly allowance for 26 weeks plus business mentoring support"
    },
    {
      name: "Local Council Grants",
      amount: "£500 - £10,000",
      eligibility: "Varies by council area",
      description: "Local authority grants for new businesses and job creation"
    },
    {
      name: "Prince's Trust Grants",
      amount: "Up to £7,500",
      eligibility: "18-30 years old, meets criteria",
      description: "Grants and low-interest loans for young entrepreneurs"
    }
  ];

  const alternativeFunding = [
    {
      name: "Invoice Factoring",
      description: "Sell your invoices to improve cash flow",
      rate: "1-3% per month",
      suitability: "Established businesses with regular clients"
    },
    {
      name: "Peer-to-Peer Lending",
      description: "Borrow from individual investors",
      rate: "3-15%",
      suitability: "Good credit score, detailed business plan"
    },
    {
      name: "Business Credit Cards",
      description: "Short-term financing for purchases",
      rate: "15-30% APR",
      suitability: "Small purchases, building credit history"
    }
  ];

  const getSuitabilityColor = (suitability: string) => {
    switch (suitability) {
      case 'high': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'medium': return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      case 'low': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-elec-yellow/20 text-elec-yellow border-elec-yellow/30';
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/30 bg-gradient-to-br from-elec-yellow/5 to-blue-500/5">
        <CardHeader>
          <CardTitle className="text-elec-yellow flex items-center gap-2">
            <PoundSterling className="h-5 w-5" />
            Funding Your Electrical Business
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-green-500/10 rounded-lg p-4 border border-green-500/20">
              <Calculator className="h-5 w-5 text-green-400 mb-2" />
              <div className="text-sm text-muted-foreground">Typical Startup Cost</div>
              <div className="text-xl font-bold text-green-400">£5K-15K</div>
            </div>
            <div className="bg-blue-500/10 rounded-lg p-4 border border-blue-500/20">
              <TrendingUp className="h-5 w-5 text-blue-400 mb-2" />
              <div className="text-sm text-muted-foreground">Working Capital</div>
              <div className="text-xl font-bold text-blue-400">£10K-25K</div>
            </div>
            <div className="bg-purple-500/10 rounded-lg p-4 border border-purple-500/20">
              <Shield className="h-5 w-5 text-purple-400 mb-2" />
              <div className="text-sm text-muted-foreground">Emergency Fund</div>
              <div className="text-xl font-bold text-purple-400">3-6 months</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-white">Primary Funding Options</h3>
        {fundingOptions.map((option, index) => (
          <Card key={index} className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-white text-lg">{option.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">{option.type}</p>
                </div>
                <Badge className={getSuitabilityColor(option.suitability)}>
                  {option.suitability} suitability
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-elec-dark/50 p-3 rounded">
                    <div className="text-xs text-muted-foreground">Amount</div>
                    <div className="font-semibold text-white">{option.amount}</div>
                  </div>
                  <div className="bg-elec-dark/50 p-3 rounded">
                    <div className="text-xs text-muted-foreground">Interest Rate</div>
                    <div className="font-semibold text-white">{option.rate}</div>
                  </div>
                  <div className="bg-elec-dark/50 p-3 rounded">
                    <div className="text-xs text-muted-foreground">Term</div>
                    <div className="font-semibold text-white">{option.term}</div>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground">{option.description}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-medium text-green-400 mb-2">Advantages</h5>
                    <ul className="space-y-1">
                      {option.pros.map((pro, proIndex) => (
                        <li key={proIndex} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <CheckCircle className="h-3 w-3 text-green-400 mt-0.5 flex-shrink-0" />
                          {pro}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium text-amber-400 mb-2">Considerations</h5>
                    <ul className="space-y-1">
                      {option.cons.map((con, conIndex) => (
                        <li key={conIndex} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <div className="w-3 h-3 border border-amber-400 rounded-full mt-0.5 flex-shrink-0" />
                          {con}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-green-500/20 bg-green-500/10">
          <CardHeader>
            <CardTitle className="text-green-400 flex items-center gap-2">
              <Building className="h-5 w-5" />
              Grants & Free Money
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {grants.map((grant, index) => (
                <div key={index} className="border border-green-500/20 rounded-lg p-3">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-white">{grant.name}</h4>
                    <Badge className="bg-green-500/20 text-green-400">{grant.amount}</Badge>
                  </div>
                  <p className="text-xs text-green-300 mb-1">{grant.eligibility}</p>
                  <p className="text-sm text-muted-foreground">{grant.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-blue-500/20 bg-blue-500/10">
          <CardHeader>
            <CardTitle className="text-blue-400 flex items-center gap-2">
              <Users className="h-5 w-5" />
              Alternative Funding
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {alternativeFunding.map((option, index) => (
                <div key={index} className="border border-blue-500/20 rounded-lg p-3">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-white">{option.name}</h4>
                    <span className="text-xs text-blue-400">{option.rate}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">{option.description}</p>
                  <p className="text-xs text-blue-300">{option.suitability}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-amber-500/30 bg-amber-500/10">
        <CardHeader>
          <CardTitle className="text-amber-400">Funding Application Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3 text-amber-300">Before You Apply</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Check your personal credit score</li>
                <li>• Prepare detailed business plan</li>
                <li>• Gather financial projections</li>
                <li>• Research multiple lenders</li>
                <li>• Understand all terms and fees</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-amber-300">Improve Your Chances</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Show relevant industry experience</li>
                <li>• Demonstrate market research</li>
                <li>• Provide realistic financial forecasts</li>
                <li>• Have some personal investment</li>
                <li>• Get professional advice</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-6 pt-4 border-t border-amber-500/20">
            <div className="flex flex-wrap gap-3">
              <Button variant="outline" className="border-amber-500/30">
                <ExternalLink className="h-4 w-4 mr-2" />
                Start Up Loans
              </Button>
              <Button variant="outline" className="border-blue-500/30">
                <ExternalLink className="h-4 w-4 mr-2" />
                Business Bank Comparison
              </Button>
              <Button variant="outline" className="border-green-500/30">
                <ExternalLink className="h-4 w-4 mr-2" />
                Government Grants
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FundingOptionsTab;
