
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Store, MapPin, CreditCard, Truck, Phone, Globe, Info, AlertTriangle, CheckCircle, Percent } from "lucide-react";
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
    <div className="space-y-6 animate-fade-in">
      {/* Hero Alert */}
      <div className="p-4 rounded-xl bg-gradient-to-br from-blue-500/10 to-blue-500/5 border border-blue-500/30">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-blue-500/20">
            <Info className="h-5 w-5 text-blue-400" />
          </div>
          <div>
            <p className="font-medium text-blue-400 mb-1">Smart Purchasing Guide</p>
            <p className="text-sm text-white/70">
              Smart supplier selection and budgeting can save you hundreds of pounds on your professional toolkit while ensuring you get quality tools.
            </p>
          </div>
        </div>
      </div>

      {/* UK Suppliers Overview */}
      <Card className="bg-gradient-to-br from-elec-gray to-elec-card border-elec-yellow/20 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-elec-yellow/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <CardHeader className="relative">
          <CardTitle className="text-white flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-elec-yellow/20 to-elec-yellow/5 border border-elec-yellow/30">
              <MapPin className="h-5 w-5 text-elec-yellow" />
            </div>
            Major UK Tool Suppliers
          </CardTitle>
          <p className="text-sm text-white/60">
            Key suppliers for electrical tools and equipment across the UK
          </p>
        </CardHeader>
        <CardContent className="relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {ukSuppliers.map((supplier, index) => (
              <div key={index} className="p-4 rounded-xl bg-white/10 border border-white/10 hover:border-elec-yellow/30 transition-all space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-white">{supplier.name}</h3>
                    <p className="text-sm text-white/60">{supplier.speciality}</p>
                  </div>
                  <Badge variant="outline" className="bg-elec-yellow/10 border-elec-yellow/30 text-elec-yellow">
                    {supplier.type}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-white/80">Locations:</span>
                    <p className="text-white/80">{supplier.locations}</p>
                  </div>
                  <div>
                    <span className="text-white/80">Best For:</span>
                    <p className="text-white/80">{supplier.bestFor}</p>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                  <span className="text-xs font-medium text-green-400">Apprentice Support:</span>
                  <p className="text-xs text-white/70 mt-1">{supplier.apprenticeSupport}</p>
                </div>

                <div className="flex items-center gap-2 text-xs text-blue-400">
                  <Globe className="h-3.5 w-3.5" />
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
      <Card className="bg-gradient-to-br from-elec-gray to-elec-card border-green-500/20 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <CardHeader className="relative">
          <CardTitle className="text-white flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-green-500/20 to-green-500/5 border border-green-500/30">
              <CreditCard className="h-5 w-5 text-green-400" />
            </div>
            Budgeting Strategies for Apprentices
          </CardTitle>
          <p className="text-sm text-white/60">
            Smart approaches to building your professional toolkit
          </p>
        </CardHeader>
        <CardContent className="relative">
          <div className="space-y-4">
            {budgetingStrategies.map((strategy, index) => (
              <div key={index} className="p-5 rounded-xl bg-green-500/5 border border-green-500/20 hover:border-green-500/40 transition-all">
                <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
                  <h3 className="font-semibold text-white">{strategy.strategy}</h3>
                  <Badge variant="outline" className="bg-green-500/10 border-green-500/30 text-green-400">
                    {strategy.monthlyBudget}/month
                  </Badge>
                </div>
                <p className="text-sm text-white/60 mb-4">{strategy.description}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-3 rounded-lg bg-white/10 border border-white/10">
                    <h4 className="text-sm font-medium text-green-400 mb-2">Benefits:</h4>
                    <ul className="text-sm text-white/60 space-y-1.5">
                      {strategy.benefits.map((benefit, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle className="h-3.5 w-3.5 text-green-400 mt-0.5 flex-shrink-0" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-3 rounded-lg bg-white/10 border border-white/10">
                    <h4 className="text-sm font-medium text-green-400 mb-2">Timeline:</h4>
                    <ul className="text-sm text-white/60 space-y-1.5">
                      {strategy.timeline.map((phase, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-green-400 rounded-full mt-1.5 flex-shrink-0" />
                          {phase}
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

      {/* Money-Saving Tips */}
      <Card className="bg-gradient-to-br from-elec-gray to-elec-card border-orange-500/20 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <CardHeader className="relative">
          <CardTitle className="text-white flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-orange-500/20 to-orange-500/5 border border-orange-500/30">
              <Percent className="h-5 w-5 text-orange-400" />
            </div>
            Money-Saving Tips for Tool Purchases
          </CardTitle>
          <p className="text-sm text-white/60">
            Smart strategies to get the best value for your money
          </p>
        </CardHeader>
        <CardContent className="relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {savingTips.map((tip, index) => (
              <div key={index} className="p-4 rounded-xl bg-orange-500/5 border border-orange-500/20 hover:border-orange-500/40 transition-all">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-white text-sm">{tip.tip}</h3>
                  <Badge variant="outline" className="bg-orange-500/10 border-orange-500/30 text-orange-400 text-xs">
                    Save {tip.savings}
                  </Badge>
                </div>
                <p className="text-sm text-white/60 mb-3">{tip.description}</p>
                <ul className="text-sm text-white/60 space-y-1.5">
                  {tip.details.map((detail, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-orange-400 rounded-full mt-1.5 flex-shrink-0" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Financing Options */}
      <Card className="bg-gradient-to-br from-elec-gray to-elec-card border-purple-500/20 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <CardHeader className="relative">
          <CardTitle className="text-white flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-purple-500/20 to-purple-500/5 border border-purple-500/30">
              <Phone className="h-5 w-5 text-purple-400" />
            </div>
            Financing Options for Larger Purchases
          </CardTitle>
          <p className="text-sm text-white/60">
            Responsible financing options for expensive test equipment
          </p>
        </CardHeader>
        <CardContent className="relative">
          <div className="space-y-4">
            {financingOptions.map((option, index) => (
              <div key={index} className="p-4 rounded-xl bg-purple-500/5 border border-purple-500/20 hover:border-purple-500/40 transition-all">
                <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
                  <h3 className="font-semibold text-white">{option.option}</h3>
                  <Badge variant="outline" className="bg-purple-500/10 border-purple-500/30 text-purple-400">
                    {option.rate}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm mb-4">
                  <div className="p-2 rounded-lg bg-white/10">
                    <span className="text-white/80 text-xs">Amount:</span>
                    <p className="text-white font-medium">{option.amount}</p>
                  </div>
                  <div className="p-2 rounded-lg bg-white/10">
                    <span className="text-white/80 text-xs">Term:</span>
                    <p className="text-white font-medium">{option.term}</p>
                  </div>
                  <div className="col-span-2 p-2 rounded-lg bg-white/10">
                    <span className="text-white/80 text-xs">Eligibility:</span>
                    <p className="text-white/80 text-sm">{option.eligibility}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                    <span className="text-sm font-medium text-green-400">Pros:</span>
                    <ul className="text-sm text-white/60 mt-2 space-y-1">
                      {option.pros.map((pro, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle className="h-3.5 w-3.5 text-green-400 mt-0.5 flex-shrink-0" />
                          {pro}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                    <span className="text-sm font-medium text-red-400">Cons:</span>
                    <ul className="text-sm text-white/60 mt-2 space-y-1">
                      {option.cons.map((con, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <AlertTriangle className="h-3.5 w-3.5 text-red-400 mt-0.5 flex-shrink-0" />
                          {con}
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

      {/* Financial Warning Alert */}
      <div className="p-4 rounded-xl bg-gradient-to-br from-red-500/10 to-red-500/5 border border-red-500/30">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-red-500/20">
            <AlertTriangle className="h-5 w-5 text-red-400" />
          </div>
          <div>
            <p className="font-medium text-red-400 mb-1">Financial Warning</p>
            <p className="text-sm text-white/70">
              Only borrow what you can afford to repay. Tool purchases are an investment, but debt can impact your financial future. Consider starting with essential items and upgrading gradually.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuppliersAndCostsTab;
