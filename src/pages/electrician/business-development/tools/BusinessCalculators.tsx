import { Link } from "react-router-dom";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Calculator,
  TrendingUp,
  PoundSterling,
  BarChart3,
  Target,
  Clock,
  Building,
  DollarSign,
  Scale,
  Users,
  ClipboardList,
  Percent
} from "lucide-react";
import { Helmet } from "react-helmet";
import { SmartBackButton } from "@/components/ui/smart-back-button";

const BusinessCalculators = () => {
  const calculators = [
    {
      id: "job-profitability",
      title: "Job Profitability Calculator",
      icon: <Calculator className="h-12 w-12 text-elec-yellow" />,
      status: "available"
    },
    {
      id: "business-cost",
      title: "Business Cost Calculator", 
      icon: <PoundSterling className="h-12 w-12 text-elec-yellow" />,
      status: "available"
    },
    {
      id: "cash-flow",
      title: "Cash Flow Planner",
      icon: <TrendingUp className="h-12 w-12 text-elec-yellow" />,
      status: "available"
    },
    {
      id: "pricing-strategy", 
      title: "Pricing Strategy Calculator",
      icon: <Target className="h-12 w-12 text-elec-yellow" />,
      status: "available"
    },
    {
      id: "roi-calculator",
      title: "Equipment ROI Calculator",
      icon: <BarChart3 className="h-12 w-12 text-elec-yellow" />,
      status: "available"
    },
    {
      id: "hourly-rate",
      title: "Hourly Rate Calculator",
      icon: <Clock className="h-12 w-12 text-elec-yellow" />,
      status: "available"
    },
    {
      id: "capacity-planner",
      title: "Capacity Planning Tool",
      icon: <Building className="h-12 w-12 text-elec-yellow" />,
      status: "available"
    },
    {
      id: "tax-estimator",
      title: "Tax & NI Estimator",
      icon: <PoundSterling className="h-12 w-12 text-elec-yellow" />,
      status: "available"
    },
    {
      id: "break-even",
      title: "Break-even & Margin Guard",
      icon: <Scale className="h-12 w-12 text-elec-yellow" />,
      status: "available"
    },
    {
      id: "staff-cost",
      title: "Fully Loaded Staff Cost",
      icon: <Users className="h-12 w-12 text-elec-yellow" />,
      status: "available"
    },
    {
      id: "quote-variance",
      title: "Quote vs Actual Tracker",
      icon: <ClipboardList className="h-12 w-12 text-elec-yellow" />,
      status: "available"
    },
    {
      id: "minimum-charge",
      title: "Minimum Charge & First Hour",
      icon: <PoundSterling className="h-12 w-12 text-elec-yellow" />,
      status: "available"
    },
    {
      id: "vat-scheme",
      title: "VAT Scheme Comparison",
      icon: <Percent className="h-12 w-12 text-elec-yellow" />,
      status: "available"
    },
    {
      id: "cis-drc",
      title: "CIS & DRC Helper (UK)",
      icon: <PoundSterling className="h-12 w-12 text-elec-yellow" />,
      status: "available"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-elec-dark via-elec-grey to-elec-dark pt-safe">
      <Helmet>
        <title>Electrician Business Calculators UK | Pricing, ROI, Tax</title>
        <meta name="description" content="UK electrician calculators: hourly rate, pricing, ROI, cash flow, capacity and tax. Mobile-first, fast and accurate." />
        <link rel="canonical" href="/electrician/business-development/tools" />
      </Helmet>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8 pt-safe pb-safe">
        {/* Header */}
        <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20">
              <Calculator className="h-6 w-6 sm:h-7 sm:w-7 text-blue-400" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                Business Calculators
              </h1>
              <p className="text-sm text-white">Financial planning tools</p>
            </div>
          </div>
          <SmartBackButton />
        </header>

        {/* Subtitle */}
        <p className="text-white text-center max-w-2xl mx-auto">
          Professional calculators and tools to help you make informed business decisions and plan for success.
        </p>

        {/* Calculator Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {calculators.map((calculator) => (
            calculator.status === "available" ? (
              <Link
                key={calculator.id}
                to={`/electrician/business-development/tools/${calculator.id}`}
                className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-elec-yellow/50 rounded-xl touch-manipulation"
              >
                <Card className="relative overflow-hidden border-white/10 bg-white/5 hover:bg-white/10 hover:border-elec-yellow/40 active:scale-[0.98] h-full transition-all duration-200">
                  <CardHeader className="flex flex-col items-center justify-center text-center p-4 sm:p-5 space-y-2 sm:space-y-3">
                    <div className="p-2 sm:p-2.5 rounded-xl bg-elec-yellow/10 border border-elec-yellow/20">
                      {calculator.icon}
                    </div>
                    <CardTitle className="text-xs sm:text-sm font-semibold text-white leading-tight">
                      {calculator.title}
                    </CardTitle>
                  </CardHeader>
                </Card>
              </Link>
            ) : (
              <div key={calculator.id} className="cursor-not-allowed opacity-50">
                <Card className="border-white/10 bg-white/5 h-full">
                  <CardHeader className="flex flex-col items-center justify-center text-center p-4 sm:p-5 space-y-2 sm:space-y-3">
                    <div className="p-2 sm:p-2.5 rounded-xl bg-white/5 border border-white/10">
                      {calculator.icon}
                    </div>
                    <CardTitle className="text-xs sm:text-sm font-semibold text-white leading-tight">
                      {calculator.title}
                    </CardTitle>
                  </CardHeader>
                </Card>
              </div>
            )
          ))}
        </div>
      </main>
    </div>
  );
};

export default BusinessCalculators;