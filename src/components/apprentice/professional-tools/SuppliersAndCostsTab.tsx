
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Store, MapPin, CreditCard, Truck, Phone, Globe } from "lucide-react";
import BudgetPlanningCalculator from "@/components/apprentice/tools-guide/BudgetPlanningCalculator";

const SuppliersAndCostsTab = () => {
  const ukSuppliers = [
    {
      name: "CEF (City Electrical Factors)",
      type: "National Chain",
      speciality: "Comprehensive electrical supplies",
      pros: ["Nationwide coverage", "Trade accounts available", "Good apprentice support"],
      cons: ["Can be pricey", "Limited tool selection"],
      apprenticeSupport: "10% apprentice discount with valid ID",
      locations: "200+ branches across UK",
      website: "cef.co.uk",
      bestFor: "Electrical components and basic tools"
    },
    {
      name: "Screwfix",
      type: "Retail Chain",
      speciality: "Tools and hardware",
      pros: ["Competitive prices", "Click & collect", "Good return policy"],
      cons: ["Limited electrical expertise", "Quality varies"],
      apprenticeSupport: "Student discount available",
      locations: "800+ stores nationwide",
      website: "screwfix.com",
      bestFor: "General tools and consumables"
    },
    {
      name: "TLC Electrical",
      type: "Online/Trade",
      speciality: "Professional electrical supplies",
      pros: ["Professional focus", "Technical support", "Competitive pricing"],
      cons: ["Mainly online", "Minimum orders"],
      apprenticeSupport: "Education pricing available",
      locations: "Online + regional depots",
      website: "tlc-direct.co.uk",
      bestFor: "Professional test equipment"
    },
    {
      name: "RS Components",
      type: "Industrial Supplier",
      speciality: "Technical products",
      pros: ["High quality", "Technical data", "Next day delivery"],
      cons: ["Higher prices", "Complex ordering"],
      apprenticeSupport: "Educational discounts available",
      locations: "Online + trade counters",
      website: "rs-online.com",
      bestFor: "Precision instruments and components"
    }
  ];

  const budgetingStrategies = [
    {
      strategy: "Spread Purchase Plan",
      description: "Distribute tool purchases over 12-18 months",
      monthlyBudget: "£100-200",
      benefits: ["Manageable payments", "Learn tool preferences", "Avoid debt"],
      timeline: [
        "Month 1-3: Safety gear and basic hand tools",
        "Month 4-6: Power tools and storage",
        "Month 7-12: Test equipment and specialists",
        "Month 13+: Upgrades and additional tools"
      ]
    },
    {
      strategy: "Priority-Based Purchasing",
      description: "Buy essential tools first, then upgrade",
      monthlyBudget: "£150-300",
      benefits: ["Immediate functionality", "Shorter setup time", "Professional appearance"],
      timeline: [
        "Week 1: PPE and basic safety",
        "Month 1: Essential hand tools",
        "Month 2-3: Basic power tools",
        "Month 4-6: Test equipment"
      ]
    },
    {
      strategy: "Quality Investment Plan",
      description: "Buy fewer, higher-quality tools",
      monthlyBudget: "£200-400",
      benefits: ["Long-term value", "Better performance", "Professional image"],
      timeline: [
        "Research extensively before purchasing",
        "Buy one tool category at a time",
        "Focus on lifetime value",
        "Maintain and care properly"
      ]
    }
  ];

  const savingTips = [
    {
      tip: "Timing Your Purchases",
      description: "Take advantage of seasonal sales and promotions",
      savings: "10-30%",
      details: [
        "Black Friday and January sales",
        "End of financial year clearances",
        "Tool brand promotional periods",
        "Trade show discounts"
      ]
    },
    {
      tip: "Group Buying with Peers",
      description: "Coordinate purchases with other apprentices",
      savings: "5-15%",
      details: [
        "Bulk purchase discounts",
        "Shared delivery costs",
        "Group negotiation power",
        "Split specialized tools"
      ]
    },
    {
      tip: "Second-Hand Quality Tools",
      description: "Buy premium brands at reduced prices",
      savings: "30-50%",
      details: [
        "Check eBay and Facebook Marketplace",
        "Verify tool condition thoroughly",
        "Ensure safety certifications valid",
        "Test before purchasing when possible"
      ]
    }
  ];

  const financingOptions = [
    {
      option: "Apprentice Loans",
      rate: "0-3% APR",
      amount: "£500-3000",
      term: "12-36 months",
      eligibility: "Enrolled apprentices with regular income",
      pros: ["Low interest", "Flexible terms", "Build credit history"],
      cons: ["Debt commitment", "Income requirements"]
    },
    {
      option: "0% Credit Cards",
      rate: "0% for 6-24 months",
      amount: "£500-5000",
      term: "Promotional period",
      eligibility: "Good credit score required",
      pros: ["No interest if paid on time", "Purchase protection"],
      cons: ["High APR after promotion", "Credit requirements"]
    },
    {
      option: "Employer Schemes",
      rate: "Varies",
      amount: "£1000-5000",
      term: "12-60 months",
      eligibility: "Company-dependent",
      pros: ["Employer guaranteed", "Payroll deduction"],
      cons: ["Limited to company suppliers", "Employment dependent"]
    }
  ];

  return (
    <div className="space-y-6">
      <Alert className="border-blue-500/50 bg-blue-500/10">
        <Store className="h-4 w-4 text-blue-400" />
        <AlertDescription className="text-blue-200">
          Smart supplier selection and budgeting can save you hundreds of pounds on your professional toolkit while ensuring you get quality tools.
        </AlertDescription>
      </Alert>

      {/* UK Suppliers Overview */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-elec-yellow flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Major UK Tool Suppliers
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Key suppliers for electrical tools and equipment across the UK
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {ukSuppliers.map((supplier, index) => (
              <div key={index} className="border border-elec-yellow/30 rounded-lg p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium text-white">{supplier.name}</h3>
                    <p className="text-sm text-muted-foreground">{supplier.speciality}</p>
                  </div>
                  <Badge variant="outline" className="border-elec-yellow/40 text-elec-yellow">
                    {supplier.type}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-muted-foreground">Locations:</span>
                    <p className="text-white">{supplier.locations}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Best For:</span>
                    <p className="text-white">{supplier.bestFor}</p>
                  </div>
                </div>

                <div className="bg-green-500/10 rounded p-2">
                  <span className="text-xs font-medium text-green-300">Apprentice Support:</span>
                  <p className="text-xs text-green-200">{supplier.apprenticeSupport}</p>
                </div>

                <div className="flex items-center gap-2 text-xs text-blue-300">
                  <Globe className="h-3 w-3" />
                  {supplier.website}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Budget Planning Calculator */}
      <BudgetPlanningCalculator />

      {/* Budgeting Strategies */}
      <Card className="border-green-500/20 bg-green-500/10">
        <CardHeader>
          <CardTitle className="text-green-300 flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Budgeting Strategies for Apprentices
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {budgetingStrategies.map((strategy, index) => (
              <div key={index} className="border border-green-500/30 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-green-200">{strategy.strategy}</h3>
                  <Badge variant="outline" className="border-green-500/40 text-green-400">
                    {strategy.monthlyBudget}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{strategy.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <h4 className="text-sm font-medium text-green-300 mb-1">Benefits:</h4>
                    <ul className="text-xs text-muted-foreground space-y-0.5">
                      {strategy.benefits.map((benefit, idx) => (
                        <li key={idx}>• {benefit}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-green-300 mb-1">Timeline:</h4>
                    <ul className="text-xs text-muted-foreground space-y-0.5">
                      {strategy.timeline.map((phase, idx) => (
                        <li key={idx}>• {phase}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Money-Saving Tips */}
      <Card className="border-orange-500/20 bg-orange-500/10">
        <CardHeader>
          <CardTitle className="text-orange-300 flex items-center gap-2">
            <Truck className="h-5 w-5" />
            Money-Saving Tips for Tool Purchases
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {savingTips.map((tip, index) => (
              <div key={index} className="border border-orange-500/30 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-orange-200 text-sm">{tip.tip}</h3>
                  <Badge variant="outline" className="border-orange-500/40 text-orange-400 text-xs">
                    {tip.savings}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mb-2">{tip.description}</p>
                <ul className="text-xs text-muted-foreground space-y-0.5">
                  {tip.details.map((detail, idx) => (
                    <li key={idx}>• {detail}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Financing Options */}
      <Card className="border-purple-500/20 bg-purple-500/10">
        <CardHeader>
          <CardTitle className="text-purple-300 flex items-center gap-2">
            <Phone className="h-5 w-5" />
            Financing Options for Larger Purchases
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Responsible financing options for expensive test equipment
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {financingOptions.map((option, index) => (
              <div key={index} className="border border-purple-500/30 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-purple-200">{option.option}</h3>
                  <Badge variant="outline" className="border-purple-500/40 text-purple-400">
                    {option.rate}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs mb-2">
                  <div>
                    <span className="text-muted-foreground">Amount:</span>
                    <p className="text-white">{option.amount}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Term:</span>
                    <p className="text-white">{option.term}</p>
                  </div>
                  <div className="col-span-2">
                    <span className="text-muted-foreground">Eligibility:</span>
                    <p className="text-white">{option.eligibility}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <div>
                    <span className="text-xs font-medium text-green-300">Pros:</span>
                    <ul className="text-xs text-muted-foreground">
                      {option.pros.map((pro, idx) => (
                        <li key={idx}>• {pro}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <span className="text-xs font-medium text-red-300">Cons:</span>
                    <ul className="text-xs text-muted-foreground">
                      {option.cons.map((con, idx) => (
                        <li key={idx}>• {con}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Alert className="border-red-500/50 bg-red-500/10">
        <AlertDescription className="text-red-200">
          <strong>Financial Warning:</strong> Only borrow what you can afford to repay. Tool purchases are an investment, but debt can impact your financial future. Consider starting with essential items and upgrading gradually.
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default SuppliersAndCostsTab;
