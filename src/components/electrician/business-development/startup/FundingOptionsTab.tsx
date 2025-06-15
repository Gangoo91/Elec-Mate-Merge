
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PoundSterling, TrendingUp, Building, Users, ExternalLink, CheckCircle } from "lucide-react";

const FundingOptionsTab = () => {
  const governmentSchemes = [
    {
      name: "Start Up Loans",
      amount: "£500 - £25,000",
      rate: "6% fixed",
      description: "Government-backed personal loans for new businesses",
      requirements: ["Business plan required", "Personal guarantee", "Available for up to 3 years"],
      website: "startuploans.co.uk"
    },
    {
      name: "Innovate UK Grants",
      amount: "£25,000 - £2M",
      rate: "Grant (no repayment)",
      description: "Funding for innovative electrical technology projects",
      requirements: ["Innovation focus", "Technology development", "Job creation potential"],
      website: "apply-for-innovation-funding.service.gov.uk"
    },
    {
      name: "Help to Grow Scheme",
      amount: "Up to £5,000",
      rate: "90% government funded",
      description: "Management training and development funding",
      requirements: ["5-249 employees", "2+ years trading", "Growth potential"],
      website: "help-to-grow.service.gov.uk"
    }
  ];

  const bankLoans = [
    {
      bank: "Santander",
      product: "Business Current Account + Loan",
      amount: "£1,000 - £250,000",
      features: ["18 months free banking", "Dedicated business manager", "Online application"],
      typical_rate: "5.5% - 12.5%"
    },
    {
      bank: "NatWest",
      product: "Start-Up Business Account",
      amount: "£1,000 - £500,000",
      features: ["Free banking for 18 months", "Business mentor support", "Cashflow forecasting tools"],
      typical_rate: "4.5% - 11.9%"
    },
    {
      bank: "HSBC",
      product: "Business Start-Up Loan",
      amount: "£1,000 - £30,000",
      features: ["No arrangement fees", "Flexible repayment", "Business banking package"],
      typical_rate: "6.9% - 15.9%"
    }
  ];

  const alternativeFunding = [
    {
      type: "Peer-to-Peer Lending",
      providers: ["Funding Circle", "Zopa Business"],
      pros: ["Faster approval", "Competitive rates", "Less paperwork"],
      cons: ["Variable rates", "Platform fees", "Less personal support"],
      typical_range: "3.5% - 15%"
    },
    {
      type: "Invoice Factoring",
      providers: ["MarketInvoice", "Bibby Financial Services"],
      pros: ["Immediate cash flow", "No debt on balance sheet", "Credit protection"],
      cons: ["Client notification", "Ongoing fees", "Customer relationship impact"],
      typical_range: "1.5% - 3% per month"
    },
    {
      type: "Equipment Finance",
      providers: ["Close Brothers", "Aldermore"],
      pros: ["Preserve cash flow", "Tax benefits", "Equipment as security"],
      cons: ["Asset tied up", "Total cost higher", "Depreciation risk"],
      typical_range: "4% - 12%"
    }
  ];

  const grantOpportunities = [
    {
      name: "Local Enterprise Partnership Grants",
      focus: "Regional business development",
      amount: "£1,000 - £50,000",
      eligibility: "Location-specific criteria"
    },
    {
      name: "Green Business Grants",
      focus: "Renewable energy installations",
      amount: "£5,000 - £100,000",
      eligibility: "Environmental impact projects"
    },
    {
      name: "Prince's Trust Enterprise Programme",
      focus: "Young entrepreneurs (18-30)",
      amount: "£500 - £4,000",
      eligibility: "Age and circumstance specific"
    }
  ];

  return (
    <div className="space-y-6">
      <Card className="border-green-500/50 bg-green-500/10">
        <CardHeader>
          <CardTitle className="text-green-300 flex items-center gap-2">
            <PoundSterling className="h-5 w-5" />
            Government Funding Schemes
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {governmentSchemes.map((scheme, index) => (
            <div key={index} className="p-4 bg-elec-dark/50 rounded-lg space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-white">{scheme.name}</h4>
                <div className="flex items-center gap-2">
                  <Badge className="bg-green-500/20 text-green-300">
                    {scheme.amount}
                  </Badge>
                  <Badge variant="outline" className="border-green-400/30 text-green-300">
                    {scheme.rate}
                  </Badge>
                </div>
              </div>
              <p className="text-muted-foreground">{scheme.description}</p>
              <div className="space-y-2">
                <h5 className="text-sm font-medium text-green-300">Requirements:</h5>
                <ul className="space-y-1">
                  {scheme.requirements.map((req, reqIndex) => (
                    <li key={reqIndex} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-3 w-3 text-green-400" />
                      {req}
                    </li>
                  ))}
                </ul>
              </div>
              <Button variant="outline" size="sm" className="w-full">
                <ExternalLink className="h-4 w-4 mr-2" />
                Visit {scheme.website}
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="border-blue-500/50 bg-blue-500/10">
        <CardHeader>
          <CardTitle className="text-blue-300 flex items-center gap-2">
            <Building className="h-5 w-5" />
            Traditional Bank Loans
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {bankLoans.map((loan, index) => (
            <div key={index} className="p-4 bg-elec-dark/50 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-white">{loan.bank}</h4>
                <Badge className="bg-blue-500/20 text-blue-300">
                  {loan.typical_rate}
                </Badge>
              </div>
              <h5 className="text-sm font-medium text-blue-300 mb-2">{loan.product}</h5>
              <p className="text-muted-foreground mb-3">Loan amount: {loan.amount}</p>
              <div className="space-y-1">
                {loan.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center gap-2 text-sm">
                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                    {feature}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="border-purple-500/50 bg-purple-500/10">
        <CardHeader>
          <CardTitle className="text-purple-300 flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Alternative Funding Sources
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {alternativeFunding.map((option, index) => (
            <div key={index} className="p-4 bg-elec-dark/50 rounded-lg space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-white">{option.type}</h4>
                <Badge className="bg-purple-500/20 text-purple-300">
                  {option.typical_range}
                </Badge>
              </div>
              <div className="text-sm text-muted-foreground">
                <strong>Providers:</strong> {option.providers.join(", ")}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <h6 className="text-xs font-medium text-green-400 mb-1">Advantages</h6>
                  <ul className="space-y-1">
                    {option.pros.map((pro, proIndex) => (
                      <li key={proIndex} className="text-xs flex items-center gap-1">
                        <div className="w-1 h-1 bg-green-400 rounded-full" />
                        {pro}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h6 className="text-xs font-medium text-amber-400 mb-1">Considerations</h6>
                  <ul className="space-y-1">
                    {option.cons.map((con, conIndex) => (
                      <li key={conIndex} className="text-xs flex items-center gap-1">
                        <div className="w-1 h-1 bg-amber-400 rounded-full" />
                        {con}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="border-elec-yellow/50 bg-elec-yellow/10">
        <CardHeader>
          <CardTitle className="text-elec-yellow flex items-center gap-2">
            <Users className="h-5 w-5" />
            Grant Opportunities
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {grantOpportunities.map((grant, index) => (
            <div key={index} className="p-3 bg-elec-dark/50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-white">{grant.name}</h4>
                <Badge variant="outline" className="border-elec-yellow/30 text-elec-yellow">
                  {grant.amount}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-1">{grant.focus}</p>
              <p className="text-xs text-muted-foreground">{grant.eligibility}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-elec-yellow">Funding Strategy Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="p-3 bg-elec-dark/30 rounded-md">
              <h4 className="font-medium text-white mb-2">1. Start Small, Scale Up</h4>
              <p className="text-sm text-muted-foreground">
                Begin with personal savings and small loans. Build credit history and business track record before seeking larger funding.
              </p>
            </div>
            <div className="p-3 bg-elec-dark/30 rounded-md">
              <h4 className="font-medium text-white mb-2">2. Diversify Funding Sources</h4>
              <p className="text-sm text-muted-foreground">
                Don't rely on a single funding source. Combine grants, loans, and retained earnings for financial stability.
              </p>
            </div>
            <div className="p-3 bg-elec-dark/30 rounded-md">
              <h4 className="font-medium text-white mb-2">3. Maintain Strong Credit</h4>
              <p className="text-sm text-muted-foreground">
                Keep personal and business credit scores high. This opens more funding options and better interest rates.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FundingOptionsTab;
