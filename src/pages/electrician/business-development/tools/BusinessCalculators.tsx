import { Link } from "react-router-dom";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import BackButton from "@/components/common/BackButton";
import { 
  Calculator, 
  TrendingUp, 
  PoundSterling,
  BarChart3,
  Target,
  Clock,
  Building,
  DollarSign
} from "lucide-react";
import { Helmet } from "react-helmet";

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
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <Helmet>
        <title>Electrician Business Calculators UK | Pricing, ROI, Tax</title>
        <meta name="description" content="UK electrician calculators: hourly rate, pricing, ROI, cash flow, capacity and tax. Mobile-first, fast and accurate." />
        <link rel="canonical" href="/electrician/business-development/tools" />
      </Helmet>
      <div className="flex flex-col items-center justify-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-4 flex items-center gap-3">
          <Calculator className="h-8 w-8 text-elec-yellow" />
          Business Calculators
        </h1>
        <p className="text-muted-foreground text-center max-w-2xl mb-6">
          Professional calculators and tools to help you make informed business decisions and plan for success.
        </p>
        <BackButton customUrl="/electrician/business" label="Back to Business Hub" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {calculators.map((calculator) => (
          calculator.status === "available" ? (
            <Link
              key={calculator.id}
              to={`/electrician/business-development/tools/${calculator.id}`}
              className="block no-underline"
            >
              <Card className="border-elec-yellow/20 bg-elec-card hover:bg-elec-yellow/5 transition-all duration-300 group">
                <CardHeader className="text-center">
                  <div className="transition-transform group-hover:scale-110 duration-300 mx-auto mb-4">
                    {calculator.icon}
                  </div>
                  <CardTitle className="text-foreground text-lg">
                    {calculator.title}
                  </CardTitle>
                </CardHeader>
              </Card>
            </Link>
          ) : (
            <div
              key={calculator.id}
              className="cursor-not-allowed opacity-60"
            >
              <Card className="border-elec-yellow/20 bg-elec-card">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4">
                    {calculator.icon}
                  </div>
                  <CardTitle className="text-foreground text-lg">
                    {calculator.title}
                  </CardTitle>
                </CardHeader>
              </Card>
            </div>
          )
        ))}
      </div>
    </div>
  );
};

export default BusinessCalculators;