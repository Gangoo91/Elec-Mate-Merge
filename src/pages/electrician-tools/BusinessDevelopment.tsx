import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Calculator, 
  Clock, 
  TrendingUp, 
  Target, 
  PiggyBank, 
  BarChart3,
  DollarSign,
  Calendar
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const BusinessDevelopment = () => {
  const navigate = useNavigate();

  const calculators = [
    {
      id: "job-profitability",
      title: "Job Profitability Calculator",
      description: "Calculate profit margins and pricing for electrical jobs",
      icon: TrendingUp,
      status: "available"
    },
    {
      id: "hourly-rate",
      title: "Hourly Rate Calculator", 
      description: "Determine optimal hourly rates based on costs and targets",
      icon: Clock,
      status: "available"
    },
    {
      id: "cash-flow",
      title: "Cash Flow Projector",
      description: "Project monthly cash flow and identify potential issues",
      icon: BarChart3,
      status: "available"
    },
    {
      id: "break-even",
      title: "Break-Even Calculator",
      description: "Calculate break-even points for jobs and monthly operations",
      icon: Target,
      status: "available"
    },
    {
      id: "business-costs",
      title: "Business Cost Calculator",
      description: "Estimate startup and running costs for your electrical business",
      icon: Calculator,
      status: "available"
    },
    {
      id: "tax-planning",
      title: "Tax Planning Tool",
      description: "Plan and estimate tax obligations and allowances",
      icon: PiggyBank,
      status: "coming-soon"
    },
    {
      id: "investment-roi",
      title: "Investment ROI Calculator",
      description: "Calculate return on investment for tools and equipment",
      icon: DollarSign,
      status: "coming-soon"
    },
    {
      id: "project-timeline",
      title: "Project Timeline & Costing",
      description: "Plan project timelines with accurate cost projections",
      icon: Calendar,
      status: "coming-soon"
    }
  ];

  const handleCalculatorClick = (calculatorId: string, status: string) => {
    if (status === "available") {
      navigate(`/electrician-tools/business-development/${calculatorId}`);
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-foreground">Business Development Tools</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Professional calculators and tools to help grow and manage your electrical business effectively.
          Make informed decisions with accurate financial planning.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {calculators.map((calculator) => {
          const IconComponent = calculator.icon;
          
          return (
            <Card 
              key={calculator.id}
              className={`hover:shadow-lg transition-all duration-200 ${
                calculator.status === "available" 
                  ? "cursor-pointer hover:border-elec-yellow/50" 
                  : "opacity-75"
              }`}
              onClick={() => handleCalculatorClick(calculator.id, calculator.status)}
            >
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-3 rounded-full bg-elec-yellow/10">
                  <IconComponent className="h-8 w-8 text-elec-yellow" />
                </div>
                <CardTitle className="text-xl">{calculator.title}</CardTitle>
                <CardDescription className="text-sm">
                  {calculator.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Button 
                  variant={calculator.status === "available" ? "default" : "secondary"}
                  className="w-full"
                  disabled={calculator.status === "coming-soon"}
                >
                  {calculator.status === "available" ? "Use Calculator" : "Coming Soon"}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default BusinessDevelopment;