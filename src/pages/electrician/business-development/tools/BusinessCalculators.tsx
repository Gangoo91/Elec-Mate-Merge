import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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

const BusinessCalculators = () => {
  const navigate = useNavigate();

  const calculators = [
    {
      id: "job-profitability",
      title: "Job Profitability Calculator",
      description: "Analyse quote profitability against desired margins and calculate minimum pricing to meet profit targets.",
      icon: <Calculator className="h-8 w-8 text-elec-yellow" />,
      status: "available"
    },
    {
      id: "business-cost",
      title: "Business Cost Calculator", 
      description: "Calculate startup costs and year-one expenses for electrical contracting business.",
      icon: <PoundSterling className="h-8 w-8 text-green-400" />,
      status: "available"
    },
    {
      id: "cash-flow",
      title: "Cash Flow Planner",
      description: "Project monthly cash flow and identify potential funding requirements.",
      icon: <TrendingUp className="h-8 w-8 text-blue-400" />,
      status: "coming-soon"
    },
    {
      id: "pricing-strategy", 
      title: "Pricing Strategy Calculator",
      description: "Develop competitive pricing strategies based on local market analysis.",
      icon: <Target className="h-8 w-8 text-purple-400" />,
      status: "coming-soon"
    },
    {
      id: "roi-calculator",
      title: "Equipment ROI Calculator",
      description: "Calculate return on investment for tools and equipment purchases.",
      icon: <BarChart3 className="h-8 w-8 text-orange-400" />,
      status: "coming-soon"
    },
    {
      id: "hourly-rate",
      title: "Hourly Rate Calculator",
      description: "Determine optimal hourly rates based on costs, overheads, and profit targets.",
      icon: <Clock className="h-8 w-8 text-cyan-400" />,
      status: "coming-soon"
    },
    {
      id: "capacity-planner",
      title: "Capacity Planning Tool",
      description: "Plan workforce capacity and identify expansion opportunities.",
      icon: <Building className="h-8 w-8 text-pink-400" />,
      status: "coming-soon"
    },
    {
      id: "tax-estimator",
      title: "Tax & NI Estimator",
      description: "Estimate tax liabilities and National Insurance contributions.",
      icon: <DollarSign className="h-8 w-8 text-yellow-400" />,
      status: "coming-soon"
    }
  ];

  const handleCalculatorClick = (calculatorId: string, status: string) => {
    if (status === "available") {
      navigate(`/electrician/business-development/tools/${calculatorId}`);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="flex flex-col items-center justify-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-4 flex items-center gap-3">
          <Calculator className="h-8 w-8 text-elec-yellow" />
          Business Development Calculators
        </h1>
        <p className="text-muted-foreground text-center max-w-2xl mb-6">
          Professional calculators and tools to help you make informed business decisions and plan for success.
        </p>
        <BackButton customUrl="/electrician/business-development" label="Back to Business Development" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {calculators.map((calculator) => (
          <Card
            key={calculator.id}
            className={`border-elec-yellow/20 bg-elec-gray transition-all duration-300 hover:border-elec-yellow/40 hover:shadow-lg hover:shadow-elec-yellow/20 ${
              calculator.status === "available" ? "cursor-pointer" : "cursor-not-allowed opacity-70"
            }`}
            onClick={() => handleCalculatorClick(calculator.id, calculator.status)}
          >
            <CardHeader className="text-center pb-4">
              <div className="mx-auto mb-4 p-3 bg-elec-yellow/10 rounded-full">
                {calculator.icon}
              </div>
              <CardTitle className="text-white text-lg">
                {calculator.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                {calculator.description}
              </p>
              {calculator.status === "available" ? (
                <Button 
                  variant="outline" 
                  className="w-full border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10"
                >
                  Launch Calculator
                </Button>
              ) : (
                <Button 
                  variant="outline" 
                  disabled
                  className="w-full"
                >
                  Coming Soon
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default BusinessCalculators;