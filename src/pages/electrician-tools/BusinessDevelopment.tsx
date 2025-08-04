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
  Calendar,
  Handshake,
  CreditCard
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const BusinessDevelopment = () => {
  const navigate = useNavigate();

  const calculators = [
    {
      id: "customer-acquisition",
      title: "Customer Acquisition",
      description: "Strategies and tools for finding and securing new customers",
      icon: Handshake,
      status: "coming-soon"
    },
    {
      id: "tax-finances",
      title: "Tax & Finances",
      description: "Tax planning tools and financial management resources",
      icon: Calculator,
      status: "coming-soon"
    },
    {
      id: "debt-recovery",
      title: "Debt Recovery & Non-Payers", 
      description: "Tools and strategies for managing late payments and debt recovery",
      icon: CreditCard,
      status: "coming-soon"
    },
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
      icon: DollarSign,
      status: "available"
    }
  ];

  const handleCalculatorClick = (calculatorId: string, status: string) => {
    if (status === "available") {
      navigate(`/electrician-tools/business-development/${calculatorId}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto p-6 space-y-6">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-white">Business Development Tools</h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
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
                className={`bg-gray-800 border-gray-700 hover:border-elec-yellow/50 transition-all duration-200 ${
                  calculator.status === "available" 
                    ? "cursor-pointer hover:bg-gray-750" 
                    : "opacity-75"
                }`}
                onClick={() => handleCalculatorClick(calculator.id, calculator.status)}
              >
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto mb-4 flex items-center justify-center">
                    <IconComponent className="h-16 w-16 text-elec-yellow" />
                  </div>
                  <CardTitle className="text-xl text-white">{calculator.title}</CardTitle>
                  <CardDescription className="text-sm text-gray-300">
                    {calculator.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center pt-0">
                  <Button 
                    variant={calculator.status === "available" ? "default" : "secondary"}
                    className={`w-full ${
                      calculator.status === "available" 
                        ? "bg-elec-yellow text-black hover:bg-elec-yellow/90" 
                        : "bg-gray-600 text-gray-300"
                    }`}
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
    </div>
  );
};

export default BusinessDevelopment;